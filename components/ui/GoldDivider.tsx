"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/** Thin gold line that draws left → right when it enters the viewport */
export default function GoldDivider() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <div ref={ref} style={{ height: "0.5px", background: "transparent", overflow: "hidden" }}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height:          "0.5px",
          background:      "var(--gold)",
          opacity:         0.35,
          transformOrigin: "left",
        }}
      />
    </div>
  );
}
