import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Inter,
  Tajawal,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dalal Mohammed | Makeup Artist · Riyadh, KSA",
  description:
    "مكياج احترافي يليق بكِ. تخصص في مكياج العرايس والمناسبات والتصوير — الرياض، المملكة العربية السعودية.",
  openGraph: {
    title: "Dalal Mohammed | Makeup Artist",
    description: "مكياج احترافي يليق بكِ",
    locale: "ar_SA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cormorant.variable} ${inter.variable} ${tajawal.variable}`}
    >
      <body className="bg-white text-noir antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
