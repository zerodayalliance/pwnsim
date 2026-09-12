"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  IconBrandWindows,
  IconBrandChrome,
  IconBrandVscode,
  IconArrowRight,
  IconAdjustmentsCog,
  IconBrandGithub,
} from "@tabler/icons-react";

interface EnvironmentRoute {
  id: string;
  title: string;
  href: string;
  previewImage?: string;
  accentColor: {
    bg: string;
    border: string;
    glow: string;
    text: string;
    ring: string;
  };
  icon: React.ComponentType<{ className?: string; size?: number }>;
  colSpan?: string;
}

const ROUTES: EnvironmentRoute[] = [
  {
    id: "win11",
    title: "Windows 11 Desktop",
    href: "/win11",
    previewImage: "/previews/win11.png",
    accentColor: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30 group-hover:border-blue-500/60",
      glow: "group-hover:shadow-[0_0_35px_rgba(59,130,246,0.25)]",
      text: "text-blue-400",
      ring: "focus-visible:ring-blue-500/50",
    },
    icon: IconBrandWindows,
  },
  {
    id: "win7",
    title: "Windows 7 Desktop",
    href: "/win7",
    previewImage: "/previews/win7.png",
    accentColor: {
      bg: "bg-sky-500/10",
      border: "border-sky-500/30 group-hover:border-sky-500/60",
      glow: "group-hover:shadow-[0_0_35px_rgba(14,165,233,0.25)]",
      text: "text-sky-400",
      ring: "focus-visible:ring-sky-500/50",
    },
    icon: IconBrandWindows,
  },
  {
    id: "chrome",
    title: "Google Chrome",
    href: "/chrome",
    previewImage: "/previews/chrome.png",
    accentColor: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30 group-hover:border-emerald-500/60",
      glow: "group-hover:shadow-[0_0_35px_rgba(16,185,129,0.25)]",
      text: "text-emerald-400",
      ring: "focus-visible:ring-emerald-500/50",
    },
    icon: IconBrandChrome,
  },
  {
    id: "vscode",
    title: "Visual Studio Code",
    href: "/vscode",
    previewImage: "/previews/vscode.png",
    accentColor: {
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30 group-hover:border-cyan-500/60",
      glow: "group-hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]",
      text: "text-cyan-400",
      ring: "focus-visible:ring-cyan-500/50",
    },
    icon: IconBrandVscode,
  },
  {
    id: "admin",
    title: "Admin",
    href: "/admin",
    accentColor: {
      bg: "bg-rose-500/10",
      border: "border-rose-500/30 group-hover:border-rose-500/60",
      glow: "group-hover:shadow-[0_0_35px_rgba(244,63,94,0.25)]",
      text: "text-rose-400",
      ring: "focus-visible:ring-rose-500/50",
    },
    icon: IconAdjustmentsCog,
    colSpan: "md:col-span-2",
  },
];

