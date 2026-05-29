"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    // Only activate on fine-pointer (mouse) devices
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setVisible(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [role='button'], input, select, textarea, .cursor-expand")) {
        setHovered(true);
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [role='button'], input, select, textarea, .cursor-expand")) {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout",  onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout",  onOut);
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <motion.div
      style={{
        position:      "fixed",
        left:          x,
        top:           y,
        translateX:    "-50%",
        translateY:    "-50%",
        pointerEvents: "none",
        zIndex:        99999,
        borderRadius:  "50%",
      }}
      animate={{
        width:           hovered ? 40 : 6,
        height:          hovered ? 40 : 6,
        backgroundColor: hovered ? "transparent" : "#C9A96E",
        borderWidth:     hovered ? 0.75 : 0,
        borderColor:     "#C9A96E",
        borderStyle:     "solid",
      }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    />
  );
}
