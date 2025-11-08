import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Horizon Estates | Luxury Real Estate",
  description:
    "Discover luxury residences, explore curated listings, and schedule private tours with Horizon Estates.",
  metadataBase: new URL("https://agentic-1ea74a28.vercel.app"),
  openGraph: {
    title: "Horizon Estates",
    description:
      "Modern real estate experiences with concierge-level booking and property tours.",
    url: "https://agentic-1ea74a28.vercel.app",
    siteName: "Horizon Estates",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Horizon Estates showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Horizon Estates",
    description:
      "Tour remarkable homes and schedule viewings with Horizon Estates.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
