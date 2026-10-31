import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ogizu.com"),
  title: "Ogizu — Somewhere good. Something unforgettable.",
  description:
    "Find stays worth coming back to. Discover thoughtfully picked hotels, inviting apartments, and your next little escape with Ogizu.",
  openGraph: {
    siteName: "Ogizu",
    locale: "en_US",
    type: "website",
    title: "Ogizu — Find your kind of somewhere",
    description: "Thoughtfully picked stays for the beautifully curious.",
    images: [{ url: "/images/coast-hero.png", alt: "The sunlit Amalfi Coast" }],
  },
  twitter: { card: "summary_large_image" },
  generator: "v0.app",
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f7f5f1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${manrope.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
