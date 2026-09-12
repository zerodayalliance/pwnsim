"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useWindows } from "../context/WindowsContext";
import {
  IconWifi,
  IconBluetooth,
  IconPlane,
  IconMoon,
  IconSun,
  IconDeviceDesktop,
  IconSettings,
  IconVolume,
  IconVolume2,
  IconVolume3,
  IconVolume4,
} from "../icons/Win11Icons";

export function QuickSettingsFlyout() {
  const {
    quickSettingsOpen,
    setQuickSettingsOpen,
    quickSettings,
    updateQuickSettings,
    openApp,
    themeMode,
  } = useWindows();

  const flyoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        flyoutRef.current &&
        !flyoutRef.current.contains(target) &&
        !target?.closest('[data-flyout-trigger="quick-settings"]')
      ) {
        setQuickSettingsOpen(false);
      }
    };
    if (quickSettingsOpen) {
      window.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [quickSettingsOpen, setQuickSettingsOpen]);

  return (
    <AnimatePresence>
      {quickSettingsOpen && (
        <motion.div
          key="quick-settings"
          ref={flyoutRef}
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed bottom-14 right-3 w-90 max-w-[94vw] p-4 rounded-2xl shadow-2xl border backdrop-blur-3xl z-50 select-none ${
            themeMode === "dark"
              ? "bg-[#1f2228]/90 border-white/15 text-white shadow-black/60"
              : "bg-[#f3f4f6]/95 border-black/10 text-neutral-900 shadow-black/20"
          }`}
        >
          <div className="grid grid-cols-3 gap-2.5 mb-5">
            <button
              type="button"
              onClick={() => updateQuickSettings({ wifi: !quickSettings.wifi })}
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all border outline-none ${
                quickSettings.wifi
                  ? "bg-blue-600 border-blue-500 text-white shadow-md"
                  : themeMode === "dark"
                    ? "bg-white/5 hover:bg-white/10 border-white/10 text-neutral-300"
                    : "bg-white/75 hover:bg-white border-black/10 text-neutral-700 shadow-xs"
              }`}
            >
              <IconWifi className="w-5 h-5 mb-1.5" />
              <span className="text-[11px] font-medium">Wi-Fi</span>
              <span className="text-[9px] opacity-75">
                {quickSettings.wifi ? "Connected" : "Off"}
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                updateQuickSettings({ bluetooth: !quickSettings.bluetooth })
              }
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all border outline-none ${
                quickSettings.bluetooth
                  ? "bg-blue-600 border-blue-500 text-white shadow-md"
                  : themeMode === "dark"
                    ? "bg-white/5 hover:bg-white/10 border-white/10 text-neutral-300"
                    : "bg-white/75 hover:bg-white border-black/10 text-neutral-700 shadow-xs"
              }`}
            >
              <IconBluetooth className="w-5 h-5 mb-1.5" />
              <span className="text-[11px] font-medium">Bluetooth</span>
              <span className="text-[9px] opacity-75">
                {quickSettings.bluetooth ? "On" : "Off"}
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                updateQuickSettings({
                  airplaneMode: !quickSettings.airplaneMode,
                })
              }
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all border outline-none ${
                quickSettings.airplaneMode
                  ? "bg-blue-600 border-blue-500 text-white shadow-md"
                  : themeMode === "dark"
                    ? "bg-white/5 hover:bg-white/10 border-white/10 text-neutral-300"
                    : "bg-white/75 hover:bg-white border-black/10 text-neutral-700 shadow-xs"
              }`}
            >
              <IconPlane className="w-5 h-5 mb-1.5" />
              <span className="text-[11px] font-medium">Airplane</span>
              <span className="text-[9px] opacity-75">
                {quickSettings.airplaneMode ? "On" : "Off"}
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                updateQuickSettings({ nightLight: !quickSettings.nightLight })
              }
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all border outline-none ${
                quickSettings.nightLight
                  ? "bg-amber-600 border-amber-500 text-white shadow-md"
                  : themeMode === "dark"
                    ? "bg-white/5 hover:bg-white/10 border-white/10 text-neutral-300"
                    : "bg-white/75 hover:bg-white border-black/10 text-neutral-700 shadow-xs"
              }`}
            >
              <IconMoon className="w-5 h-5 mb-1.5" />
              <span className="text-[11px] font-medium">Night light</span>
              <span className="text-[9px] opacity-75">
                {quickSettings.nightLight ? "On" : "Off"}
              </span>
            </button>

            <button
              type="button"
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all border outline-none cursor-pointer ${
                themeMode === "dark"
                  ? "bg-white/5 hover:bg-white/10 border-white/10 text-neutral-300"
                  : "bg-white/75 hover:bg-white border-black/10 text-neutral-700 shadow-xs"
              }`}
            >
              <IconDeviceDesktop className="w-5 h-5 mb-1.5" />
              <span className="text-[11px] font-medium">Project</span>
              <span className="text-[9px] opacity-75">PC screen only</span>
            </button>

            <button
              type="button"
              onClick={() => {
                openApp("settings");
                setQuickSettingsOpen(false);
              }}
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all border outline-none ${
                themeMode === "dark"
                  ? "bg-white/5 hover:bg-white/10 border-white/10 text-neutral-300"
                  : "bg-white/75 hover:bg-white border-black/10 text-neutral-700 shadow-xs"
              }`}
            >
              <IconSettings className="w-5 h-5 mb-1.5" />
              <span className="text-[11px] font-medium">All Settings</span>
              <span className="text-[9px] opacity-75">Open</span>
            </button>
          </div>

          <div className="space-y-4 mb-4">
            <div className="flex items-center gap-3">
              <IconSun
                className={`w-4 h-4 shrink-0 ${
                  themeMode === "dark" ? "text-neutral-400" : "text-neutral-600"
                }`}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={quickSettings.brightness}
                onChange={(e) =>
                  updateQuickSettings({ brightness: Number(e.target.value) })
                }
                className={`w-full accent-blue-500 h-1.5 rounded-lg appearance-none cursor-pointer ${
                  themeMode === "dark" ? "bg-white/20" : "bg-neutral-300"
                }`}
              />
              <span
                className={`text-[11px] w-8 text-right font-mono ${
                  themeMode === "dark" ? "text-neutral-400" : "text-neutral-600"
                }`}
              >
                {quickSettings.brightness}%
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  updateQuickSettings({
                    volume: quickSettings.volume === 0 ? 75 : 0,
                  })
                }
                className={`shrink-0 transition-colors ${
                  themeMode === "dark"
                    ? "text-neutral-400 hover:text-white"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {quickSettings.volume === 0 ? (
                  <IconVolume3 className="w-4 h-4" />
                ) : quickSettings.volume < 33 ? (
                  <IconVolume4 className="w-4 h-4" />
                ) : quickSettings.volume < 66 ? (
                  <IconVolume2 className="w-4 h-4" />
                ) : (
                  <IconVolume className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={quickSettings.volume}
                onChange={(e) =>
                  updateQuickSettings({ volume: Number(e.target.value) })
                }
                className={`w-full accent-blue-500 h-1.5 rounded-lg appearance-none cursor-pointer ${
                  themeMode === "dark" ? "bg-white/20" : "bg-neutral-300"
                }`}
              />
              <span
                className={`text-[11px] w-8 text-right font-mono ${
                  themeMode === "dark" ? "text-neutral-400" : "text-neutral-600"
                }`}
              >
                {quickSettings.volume}%
              </span>
            </div>
          </div>

          <div
            className={`flex items-center justify-end pt-3 border-t text-xs ${
              themeMode === "dark"
                ? "border-white/10 text-neutral-400"
                : "border-black/10 text-neutral-600"
            }`}
          >
            <button
              type="button"
              onClick={() => {
                openApp("settings");
                setQuickSettingsOpen(false);
              }}
              className={`p-1 rounded-md transition-colors cursor-pointer ${
                themeMode === "dark"
                  ? "hover:bg-white/10 text-neutral-400 hover:text-white"
                  : "hover:bg-black/5 text-neutral-600 hover:text-neutral-900"
              }`}
              title="All settings"
            >
              <IconSettings className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
