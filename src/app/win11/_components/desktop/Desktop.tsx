"use client";

import React, { useState, useRef, useEffect } from "react";
import { useWindows } from "../context/WindowsContext";
import { AppId } from "../types";
import { DesktopIcon } from "./DesktopIcon";
import { DesktopContextMenu } from "./DesktopContextMenu";

interface MarqueeBox {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

export function Desktop({ children }: { children?: React.ReactNode }) {
  const {
    currentWallpaper,
    themeMode,
    selectedDesktopIcons,
    setSelectedDesktopIcons,
    openApp,
    closeAllFlyouts,
    setContextMenu,
  } = useWindows();

  const [marquee, setMarquee] = useState<MarqueeBox | null>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  // Desktop icons columns layout:
  // First column: this pc, recycle bin, file explorer, notepad, calculator
  const firstColumnApps: { id: AppId; title: string }[] = [
    { id: "this-pc", title: "This PC" },
    { id: "recycle-bin", title: "Recycle Bin" },
    { id: "file-explorer", title: "File Explorer" },
    { id: "notepad", title: "Notepad" },
    { id: "calculator", title: "Calculator" },
  ];

  // Second column: chrome (redirect to /chrome), edge, vs code (goto /vscode), terminal
  const secondColumnApps: { id: AppId; title: string }[] = [
    { id: "chrome", title: "Google\nChrome" },
    { id: "browser", title: "Microsoft\nEdge" },
    { id: "vscode", title: "Visual Studio\nCode" },
    { id: "terminal", title: "Terminal" },
  ];

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only primary left-click starts marquee
    if (e.button !== 0) return;

    const target = e.target as HTMLElement;
    // If clicked on an interactive element (icon button, window, menu), let that element handle it
    if (target.closest("button") || target.closest("[data-window]")) {
      return;
    }

    closeAllFlyouts();
    setSelectedDesktopIcons([]);

    setMarquee({
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
    });
  };

  // Global window listeners while dragging the marquee box
  useEffect(() => {
    if (!marquee) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
      setMarquee((prev) => {
        if (!prev) return null;
        return { ...prev, currentX: e.clientX, currentY: e.clientY };
      });

      const left = Math.min(marquee.startX, e.clientX);
      const top = Math.min(marquee.startY, e.clientY);
      const right = Math.max(marquee.startX, e.clientX);
      const bottom = Math.max(marquee.startY, e.clientY);

      const isDrag =
        Math.abs(e.clientX - marquee.startX) > 4 ||
        Math.abs(e.clientY - marquee.startY) > 4;

      if (isDrag) {
        const iconElements = document.querySelectorAll<HTMLElement>(
          "[data-desktop-icon]"
        );
        const intersectedIds: string[] = [];

        iconElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const intersects = !(
            rect.right < left ||
            rect.left > right ||
            rect.bottom < top ||
            rect.top > bottom
          );
          if (intersects) {
            const id = el.getAttribute("data-desktop-icon");
            if (id) intersectedIds.push(id);
          }
        });

        setSelectedDesktopIcons(intersectedIds);
      }
    };

    const handleWindowMouseUp = () => {
      setMarquee(null);
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mouseup", handleWindowMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [marquee, setSelectedDesktopIcons]);

  const handleContextMenu = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // If right clicked on an icon or window, don't show the desktop context menu
    if (target.closest("button") || target.closest("[data-window]")) {
      return;
    }
    e.preventDefault();
    closeAllFlyouts();
    setSelectedDesktopIcons([]);
    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
      type: "desktop",
    });
  };

  // Marquee rectangle dimensions
  const marqueeRect = marquee
    ? {
        left: Math.min(marquee.startX, marquee.currentX),
        top: Math.min(marquee.startY, marquee.currentY),
        width: Math.abs(marquee.currentX - marquee.startX),
        height: Math.abs(marquee.currentY - marquee.startY),
      }
    : null;

  return (
    <div
      ref={desktopRef}
      onMouseDown={handleMouseDown}
      onContextMenu={handleContextMenu}
      className="relative w-full h-screen overflow-hidden select-none bg-neutral-900 desktop-backdrop pb-12"
      style={{
        backgroundImage: `url(${currentWallpaper.path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Subtle mica / vignette glow */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          themeMode === "dark" ? "bg-black/25" : "bg-white/10"
        }`}
      />

      {/* Desktop Icons Grid: Two Distinct Columns */}
      <div className="relative z-10 p-3 pt-4 flex flex-row gap-x-1 items-start pointer-events-auto">
        {/* First Column: This PC, Recycle Bin, File Explorer, Notepad, Calculator */}
        <div className="flex flex-col gap-y-1.5">
          {firstColumnApps.map((app) => (
            <DesktopIcon
              key={app.id}
              appId={app.id}
              title={app.title}
              isSelected={selectedDesktopIcons.includes(app.id)}
              onSelect={() => setSelectedDesktopIcons([app.id])}
              onOpen={() => openApp(app.id)}
            />
          ))}
        </div>

        {/* Second Column: Chrome, Edge, VS Code, Terminal */}
        <div className="flex flex-col gap-y-1.5">
          {secondColumnApps.map((app) => (
            <DesktopIcon
              key={app.id}
              appId={app.id}
              title={app.title}
              isSelected={selectedDesktopIcons.includes(app.id)}
              onSelect={() => setSelectedDesktopIcons([app.id])}
              onOpen={() => openApp(app.id)}
            />
          ))}
        </div>
      </div>

      {/* Marquee Selection Box */}
      {marqueeRect && marqueeRect.width > 3 && marqueeRect.height > 3 && (
        <div
          className="fixed pointer-events-none border border-[#0078d4]/90 bg-[#0078d4]/25 z-50 rounded-xs"
          style={{
            left: `${marqueeRect.left}px`,
            top: `${marqueeRect.top}px`,
            width: `${marqueeRect.width}px`,
            height: `${marqueeRect.height}px`,
          }}
        />
      )}

      {/* Floating Windows Area */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {children}
      </div>

      {/* Context Menu */}
      <DesktopContextMenu />
    </div>
  );
}
