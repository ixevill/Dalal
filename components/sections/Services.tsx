"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ════════════════════════════════════════════════
   LINE-ART SVG ICONS  —  56×56 viewBox, no fill,
   stroke: #C9A96E, strokeWidth: 1
════════════════════════════════════════════════ */
const g = { stroke: "var(--gold)", strokeWidth: 1, fill: "none",
  strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const thin = { ...g, strokeWidth: 0.5 };

function CrownIcon({ spin }: { spin: boolean }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      {/* Crown */}
      <motion.path d="M 8 44 L 8 30 L 17 18 L 28 30 L 39 18 L 48 30 L 48 44 Z"
        {...g}
        animate={{ rotate: spin ? 15 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ transformOrigin: "28px 36px" }}
      />
      {/* Gems */}
      <circle cx="28" cy="14" r="3.5" {...g}/>
      <circle cx="8"  cy="26" r="2"   {...thin}/>
      <circle cx="48" cy="26" r="2"   {...thin}/>
      {/* Base line */}
      <line x1="8" y1="39" x2="48" y2="39" {...thin} opacity="0.45"/>
    </svg>
  );
}

function GlassIcon({ spin }: { spin: boolean }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      {/* Bowl */}
      <path d="M 16 9 L 40 9 L 34 29 L 22 29 Z" {...g}/>
      {/* Stem */}
      <line x1="28" y1="29" x2="28" y2="45" {...g}/>
      {/* Base */}
      <line x1="18" y1="45" x2="38" y2="45" {...g}/>
      {/* Bubbles */}
      <motion.circle cx="24" cy="20" r="1.5" {...thin} opacity="0.55"
        animate={{ y: spin ? -4 : 0, opacity: spin ? 0 : 0.55 }}
        transition={{ duration: 0.6, ease: "easeOut" }}/>
      <motion.circle cx="30" cy="14" r="1" {...thin} opacity="0.4"
        animate={{ y: spin ? -6 : 0, opacity: spin ? 0 : 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}/>
      {/* Makeup brush beside glass */}
      <motion.path d="M 44 9 L 43 29" {...thin} opacity="0.5"
        animate={{ rotate: spin ? 15 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ transformOrigin: "43px 19px" }}/>
      <path d="M 41 9 Q 43 4 45 9" {...thin} opacity="0.5"/>
    </svg>
  );
}

function RoseIcon({ spin }: { spin: boolean }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <motion.g
        animate={{ rotate: spin ? 15 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ transformOrigin: "28px 22px" }}
      >
        {/* Center */}
        <circle cx="28" cy="22" r="5.5" {...g}/>
        {/* Petals */}
        <path d="M 22 16 Q 16 8 22 6 Q 28 4 28 12" {...g}/>
        <path d="M 34 16 Q 40 8 34 6 Q 28 4 28 12" {...g}/>
        <path d="M 21 28 Q 13 32 14 26 Q 15 20 22 22" {...g}/>
        <path d="M 35 28 Q 43 32 42 26 Q 41 20 34 22" {...g}/>
        <path d="M 24 34 Q 18 42 24 44 Q 30 46 30 38" {...g}/>
      </motion.g>
      {/* Stem */}
      <line x1="28" y1="27.5" x2="28" y2="50" {...g}/>
      {/* Leaf */}
      <path d="M 28 40 Q 20 36 21 30" {...thin} opacity="0.6"/>
    </svg>
  );
}

function CameraIcon({ spin }: { spin: boolean }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      {/* Body */}
      <rect x="7" y="16" width="42" height="28" rx="3" {...g}/>
      {/* Lens outer */}
      <circle cx="28" cy="30" r="10" {...g}/>
      {/* Lens inner */}
      <motion.circle cx="28" cy="30" r="6" {...thin} opacity="0.5"
        animate={{ scale: spin ? 1.18 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ transformOrigin: "28px 30px" }}/>
      {/* Viewfinder bump */}
      <path d="M 22 16 L 22 10 L 34 10 L 34 16" {...g}/>
      {/* Flash */}
      <circle cx="44" cy="22" r="2" {...thin} opacity="0.6"/>
      {/* Brush */}
      <path d="M 44 36 Q 44 50 43 52" {...thin} opacity="0.4"/>
    </svg>
  );
}

function BookIcon({ spin }: { spin: boolean }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      {/* Left page */}
      <path d="M 8 11 L 28 11 L 28 45 Q 18 43 8 45 Z" {...g}/>
      {/* Right page */}
      <path d="M 28 11 L 48 11 L 48 45 Q 38 43 28 45 Z" {...g}/>
      {/* Spine */}
      <line x1="28" y1="11" x2="28" y2="45" {...thin} opacity="0.45"/>
      {/* Lines */}
      <line x1="12" y1="19" x2="24" y2="19" {...thin} opacity="0.4"/>
      <line x1="12" y1="25" x2="24" y2="25" {...thin} opacity="0.4"/>
      <line x1="12" y1="31" x2="22" y2="31" {...thin} opacity="0.4"/>
      <line x1="32" y1="19" x2="44" y2="19" {...thin} opacity="0.4"/>
      <line x1="32" y1="25" x2="44" y2="25" {...thin} opacity="0.4"/>
      <line x1="32" y1="31" x2="42" y2="31" {...thin} opacity="0.4"/>
      {/* Palette dot */}
      <motion.circle cx="40" cy="38" r="3" {...g}
        animate={{ scale: spin ? 1.3 : 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{ transformOrigin: "40px 38px" }}/>
    </svg>
  );
}

