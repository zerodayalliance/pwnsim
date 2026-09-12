import type { Metadata } from "next";
import { Montserrat, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const montserrat = Montserrat({ variable: "--font-sans", subsets: ["latin"] });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PwnSim | ZeroDay Alliance",
  description: "Interactive Web-Based Pwn Simulator by ZeroDay Alliance",
  robots: "index, follow",
  creator: "ZeroDay Alliance",
  authors: [
    { name: "Krishnendu Das", url: "https://itskdhere.com" },
    { name: "Avik Samanta", url: "https://github.com/avik-root" },
    { name: "ZeroDay Alliance", url: "https://zerodayalliance.vercel.app" },
  ],
  keywords: ["pwnsim", "zerodayalliance"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        montserrat.variable,
        geistMono.variable,
        "font-sans",
        "antialiased"
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
