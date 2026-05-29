"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────
   Product photo data
───────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1,
    title:  "لوحة الظلال",
    label:  "PALETTE",
    src:    "/images/eyeshadow-palette-1.png",
    bg:     "#FFFFFF",
    dark:   false,
  },
  {
    id: 2,
    title:  "هايلايتر",
    label:  "HIGHLIGHTER",
    src:    "/images/eyeshadow-palette-2.png",
    bg:     "#1C1C1C",
    dark:   true,
  },
  {
    id: 3,
    title:  "تشكيلة الإطلالة",
    label:  "FLATLAY",
    src:    "/images/palettes-flatlay.jpg",
    bg:     "#FFFFFF",
    dark:   false,
  },
  {
    id: 4,
    title:  "طقم الفرش",
    label:  "BRUSHES",
    src:    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
    bg:     "#F5F4F0",
    dark:   false,
  },
  {
    id: 5,
    title:  "أحمر الشفاه",
    label:  "LIPSTICK",
    src:    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800",
    bg:     "#FFFFFF",
    dark:   false,
  },
  {
    id: 6,
    title:  "مكياج عرايس",
    label:  "BRIDAL",
    src:    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800",
    bg:     "#F5F4F0",
    dark:   false,
  },
];

/* ─────────────────────────────────────────────────────────
   Single product card
───────────────────────────────────────────────────────── */
function ProductCard({ p, index }: { p: typeof PRODUCTS[0]; index: number }) {
  const [hov, setHov] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      dir="rtl"
      className="cursor-expand"
      style={{
        background:   p.bg,
        display:      "flex",
        flexDirection:"column",
        overflow:     "hidden",
        transition:   "box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)",
        transform:    hov ? "translateY(-4px)" : "translateY(0)",
        boxShadow:    hov
          ? "0 0 0 0.5px var(--gold), 0 12px 32px rgba(0,0,0,0.08)"
          : "0 0 0 0.5px #E8E5DF",
      }}
    >
      {/* ── Image — 1:1 aspect ratio ── */}
      <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", background: p.bg }}>
        {/* Solid bg layer so transparent PNGs show brand color, not browser checkerboard */}
        <div style={{ position: "absolute", inset: 0, background: p.bg, zIndex: 0 }} />
        <motion.div
          animate={{ scale: hov ? 1.04 : 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "absolute", inset: 0, zIndex: 1, background: p.bg }}
        >
          <Image
            src={p.src}
            alt={p.title}
            fill
            loading="lazy"
            unoptimized={p.dark}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
            style={{ objectFit: p.dark ? "contain" : "cover", background: p.bg }}
          />
        </motion.div>

        {/* Gold border overlay on hover */}
        <motion.div
          animate={{ opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position: "absolute", inset: 0,
            border:   "0.5px solid var(--gold)",
            pointerEvents: "none",
            zIndex:   2,
          }}
        />
      </div>

      {/* ── Caption ── */}
      <div style={{
        padding:   "1.25rem 1.5rem",
        borderTop: `0.5px solid ${p.dark ? "rgba(201,169,110,0.2)" : "#E8E5DF"}`,
        display:   "flex",
        alignItems:"center",
        justifyContent:"space-between",
      }}>
        <div>
          <p style={{
            fontFamily:    "var(--font-inter), sans-serif",
            fontWeight:    500,
            fontSize:      "8px",
            letterSpacing: "0.30em",
            textTransform: "uppercase",
            color:         hov ? "var(--gold)" : (p.dark ? "rgba(201,169,110,0.6)" : "var(--warm-gray)"),
            transition:    "color 0.35s ease",
            marginBottom:  "5px",
          }}>
            {p.label}
          </p>
          <p style={{
            fontFamily:    "var(--font-cormorant), serif",
            fontWeight:    300,
            fontSize:      "17px",
            letterSpacing: "0.06em",
            color:         p.dark ? "rgba(245,244,240,0.85)" : "#1C1C1C",
          }}>
            {p.title}
          </p>
        </div>

        {/* Hover arrow */}
        <motion.div
          animate={{ opacity: hov ? 1 : 0, x: hov ? 0 : 6 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ color: "var(--gold)", fontSize: "12px", flexShrink: 0 }}
        >
          ←
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Section
───────────────────────────────────────────────────────── */
export default function Portfolio() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="portfolio" style={{ background: "#E8E5DF" }}>
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 py-28 md:py-40">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "4rem" }}
          dir="rtl"
        >
          <p className="section-label" style={{ color: "var(--gold)", marginBottom: "1.25rem" }}>
            03 — Portfolio
          </p>
          <h2 style={{
            fontFamily:    "var(--font-cormorant), serif",
            fontWeight:    300,
            fontSize:      "clamp(36px, 5vw, 64px)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color:         "#1C1C1C",
            lineHeight:    1.05,
          }}>
            أعمالي
          </h2>
          <div style={{ width: 48, height: "0.5px", background: "var(--gold)", marginTop: "2rem" }} />
        </motion.div>

        {/* Photo grid */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap:                 "1.5px",
        }}>
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