function BubbleIcon({ spin }: { spin: boolean }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      {/* Bubble */}
      <path d="M 10 9 Q 10 5 14 5 L 42 5 Q 46 5 46 9 L 46 27 Q 46 31 42 31 L 30 31 L 22 41 L 22 31 L 14 31 Q 10 31 10 27 Z"
        {...g}/>
      {/* Star inside */}
      <motion.path d="M 28 11 L 29.8 17 L 36 17 L 31 20.8 L 33 27 L 28 23 L 23 27 L 25 20.8 L 20 17 L 26.2 17 Z"
        {...thin} opacity="0.75"
        animate={{ rotate: spin ? 20 : 0, scale: spin ? 1.1 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ transformOrigin: "28px 19px" }}/>
    </svg>
  );
}

const ICON_COMPONENTS = [CrownIcon, GlassIcon, RoseIcon, CameraIcon, BookIcon, BubbleIcon];

const SERVICES = [
  { num: "01", label: "BRIDAL",     title: "مكياج عرايس",    desc: "إطلالة استثنائية ليوم لا يُنسى — أناقة كلاسيكية وحداثة في آنٍ واحد." },
  { num: "02", label: "OCCASIONS",  title: "مكياج مناسبات",  desc: "خطوبة، تخرّج، أو حفل — لكل مناسبة لمستها الخاصة." },
  { num: "03", label: "PERSONAL",   title: "مكياج أفراد",    desc: "جلسة مخصصة تُبرز ملامحكِ الطبيعية بأسلوب عصري ورقيق." },
  { num: "04", label: "EDITORIAL",  title: "مكياج تصوير",    desc: "مكياج مُصمَّم للكاميرا — يتألق تحت أضواء الاستوديو." },
  { num: "05", label: "COURSES",    title: "كورسات",          desc: "دورات فردية وجماعية لتعلّم أسرار المكياج الاحترافي." },
  { num: "06", label: "CONSULTING", title: "استشارات",        desc: "استشارة جمالية لاختيار الألوان والمنتجات المثالية لك." },
];

function ServiceCard({ s, index }: { s: typeof SERVICES[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const IconComp = ICON_COMPONENTS[index];

  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.09 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      dir="rtl"
      className="service-card cursor-expand"
      style={{
        padding:         "2.5rem",
        border:          `0.5px solid ${hovered ? "var(--gold)" : "#E8E5DF"}`,
        background:      hovered ? "#F5F4F0" : "#FFFFFF",
        display:         "flex",
        flexDirection:   "column",
        gap:             "1.5rem",
      }}
    >
      {/* Icon */}
      <div style={{ width: 56, height: 56 }}>
        <IconComp spin={hovered} />
      </div>

      {/* Number + Label row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          fontFamily:    "var(--font-cormorant), serif",
          fontWeight:    300,
          fontSize:      "13px",
          letterSpacing: "0.2em",
          color:         hovered ? "var(--gold)" : "#C9C5BC",
          transition:    "color 0.35s ease",
        }}>
          {s.num}
        </span>
        <span style={{
          fontFamily:    "var(--font-inter), sans-serif",
          fontWeight:    500,
          fontSize:      "7px",
          letterSpacing: "0.30em",
          textTransform: "uppercase",
          color:         hovered ? "var(--gold)" : "#C9C5BC",
          transition:    "color 0.35s ease",
        }}>
          {s.label}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily:    "var(--font-cormorant), serif",
        fontWeight:    300,
        fontSize:      "clamp(20px, 2.5vw, 28px)",
        letterSpacing: "0.08em",
        color:         "#1C1C1C",
        lineHeight:    1.15,
      }}>
        {s.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: "var(--font-tajawal), sans-serif",
        fontWeight: 300,
        fontSize:   "13px",
        lineHeight: 1.9,
        color:      "#5C5852",
      }}>
        {s.desc}
      </p>
    </motion.div>
  );
}

export default function Services() {
  const titleRef    = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section id="services" style={{ background: "#FFFFFF" }}>
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 py-28 md:py-40">

        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "5rem" }}
          dir="rtl"
        >
          <p className="section-label" style={{ color: "var(--gold)", marginBottom: "1.25rem" }}>
            02 — Services
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
            خدماتي
          </h2>
          <div style={{ width: 48, height: "0.5px", background: "var(--gold)", marginTop: "2rem" }} />
        </motion.div>

        {/* Card grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5px" }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
