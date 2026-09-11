"use client";

import React from "react";
import { WindowsProvider } from "./_components/context/WindowsContext";
import { Desktop } from "./_components/desktop/Desktop";
import { WindowManager } from "./_components/windows/WindowManager";
import { Taskbar } from "./_components/taskbar/Taskbar";

export default function Windows11DesktopPage() {
  return (
    <WindowsProvider>
      <main className="relative w-screen h-screen overflow-hidden select-none bg-neutral-950 font-sans">
        {/* Desktop Surface & Wallpapers */}
        <Desktop>
          {/* Draggable, floating windows */}
          <WindowManager />
        </Desktop>

        {/* Bottom Windows 11 Taskbar & System Tray */}
        <Taskbar />
      </main>
    </WindowsProvider>
  );
}
