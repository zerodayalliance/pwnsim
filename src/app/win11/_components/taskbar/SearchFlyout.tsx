"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useWindows } from "../context/WindowsContext";
import { IconSearch, IconFlame, AppIconRenderer } from "../icons/Win11Icons";
import { AppId } from "../types";

export function SearchFlyout() {
  const { searchOpen, setSearchOpen, openApp, themeMode, taskbarAlignment } =
    useWindows();

  const [query, setQuery] = useState("");
  const flyoutRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      const timer = setTimeout(() => {
        setQuery("");
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        flyoutRef.current &&
        !flyoutRef.current.contains(target) &&
        !target?.closest('[data-flyout-trigger="search"]')
      ) {
        setSearchOpen(false);
      }
    };
    if (searchOpen) {
      window.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [searchOpen, setSearchOpen]);

  const topApps: { id: AppId; name: string }[] = [
    { id: "browser", name: "Microsoft Edge" },
    { id: "notepad", name: "Notepad" },
    { id: "settings", name: "Settings" },
    { id: "terminal", name: "Terminal" },
    { id: "calculator", name: "Calculator" },
  ];

  const filtered = query
    ? topApps.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()))
    : topApps;

  const handleLaunch = (id: AppId) => {
    openApp(id);
    setSearchOpen(false);
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          key="search-flyout"
          ref={flyoutRef}
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.96 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed bottom-14 ${
            taskbarAlignment === "left" ? "left-3" : "left-1/2 -translate-x-1/2"
          } w-150 max-w-[94vw] h-120 max-h-[80vh] flex flex-col rounded-2xl shadow-2xl border backdrop-blur-3xl z-50 overflow-hidden select-none ${
            themeMode === "dark"
              ? "bg-[#1f2228]/90 border-white/15 text-white shadow-black/70"
              : "bg-[#f3f4f6]/95 border-black/10 text-neutral-900 shadow-black/20"
          }`}
          style={{
            transformOrigin:
              taskbarAlignment === "left" ? "bottom left" : "bottom center",
          }}
        >
          {/* Search Input */}
          <div
            className={`p-4 pb-2 border-b ${
              themeMode === "dark" ? "border-white/10" : "border-black/10"
            }`}
          >
            <div
              className={`flex items-center gap-3 px-3 py-2 rounded-xl border transition-all ${
                themeMode === "dark"
                  ? "bg-white/10 border-white/15 focus-within:border-blue-500"
                  : "bg-white/80 border-black/10 focus-within:border-blue-500"
              }`}
            >
              <IconSearch className="w-4 h-4 text-blue-500" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search apps, settings, and web..."
                className={`w-full bg-transparent text-sm outline-none ${
                  themeMode === "dark"
                    ? "text-white placeholder:text-neutral-400"
                    : "text-neutral-900 placeholder:text-neutral-500"
                }`}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-5 overflow-y-auto space-y-5 custom-scrollbar">
            <div>
              <h4
                className={`text-xs font-semibold uppercase tracking-wider mb-2.5 ${
                  themeMode === "dark" ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                Top apps
              </h4>
              <div className="grid grid-cols-5 gap-2">
                {filtered.map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => handleLaunch(app.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all text-center group ${
                      themeMode === "dark"
                        ? "hover:bg-white/10 active:bg-white/15 text-neutral-200"
                        : "hover:bg-black/5 active:bg-black/10 text-neutral-800"
                    }`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <AppIconRenderer appId={app.id} className="w-8 h-8" />
                    </div>
                    <span className="mt-2 text-xs font-medium line-clamp-1">
                      {app.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div
                className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-2 ${
                  themeMode === "dark" ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                <IconFlame className="w-4 h-4 text-amber-500" />
                <span>Trending in Edge</span>
              </div>
              <div className="space-y-1.5">
                {[
                  "Next.js 16 App Router architectural features",
                  "Windows 11 Mica material & design guidelines",
                  "ZeroDay Alliance security vulnerabilities research",
                  "Framer Motion modern animation patterns",
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      openApp("browser", "Microsoft Edge - Search", {
                        url: `https://www.bing.com/search?q=${encodeURIComponent(item)}`,
                      });
                      setSearchOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-colors text-left text-xs ${
                      themeMode === "dark"
                        ? "hover:bg-white/10 text-neutral-300"
                        : "hover:bg-black/5 text-neutral-700"
                    }`}
                  >
                    <IconSearch
                      className={`w-3.5 h-3.5 ${
                        themeMode === "dark"
                          ? "text-neutral-400"
                          : "text-neutral-500"
                      }`}
                    />
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
