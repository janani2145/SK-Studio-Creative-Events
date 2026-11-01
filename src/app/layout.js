import localFont from "next/font/local";
import "./globals.css";
import { brand } from "@/config/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MotionProvider from "@/components/MotionProvider";
import ScrollProgress from "@/components/ScrollProgress";

// Fonts are self-hosted (src/app/fonts) so the site builds and loads without calling Google.
const bodoni = localFont({
  variable: "--font-bodoni",
  display: "swap",
  src: [
    { path: "./fonts/bodoni-moda-latin-standard-normal.woff2", weight: "400 900", style: "normal" },
    { path: "./fonts/bodoni-moda-latin-standard-italic.woff2", weight: "400 900", style: "italic" },
  ],
});

const manrope = localFont({
  variable: "--font-manrope",
  display: "swap",
  src: [{ path: "./fonts/manrope-latin-wght-normal.woff2", weight: "200 800", style: "normal" }],
});

export const metadata = {
  // Set NEXT_PUBLIC_SITE_URL to the live domain (eg. https://skcreativeevents.in) when deploying
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: `${brand.fullName} | Birthday & Event Decoration in ${brand.city}`,
    template: `%s | ${brand.name}`,
  },
  description:
    "Theme birthday decoration, wedding stages, balloon arches, catering, photography, DJ and more in Chennai. One team for your whole celebration.",
  keywords: [
    "birthday decoration Chennai",
    "first birthday theme decoration",
    "balloon decoration Chennai",
    "wedding stage decoration",
    "event management Chennai",
    "SK Creative Events", "birthday decoration Kodambakkam", "birthday decoration Chennai 600083",
  ],
  openGraph: {
    title: brand.fullName,
    description: brand.tagline,
    type: "website",
    images: [{ url: "/images/birthdays/birthday-17.jpg" }],
  },
};

export const viewport = {
  themeColor: "#131210",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${bodoni.variable} ${manrope.variable}`}>
      <body className="min-h-screen antialiased">
        <MotionProvider>
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </MotionProvider>
      </body>
    </html>
  );
}
