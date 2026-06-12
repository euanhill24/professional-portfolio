import { ImageResponse } from "next/og";

export const alt = "Euan Hill — AI Consultant & Technologist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const cream = "#f5f0e8";
const brown = "#1e1914";
const copper = "#8b7355";
const copperMuted = "#d4c5b0";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: cream,
          color: brown,
          position: "relative",
        }}
      >
        {/* Corner brackets */}
        <div
          style={{
            position: "absolute",
            top: 48,
            right: 48,
            width: 40,
            height: 40,
            borderTop: `2px solid ${copper}`,
            borderRight: `2px solid ${copper}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 48,
            width: 40,
            height: 40,
            borderBottom: `2px solid ${copper}`,
            borderLeft: `2px solid ${copper}`,
          }}
        />

        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: copper,
            marginBottom: 36,
          }}
        >
          Portfolio — 2026
        </div>

        <div
          style={{
            fontSize: 110,
            fontWeight: 400,
            letterSpacing: -2,
            fontFamily: "Georgia, serif",
          }}
        >
          Euan Hill
        </div>

        <div
          style={{
            width: 120,
            height: 2,
            backgroundColor: copper,
            margin: "36px 0",
          }}
        />

        <div
          style={{
            fontSize: 28,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: copper,
          }}
        >
          AI Consultant & Technologist
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 52,
            fontSize: 20,
            letterSpacing: 3,
            color: copperMuted,
          }}
        >
          euanhill.com
        </div>
      </div>
    ),
    { ...size }
  );
}
