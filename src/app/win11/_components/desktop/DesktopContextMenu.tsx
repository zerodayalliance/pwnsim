"use client";

import React, { useEffect, useRef } from "react";
import { useWindows } from "../context/WindowsContext";
import {
  IconEye,
  IconArrowsSort,
  IconReload,
  IconFileText,
  IconPalette,
  IconTerminal2,
  IconSettings,
} from "@tabler/icons-react";

export function DesktopContextMenu() {
  const {
    contextMenu,
    setContextMenu,
    openApp,
    themeMode,
    setSelectedDesktopIcons,
  } = useWindows();

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setContextMenu({ ...contextMenu, isOpen: false });
      }
    };

    if (contextMenu.isOpen) {
      window.addEventListener("mousedown", handleDocumentClick);
    }
    return () => {
      window.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [contextMenu, setContextMenu]);

  if (!contextMenu.isOpen) return null;

  // Keep menu within viewport bounds
  const adjustedX = Math.min(
    contextMenu.x,
    (typeof window !== "undefined" ? window.innerWidth : 1200) - 240
  );
  const adjustedY = Math.min(
    contextMenu.y,
    (typeof window !== "undefined" ? window.innerHeight : 800) - 300
  );

  const handleAction = (action: () => void) => {
    action();
    setContextMenu({ ...contextMenu, isOpen: false });
  };

  return (
    <div
      ref={menuRef}
      style={{ left: adjustedX, top: adjustedY }}
      className={`fixed z-9999 w-60 py-1.5 px-1 rounded-xl shadow-2xl backdrop-blur-2xl border text-xs select-none animate-in fade-in zoom-in-95 duration-100 ${
        themeMode === "dark"
          ? "bg-[#1e1e1e]/90 border-white/15 text-neutral-200 shadow-black/60"
          : "bg-white/85 border-black/10 text-neutral-800 shadow-neutral-500/20"
      }`}
    >
      <div className="space-y-0.5">
        <button
          type="button"
          onClick={() => handleAction(() => {})}
          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md transition-colors text-left ${
            themeMode === "dark"
              ? "hover:bg-blue-500/20 hover:text-white"
              : "hover:bg-blue-50 hover:text-blue-900"
          }`}
        >
          <span className="flex items-center gap-2.5">
            <IconEye className="w-4 h-4 text-blue-500" />
            <span>View</span>
          </span>
          <span className="text-neutral-400 text-[10px]">Medium</span>
        </button>

        <button
          type="button"
          onClick={() => handleAction(() => {})}
          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md transition-colors text-left ${
            themeMode === "dark"
              ? "hover:bg-blue-500/20 hover:text-white"
              : "hover:bg-blue-50 hover:text-blue-900"
          }`}
        >
          <span className="flex items-center gap-2.5">
            <IconArrowsSort className="w-4 h-4 text-emerald-500" />
            <span>Sort by</span>
          </span>
          <span className="text-neutral-400 text-[10px]">Name</span>
        </button>

        <button
          type="button"
          onClick={() =>
            handleAction(() => {
              setSelectedDesktopIcons([]);
            })
          }
          className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md transition-colors text-left ${
            themeMode === "dark"
              ? "hover:bg-blue-500/20 hover:text-white"
              : "hover:bg-blue-50 hover:text-blue-900"
          }`}
        >
          <IconReload className="w-4 h-4 text-cyan-500" />
          <span>Refresh</span>
        </button>

        <div
          className={`my-1 border-t ${
            themeMode === "dark" ? "border-white/10" : "border-black/10"
          }`}
        />

        <button
          type="button"
          onClick={() =>
            handleAction(() => openApp("notepad", "New Text Document.txt"))
          }
          className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md transition-colors text-left ${
            themeMode === "dark"
              ? "hover:bg-blue-500/20 hover:text-white"
              : "hover:bg-blue-50 hover:text-blue-900"
          }`}
        >
          <IconFileText className="w-4 h-4 text-amber-500" />
          <span>New Text Document</span>
        </button>

        <button
          type="button"
          onClick={() => handleAction(() => openApp("terminal"))}
          className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md transition-colors text-left ${
            themeMode === "dark"
              ? "hover:bg-blue-500/20 hover:text-white"
              : "hover:bg-blue-50 hover:text-blue-900"
          }`}
        >
          <IconTerminal2 className="w-4 h-4 text-purple-500" />
          <span>Open in Terminal</span>
        </button>

        <div
          className={`my-1 border-t ${
            themeMode === "dark" ? "border-white/10" : "border-black/10"
          }`}
        />

        <button
          type="button"
          onClick={() =>
            handleAction(() =>
              openApp("settings", "Settings - Personalization", {
                initialTab: "personalization",
              })
            )
          }
          className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md transition-colors text-left ${
            themeMode === "dark"
              ? "hover:bg-blue-500/20 hover:text-white"
              : "hover:bg-blue-50 hover:text-blue-900"
          }`}
        >
          <IconPalette className="w-4 h-4 text-pink-500" />
          <span>Personalize</span>
        </button>

        <button
          type="button"
          onClick={() => handleAction(() => openApp("settings"))}
          className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md transition-colors text-left ${
            themeMode === "dark"
              ? "hover:bg-blue-500/20 hover:text-white"
              : "hover:bg-blue-50 hover:text-blue-900"
          }`}
        >
          <IconSettings className="w-4 h-4 text-neutral-400" />
          <span>Display Settings</span>
        </button>
      </div>
    </div>
  );
}
