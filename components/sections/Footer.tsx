"use client";

import Logo from "@/components/ui/Logo";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/dalalmohammed.mua" },
  { label: "TikTok",    href: "https://tiktok.com/@dalalmohammed.mua"   },
  { label: "Snapchat",  href: "https://snapchat.com/add/dalalmohammed"  },
  { label: "WhatsApp",  href: "https://wa.me/966500000000"              },
];

export default function Footer() {
  return (
    <footer style={{ background: "#1C1C1C" }}>
      {/* Gold separator */}
      <div style={{ height: "0.5px", background: "var(--gold)", opacity: 0.25 }} />

      <div
        style={{
          maxWidth:      "1280px",
          margin:        "0 auto",
          padding:       "5rem 2.5rem 3rem",
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          gap:           "3rem",
        }}
      >
        {/* Centered logo */}
        <Logo variant="light" style={{ maxWidth: 200 }} />

        {/* Social handles */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2.5rem" }}>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
              style={{
                fontFamily:    "var(--font-inter), sans-serif",
                fontWeight:    300,
                fontSize:      "9px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color:         "#3A3733",
                textDecoration: "none",
                transition:    "color 0.25s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#3A3733")}
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          dir="ltr"
          style={{
            fontFamily:    "var(--font-inter), sans-serif",
            fontWeight:    300,
            fontSize:      "8px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color:         "#2A2826",
            textAlign:     "center",
          }}
        >
          © {new Date().getFullYear()} Dalal Mohammed · All rights reserved
        </p>
      </div>
    </footer>
  );
}
