import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sangrah — Enterprise Federated Learning";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #050505 0%, #131313 50%, #1c1b1b 100%)",
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#8e9192",
            marginBottom: 24,
          }}
        >
          Sovereign Artificial Intelligence
        </div>
        <div
          style={{
            fontSize: 72,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Unite Your Intelligence.
        </div>
        <div
          style={{
            fontSize: 72,
            color: "#c6c6c7",
            fontStyle: "italic",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 40,
          }}
        >
          Keep Your Data.
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#c4c7c8",
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          Production-grade federated learning for enterprise
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            fontSize: 28,
            color: "#b1c5ff",
            letterSpacing: "-0.02em",
          }}
        >
          sangrah.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
