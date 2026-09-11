"use client";

import React from "react";
import { useWindows } from "../context/WindowsContext";
import { Windows11Logo } from "../icons/Win11Icons";

export function StartButton() {
  const { startMenuOpen, setStartMenuOpen, closeAllFlyouts, themeMode } =
    useWindows();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (startMenuOpen) {
      setStartMenuOpen(false);
    } else {
      closeAllFlyouts();
      setStartMenuOpen(true);
    }
  };

  return (
    <button
      type="button"
      data-flyout-trigger="start"
      onClick={handleClick}
      aria-label="Start"
      className={`group relative flex items-center justify-center w-10 h-10 rounded-md transition-all duration-150 outline-none ${
        startMenuOpen
          ? themeMode === "dark"
            ? "bg-white/15 shadow-inner"
            : "bg-white/80 shadow-xs border border-white/80"
          : themeMode === "dark"
            ? "hover:bg-white/10 active:bg-white/15 active:scale-95"
            : "hover:bg-white/50 active:bg-white/70 active:scale-95 border border-transparent hover:border-white/40"
      }`}
    >
      <div className="w-7 h-7 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <Windows11Logo className="w-7 h-7" />
      </div>

      {/* Tooltip */}
      <span
        className={`pointer-events-none absolute -top-9 scale-0 group-hover:scale-100 transition-transform duration-150 origin-bottom px-2 py-1 text-[11px] font-medium rounded-md shadow-lg whitespace-nowrap z-50 ${
          themeMode === "dark"
            ? "bg-[#1e1e1e]/90 text-white border border-white/10"
            : "bg-white/95 text-neutral-800 border border-white/70 shadow-black/10"
        }`}
      >
        Start
      </span>
    </button>
  );
}
