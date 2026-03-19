import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Operation Dhurandhar — Cipher Spy Game",
  description:
    "Decode ciphers, hold your cover, and become Hamza. A 7-mission spy thriller cipher game.",
  keywords: ["cipher", "spy game", "puzzle", "code breaking", "dhurandhar"],
  openGraph: {
    title: "Operation Dhurandhar — Cipher Spy Game",
    description:
      "7 missions. One identity. No way back. Decode the ciphers and survive.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Operation Dhurandhar — Cipher Spy Game",
    description:
      "7 missions. One identity. No way back. Decode the ciphers and survive.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
