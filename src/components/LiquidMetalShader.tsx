"use client";

import { useEffect, useRef, useState } from "react";

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_mouse_influence;
varying vec2 v_texCoord;

void main() {
    vec2 uv = v_texCoord;
    vec2 mouseNorm = u_mouse / u_resolution;
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    // Subtle mouse parallax — shifts the noise field toward cursor
    vec2 mouseOffset = (mouseNorm - 0.5) * 0.35 * u_mouse_influence;
    p += mouseOffset;

    float time = u_time * 0.12;
    for(float i = 1.0; i < 8.0; i++){
        p.x += 0.35 / i * sin(i * 3.5 * p.y + time + cos(time * 0.08));
        p.y += 0.35 / i * cos(i * 3.5 * p.x + time + sin(time * 0.08));
    }

    vec3 color1 = vec3(0.075, 0.075, 0.075);
    vec3 color2 = vec3(0.227, 0.223, 0.223);

    float intensity = 0.5 + 0.5 * sin(p.x + p.y + time * 0.4);
    vec3 finalColor = mix(color1, color2, intensity * 0.45);

    // Soft cursor glow — interactive highlight
    float dist = length(uv - mouseNorm);
    float cursorGlow = exp(-dist * 8.0) * 0.12 * u_mouse_influence;
    finalColor += vec3(0.7, 0.78, 1.0) * cursorGlow;

    // Ambient shimmer
    float highlight = pow(0.5 + 0.5 * sin(p.x * 2.0 + p.y * 2.0 + time), 18.0);
    finalColor += 0.06 * vec3(0.9, 0.95, 1.0) * highlight;

    float vignette = 1.0 - length(v_texCoord - 0.5) * 1.15;
    finalColor *= smoothstep(0.0, 0.85, vignette);

    gl_FragColor = vec4(finalColor, 1.0);
}`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("Shader compile error:", gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
}

export default function LiquidMetalShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const syncSize = () => {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(canvas);
    syncSize();

    const gl =
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    if (!gl || !(gl instanceof WebGLRenderingContext)) return;

    const prog = gl.createProgram();
    if (!prog) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uMouseInfluence = gl.getUniformLocation(prog, "u_mouse_influence");

    mouseRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
    targetMouseRef.current = { ...mouseRef.current };

    const handleMouse = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        targetMouseRef.current = {
          x: ((event.clientX - rect.left) / rect.width) * canvas.width,
          y: (1.0 - (event.clientY - rect.top) / rect.height) * canvas.height,
        };
      }
    };

    const handleVisibility = () => {
      pausedRef.current = document.hidden;
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    const render = (t: number) => {
      if (!pausedRef.current) {
        syncSize();
        gl.viewport(0, 0, canvas.width, canvas.height);

        // Smooth mouse interpolation for fluid feel
        mouseRef.current.x +=
          (targetMouseRef.current.x - mouseRef.current.x) * 0.06;
        mouseRef.current.y +=
          (targetMouseRef.current.y - mouseRef.current.y) * 0.06;

        if (uTime) gl.uniform1f(uTime, t * 0.001);
        if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
        if (uMouse)
          gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
        if (uMouseInfluence) gl.uniform1f(uMouseInfluence, 1.0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div
        className="fixed inset-0 w-full h-full -z-10 bg-gradient-to-br from-obsidian via-surface to-surface-bright"
        aria-hidden="true"
      />
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        aria-hidden="true"
      />
    </div>
  );
}
