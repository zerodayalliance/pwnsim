"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useWindows } from "../context/WindowsContext";
import {
  IconSearch,
  IconPower,
  IconFileText,
  IconMoon,
  IconReload,
  IconChevronRight,
  AppIconRenderer,
} from "../icons/Win11Icons";
import { AppId } from "../types";

export function StartMenu() {
  const {
    startMenuOpen,
    setStartMenuOpen,
    openApp,
    themeMode,
    taskbarAlignment,
  } = useWindows();

  const [searchQuery, setSearchQuery] = useState("");
  const [powerMenuOpen, setPowerMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (startMenuOpen) {
      const timer = setTimeout(() => {
        setSearchQuery("");
        setPowerMenuOpen(false);
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [startMenuOpen]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !target?.closest('[data-flyout-trigger="start"]')
      ) {
        setStartMenuOpen(false);
      }
    };
    if (startMenuOpen) {
      window.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [startMenuOpen, setStartMenuOpen]);

  // Pinned apps
  const pinnedApps: { id: AppId; name: string }[] = [
    { id: "browser", name: "Edge" },
    { id: "notepad", name: "Notepad" },
    { id: "settings", name: "Settings" },
    { id: "this-pc", name: "File Explorer" },
    { id: "terminal", name: "Terminal" },
    { id: "calculator", name: "Calculator" },
  ];

  // Recommended files
  const recommendedFiles = [
    {
      title: "welcome_notes.txt",
      time: "Just now",
      content: "Windows 11 interactive clone is active.",
    },
    {
      title: "system_architecture.md",
      time: "1 hour ago",
      content: "Next.js App Router with Framer Motion and Tailwind CSS.",
    },
    {
      title: "performance_benchmarks.log",
      time: "Yesterday at 4:20 PM",
      content: "Render speed 60fps mica blur effects.",
    },
    {
      title: "zeroday_security_scan.txt",
      time: "2 days ago",
      content: "All sandbox boundaries secure.",
    },
  ];

  const filteredApps = searchQuery
    ? pinnedApps.filter((app) =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pinnedApps;

  return (
    <AnimatePresence>
      {startMenuOpen && (
        <motion.div
          key="start-menu"
          ref={menuRef}
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.96 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed bottom-14 ${
            taskbarAlignment === "left" ? "left-3" : "left-1/2 -translate-x-1/2"
          } w-145 max-w-[94vw] h-160 max-h-[85vh] flex flex-col rounded-2xl shadow-2xl border backdrop-blur-3xl z-50 overflow-hidden select-none ${
            themeMode === "dark"
              ? "bg-[#1f2228]/85 border-white/15 text-white shadow-black/70"
              : "bg-[#f3f4f6]/90 border-black/10 text-neutral-900 shadow-black/20"
          }`}
          style={{
            transformOrigin:
              taskbarAlignment === "left" ? "bottom left" : "bottom center",
          }}
        >
          {/* Search Input Bar */}
          <div className="p-6 pb-4">
            <div
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-full border transition-all ${
                themeMode === "dark"
                  ? "bg-white/5 border-white/10 focus-within:border-blue-500 focus-within:bg-black/30"
                  : "bg-white/70 border-black/10 focus-within:border-blue-500 focus-within:bg-white"
              }`}
            >
              <IconSearch className="w-4 h-4 text-blue-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type here to search apps, settings, and documents"
                className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400 placeholder:text-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-neutral-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto px-6 space-y-6 custom-scrollbar">
            {/* Pinned Header */}
            <div>
              <div className="flex items-center justify-between mb-3 px-2">
                <span className="text-xs font-semibold tracking-wide text-neutral-400">
                  Pinned
                </span>
                <button
                  type="button"
                  onClick={() => {}}
                  className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-blue-400 px-2 py-0.5 rounded transition-colors"
                >
                  <span>All apps</span>
                  <IconChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Pinned Apps Grid */}
              <div className="grid grid-cols-6 gap-y-3 gap-x-2">
                {filteredApps.map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => {
                      openApp(app.id);
                      setStartMenuOpen(false);
                    }}
                    className={`group flex flex-col items-center justify-center p-2.5 rounded-lg transition-all outline-none ${
                      themeMode === "dark"
                        ? "hover:bg-white/10 active:bg-white/15"
                        : "hover:bg-black/5 active:bg-black/10"
                    }`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center transition-transform duration-150 group-hover:scale-110">
                      <AppIconRenderer appId={app.id} className="w-8 h-8" />
                    </div>
                    <span className="mt-1.5 text-[11px] font-medium text-center line-clamp-1 opacity-90 group-hover:opacity-100">
                      {app.name}
                    </span>
                  </button>
                ))}
              </div>

              {filteredApps.length === 0 && (
                <div className="py-6 text-center text-xs text-neutral-400">
                  No apps found matching &ldquo;{searchQuery}&rdquo;
                </div>
              )}
            </div>

            {/* Recommended Section */}
            <div>
              <div className="flex items-center justify-between mb-3 px-2">
                <span
                  className={`text-xs font-semibold tracking-wide ${
                    themeMode === "dark"
                      ? "text-neutral-400"
                      : "text-neutral-500"
                  }`}
                >
                  Recommended
                </span>
                <button
                  type="button"
                  className="text-[11px] text-neutral-400 hover:text-blue-500 px-2 py-0.5 rounded transition-colors"
                >
                  More &gt;
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {recommendedFiles.map((file, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      openApp("notepad", file.title, {
                        initialText: file.content,
                      });
                      setStartMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 p-2 rounded-lg transition-colors text-left outline-none group ${
                      themeMode === "dark"
                        ? "hover:bg-white/10"
                        : "hover:bg-black/5"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-md bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
                      <IconFileText className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-xs font-medium truncate transition-colors ${
                          themeMode === "dark"
                            ? "group-hover:text-blue-400 text-neutral-200"
                            : "group-hover:text-blue-600 text-neutral-800"
                        }`}
                      >
                        {file.title}
                      </p>
                      <p className="text-[10px] text-neutral-400 truncate">
                        {file.time}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom User Bar & Power */}
          <div
            className={`relative flex items-center justify-between px-8 py-3.5 border-t ${
              themeMode === "dark"
                ? "bg-black/30 border-white/10"
                : "bg-black/5 border-black/10"
            }`}
          >
            {/* User Profile */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-xs text-white shadow-md">
                A
              </div>
              <div>
                <p
                  className={`text-xs font-medium leading-none ${
                    themeMode === "dark" ? "text-white" : "text-neutral-900"
                  }`}
                >
                  Administrator
                </p>
                <p className="text-[10px] text-neutral-400 mt-0.5">
                  ZeroDay Alliance
                </p>
              </div>
            </div>

            {/* Power Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setPowerMenuOpen(!powerMenuOpen)}
                className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                  themeMode === "dark"
                    ? "hover:bg-white/10 active:bg-white/15 text-neutral-300 hover:text-white"
                    : "hover:bg-black/5 active:bg-black/10 text-neutral-600 hover:text-neutral-900"
                }`}
                title="Power"
              >
                <IconPower className="w-4 h-4" />
              </button>

              {/* Power Menu Popover */}
              {powerMenuOpen && (
                <div
                  className={`absolute right-0 bottom-10 w-36 py-1.5 rounded-xl shadow-2xl border backdrop-blur-2xl text-xs z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    themeMode === "dark"
                      ? "bg-[#252830]/95 border-white/15 text-neutral-200"
                      : "bg-white/95 border-black/15 text-neutral-800"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setPowerMenuOpen(false);
                      setStartMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-1.5 transition-colors text-left ${
                      themeMode === "dark"
                        ? "hover:bg-white/10"
                        : "hover:bg-black/5"
                    }`}
                  >
                    <IconMoon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Sleep</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      window.location.reload();
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-1.5 transition-colors text-left ${
                      themeMode === "dark"
                        ? "hover:bg-white/10"
                        : "hover:bg-black/5"
                    }`}
                  >
                    <IconReload className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Restart</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPowerMenuOpen(false);
                      setStartMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-1.5 transition-colors text-left ${
                      themeMode === "dark"
                        ? "hover:bg-white/10"
                        : "hover:bg-black/5"
                    }`}
                  >
                    <IconPower className="w-3.5 h-3.5 text-rose-400" />
                    <span>Shut down</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
