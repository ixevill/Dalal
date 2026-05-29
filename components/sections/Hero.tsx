"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/* ── Char-by-char reveal ── */
const charContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.6 } },
};
const charVariant = {
  hidden:  { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function RevealText({ text }: { text: string }) {
  return (
    <motion.span
      variants={charContainer}
      initial="hidden"
      animate="visible"
      dir="ltr"
      aria-label={text}
      style={{ display: "inline-flex" }}
    >
      {text.split("").map((c, i) => (
        <motion.span key={i} variants={charVariant} style={{ display: "inline-block" }}>
          {c === " " ? " " : c}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ── Makeup brush SVG ─────────────────────────────────────────
   Draws itself via Framer Motion pathLength 0 → 1, then
   rotates 360° continuously with an 8-second period.
─────────────────────────────────────────────────────────────── */
const pathBase = {
  fill:             "none",
  strokeLinecap:    "round" as const,
  strokeLinejoin:   "round" as const,
};

function MakeupBrush() {
  const goldStroke = { stroke: "var(--gold)", strokeWidth: 1, ...pathBase };
  const darkStroke = { stroke: "#1C1C1C",     strokeWidth: 1, ...pathBase };
  const thin       = { stroke: "var(--gold)", strokeWidth: 0.5, ...pathBase };

  // Each path animates its own pathLength 0 → 1 with a stagger
  const draw = (delay: number, duration = 1.1) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { pathLength: { duration, ease: "easeOut", delay }, opacity: { duration: 0.01, delay } },
  });

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 2.2 }}
      style={{ display: "block", transformOrigin: "32px 55%" }}
    >
      <svg width="64" height="400" viewBox="0 0 64 400" fill="none" aria-hidden>
        {/* ── Bristle silhouette ── */}
        <motion.path d="M 32 4 C 30 35 18 72 16 106 L 48 106 C 46 72 34 35 32 4 Z"
          {...goldStroke} {...draw(0.2, 1.3)} />

        {/* Bristle inner texture */}
        <motion.path d="M 26 44 Q 32 20 32 6"  {...thin} opacity={0.35} {...draw(0.5, 0.8)} />
        <motion.path d="M 38 44 Q 32 20 32 6"  {...thin} opacity={0.35} {...draw(0.55, 0.8)} />
        <motion.line x1="20" y1="68" x2="44" y2="68" {...thin} opacity={0.25} {...draw(0.6, 0.4)} />
        <motion.line x1="18" y1="86" x2="46" y2="86" {...thin} opacity={0.25} {...draw(0.65, 0.4)} />

        {/* ── Ferrule (metal band) ── */}
        <motion.rect x="14" y="106" width="36" height="26" rx="1"
          stroke="var(--gold)" strokeWidth="1" fill="none"
          {...draw(0.85, 0.6)} />
        <motion.line x1="14" y1="116" x2="50" y2="116"
          {...thin} opacity={0.5} {...draw(0.95, 0.35)} />
        <motion.line x1="14" y1="124" x2="50" y2="124"
          {...thin} opacity={0.5} {...draw(1.0, 0.35)} />

        {/* ── Handle ── */}
        <motion.path d="M 20 132 L 19 376 Q 32 386 45 376 L 44 132 Z"
          {...darkStroke} {...draw(1.05, 1.2)} />

        {/* Center gold stripe */}
        <motion.line x1="32" y1="138" x2="32" y2="370"
          {...thin} opacity={0.18} {...draw(1.3, 0.9)} />

        {/* Brand detail rect */}
        <motion.rect x="25" y="228" width="14" height="52" rx="0"
          stroke="var(--gold)" strokeWidth="0.5" opacity={0.28} fill="none"
          {...draw(1.45, 0.5)} />

        {/* End cap */}
        <motion.ellipse cx="32" cy="382" rx="13" ry="5"
          stroke="#1C1C1C" strokeWidth="1" fill="none"
          {...draw(1.5, 0.4)} />
      </svg>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      style={{ background: "#FFFFFF", minHeight: "100svh" }}
      className="relative flex items-center overflow-hidden"
    >
      {/* ── Subtle blurred background image ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <Image
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{
            objectFit:  "cover",
            opacity:    0.08,
            filter:     "blur(40px)",
            transform:  "scale(1.05)",
          }}
        />
      </div>

      {/* Top hairline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute", top: 80, left: "6%", right: "6%", zIndex: 1,
          height: "0.5px", background: "var(--gold)", opacity: 0.2, transformOrigin: "left" }}
      />

      {/* Content + Brush */}
      <div
        className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 w-full"
        style={{
          position:            "relative",
          zIndex:              1,
          display:             "grid",
          gridTemplateColumns: "1fr auto",
          alignItems:          "center",
          gap:                 "5rem",
        }}
        dir="rtl"
      >
        {/* ── Text content ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

          {/* Top emblem */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{ display: "flex", alignItems: "center", gap: "1rem", transformOrigin: "right" }}
          >
            <div style={{ width: 80, height: "0.5px", background: "var(--gold)", opacity: 0.5 }} />
            <span style={{ color: "var(--gold)", fontSize: "8px", lineHeight: 1 }}>●</span>
            <div style={{ width: 80, height: "0.5px", background: "var(--gold)", opacity: 0.5 }} />
          </motion.div>

          {/* Name — char reveal + cinematic scale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          >
            <h1
              dir="ltr"
              style={{
                fontFamily:    "var(--font-cormorant), serif",
                fontWeight:    300,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontSize:      "clamp(30px, 5.5vw, 68px)",
                color:         "#1C1C1C",
                lineHeight:    1.05,
              }}
            >
              <RevealText text="DALAL" />
              <br />
              <RevealText text="MOHAMMED" />
            </h1>
          </motion.div>

          {/* MAKEUP ARTIST */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 1.55 }}
            dir="ltr"
            style={{
              fontFamily:    "var(--font-inter), sans-serif",
              fontWeight:    500,
              fontSize:      "9px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color:         "#5C5852",
            }}
          >
            MAKEUP ARTIST
          </motion.p>

          {/* Gold line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.75 }}
            style={{ display: "flex", alignItems: "center", gap: "1rem", maxWidth: 300, transformOrigin: "right" }}
          >
            <div style={{ flex: 1, height: "0.5px", background: "var(--gold)", opacity: 0.5 }} />
            <span style={{ color: "var(--gold)", fontSize: "8px", lineHeight: 1 }}>●</span>
            <div style={{ flex: 1, height: "0.5px", background: "var(--gold)", opacity: 0.5 }} />
          </motion.div>

          {/* Arabic tagline — word-by-word stagger */}
          <div style={{ overflow: "hidden" }}>
            {["مكياج", "يليق", "بكِ"].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 2.0 + i * 0.15 }}
                style={{
                  display:       "inline-block",
                  fontFamily:    "var(--font-cormorant), serif",
                  fontStyle:     "italic",
                  fontWeight:    300,
                  fontSize:      "clamp(20px, 3.2vw, 34px)",
                  color:         "#5C5852",
                  letterSpacing: "0.04em",
                  marginLeft:    i > 0 ? "0.4em" : 0,
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Location */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 2.6 }}
            dir="ltr"
            style={{
              fontFamily:    "var(--font-inter), sans-serif",
              fontWeight:    500,
              fontSize:      "8px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color:         "#C9C5BC",
            }}
          >
            RIYADH · KSA
          </motion.p>
        </div>

        {/* ── Brush illustration (desktop only) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="hidden lg:flex"
          style={{ justifyContent: "center", paddingTop: "2rem" }}
        >
          <MakeupBrush />
        </motion.div>
      </div>

      {/* Bottom hairline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{ position: "absolute", bottom: 80, left: "6%", right: "6%", zIndex: 1,
          height: "0.5px", background: "var(--gold)", opacity: 0.2, transformOrigin: "right" }}
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.7 }}
        style={{ position: "absolute", bottom: "2rem", left: "50%", zIndex: 1,
          transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "0.5px", height: "44px",
            background: "linear-gradient(to bottom, var(--gold), transparent)" }}
        />
        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--gold)" }} />
      </motion.div>
    </section>
  );
}
