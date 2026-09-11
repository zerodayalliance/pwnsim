"use client";

import React, { useRef } from "react";
import { AppId } from "../types";
import { AppIconRenderer } from "../icons/Win11Icons";

interface DesktopIconProps {
  appId: AppId;
  title: string;
  isSelected: boolean;
  onSelect: (e: React.MouseEvent) => void;
  onOpen: () => void;
}

export function DesktopIcon({
  appId,
  title,
  isSelected,
  onSelect,
  onOpen,
}: DesktopIconProps) {
  const lastClickRef = useRef<number>(0);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = Date.now();
    // Support double click or quick tap
    if (now - lastClickRef.current < 350) {
      onOpen();
      lastClickRef.current = 0;
    } else {
      lastClickRef.current = now;
      onSelect(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onOpen();
    }
  };

  const displayTitle =
    title === "Visual Studio Code" || title === "Visual Studio\nCode"
      ? "Visual Studio\nCode"
      : title === "Google Chrome" || title === "Google\nChrome"
        ? "Google\nChrome"
        : title === "Microsoft Edge" || title === "Microsoft\nEdge"
          ? "Microsoft\nEdge"
          : title;

  return (
    <button
      type="button"
      tabIndex={0}
      data-desktop-icon={appId}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onContextMenu={(e) => {
        e.stopPropagation();
        onSelect(e);
      }}
      title={title.replace("\n", " ")}
      className={`group relative flex flex-col items-center justify-start w-20.5 min-h-23.5 p-1 rounded-lg transition-all duration-150 outline-none select-none text-center cursor-default ${
        isSelected
          ? "bg-blue-500/25 border border-blue-400/50 shadow-sm backdrop-blur-[2px]"
          : "hover:bg-white/10 border border-transparent active:bg-white/15"
      }`}
    >
      <div className="relative w-13 h-13 flex items-center justify-center transition-transform duration-150 group-hover:scale-105 filter drop-shadow-md">
        <AppIconRenderer appId={appId} className="w-12 h-12" />
      </div>
      <div
        className="mt-1 flex flex-col items-center justify-center text-center select-none max-w-full"
        style={{
          fontFamily:
            "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
        }}
      >
        {displayTitle.split("\n").map((line, idx) => (
          <span
            key={idx}
            className={`text-[11.5px] font-normal leading-tight px-0.5 rounded transition-colors whitespace-nowrap truncate max-w-19.5 ${
              isSelected ? "text-white" : "text-white/95 group-hover:text-white"
            }`}
            style={{
              textShadow:
                "0 1px 2px rgba(0,0,0,0.9), 0 2px 5px rgba(0,0,0,0.7)",
            }}
          >
            {line}
          </span>
        ))}
      </div>
    </button>
  );
}
