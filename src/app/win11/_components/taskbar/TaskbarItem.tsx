"use client";

import React, { useState } from "react";
import { AppId } from "../types";
import { AppIconRenderer } from "../icons/Win11Icons";
import { useWindows } from "../context/WindowsContext";

interface TaskbarItemProps {
  appId: AppId;
  title: string;
}

export function TaskbarItem({ appId, title }: TaskbarItemProps) {
  const {
    windows,
    activeWindowId,
    openApp,
    focusWindow,
    minimizeWindow,
    themeMode,
  } = useWindows();

  const [isHovered, setIsHovered] = useState(false);

  const appWindow = windows.find((w) => w.appId === appId);
  const isOpen = Boolean(appWindow);
  const isActive =
    isOpen && appWindow?.id === activeWindowId && !appWindow.isMinimized;
  const isMinimized = Boolean(appWindow?.isMinimized);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOpen) {
      openApp(appId);
    } else if (appWindow) {
      if (isActive) {
        minimizeWindow(appWindow.id);
      } else {
        focusWindow(appWindow.id);
      }
    }
  };

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={handleClick}
        aria-label={title}
        className={`group relative flex items-center justify-center w-10 h-10 rounded-md transition-all duration-150 outline-none ${
          isActive
            ? themeMode === "dark"
              ? "bg-white/15 shadow-sm"
              : "bg-white/80 shadow-xs border border-white/80"
            : isOpen
              ? themeMode === "dark"
                ? "bg-white/5 hover:bg-white/10"
                : "bg-white/35 hover:bg-white/60 border border-transparent hover:border-white/40"
              : themeMode === "dark"
                ? "hover:bg-white/10 active:bg-white/15"
                : "hover:bg-white/50 active:bg-white/70 border border-transparent hover:border-white/40"
        }`}
      >
        <div className="w-7 h-7 flex items-center justify-center transition-transform duration-150 group-hover:scale-105 group-active:scale-95">
          <AppIconRenderer appId={appId} className="w-7 h-7" />
        </div>

        {isOpen && (
          <span
            className={`absolute bottom-0.5 rounded-full transition-all duration-200 ${
              isActive
                ? "w-4 h-0.75 bg-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.5)]"
                : isMinimized
                  ? themeMode === "dark"
                    ? "w-1.5 h-0.75 bg-white/40"
                    : "w-1.5 h-0.75 bg-neutral-400"
                  : themeMode === "dark"
                    ? "w-2 h-0.75 bg-white/70"
                    : "w-2 h-0.75 bg-neutral-600"
            }`}
          />
        )}
      </button>

      {isHovered && (
        <div className="pointer-events-none absolute -top-11 flex flex-col items-center z-50 animate-in fade-in zoom-in-95 duration-100">
          <div
            className={`flex items-center px-2.5 py-1 text-[11px] font-medium rounded-md shadow-xl backdrop-blur-xl whitespace-nowrap ${
              themeMode === "dark"
                ? "bg-[#1e1e1e]/95 text-white border border-white/15"
                : "bg-white/95 text-neutral-800 border border-white/70 shadow-black/10"
            }`}
          >
            <span>{appWindow?.title || title}</span>
          </div>
        </div>
      )}
    </div>
  );
}
