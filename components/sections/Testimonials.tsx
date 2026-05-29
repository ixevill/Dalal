"use client";

import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const TESTIMONIALS = [
  { id: "01", text: "دلال فنانة بكل معنى الكلمة. مكياج عروسي كان أحلى مما تخيّلت، ثبت طوال اليوم وكأنه يعكس شخصيتي تمامًا.",
    name: "نورة الراشد", detail: "عروس · الرياض" },
  { id: "02", text: "أفضل مكياج تصوير جرّبته. تفهم ما تريدين قبل أن تقولي، والنتيجة دائمًا تتخطى التوقعات.",
    name: "سارة الغامدي", detail: "تصوير · جدة" },
  { id: "03", text: "حضرت كورس المكياج وخرجت بمهارات غيّرت نظرتي لنفسي. أسلوب التدريس واضح، عملي، ومليان معلومات.",
    name: "لينا العتيبي", detail: "كورس · الرياض" },
  { id: "04", text: "مكياج المناسبة كان elegant وبسيط بالضبط اللي طلبته. ردود الفعل كانت رائعة طوال الحفل.",
    name: "ريم المطيري", detail: "مناسبة خاصة · الرياض" },
];

export default function Testimonials() {
  const [active, setActive]               = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const sectionRef = useRef(null);
  const ref        = useRef(null);
  const inView     = useInView(ref, { once: true, margin: "-80px" });

  /* Horizontal parallax on the large index number */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const indexX = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const go = (i: number) => {
    if (i === active || transitioning) return;
    setTransitioning(true);
    setTimeout(() => { setActive(i); setTimeout(() => setTransitioning(false), 60); }, 240);
  };
  const prev = () => go(active === 0 ? TESTIMONIALS.length - 1 : active - 1);
  const next = () => go(active === TESTIMONIALS.length - 1 ? 0 : active + 1);

  const t = TESTIMONIALS[active];

  return (
    <section id="testimonials" ref={sectionRef} style={{ background: "#F5F4F0" }} dir="rtl">
      <div style={{ height: "0.5px", background: "var(--gold)", opacity: 0.4 }} />

      <div ref={ref} className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 py-28 md:py-40">

        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="section-label"
          style={{ color: "var(--gold)", marginBottom: "4rem" }}
        >
          04 — Reviews
        </motion.p>

        {/* Main editorial layout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.65, delay: 0.2 }}
          style={{ display: "flex", gap: "3rem", alignItems: "flex-start" }}
        >
          {/* Large index — parallax horizontal drift */}
          <motion.div
            aria-hidden
            style={{
              x:             indexX,
              fontFamily:    "var(--font-cormorant), serif",
              fontWeight:    300,
              fontSize:      "clamp(80px, 14vw, 160px)",
              lineHeight:    0.85,
              color:         "#1C1C1C",
              opacity:       0.05,
              letterSpacing: "-0.02em",
              userSelect:    "none",
              flexShrink:    0,
            }}
          >
            {t.id}
          </motion.div>

          {/* Content */}
          <div style={{ flex: 1, paddingTop: "0.5rem" }}>
            {/* Gold quote mark */}
            <div style={{
              fontFamily:  "var(--font-cormorant), serif",
              fontWeight:  300,
              fontSize:    "clamp(64px, 10vw, 100px)",
              color:       "var(--gold)",
              lineHeight:  0.7,
              marginBottom: "1.5rem",
              opacity:     0.5,
            }} aria-hidden>
              "
            </div>

            {/* Quote text */}
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: transitioning ? 0 : 1, x: transitioning ? -10 : 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily:   "var(--font-tajawal), sans-serif",
                fontWeight:   300,
                fontSize:     "clamp(16px, 2.2vw, 22px)",
                lineHeight:   2.1,
                color:        "#2A2826",
                marginBottom: "2.5rem",
              }}
            >
              {t.text}
            </motion.blockquote>

            {/* Author */}
            <motion.div
              key={`name-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: transitioning ? 0 : 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3.5rem" }}
            >
              <div style={{ width: 32, height: "0.5px", background: "var(--gold)" }} />
              <div>
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 500, fontSize: "10px",
                  letterSpacing: "0.2em", textTransform: "uppercase", color: "#1C1C1C" }}>
                  {t.name}
                </p>
                <p style={{ fontFamily: "var(--font-tajawal), sans-serif", fontWeight: 300,
                  fontSize: "11px", color: "var(--charcoal)", marginTop: "3px" }}>
                  {t.detail}
                </p>
              </div>
            </motion.div>

            {/* Navigation */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                {/* Line dots */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i} onClick={() => go(i)}
                      aria-label={`Go to review ${i + 1}`}
                      style={{ background: "none", border: "none", padding: "12px 0" }}
                    >
                      <motion.span
                        animate={{ width: i === active ? 48 : 20, background: i === active ? "var(--gold)" : "#C9C5BC" }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{ display: "block", height: "0.5px" }}
                      />
                    </button>
                  ))}
                </div>
                <span style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 500,
                  fontSize: "8px", letterSpacing: "0.25em", color: "#C9C5BC", textTransform: "uppercase" }}>
                  {t.id} / {String(TESTIMONIALS.length).padStart(2, "0")}
                </span>
              </div>

              {/* Prev / Next */}
              <div style={{ display: "flex", gap: "0.75rem" }}>
                {[{ label: "→", fn: prev }, { label: "←", fn: next }].map(({ label, fn }) => (
                  <button
                    key={label} onClick={fn}
                    aria-label={label === "←" ? "Next" : "Previous"}
                    style={{
                      width: 36, height: 36,
                      border: "0.5px solid #C9C5BC",
                      borderRadius: "50%",
                      background: "none",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#5C5852", fontSize: "13px",
                      transition: "border-color 0.25s ease, color 0.25s ease",
                    }}
                    onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "var(--gold)"; b.style.color = "var(--gold)"; }}
                    onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "#C9C5BC"; b.style.color = "#5C5852"; }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div style={{ height: "0.5px", background: "var(--gold)", opacity: 0.4 }} />
    </section>
  );
}
