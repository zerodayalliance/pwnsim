"use client";

import React from "react";
import { useWindows, APP_REGISTRY } from "../context/WindowsContext";
import { StartButton } from "./StartButton";
import { TaskbarItem } from "./TaskbarItem";
import { SystemTray } from "./SystemTray";
import { StartMenu } from "./StartMenu";
import { QuickSettingsFlyout } from "./QuickSettingsFlyout";
import { CalendarFlyout } from "./CalendarFlyout";
import { SearchFlyout } from "./SearchFlyout";
import { TaskViewFlyout } from "./TaskViewFlyout";
import { WeatherWidget } from "./WeatherWidget";
import { Win11SearchIcon, IconTaskView } from "../icons/Win11Icons";
import { AppId } from "../types";

export function Taskbar() {
  const {
    windows,
    searchOpen,
    setSearchOpen,
    taskViewOpen,
    setTaskViewOpen,
    closeAllFlyouts,
    taskbarAlignment,
    themeMode,
  } = useWindows();

  // Pinned taskbar apps: File Explorer, Settings
  const pinnedAppIds: AppId[] = ["file-explorer", "settings"];

  const openAppIds = windows.map((w) => w.appId);
  const allAppIds = Array.from(new Set([...pinnedAppIds, ...openAppIds]));

  const handleSearchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (searchOpen) {
      setSearchOpen(false);
    } else {
      closeAllFlyouts();
      setSearchOpen(true);
    }
  };

  const handleTaskViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (taskViewOpen) {
      setTaskViewOpen(false);
    } else {
      closeAllFlyouts();
      setTaskViewOpen(true);
    }
  };

  return (
    <>
      <footer
        className={`fixed bottom-0 left-0 w-full h-12 flex items-center justify-between pl-3 pr-1 z-50 border-t select-none transition-all duration-200 ${
          themeMode === "dark"
            ? "bg-[#18191c]/75 border-white/10 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_-4px_24px_rgba(0,0,0,0.5)]"
            : "bg-white/65 border-white/70 backdrop-blur-3xl backdrop-saturate-180 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7),0_-1px_3px_0_rgba(0,0,0,0.04)]"
        }`}
        onClick={(e) => {
          // Clicking empty taskbar closes flyouts
          if (e.target === e.currentTarget) {
            closeAllFlyouts();
          }
        }}
      >
        {/* Left: Widgets / Weather (Visible only when taskbar is center-aligned) */}
        {taskbarAlignment === "center" && (
          <div className="hidden md:flex items-center">
            <WeatherWidget />
          </div>
        )}

        {/* Taskbar App Dock */}
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeAllFlyouts();
            }
          }}
          className={`absolute inset-y-0 flex items-center space-x-1 transition-all duration-300 ease-out ${
            taskbarAlignment === "left"
              ? "left-3 translate-x-0"
              : "left-1/2 -translate-x-1/2"
          }`}
        >
          {/* Start Button */}
          <StartButton />

          {/* Search Trigger Button */}
          <button
            type="button"
            data-flyout-trigger="search"
            onClick={handleSearchClick}
            className={`group relative flex items-center justify-center w-10 h-10 rounded-md transition-all duration-150 outline-none ${
              searchOpen
                ? themeMode === "dark"
                  ? "bg-white/15 shadow-inner"
                  : "bg-white/80 shadow-xs border border-white/80"
                : themeMode === "dark"
                  ? "hover:bg-white/10 active:bg-white/15 active:scale-95"
                  : "hover:bg-white/50 active:bg-white/70 active:scale-95 border border-transparent hover:border-white/40"
            }`}
            title="Search"
          >
            <Win11SearchIcon
              className="w-7 h-7 transition-transform duration-150 group-hover:scale-105"
              themeMode={themeMode}
            />
            <span
              className={`pointer-events-none absolute -top-9 scale-0 group-hover:scale-100 transition-transform duration-150 origin-bottom px-2 py-1 text-[11px] font-medium rounded-md shadow-lg whitespace-nowrap z-50 ${
                themeMode === "dark"
                  ? "bg-[#1e1e1e]/90 text-white border border-white/10"
                  : "bg-white/95 text-neutral-800 border border-white/70 shadow-black/10"
              }`}
            >
              Search
            </span>
          </button>

          {/* Task View Trigger Button */}
          <button
            type="button"
            data-flyout-trigger="task-view"
            onClick={handleTaskViewClick}
            className={`group relative flex items-center justify-center w-10 h-10 rounded-md transition-all duration-150 outline-none ${
              taskViewOpen
                ? themeMode === "dark"
                  ? "bg-white/15 shadow-inner"
                  : "bg-white/80 shadow-xs border border-white/80"
                : themeMode === "dark"
                  ? "hover:bg-white/10 active:bg-white/15 active:scale-95"
                  : "hover:bg-white/50 active:bg-white/70 active:scale-95 border border-transparent hover:border-white/40"
            }`}
            title="Task view"
          >
            <IconTaskView
              className="w-7 h-7 transition-transform duration-150 group-hover:scale-105"
              themeMode={themeMode}
            />
            <span
              className={`pointer-events-none absolute -top-9 scale-0 group-hover:scale-100 transition-transform duration-150 origin-bottom px-2 py-1 text-[11px] font-medium rounded-md shadow-lg whitespace-nowrap z-50 ${
                themeMode === "dark"
                  ? "bg-[#1e1e1e]/90 text-white border border-white/10"
                  : "bg-white/95 text-neutral-800 border border-white/70 shadow-black/10"
              }`}
            >
              Task view
            </span>
          </button>

          {/* App Icons */}
          {allAppIds.map((appId) => (
            <TaskbarItem
              key={appId}
              appId={appId as AppId}
              title={APP_REGISTRY[appId as AppId]?.title || appId}
            />
          ))}
        </div>

        {/* Right: System Tray (with WeatherWidget to the left of the up arrow when left-aligned) */}
        <div className="flex items-center justify-end ml-auto">
          {taskbarAlignment === "left" && (
            <div className="hidden md:flex items-center mr-6">
              <WeatherWidget />
            </div>
          )}
          <SystemTray />
        </div>
      </footer>

      {/* Flyout Panels */}
      <StartMenu />
      <SearchFlyout />
      <TaskViewFlyout />
      <QuickSettingsFlyout />
      <CalendarFlyout />
    </>
  );
}
