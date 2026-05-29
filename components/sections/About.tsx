"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

/* ── Count-up hook — supports decimals ── */
function useCountUp(target: number, duration = 1.6, decimals = 0) {
  const [count, setCount] = useState(0);
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick  = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const raw      = eased * target;
      const rounded  = decimals > 0
        ? Math.round(raw * Math.pow(10, decimals)) / Math.pow(10, decimals)
        : Math.round(raw);
      setCount(rounded);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration, decimals]);

  return { count, ref };
}

function StatItem({
  num, label, prefix = "", suffix = "", decimals = 0,
}: {
  num: number; label: string; prefix?: string; suffix?: string; decimals?: number;
}) {
  const { count, ref } = useCountUp(num, 1.6, decimals);
  const display = decimals > 0 ? (count as number).toFixed(decimals) : count;
  return (
    <div>
      <p style={{
        fontFamily: "var(--font-cormorant), serif", fontWeight: 300,
        fontSize: "clamp(28px, 3.5vw, 42px)", color: "#1C1C1C",
        letterSpacing: "0.04em", lineHeight: 1,
      }}>
        <span ref={ref}>{prefix}{display}{suffix}</span>
      </p>
      <p style={{
        fontFamily: "var(--font-tajawal), sans-serif", fontWeight: 300,
        fontSize: "11px", color: "var(--warm-gray)", marginTop: "8px",
      }}>
        {label}
      </p>
    </div>
  );
}

function RevealOnScroll({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const sectionRef  = useRef(null);
  const labelRef    = useRef(null);
  const labelInView = useInView(labelRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ background: "#F5F4F0" }}
      className="relative overflow-hidden"
      dir="rtl"
    >
      <div style={{ height: "0.5px", background: "var(--gold)", opacity: 0.4 }} />

      <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 py-40 md:py-52">

        <motion.p
          ref={labelRef}
          initial={{ opacity: 0, y: 20 }}
          animate={labelInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="section-label mb-20 md:mb-28"
          style={{ color: "var(--gold)" }}
        >
          01 — About
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center">

          {/* Photo */}
          <RevealOnScroll delay={0.1}>
            <div className="relative order-2 md:order-1">
              <div style={{
                position: "absolute", top: "-14px", right: "-14px",
                width: "100%", height: "100%",
                border: "0.5px solid var(--gold)", opacity: 0.3, zIndex: 0,
              }} />
              <div style={{
                position: "relative", aspectRatio: "4/5",
                background: "#F5F4F0", overflow: "hidden", zIndex: 1,
              }}>
                <motion.div
                  style={{ y: imgY, position: "absolute", inset: "-8% 0", height: "116%" }}
                >
                  <Image
                    src="/images/palettes-flatlay.jpg"
                    alt="Makeup palette flatlay"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    priority
                  />
                </motion.div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Text */}
          <div className="order-1 md:order-2 flex flex-col justify-center">
            <RevealOnScroll delay={0.2}>
              <h2
                dir="ltr"
                style={{
                  fontFamily:    "var(--font-cormorant), serif",
                  fontWeight:    300,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontSize:      "clamp(40px, 5.5vw, 80px)",
                  color:         "#1C1C1C",
                  lineHeight:    1.0,
                  marginBottom:  "2.5rem",
                }}
              >
                DALAL<br />MOHAMMED
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div>
                <div style={{ width: 48, height: "0.5px", background: "var(--gold)", marginBottom: "3rem" }} />
                <p style={{
                  fontFamily: "var(--font-tajawal), sans-serif", fontWeight: 300,
                  fontSize: "16px", lineHeight: 2.1, color: "#5C5852", marginBottom: "1.75rem",
                }}>
                  خبرة تمتد لسنوات في عالم الجمال والمكياج الاحترافي. أؤمن بأن كل
                  امرأة تستحق أن تبدو بأجمل صورة في أهم لحظاتها.
                </p>
                <p style={{
                  fontFamily: "var(--font-tajawal), sans-serif", fontWeight: 300,
                  fontSize: "16px", lineHeight: 2.1, color: "#5C5852", marginBottom: "4rem",
                }}>
                  أسلوبي يجمع بين الأناقة المعاصرة والذوق الرفيع، مع الحرص على
                  إبراز ملامح كل عميلة بشكل فريد يناسب شخصيتها وطبيعة المناسبة.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.4}>
              <div style={{
                display: "flex", gap: "3.5rem",
                borderTop: "0.5px solid #E8E5DF", paddingTop: "2.5rem",
              }}>
                <StatItem num={500}  prefix="+"  label="عميلة" />
                <StatItem num={6}    prefix="+"  label="سنوات" />
                <StatItem num={4.9}  suffix="★"  label="تقييم" decimals={1} />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      <div style={{ height: "0.5px", background: "var(--gold)", opacity: 0.4 }} />
    </section>
  );
}
