"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useWindows } from "../context/WindowsContext";
import {
  IconBell,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

export function CalendarFlyout() {
  const { calendarOpen, setCalendarOpen, themeMode } = useWindows();

  const [currentDate, setCurrentDate] = useState(new Date());
  const flyoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        flyoutRef.current &&
        !flyoutRef.current.contains(target) &&
        !target?.closest('[data-flyout-trigger="calendar"]')
      ) {
        setCalendarOpen(false);
      }
    };
    if (calendarOpen) {
      window.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [calendarOpen, setCalendarOpen]);

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <AnimatePresence>
      {calendarOpen && (
        <motion.div
          key="calendar-flyout"
          ref={flyoutRef}
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed bottom-14 right-3 w-90 max-w-[94vw] rounded-2xl shadow-2xl border backdrop-blur-3xl z-50 overflow-hidden select-none ${
            themeMode === "dark"
              ? "bg-[#1f2228]/90 border-white/15 text-white shadow-black/60"
              : "bg-[#f3f4f6]/95 border-black/10 text-neutral-900 shadow-black/20"
          }`}
        >
          <div
            className={`p-4 pb-2 border-b ${
              themeMode === "dark" ? "border-white/10" : "border-black/10"
            }`}
          >
            <p
              className={`text-sm font-semibold ${
                themeMode === "dark" ? "text-neutral-200" : "text-neutral-800"
              }`}
            >
              {today.toLocaleDateString([], {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span
                className={`text-xs font-semibold ${
                  themeMode === "dark" ? "text-white" : "text-neutral-900"
                }`}
              >
                {monthNames[month]} {year}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className={`p-1 rounded transition-colors ${
                    themeMode === "dark"
                      ? "hover:bg-white/10 text-neutral-400 hover:text-white"
                      : "hover:bg-black/5 text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  <IconChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className={`p-1 rounded transition-colors ${
                    themeMode === "dark"
                      ? "hover:bg-white/10 text-neutral-400 hover:text-white"
                      : "hover:bg-black/5 text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  <IconChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              className={`grid grid-cols-7 gap-1 text-center mb-1 text-[11px] font-medium ${
                themeMode === "dark" ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <span key={d} className="py-1">
                  {d}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="h-7" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const isToday =
                  today.getDate() === dayNum &&
                  today.getMonth() === month &&
                  today.getFullYear() === year;

                return (
                  <button
                    key={dayNum}
                    type="button"
                    className={`h-7 w-7 mx-auto flex items-center justify-center rounded-full text-[11px] transition-all ${
                      isToday
                        ? "bg-blue-600 text-white font-bold shadow-xs"
                        : themeMode === "dark"
                          ? "hover:bg-white/15 text-neutral-200"
                          : "hover:bg-black/5 text-neutral-700"
                    }`}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className={`p-4 pt-2 border-t ${
              themeMode === "dark"
                ? "border-white/10 bg-black/20 text-neutral-400"
                : "border-black/10 bg-black/3 text-neutral-600"
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-medium">Notifications</span>
              <button
                type="button"
                className={`text-[10px] transition-colors ${
                  themeMode === "dark"
                    ? "hover:text-white text-neutral-400"
                    : "hover:text-neutral-900 text-neutral-500"
                }`}
              >
                Clear all
              </button>
            </div>
            <div className="flex items-center justify-center py-4 text-center text-xs gap-2 opacity-75">
              <IconBell className="w-4 h-4 opacity-50" />
              <span>No new notifications</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
