"use client";

import React from "react";
import { useWindows } from "../context/WindowsContext";
import { WeatherPartlyCloudyNightIcon } from "../icons/Win11Icons";

interface WeatherWidgetProps {
  temperature?: string;
  condition?: string;
  badge?: number | string | null;
  className?: string;
}

export function WeatherWidget({
  temperature = "27°C",
  condition = "Partly cloudy",
  badge = 1,
  className = "",
}: WeatherWidgetProps) {
  const { themeMode } = useWindows();

  return (
    <div
      role="button"
      tabIndex={0}
      title={`Widgets (${temperature}, ${condition})`}
      className={`group h-10 px-2.5 py-1 rounded-md transition-all duration-150 cursor-pointer select-none hidden md:flex items-center gap-2 outline-none ${
        themeMode === "dark"
          ? "hover:bg-white/10 active:bg-white/15"
          : "hover:bg-white/50 active:bg-white/70"
      } ${className}`}
    >
      <div className="shrink-0 flex items-center justify-center relative">
        <WeatherPartlyCloudyNightIcon className="w-7.5 h-7.5" badge={badge} />
      </div>

      <div className="flex flex-col justify-center text-left select-none pointer-events-none">
        <span
          className={`text-[12.5px] font-medium tracking-tight leading-[1.2] transition-colors ${
            themeMode === "dark" ? "text-white" : "text-neutral-900"
          }`}
        >
          {temperature}
        </span>
        <span
          className={`text-[11px] font-normal tracking-normal leading-[1.2] transition-colors ${
            themeMode === "dark" ? "text-neutral-300" : "text-neutral-600"
          }`}
        >
          {condition}
        </span>
      </div>
    </div>
  );
}