function RoutePreviewFrame({ route }: { route: EnvironmentRoute }) {
  const [imageFailed, setImageFailed] = useState(false);
  const Icon = route.icon;

  return (
    <Link
      href={route.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/preview relative block w-full aspect-video bg-neutral-900/90 rounded-xl overflow-hidden border border-neutral-800 transition-all duration-300 group-hover:border-neutral-700 shadow-inner outline-none ${route.accentColor.ring}`}
    >
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-linear-to-b from-neutral-950/50 to-neutral-950">
        {!imageFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={route.previewImage}
            alt={`${route.title} Preview`}
            ref={(el) => {
              if (el && el.complete && el.naturalWidth === 0) {
                setImageFailed(true);
              }
            }}
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/preview:scale-105"
          />
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative z-10 flex flex-col items-center gap-2.5 transition-all duration-300 group-hover/preview:opacity-0 group-hover/preview:scale-95">
              <div
                className={`p-3 rounded-2xl ${route.accentColor.bg} border ${route.accentColor.border} shadow-lg backdrop-blur-md`}
              >
                <Icon size={30} className={route.accentColor.text} />
              </div>
              <p className="text-xs font-semibold text-neutral-300 tracking-wide">
                {route.title}
              </p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 z-20 bg-neutral-950/50 opacity-0 group-hover/preview:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center pointer-events-none">
          <div className="px-4 py-2 rounded-xl bg-white text-neutral-950 font-semibold text-xs shadow-2xl flex items-center gap-1.5 transform translate-y-2 group-hover/preview:translate-y-0 transition-transform duration-300">
            <span>Launch</span>
            <IconArrowRight
              size={14}
              className="transition-transform duration-300 group-hover/preview:translate-x-0.5"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const [timeInfo, setTimeInfo] = useState<{
    day: string;
    date: string;
    time: string;
  } | null>(null);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const day = now.toLocaleDateString("en-US", { weekday: "long" });
      const d = String(now.getDate()).padStart(2, "0");
      const m = String(now.getMonth() + 1).padStart(2, "0");
      const y = now.getFullYear();
      const date = `${d}/${m}/${y}`;
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const time = `${hours}:${minutes}:${seconds}`;

      setTimeInfo({ day, date, time });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col bg-neutral-950 text-neutral-100 overflow-x-hidden selection:bg-rose-500/30 selection:text-rose-200 font-sans">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-150 h-125 bg-rose-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-[30%] right-[10%] w-137.5 h-112.5 bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-150 h-125 bg-purple-600/10 rounded-full blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6 sm:pb-9 flex-1 flex flex-col justify-between">
        <header className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/80 backdrop-blur-md shadow-sm mb-6 select-none"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span
              suppressHydrationWarning
              className="text-xs font-mono font-medium text-neutral-300 tracking-wide flex items-center gap-2"
            >
              {timeInfo ? (
                <>
                  <span>{timeInfo.day}</span>
                  <span className="text-neutral-600">•</span>
                  <span className="tabular-nums">{timeInfo.date}</span>
                  <span className="text-neutral-600">•</span>
                  <span className="tabular-nums text-emerald-400">
                    {timeInfo.time}
                  </span>
                </>
              ) : (
                <span className="opacity-0">
                  Saturday • 00/00/0000 • 00:00:00
                </span>
              )}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white via-neutral-100 to-neutral-400 leading-tight"
          >
            PwnSim
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-1.5 text-base sm:text-lg text-neutral-400 max-w-2xl font-normal leading-normal"
          >
            Interactive Web-Based Pwn Simulator
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {ROUTES.map((route, index) => {
            const Icon = route.icon;
            return (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
                className={`group relative flex flex-col bg-neutral-950/75 backdrop-blur-xl border ${route.accentColor.border} rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-xl ${route.accentColor.glow} ${route.colSpan ?? ""}`}
              >
                {route.previewImage && (
                  <div className="mb-4 sm:mb-5">
                    <RoutePreviewFrame route={route} />
                  </div>
                )}

                <div className="flex items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <Icon
                      size={24}
                      className={`w-6 h-6 sm:w-7 sm:h-7 shrink-0 ${route.accentColor.text}`}
                    />
                    <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight leading-snug">
                      {route.title}
                    </h2>
                  </div>

                  <Link
                    href={route.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl bg-white text-neutral-950 font-semibold text-xs hover:bg-neutral-200 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 shrink-0"
                  >
                    <span>Launch</span>
                    <IconArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <footer className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <div>
            <span>Developed by </span>
            <Link
              href="https://zerodayalliance.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 font-medium underline underline-offset-4 decoration-neutral-700 hover:text-white hover:decoration-neutral-300 transition-colors"
            >
              ZeroDay Alliance
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/zerodayalliance/pwnsim"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-300 font-medium underline underline-offset-4 decoration-neutral-700 hover:text-white hover:decoration-neutral-300 transition-colors"
            >
              <IconBrandGithub size={14} />
              <span>zerodayalliance/pwnsim</span>
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
