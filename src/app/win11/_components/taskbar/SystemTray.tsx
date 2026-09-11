"use client";

import React, { useState, useEffect } from "react";
import { useWindows } from "../context/WindowsContext";
import {
  IconWifi,
  IconEthernet,
  IconVolume,
  IconVolume2,
  IconVolume3,
  IconVolume4,
  IconChevronUp,
  WindowsSecurityIcon,
} from "../icons/Win11Icons";

function formatDDMMYYYY(d: Date): string {
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

function formatTaskbarTime(d: Date): string {
  return d.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function SystemTray() {
  const {
    quickSettingsOpen,
    setQuickSettingsOpen,
    calendarOpen,
    setCalendarOpen,
    closeAllFlyouts,
    quickSettings,
    windows,
    minimizeWindow,
    focusWindow,
    themeMode,
  } = useWindows();

  const [timeStr, setTimeStr] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");
  const [language, setLanguage] = useState<"IN" | "US">("IN");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(formatTaskbarTime(now));
      setDateStr(formatDDMMYYYY(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleQuickSettings = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quickSettingsOpen) {
      setQuickSettingsOpen(false);
    } else {
      closeAllFlyouts();
      setQuickSettingsOpen(true);
    }
  };

  const handleToggleCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (calendarOpen) {
      setCalendarOpen(false);
    } else {
      closeAllFlyouts();
      setCalendarOpen(true);
    }
  };

  const handleShowDesktop = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeAllFlyouts();
    const allMinimized = windows.every((w) => w.isMinimized);
    if (allMinimized) {
      // restore all
      windows.forEach((w) => focusWindow(w.id));
    } else {
      // minimize all
      windows.forEach((w) => minimizeWindow(w.id));
    }
  };

  const renderVolumeIcon = () => {
    const iconColor =
      themeMode === "dark" ? "text-neutral-200" : "text-neutral-800";

    if (quickSettings.volume === 0)
      return <IconVolume3 className={`w-4.75 h-4.75 ${iconColor}`} />;
    if (quickSettings.volume < 33)
      return <IconVolume4 className={`w-4.75 h-4.75 ${iconColor}`} />;
    if (quickSettings.volume < 66)
      return <IconVolume2 className={`w-4.75 h-4.75 ${iconColor}`} />;
    return <IconVolume className={`w-4.75 h-4.75 ${iconColor}`} />;
  };

  return (
    <div
      className={`flex items-center h-full space-x-1 select-none pr-0 transition-colors ${
        themeMode === "dark" ? "text-neutral-200" : "text-neutral-800"
      }`}
    >
      {/* Hidden Icons Chevron */}
      <button
        type="button"
        className={`flex items-center justify-center w-7 h-8 rounded transition-colors ${
          themeMode === "dark"
            ? "hover:bg-white/10 text-neutral-400 hover:text-white"
            : "hover:bg-white/50 text-neutral-700 hover:text-neutral-900"
        }`}
        title="Show hidden icons"
        onClick={(e) => e.stopPropagation()}
      >
        <IconChevronUp className="w-4.25 h-4.25" />
      </button>

      {/* Windows Security Notification Icon */}
      <button
        type="button"
        className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors cursor-pointer ${
          themeMode === "dark"
            ? "hover:bg-white/10 active:bg-white/15"
            : "hover:bg-white/50 active:bg-white/70"
        }`}
        title="Windows Security - Actions recommended: None"
      >
        <WindowsSecurityIcon className="w-4.75 h-4.75" />
      </button>

      {/* Language / Keyboard Layout Switcher */}
      <button
        type="button"
        onClick={() => setLanguage((prev) => (prev === "IN" ? "US" : "IN"))}
        className={`flex flex-col items-center justify-center px-1.5 h-8 rounded-md transition-colors cursor-pointer outline-none select-none ${
          themeMode === "dark"
            ? "hover:bg-white/10 active:bg-white/15 text-white"
            : "hover:bg-white/50 active:bg-white/70 text-neutral-800"
        }`}
        title={`English (${language === "IN" ? "India" : "United States"}) - Keyboard`}
      >
        <span className="text-[11px] leading-none font-medium tracking-tight">
          ENG
        </span>
        <span className="text-[9.5px] leading-none font-medium tracking-normal mt-0.5 opacity-90">
          {language}
        </span>
      </button>

      {/* Network / Volume Unified Pill */}
      <button
        type="button"
        data-flyout-trigger="quick-settings"
        onClick={handleToggleQuickSettings}
        className={`flex items-center gap-2 px-2.5 h-8 rounded-md transition-all duration-150 outline-none ${
          quickSettingsOpen
            ? themeMode === "dark"
              ? "bg-white/15 shadow-sm"
              : "bg-white/80 shadow-xs border border-white/80"
            : themeMode === "dark"
              ? "hover:bg-white/10 active:bg-white/15"
              : "hover:bg-white/50 active:bg-white/70 border border-transparent hover:border-white/40"
        }`}
        title={
          quickSettings.wifi
            ? "Quick Settings (Wi-Fi, Volume)"
            : "Quick Settings (Ethernet, Volume)"
        }
      >
        {quickSettings.wifi ? (
          <IconWifi
            className={`w-4.75 h-4.75 ${
              themeMode === "dark" ? "text-neutral-200" : "text-neutral-800"
            }`}
          />
        ) : (
          <IconEthernet
            className={`w-4.75 h-4.75 ${
              themeMode === "dark" ? "text-neutral-200" : "text-neutral-800"
            }`}
          />
        )}
        {renderVolumeIcon()}
      </button>

      {/* Clock & Date Button */}
      <button
        type="button"
        data-flyout-trigger="calendar"
        onClick={handleToggleCalendar}
        className={`flex flex-col items-end justify-center px-2 h-8 rounded-md transition-all duration-150 outline-none text-right ${
          calendarOpen
            ? themeMode === "dark"
              ? "bg-white/15 shadow-sm"
              : "bg-white/80 shadow-xs border border-white/80"
            : themeMode === "dark"
              ? "hover:bg-white/10 active:bg-white/15"
              : "hover:bg-white/50 active:bg-white/70 border border-transparent hover:border-white/40"
        }`}
        title="Date and Time"
      >
        <span
          suppressHydrationWarning
          className={`text-[11px] font-normal leading-[1.2] tabular-nums tracking-normal ${
            themeMode === "dark" ? "text-neutral-100" : "text-neutral-900"
          }`}
        >
          {timeStr || "12:00 PM"}
        </span>
        <span
          suppressHydrationWarning
          className={`text-[11px] font-normal leading-[1.2] tabular-nums tracking-normal ${
            themeMode === "dark" ? "text-neutral-100" : "text-neutral-900"
          }`}
        >
          {dateStr || "12-09-2026"}
        </span>
      </button>

      {/* Show Desktop Line at far right */}
      <button
        type="button"
        onClick={handleShowDesktop}
        className="h-8 flex items-center pl-1 pr-1.5 ml-0.5 cursor-pointer outline-none bg-transparent group"
        title="Show desktop"
      >
        <div
          className={`w-px h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ${
            themeMode === "dark" ? "bg-white/50" : "bg-black/40"
          }`}
        />
      </button>
    </div>
  );
}
