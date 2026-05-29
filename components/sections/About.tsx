"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

/* ── Count-up hook ── */
function useCountUp(target: number, duration = 1.4) {
  const [count, setCount] = useState(0);
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick  = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // easeOut cubic
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return { count, ref };
}


const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Stat with count-up ── */
function StatItem({ num, label, prefix = "", suffix = "" }: { num: number; label: string; prefix?: string; suffix?: string }) {
  const { count, ref } = useCountUp(num);
  return (
    <div>
      <p style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, fontSize: "32px",
        color: "#1C1C1C", letterSpacing: "0.04em", lineHeight: 1 }}>
        <span ref={ref}>{prefix}{count}{suffix}</span>
      </p>
      <p style={{ fontFamily: "var(--font-tajawal), sans-serif", fontWeight: 300, fontSize: "11px",
        color: "var(--warm-gray)", marginTop: "6px" }}>
        {label}
      </p>
    </div>
  );
}

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" style={{ background: "#F5F4F0" }} className="relative overflow-hidden" dir="rtl">
      <div style={{ height: "0.5px", background: "var(--gold)", opacity: 0.4 }} />

      <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 py-28 md:py-40">

        {/* Section label */}
        <motion.p
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="section-label mb-14 md:mb-20"
          style={{ color: "var(--gold)" }}
        >
          01 — About
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-28 items-center">

          {/* ── Illustration col ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.15 }}
            className="relative order-2 md:order-1"
          >
            {/* Offset gold frame */}
            <div style={{
              position: "absolute", top: "-12px", right: "-12px",
              width: "100%", height: "100%",
              border: "0.5px solid var(--gold)", opacity: 0.25, zIndex: 0,
            }} />
            {/* Flatlay photo */}
            <div style={{ position: "relative", aspectRatio: "4/5", background: "#F5F4F0",
              overflow: "hidden", zIndex: 1 }}>
              <Image
                src="/images/palettes-flatlay.jpg"
                alt="Makeup palette flatlay"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority
              />
            </div>
          </motion.div>

          {/* ── Text col ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
            className="order-1 md:order-2 flex flex-col justify-center"
          >
            <h2 style={{
              fontFamily:    "var(--font-cormorant), serif",
              fontWeight:    300,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontSize:      "clamp(36px, 5vw, 64px)",
              color:         "#1C1C1C",
              lineHeight:    1.05,
              marginBottom:  "2rem",
            }}>
              دلال<br />محمد
            </h2>

            <div style={{ width: 48, height: "0.5px", background: "var(--gold)", marginBottom: "2.5rem" }} />

            <p style={{
              fontFamily: "var(--font-tajawal), sans-serif", fontWeight: 300,
              fontSize: "15px", lineHeight: 2.1, color: "#5C5852", marginBottom: "1.5rem",
            }}>
              خبرة تمتد لسنوات في عالم الجمال والمكياج الاحترافي. أؤمن بأن كل
              امرأة تستحق أن تبدو بأجمل صورة في أهم لحظاتها.
            </p>
            <p style={{
              fontFamily: "var(--font-tajawal), sans-serif", fontWeight: 300,
              fontSize: "15px", lineHeight: 2.1, color: "#5C5852", marginBottom: "3rem",
            }}>
              أسلوبي يجمع بين الأناقة المعاصرة والذوق الرفيع، مع الحرص على
              إبراز ملامح كل عميلة بشكل فريد يناسب شخصيتها وطبيعة المناسبة.
            </p>

            {/* Stats row — count-up */}
            <div style={{ display: "flex", gap: "3rem",
              borderTop: "0.5px solid #E8E5DF", paddingTop: "2rem" }}>
              <StatItem num={500} prefix="+" label="عميلة" />
              <StatItem num={8}   prefix="+" label="سنوات" />
              <StatItem num={5}   suffix="★" label="تقييم" />
            </div>
          </motion.div>
        </div>
      </div>

      <div style={{ height: "0.5px", background: "var(--gold)", opacity: 0.4 }} />
    </section>
  );
}
