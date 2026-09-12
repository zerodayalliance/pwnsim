"use client";

import React from "react";
import { useWindows } from "../context/WindowsContext";
import {
  IconTrash,
  IconReload,
  IconFileText,
  RecycleBinIcon,
} from "../icons/Win11Icons";

export function RecycleBinApp() {
  const { recycleBinItems, emptyRecycleBin, restoreRecycleBin, themeMode } =
    useWindows();

  return (
    <div
      className={`flex flex-col h-full text-xs select-none ${
        themeMode === "dark"
          ? "bg-[#191a1e] text-neutral-200"
          : "bg-white text-neutral-800"
      }`}
    >
      <div
        className={`flex items-center gap-3 px-4 py-2 border-b ${
          themeMode === "dark"
            ? "bg-[#202126] border-white/10"
            : "bg-[#f3f4f6] border-black/10"
        }`}
      >
        <button
          type="button"
          disabled={recycleBinItems.length === 0}
          onClick={emptyRecycleBin}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30 transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          <IconTrash className="w-3.5 h-3.5" />
          <span>Empty Recycle Bin</span>
        </button>

        <button
          type="button"
          onClick={restoreRecycleBin}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 transition-colors"
        >
          <IconReload className="w-3.5 h-3.5" />
          <span>Restore All Items</span>
        </button>

        <span className="ml-auto text-neutral-400 text-xs">
          {recycleBinItems.length} item{recycleBinItems.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        {recycleBinItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-neutral-400 space-y-3">
            <RecycleBinIcon className="w-16 h-16 opacity-50" empty={true} />
            <p className="text-sm font-semibold">This folder is empty.</p>
            <p className="text-xs text-neutral-500">
              Items deleted from your PC will show up here.
            </p>
          </div>
        ) : (
          <div className="border border-white/10 rounded-xl overflow-hidden divide-y divide-white/5">
            <div className="grid grid-cols-12 px-4 py-2 bg-white/5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              <span className="col-span-6">Name</span>
              <span className="col-span-3">Original Location</span>
              <span className="col-span-3 text-right">Date Deleted</span>
            </div>

            {recycleBinItems.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 items-center px-4 py-2.5 hover:bg-white/10 cursor-pointer transition-colors"
              >
                <div className="col-span-6 flex items-center gap-2.5">
                  <IconFileText className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="font-medium truncate">{item}</span>
                </div>
                <span className="col-span-3 text-neutral-400 truncate text-[11px]">
                  C:\Users\Dev\Documents
                </span>
                <span className="col-span-3 text-neutral-400 text-right text-[11px] font-mono">
                  Today, 11:24 AM
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
