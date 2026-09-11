"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { WindowInstance } from "../types";
import { useWindows } from "../context/WindowsContext";
import {
  IconMinus,
  IconSquare,
  IconCopy,
  IconX,
  AppIconRenderer,
} from "../icons/Win11Icons";

interface WindowFrameProps {
  window: WindowInstance;
  children: React.ReactNode;
}

export function WindowFrame({ window: win, children }: WindowFrameProps) {
  const {
    activeWindowId,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    closeWindow,
    updatePosition,
    updateSize,
    themeMode,
  } = useWindows();

  const isActive = activeWindowId === win.id;
  const isMaximized = win.isMaximized;

  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{
    mouseX: number;
    mouseY: number;
    startX: number;
    startY: number;
  }>({
    mouseX: 0,
    mouseY: 0,
    startX: 0,
    startY: 0,
  });

  // Resizing state
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartRef = useRef<{
    mouseX: number;
    mouseY: number;
    startW: number;
    startH: number;
  }>({
    mouseX: 0,
    mouseY: 0,
    startW: 0,
    startH: 0,
  });

  // Handle Dragging
  const handleTitleMouseDown = (e: React.MouseEvent) => {
    // Only drag with left click and when not clicking window control buttons
    if (
      e.button !== 0 ||
      (e.target as HTMLElement).closest(".window-control-btn")
    ) {
      return;
    }
    focusWindow(win.id);
    if (isMaximized) return; // don't drag if maximized

    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: win.position.x,
      startY: win.position.y,
    };
  };

  // Handle Title Double-Click (Maximize / Restore)
  const handleTitleDoubleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".window-control-btn")) return;
    maximizeWindow(win.id);
  };

  // Handle Resizing
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (win.isMaximized) return;
    focusWindow(win.id);
    setIsResizing(true);
    resizeStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startW: win.size.width,
      startH: win.size.height,
    };
  };

  // Global Mouse Move and Mouse Up
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !win.isMaximized) {
        const dx = e.clientX - dragStartRef.current.mouseX;
        const dy = e.clientY - dragStartRef.current.mouseY;
        const newX = Math.max(
          -win.size.width + 100,
          Math.min(window.innerWidth - 100, dragStartRef.current.startX + dx)
        );
        const newY = Math.max(
          0,
          Math.min(window.innerHeight - 80, dragStartRef.current.startY + dy)
        );
        updatePosition(win.id, { x: newX, y: newY });
      } else if (isResizing && !win.isMaximized) {
        const dx = e.clientX - resizeStartRef.current.mouseX;
        const dy = e.clientY - resizeStartRef.current.mouseY;
        const newW = Math.max(340, resizeStartRef.current.startW + dx);
        const newH = Math.max(260, resizeStartRef.current.startH + dy);
        updateSize(win.id, { width: newW, height: newH });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false);
      if (isResizing) setIsResizing(false);
    };

    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    isResizing,
    win.id,
    win.isMaximized,
    win.size.width,
    updatePosition,
    updateSize,
  ]);

  if (win.isMinimized) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 20 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      onMouseDown={() => focusWindow(win.id)}
      style={{
        zIndex: win.zIndex,
        left: isMaximized ? 0 : `${win.position.x}px`,
        top: isMaximized ? 0 : `${win.position.y}px`,
        width: isMaximized ? "100vw" : `${win.size.width}px`,
        height: isMaximized ? "calc(100vh - 48px)" : `${win.size.height}px`,
      }}
      className={`fixed flex flex-col pointer-events-auto transition-shadow select-none overflow-hidden ${
        isMaximized
          ? "rounded-none border-none"
          : "rounded-xl border shadow-2xl"
      } ${
        isActive
          ? themeMode === "dark"
            ? "shadow-black/60 border-white/20 ring-1 ring-white/10"
            : "shadow-black/20 border-black/15 ring-1 ring-black/5"
          : themeMode === "dark"
            ? "shadow-black/30 border-white/10 opacity-95"
            : "shadow-black/10 border-black/10 opacity-95"
      } ${
        themeMode === "dark"
          ? "bg-[#181a20]/95 text-neutral-100 backdrop-blur-2xl"
          : "bg-[#f9fafb]/95 text-neutral-900 backdrop-blur-2xl"
      }`}
    >
      {/* Title Bar Header */}
      <div
        onMouseDown={handleTitleMouseDown}
        onDoubleClick={handleTitleDoubleClick}
        className={`h-9 flex items-center justify-between pl-3 pr-0 cursor-default select-none border-b transition-colors ${
          isActive
            ? themeMode === "dark"
              ? "bg-white/5 border-white/10"
              : "bg-black/5 border-black/10"
            : themeMode === "dark"
              ? "bg-transparent border-white/5 opacity-80"
              : "bg-transparent border-black/5 opacity-80"
        }`}
      >
        {/* Window Title & Icon */}
        <div className="flex items-center gap-2.5 min-w-0 pr-4">
          <AppIconRenderer appId={win.appId} className="w-4 h-4 shrink-0" />
          <span className="text-xs font-medium truncate tracking-wide">
            {win.title}
          </span>
        </div>

        {/* Windows 11 Title Bar Controls (Min, Max/Restore, Close) */}
        <div className="flex items-center h-full">
          {/* Minimize Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(win.id);
            }}
            aria-label="Minimize"
            className={`window-control-btn w-11 h-full flex items-center justify-center transition-colors ${
              themeMode === "dark"
                ? "hover:bg-white/10 active:bg-white/15 text-neutral-400 hover:text-white"
                : "hover:bg-black/5 active:bg-black/10 text-neutral-600 hover:text-neutral-900"
            }`}
          >
            <IconMinus className="w-3.5 h-3.5" />
          </button>

          {/* Maximize / Restore Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              maximizeWindow(win.id);
            }}
            aria-label={isMaximized ? "Restore" : "Maximize"}
            className={`window-control-btn w-11 h-full flex items-center justify-center transition-colors ${
              themeMode === "dark"
                ? "hover:bg-white/10 active:bg-white/15 text-neutral-400 hover:text-white"
                : "hover:bg-black/5 active:bg-black/10 text-neutral-600 hover:text-neutral-900"
            }`}
          >
            {isMaximized ? (
              <IconCopy className="w-3.5 h-3.5 rotate-180" />
            ) : (
              <IconSquare className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(win.id);
            }}
            aria-label="Close"
            className={`window-control-btn w-11 h-full flex items-center justify-center hover:bg-red-600 hover:text-white active:bg-red-700 transition-colors ${
              themeMode === "dark" ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            <IconX className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* App Client Area */}
      <div className="flex-1 min-h-0 relative overflow-hidden flex flex-col">
        {children}
      </div>

      {/* Bottom-right Resizing Grip Handle (only visible when not maximized) */}
      {!isMaximized && (
        <div
          onMouseDown={handleResizeMouseDown}
          className="absolute bottom-0 right-0 w-3.5 h-3.5 cursor-nwse-resize z-50 flex items-end justify-end p-0.5 opacity-40 hover:opacity-100 transition-opacity"
        >
          <svg
            viewBox="0 0 6 6"
            className="w-2.5 h-2.5 fill-current text-white/50"
          >
            <circle cx="5" cy="5" r="0.8" />
            <circle cx="5" cy="2" r="0.8" />
            <circle cx="2" cy="5" r="0.8" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}
