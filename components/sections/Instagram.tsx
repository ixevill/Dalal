"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const POSTS = [
  { id: 1, src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80", alt: "Bridal" },
  { id: 2, src: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=400&q=80", alt: "Evening" },
  { id: 3, src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80", alt: "Natural" },
  { id: 4, src: "https://images.unsplash.com/photo-1503236823255-94d32e68b1b4?w=400&q=80", alt: "Glam" },
  { id: 5, src: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400&q=80", alt: "Skincare" },
  { id: 6, src: "https://images.unsplash.com/photo-1560869713-da86a9ec0744?w=400&q=80", alt: "Editorial" },
];

export default function Instagram() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="instagram" style={{ background: "#FFFFFF" }}>
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 py-28 md:py-40">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "3.5rem", textAlign: "center" }}
        >
          <p className="section-label" style={{ color: "var(--gold)", marginBottom: "1rem" }}>
            05 — Follow
          </p>
          <a
            href="https://instagram.com/dalalmohammed.mua"
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            style={{
              fontFamily:    "var(--font-cormorant), serif",
              fontWeight:    300,
              fontSize:      "clamp(28px, 4vw, 52px)",
              letterSpacing: "0.12em",
              color:         "#1C1C1C",
              textDecoration: "none",
              borderBottom:  "0.5px solid var(--gold)",
              paddingBottom: "4px",
              transition:    "color 0.25s ease",
              display:       "inline-block",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#1C1C1C")}
          >
            @dalalmohammed.mua
          </a>
        </motion.div>

        {/* 6-cell grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
          {POSTS.map((p, i) => (
            <motion.a
              key={p.id}
              href="https://instagram.com/dalalmohammed.mua"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-expand"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
              whileHover={{ opacity: 0.8 }}
              style={{ position: "relative", aspectRatio: "1/1", display: "block", overflow: "hidden" }}
            >
              <Image src={p.src} alt={p.alt} fill
                style={{ objectFit: "cover" }}
                sizes="(max-width:768px) 33vw, 200px" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
