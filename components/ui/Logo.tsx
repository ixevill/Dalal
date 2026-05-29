"use client";

import { CSSProperties } from "react";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  style?: CSSProperties;
}

export default function Logo({ variant = "light", className = "", style }: LogoProps) {
  const nameColor    = variant === "dark" ? "#1C1C1C" : "#F5F4F0";
  const taglineColor = variant === "dark" ? "#5C5852" : "#7A766F";

  return (
    <div
      className={className}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", ...style }}
    >
      {/* Name */}
      <span
        style={{
          fontFamily:    "var(--font-cormorant), serif",
          fontWeight:    300,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          fontSize:      "clamp(14px, 2vw, 20px)",
          color:         nameColor,
          lineHeight:    1,
          whiteSpace:    "nowrap",
        }}
      >
        DALAL MOHAMMED
      </span>

      {/* Emblem — lines + gold dot */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
        <div style={{ flex: 1, height: "0.5px", background: "var(--gold)", opacity: 0.65 }} />
        <span style={{ color: "var(--gold)", fontSize: "7px", lineHeight: 1 }}>●</span>
        <div style={{ flex: 1, height: "0.5px", background: "var(--gold)", opacity: 0.65 }} />
      </div>

      {/* Tagline */}
      <span
        style={{
          fontFamily:    "var(--font-inter), sans-serif",
          fontWeight:    500,
          textTransform: "uppercase",
          letterSpacing: "0.35em",
          fontSize:      "7px",
          color:         taglineColor,
          lineHeight:    1,
          whiteSpace:    "nowrap",
        }}
      >
        MAKEUP ARTIST
      </span>
    </div>
  );
}
