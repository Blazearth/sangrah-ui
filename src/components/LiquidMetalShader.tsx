"use client";

import { useEffect, useRef } from "react";

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
varying vec2 v_texCoord;

void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.y, u_resolution.x);
    
    float time = u_time * 0.3;
    for(float i = 1.0; i < 8.0; i++){
        p.x += 0.4 / i * sin(i * 4.0 * p.y + time + cos(time * 0.1));
        p.y += 0.4 / i * cos(i * 4.0 * p.x + time + sin(time * 0.1));
    }
    
    // Sangrah palette: Surface #131313 to Surface-Bright #3a3939
    vec3 color1 = vec3(0.075, 0.075, 0.075);
    vec3 color2 = vec3(0.227, 0.223, 0.223);
    
    float intensity = 0.5 + 0.5 * sin(p.x + p.y + time * 0.5);
    vec3 finalColor = mix(color1, color2, intensity * 0.5);
    
    // Subtle, high-end highlights
    float highlight = pow(0.5 + 0.5 * sin(p.x * 2.0 + p.y * 2.0 + time), 15.0);
    finalColor += 0.08 * vec3(0.9, 0.95, 1.0) * highlight;
    
    // Vignette for depth
    float vignette = 1.0 - length(v_texCoord - 0.5) * 1.2;
    finalColor *= smoothstep(0.0, 0.8, vignette);
    
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
  return shader;
}

export default function LiquidMetalShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
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

    mouseRef.current = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMouse = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx =
          (event.clientX - rect.left) / rect.width;
        const ny =
          1.0 - (event.clientY - rect.top) / rect.height;
        mouseRef.current.x = nx * canvas.width;
        mouseRef.current.y = ny * canvas.height;
      }
    };

    window.addEventListener("mousemove", handleMouse);

    const render = (t: number) => {
      syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse)
        gl.uniform2f(
          uMouse,
          mouseRef.current.x,
          mouseRef.current.y
        );
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
    };
  }, []);

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
