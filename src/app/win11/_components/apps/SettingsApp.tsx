"use client";

import React, { useState } from "react";
import { useWindows, WALLPAPER_PRESETS } from "../context/WindowsContext";
import {
  IconDeviceDesktop,
  IconBluetooth,
  IconWifi,
  IconPalette,
  IconApps,
  IconUser,
  IconClock,
  IconReload,
  IconInfoCircle,
  IconSun,
  IconMoon,
  IconCheck,
  IconHardDrive,
} from "../icons/Win11Icons";

interface SettingsAppProps {
  initialTab?: string;
}

export function SettingsApp({
  initialTab = "personalization",
}: SettingsAppProps) {
  const {
    currentWallpaper,
    setWallpaper,
    themeMode,
    setThemeMode,
    taskbarAlignment,
    setTaskbarAlignment,
  } = useWindows();

  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const sidebarNav = [
    { id: "system", name: "System", icon: IconDeviceDesktop },
    { id: "bluetooth", name: "Bluetooth & devices", icon: IconBluetooth },
    { id: "network", name: "Network & internet", icon: IconWifi },
    { id: "personalization", name: "Personalization", icon: IconPalette },
    { id: "apps", name: "Apps", icon: IconApps },
    { id: "accounts", name: "Accounts", icon: IconUser },
    { id: "time", name: "Time & language", icon: IconClock },
    { id: "update", name: "Windows Update", icon: IconReload },
  ];

  return (
    <div className="flex h-full text-xs select-none">
      <div
        className={`w-60 shrink-0 p-3 border-r flex flex-col justify-between transition-colors ${
          themeMode === "dark"
            ? "bg-[#1e2025] border-white/10 text-white"
            : "bg-[#f3f4f6] border-black/10 text-neutral-900"
        }`}
      >
        <div className="space-y-1">
          <div
            className={`flex items-center gap-3 px-3 py-3 mb-2 rounded-xl border transition-colors ${
              themeMode === "dark"
                ? "bg-white/5 border-white/10"
                : "bg-white border-black/5 shadow-xs"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm shrink-0">
              A
            </div>
            <div className="min-w-0">
              <p
                className={`font-semibold text-sm truncate ${
                  themeMode === "dark" ? "text-white" : "text-neutral-900"
                }`}
              >
                Administrator
              </p>
              <p
                className={`text-[10px] truncate ${
                  themeMode === "dark" ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                zda@zerodayalliance.tech
              </p>
            </div>
          </div>

          {sidebarNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left font-normal cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white font-medium shadow-sm"
                    : themeMode === "dark"
                      ? "text-neutral-300 hover:bg-white/10 hover:text-white"
                      : "text-neutral-700 hover:bg-black/5 hover:text-neutral-900"
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive
                      ? "text-white"
                      : themeMode === "dark"
                        ? "text-neutral-400"
                        : "text-neutral-500"
                  }`}
                />
                <span className="truncate">{item.name}</span>
              </button>
            );
          })}
        </div>

        <div
          className={`px-3 py-2 text-[10px] border-t transition-colors ${
            themeMode === "dark"
              ? "border-white/5 text-neutral-500"
              : "border-black/5 text-neutral-400"
          }`}
        >
          Windows 11 | ZeroDay Alliance
        </div>
      </div>

      <div
        className={`flex-1 overflow-y-auto p-6 custom-scrollbar transition-colors ${
          themeMode === "dark"
            ? "bg-[#18191d] text-neutral-200"
            : "bg-[#fafafa] text-neutral-800"
        }`}
      >
        {activeTab === "personalization" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2
                className={`text-xl font-semibold mb-1 ${
                  themeMode === "dark" ? "text-white" : "text-neutral-900"
                }`}
              >
                Personalization
              </h2>
              <p
                className={`text-xs ${
                  themeMode === "dark" ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                Select wallpaper, theme mode, and taskbar options.
              </p>
            </div>

            <div
              className={`relative w-full h-44 rounded-2xl overflow-hidden border shadow-lg ${
                themeMode === "dark" ? "border-white/20" : "border-black/10"
              }`}
              style={{
                backgroundImage: `url(${currentWallpaper.path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] p-4 flex flex-col justify-end text-white">
                <span className="text-[11px] font-mono opacity-80">
                  Active Wallpaper
                </span>
                <span className="text-base font-semibold">
                  {currentWallpaper.name}
                </span>
              </div>
            </div>

            <div>
              <h3
                className={`text-sm font-semibold mb-3 ${
                  themeMode === "dark" ? "text-white" : "text-neutral-900"
                }`}
              >
                Select a background
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {WALLPAPER_PRESETS.map((wp) => (
                  <button
                    key={wp.id}
                    type="button"
                    onClick={() => setWallpaper(wp)}
                    className={`group relative rounded-xl overflow-hidden aspect-video border-2 transition-all cursor-pointer ${
                      currentWallpaper.id === wp.id
                        ? "border-blue-500 ring-2 ring-blue-400/50 scale-[1.03]"
                        : themeMode === "dark"
                          ? "border-white/10 hover:border-white/40"
                          : "border-black/10 hover:border-black/30 shadow-xs"
                    }`}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-200 group-hover:scale-105"
                      style={{ backgroundImage: `url(${wp.path})` }}
                    />
                    {currentWallpaper.id === wp.id && (
                      <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                        <IconCheck className="w-3 h-3" />
                      </div>
                    )}
                    <span className="absolute bottom-0 inset-x-0 bg-black/70 text-white text-[9px] py-1 px-1 text-center truncate">
                      {wp.name.replace("Windows 11 ", "")}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${
                themeMode === "dark"
                  ? "border-white/10 bg-white/5"
                  : "border-black/10 bg-white shadow-xs"
              }`}
            >
              <div>
                <p
                  className={`font-semibold text-sm ${
                    themeMode === "dark" ? "text-white" : "text-neutral-900"
                  }`}
                >
                  Choose your mode
                </p>
                <p
                  className={`text-xs mt-0.5 ${
                    themeMode === "dark"
                      ? "text-neutral-400"
                      : "text-neutral-500"
                  }`}
                >
                  Change the appearance of Windows between light and dark themes
                </p>
              </div>
              <div
                className={`flex items-center gap-1.5 p-1 rounded-xl border transition-colors ${
                  themeMode === "dark"
                    ? "bg-black/20 border-white/10"
                    : "bg-neutral-100 border-black/10"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setThemeMode("light")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    themeMode === "light"
                      ? "bg-white text-neutral-900 font-semibold shadow-xs"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <IconSun className="w-4 h-4" />
                  <span>Light</span>
                </button>
                <button
                  type="button"
                  onClick={() => setThemeMode("dark")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    themeMode === "dark"
                      ? "bg-blue-600 text-white font-semibold shadow-sm"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  <IconMoon className="w-4 h-4" />
                  <span>Dark</span>
                </button>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${
                themeMode === "dark"
                  ? "border-white/10 bg-white/5"
                  : "border-black/10 bg-white shadow-xs"
              }`}
            >
              <div>
                <p
                  className={`font-semibold text-sm ${
                    themeMode === "dark" ? "text-white" : "text-neutral-900"
                  }`}
                >
                  Taskbar alignment
                </p>
                <p
                  className={`text-xs mt-0.5 ${
                    themeMode === "dark"
                      ? "text-neutral-400"
                      : "text-neutral-500"
                  }`}
                >
                  Position app icons in the center or left of the taskbar
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTaskbarAlignment("center")}
                  className={`px-3 py-1.5 rounded-lg text-xs border transition-colors cursor-pointer ${
                    taskbarAlignment === "center"
                      ? "bg-blue-600 border-blue-500 text-white font-medium shadow-xs"
                      : themeMode === "dark"
                        ? "bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10"
                        : "bg-neutral-100 border-black/10 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  Center
                </button>
                <button
                  type="button"
                  onClick={() => setTaskbarAlignment("left")}
                  className={`px-3 py-1.5 rounded-lg text-xs border transition-colors cursor-pointer ${
                    taskbarAlignment === "left"
                      ? "bg-blue-600 border-blue-500 text-white font-medium shadow-xs"
                      : themeMode === "dark"
                        ? "bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10"
                        : "bg-neutral-100 border-black/10 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  Left
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "system" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2
                className={`text-xl font-semibold mb-1 ${
                  themeMode === "dark" ? "text-white" : "text-neutral-900"
                }`}
              >
                System
              </h2>
              <p
                className={`text-xs ${
                  themeMode === "dark" ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                Device specifications, performance hardware and system
                configuration.
              </p>
            </div>

            <div
              className={`p-5 rounded-2xl border space-y-4 transition-colors ${
                themeMode === "dark"
                  ? "border-white/10 bg-white/5"
                  : "border-black/10 bg-white shadow-xs"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center text-blue-500">
                  <IconDeviceDesktop className="w-7 h-7" />
                </div>
                <div>
                  <h3
                    className={`text-base font-semibold ${
                      themeMode === "dark" ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    ZDA-WIN11
                  </h3>
                  <p
                    className={`text-xs ${
                      themeMode === "dark"
                        ? "text-neutral-400"
                        : "text-neutral-500"
                    }`}
                  >
                    ZeroDay Alliance Workstation
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                {[
                  {
                    label: "Processor",
                    value: "Intel Core Ultra 9",
                  },
                  {
                    label: "Installed RAM",
                    value: "64.0 GB (63.8 GB usable)",
                  },
                  {
                    label: "System Type",
                    value: "64-bit OS, x64-based processor",
                  },
                  {
                    label: "Edition",
                    value: "Windows 11 Pro",
                  },
                ].map((spec) => (
                  <div
                    key={spec.label}
                    className={`p-3 rounded-lg border ${
                      themeMode === "dark"
                        ? "bg-black/20 border-white/5"
                        : "bg-neutral-50 border-black/5"
                    }`}
                  >
                    <span
                      className={`block text-[10px] uppercase font-semibold ${
                        themeMode === "dark"
                          ? "text-neutral-400"
                          : "text-neutral-500"
                      }`}
                    >
                      {spec.label}
                    </span>
                    <span
                      className={`font-medium ${
                        themeMode === "dark"
                          ? "text-neutral-200"
                          : "text-neutral-800"
                      }`}
                    >
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`p-5 rounded-2xl border space-y-3 transition-colors ${
                themeMode === "dark"
                  ? "border-white/10 bg-white/5"
                  : "border-black/10 bg-white shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconHardDrive className="w-5 h-5 text-blue-500" />
                  <span
                    className={`font-semibold text-sm ${
                      themeMode === "dark" ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    Local Storage (C:)
                  </span>
                </div>
                <span
                  className={`text-xs ${
                    themeMode === "dark"
                      ? "text-neutral-400"
                      : "text-neutral-500"
                  }`}
                >
                  184 GB used / 512 GB total
                </span>
              </div>
              <div
                className={`w-full h-2.5 rounded-full overflow-hidden ${
                  themeMode === "dark" ? "bg-white/10" : "bg-neutral-200"
                }`}
              >
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: "36%" }}
                />
              </div>
              <p
                className={`text-[11px] ${
                  themeMode === "dark" ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                328 GB free space remaining
              </p>
            </div>
          </div>
        )}

        {activeTab === "network" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2
                className={`text-xl font-semibold mb-1 ${
                  themeMode === "dark" ? "text-white" : "text-neutral-900"
                }`}
              >
                Network & internet
              </h2>
              <p
                className={`text-xs ${
                  themeMode === "dark" ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                Wi-Fi, Ethernet, VPN, and proxy settings.
              </p>
            </div>
            <div
              className={`p-5 rounded-2xl border space-y-3 transition-colors ${
                themeMode === "dark"
                  ? "border-white/10 bg-white/5"
                  : "border-black/10 bg-white shadow-xs"
              }`}
            >
              <div className="flex items-center gap-3">
                <IconWifi className="w-6 h-6 text-blue-500" />
                <div>
                  <p
                    className={`font-semibold text-sm ${
                      themeMode === "dark" ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    ZDA_5G
                  </p>
                  <p className="text-xs text-emerald-500 font-medium">
                    Connected, secured
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                <div
                  className={`p-2.5 rounded-lg border ${
                    themeMode === "dark"
                      ? "bg-black/20 border-white/5"
                      : "bg-neutral-50 border-black/5"
                  }`}
                >
                  <span
                    className={`text-[10px] block ${
                      themeMode === "dark"
                        ? "text-neutral-400"
                        : "text-neutral-500"
                    }`}
                  >
                    IPv4 Address
                  </span>
                  <span
                    className={`font-mono ${
                      themeMode === "dark"
                        ? "text-neutral-200"
                        : "text-neutral-800"
                    }`}
                  >
                    192.168.1.137
                  </span>
                </div>
                <div
                  className={`p-2.5 rounded-lg border ${
                    themeMode === "dark"
                      ? "bg-black/20 border-white/5"
                      : "bg-neutral-50 border-black/5"
                  }`}
                >
                  <span
                    className={`text-[10px] block ${
                      themeMode === "dark"
                        ? "text-neutral-400"
                        : "text-neutral-500"
                    }`}
                  >
                    Link Speed
                  </span>
                  <span
                    className={`font-mono ${
                      themeMode === "dark"
                        ? "text-neutral-200"
                        : "text-neutral-800"
                    }`}
                  >
                    1200 / 1200 (Mbps)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== "personalization" &&
          activeTab !== "system" &&
          activeTab !== "network" && (
            <div className="space-y-4 max-w-2xl">
              <h2
                className={`text-xl font-semibold capitalize ${
                  themeMode === "dark" ? "text-white" : "text-neutral-900"
                }`}
              >
                {activeTab}
              </h2>
              <div
                className={`p-6 rounded-2xl border text-center transition-colors ${
                  themeMode === "dark"
                    ? "border-white/10 bg-white/5 text-neutral-400"
                    : "border-black/10 bg-white text-neutral-600 shadow-xs"
                }`}
              >
                <IconInfoCircle className="w-8 h-8 mx-auto mb-2 text-neutral-400" />
                <p>
                  Settings for {activeTab} are configured by system
                  administrator policy.
                </p>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
