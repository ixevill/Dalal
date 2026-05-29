"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const NAV_ITEMS = [
  { en: "ABOUT",     href: "#about"        },
  { en: "SERVICES",  href: "#services"     },
  { en: "PORTFOLIO", href: "#portfolio"    },
  { en: "REVIEWS",   href: "#testimonials" },
  { en: "BOOKING",   href: "#booking"      },
];

export default function Navbar() {
  const [visible,  setVisible]  = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setVisible(latest < 80 || latest < prev);
    setScrolled(latest > 60);
  });

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Desktop nav ── */}
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          position:       "fixed",
          top:            0,
          insetInline:    0,
          zIndex:         100,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          padding:        "0 2.5rem",
          height:         scrolled ? "54px" : "64px",
          background:     scrolled ? "rgba(245,244,240,0.92)" : "transparent",
          borderBottom:   scrolled ? "0.5px solid rgba(201,169,110,0.18)" : "none",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          transition:     "height 0.4s ease, background 0.4s ease, border-color 0.4s ease",
        }}
        dir="rtl"
      >
        {/* Logo / DM monogram */}
        <button
          onClick={() => scrollTo("#hero")}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          aria-label="Back to top"
        >
          <AnimatePresence mode="wait">
            {scrolled ? (
              <motion.span
                key="monogram"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{
                  fontFamily:    "var(--font-cormorant), serif",
                  fontWeight:    300,
                  fontSize:      "22px",
                  letterSpacing: "0.18em",
                  color:         "#1C1C1C",
                  display:       "block",
                  lineHeight:    1,
                }}
              >
                DM
              </motion.span>
            ) : (
              <motion.div
                key="full-logo"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}
              >
                <span style={{
                  fontFamily:    "var(--font-cormorant), serif",
                  fontWeight:    300,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontSize:      "clamp(13px, 1.8vw, 18px)",
                  color:         "#1C1C1C",
                  lineHeight:    1,
                  whiteSpace:    "nowrap",
                }}>DALAL MOHAMMED</span>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", width: "100%" }}>
                  <div style={{ flex: 1, height: "0.5px", background: "var(--gold)", opacity: 0.65 }} />
                  <span style={{ color: "var(--gold)", fontSize: "6px" }}>●</span>
                  <div style={{ flex: 1, height: "0.5px", background: "var(--gold)", opacity: 0.65 }} />
                </div>
                <span style={{
                  fontFamily:    "var(--font-inter), sans-serif",
                  fontWeight:    500,
                  textTransform: "uppercase",
                  letterSpacing: "0.35em",
                  fontSize:      "6px",
                  color:         "#5C5852",
                  lineHeight:    1,
                  whiteSpace:    "nowrap",
                }}>MAKEUP ARTIST</span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.en}
              onClick={() => scrollTo(item.href)}
              style={{
                background:    "none",
                border:        "none",
                fontFamily:    "var(--font-inter), sans-serif",
                fontWeight:    500,
                fontSize:      "9px",
                letterSpacing: "0.30em",
                textTransform: "uppercase",
                color:         "#7A766F",
                transition:    "color 0.25s ease",
                padding:       "4px 0",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--gold)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#7A766F")}
            >
              {item.en}
            </button>
          ))}
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          style={{ background: "none", border: "none", padding: 8, display: "flex", flexDirection: "column", gap: 6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={
                menuOpen
                  ? i === 0 ? { rotate: 45,  y: 9,  opacity: 1 }
                  : i === 1 ? { opacity: 0 }
                  :            { rotate: -45, y: -9, opacity: 1 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.28, ease: "easeOut" }}
              style={{ display: "block", width: 22, height: "0.5px", background: "#1C1C1C", transformOrigin: "center" }}
            />
          ))}
        </button>
      </motion.nav>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position:       "fixed",
              inset:          0,
              zIndex:         90,
              background:     "rgba(245,244,240,0.98)",
              backdropFilter: "blur(20px)",
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              justifyContent: "center",
              gap:            "2.5rem",
            }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.en}
                onClick={() => scrollTo(item.href)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
                style={{
                  background:    "none",
                  border:        "none",
                  fontFamily:    "var(--font-cormorant), serif",
                  fontWeight:    300,
                  fontSize:      "clamp(28px, 6vw, 42px)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color:         "#1C1C1C",
                  transition:    "color 0.25s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--gold)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#1C1C1C")}
              >
                {item.en}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
