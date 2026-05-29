"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const SERVICE_OPTS = ["مكياج عرايس","مكياج مناسبات","مكياج أفراد","مكياج تصوير","كورسات","استشارات"];

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: "-60px" },
  transition:  { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily:    "var(--font-inter), sans-serif",
      fontWeight:    500,
      fontSize:      "8px",
      letterSpacing: "0.30em",
      textTransform: "uppercase",
      color:         "#5C5852",
      marginBottom:  "10px",
    }}>
      {children}
    </p>
  );
}

/* Simple magnetic wrapper — easeOut only, no spring */
function MagneticButton({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [xy, setXy] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    setXy({
      x: Math.max(-10, Math.min(10, (e.clientX - (left + width  / 2)) * 0.22)),
      y: Math.max(-10, Math.min(10, (e.clientY - (top  + height / 2)) * 0.22)),
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setXy({ x: 0, y: 0 })}
      animate={{ x: xy.x, y: xy.y }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{ display: "contents", ...style }}
    >
      {children}
    </motion.div>
  );
}

export default function Booking() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", service: "", date: "", message: "" });
  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value }));

  const buildWA = () => {
    const text = encodeURIComponent(`مرحبا دلال،\n\nالاسم: ${form.name}\nالخدمة: ${form.service}\nالتاريخ: ${form.date}\n\n${form.message}`);
    return `https://wa.me/966500000000?text=${text}`;
  };

  return (
    <section id="booking" style={{ background: "#F5F4F0" }} dir="rtl">
      <div style={{ height: "0.5px", background: "var(--gold)", opacity: 0.3 }} />

      <div className="max-w-screen-lg mx-auto px-8 md:px-16 lg:px-24 py-28 md:py-40">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "5rem" }}
        >
          <p className="section-label" style={{ color: "var(--gold)", marginBottom: "1.25rem" }}>
            06 — Booking
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
            احجزي<br />موعدك
          </h2>
          <div style={{ width: 48, height: "0.5px", background: "var(--gold)", marginTop: "2rem" }} />
        </motion.div>

        {/* Form */}
        <form
          onSubmit={(e) => { e.preventDefault(); window.open(buildWA(), "_blank"); }}
          style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}
        >
          {/* Name */}
          <motion.div {...fadeUp(0.05)}>
            <FieldLabel>الاسم</FieldLabel>
            <input name="name" type="text" required placeholder="اسمك الكريم"
              value={form.name} onChange={set("name")}
              className="booking-input" aria-label="الاسم" />
          </motion.div>

          {/* Service */}
          <motion.div {...fadeUp(0.1)}>
            <FieldLabel>نوع الخدمة</FieldLabel>
            <select name="service" required value={form.service} onChange={set("service")}
              aria-label="نوع الخدمة" className="booking-input"
              style={{ appearance: "none", WebkitAppearance: "none",
                color: form.service ? "var(--noir)" : "var(--warm-gray)" }}>
              <option value="" disabled>اختاري الخدمة</option>
              {SERVICE_OPTS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </motion.div>

          {/* Date */}
          <motion.div {...fadeUp(0.15)}>
            <FieldLabel>التاريخ</FieldLabel>
            <input name="date" type="date" required value={form.date} onChange={set("date")}
              className="booking-input" style={{ colorScheme: "light" }} aria-label="التاريخ" />
          </motion.div>

          {/* Message */}
          <motion.div {...fadeUp(0.2)}>
            <FieldLabel>رسالة</FieldLabel>
            <textarea name="message" rows={4} placeholder="أي تفاصيل إضافية…"
              value={form.message} onChange={set("message")} aria-label="رسالة"
              className="booking-input" style={{ resize: "none", lineHeight: 2 }} />
          </motion.div>

          {/* CTAs with magnetic effect */}
          <motion.div {...fadeUp(0.25)} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {/* Primary — WhatsApp submit */}
            <MagneticButton style={{ flex: 1, minWidth: "200px" }}>
              <motion.button
                type="submit"
                className="cursor-expand"
                whileHover={{ background: "var(--gold)", color: "#FFFFFF", borderColor: "var(--gold)" }}
                transition={{ duration: 0.25 }}
                style={{
                  width:         "100%",
                  border:        "0.5px solid var(--gold)",
                  background:    "transparent",
                  color:         "var(--gold)",
                  fontFamily:    "var(--font-inter), sans-serif",
                  fontWeight:    500,
                  fontSize:      "9px",
                  letterSpacing: "0.30em",
                  textTransform: "uppercase",
                  padding:       "16px 28px",
                }}
              >
                إرسال عبر واتساب
              </motion.button>
            </MagneticButton>

            {/* Secondary — direct WA */}
            <MagneticButton style={{ flex: 1, minWidth: "200px" }}>
              <motion.a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-expand"
                whileHover={{ background: "var(--gold)", color: "#FFFFFF", borderColor: "var(--gold)" }}
                transition={{ duration: 0.25 }}
                style={{
                  display:       "flex",
                  alignItems:    "center",
                  justifyContent: "center",
                  gap:           "10px",
                  width:         "100%",
                  border:        "0.5px solid #C9C5BC",
                  background:    "transparent",
                  color:         "#5C5852",
                  fontFamily:    "var(--font-inter), sans-serif",
                  fontWeight:    500,
                  fontSize:      "9px",
                  letterSpacing: "0.30em",
                  textTransform: "uppercase",
                  padding:       "16px 28px",
                  textDecoration: "none",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                واتساب مباشر
              </motion.a>
            </MagneticButton>
          </motion.div>
        </form>
      </div>
    </section>
  );
}
