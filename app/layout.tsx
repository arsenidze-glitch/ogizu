import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "место — найдите своё место в мире",
  description:
    "Отели с характером, уютные апартаменты и маленькие побеги из города. Найдите своё место для следующего путешествия.",
  generator: "v0.app",
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#fafbf8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="light">
      <body className={`${manrope.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
