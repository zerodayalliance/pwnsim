"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useWindows, APP_REGISTRY } from "../context/WindowsContext";
import { AppIconRenderer, IconX, IconPlus } from "../icons/Win11Icons";

export function TaskViewFlyout() {
  const {
    taskViewOpen,
    setTaskViewOpen,
    windows,
    focusWindow,
    closeWindow,
    currentWallpaper,
    themeMode,
  } = useWindows();

  const [desktops, setDesktops] = useState<string[]>(["Desktop 1"]);
  const [activeDesktopIndex, setActiveDesktopIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && taskViewOpen) {
        setTaskViewOpen(false);
      }
    };
    if (taskViewOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [taskViewOpen, setTaskViewOpen]);

  // Close on click outside flyout components
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setTaskViewOpen(false);
    }
  };

  const handleAddNewDesktop = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDesktops((prev) => [...prev, `Desktop ${prev.length + 1}`]);
  };

  return (
    <AnimatePresence>
      {taskViewOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          onClick={handleBackdropClick}
          className={`fixed inset-0 bottom-12 z-40 flex flex-col justify-between p-8 pb-4 select-none backdrop-blur-xl transition-colors ${
            themeMode === "dark"
              ? "bg-black/45 text-white"
              : "bg-white/40 text-neutral-900"
          }`}
        >
          {/* Top/Center: Window Overview Grid */}
          <div
            onClick={handleBackdropClick}
            className="flex-1 flex flex-col items-center justify-center overflow-y-auto px-4 py-6"
          >
            {windows.length > 0 ? (
              <div className="flex flex-wrap items-center justify-center gap-6 max-w-5xl w-full">
                {windows.map((w) => {
                  const meta = APP_REGISTRY[w.appId];
                  return (
                    <motion.div
                      key={w.id}
                      initial={{ scale: 0.92, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.92, opacity: 0 }}
                      whileHover={{ scale: 1.03, y: -4 }}
                      transition={{ duration: 0.16 }}
                      onClick={() => {
                        focusWindow(w.id);
                        setTaskViewOpen(false);
                      }}
                      className={`group relative flex flex-col w-72 h-44 rounded-xl border shadow-xl cursor-pointer overflow-hidden backdrop-blur-2xl transition-all ${
                        themeMode === "dark"
                          ? "bg-[#202024]/85 border-white/15 hover:border-blue-400/60 hover:shadow-blue-500/15"
                          : "bg-white/80 border-black/10 hover:border-blue-500/60 hover:shadow-blue-500/20"
                      }`}
                    >
                      {/* Window Header */}
                      <div
                        className={`flex items-center justify-between px-3 py-2 border-b text-xs font-medium ${
                          themeMode === "dark"
                            ? "bg-black/20 border-white/10"
                            : "bg-black/5 border-black/5"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <AppIconRenderer
                            appId={w.appId}
                            className="w-4 h-4 shrink-0"
                          />
                          <span className="truncate">
                            {w.title || meta?.title}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            closeWindow(w.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500 hover:text-white transition-all"
                          title="Close window"
                        >
                          <IconX className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Window Preview Body */}
                      <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                        <div className="opacity-20 group-hover:opacity-30 transition-opacity">
                          <AppIconRenderer
                            appId={w.appId}
                            className="w-16 h-16"
                          />
                        </div>
                        <span className="mt-2 text-xs opacity-60 font-medium">
                          Click to switch
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <p className="text-xl font-semibold opacity-85 tracking-tight">
                  No open windows
                </p>
                <p className="text-xs opacity-50 mt-1.5">
                  Open applications will appear here in Task View
                </p>
              </div>
            )}
          </div>

          {/* Bottom: Windows 11 Virtual Desktops Bar */}
          <div className="flex flex-col items-center justify-center pb-2">
            <div
              className={`flex items-center gap-4 px-5 py-3 rounded-2xl border backdrop-blur-2xl shadow-2xl transition-all ${
                themeMode === "dark"
                  ? "bg-[#1c1c20]/90 border-white/10 shadow-black/60"
                  : "bg-white/85 border-white/80 shadow-black/10"
              }`}
            >
              {/* Virtual Desktop Previews */}
              {desktops.map((name, index) => {
                const isActive = activeDesktopIndex === index;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setActiveDesktopIndex(index)}
                    className="flex flex-col items-center gap-1.5 group outline-none cursor-pointer"
                  >
                    <div
                      className={`relative w-28 h-18 rounded-lg overflow-hidden border-2 transition-all duration-150 ${
                        isActive
                          ? "border-blue-500 shadow-md shadow-blue-500/30 scale-102"
                          : themeMode === "dark"
                            ? "border-white/15 group-hover:border-white/40"
                            : "border-black/10 group-hover:border-black/30"
                      }`}
                      style={{
                        backgroundImage: `url(${currentWallpaper.path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <div className="absolute bottom-0 inset-x-0 h-1 bg-blue-500" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium tracking-tight ${
                        isActive
                          ? "text-blue-500 font-semibold"
                          : "opacity-80 group-hover:opacity-100"
                      }`}
                    >
                      {name}
                    </span>
                  </button>
                );
              })}

              {/* New Desktop Button */}
              <button
                type="button"
                onClick={handleAddNewDesktop}
                className="flex flex-col items-center gap-1.5 group outline-none cursor-pointer"
                title="Add a new desktop"
              >
                <div
                  className={`flex flex-col items-center justify-center w-28 h-18 rounded-lg border border-dashed transition-all ${
                    themeMode === "dark"
                      ? "border-white/25 bg-white/5 group-hover:bg-white/10 group-hover:border-white/50 text-white"
                      : "border-neutral-400/60 bg-neutral-100/60 group-hover:bg-neutral-200/70 group-hover:border-neutral-500 text-neutral-800"
                  }`}
                >
                  <IconPlus className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-xs font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                  New desktop
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
