"use client";

import React, { useState } from "react";
import { useWindows } from "../context/WindowsContext";
import {
  IconHardDrive,
  IconFileText,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconSearch,
  IconChevronRight,
  ExplorerFolderIcon,
  FolderIcon,
} from "../icons/Win11Icons";

export function ThisPCApp() {
  const { themeMode, openApp } = useWindows();
  const [currentPath, setCurrentPath] = useState("This PC");

  const quickFolders = [
    { name: "Desktop", count: "6 items" },
    { name: "Downloads", count: "14 items" },
    { name: "Documents", count: "28 items" },
    { name: "Pictures", count: "89 items" },
    { name: "Music", count: "12 items" },
  ];

  const filesInDir = [
    {
      name: "system_architecture.txt",
      size: "24 KB",
      modified: "Today, 2:15 PM",
      content:
        "Windows 11 Desktop Clone built on Next.js 16 App Router.\nModular structure:\n/desktop\n/taskbar\n/windows\n/apps",
    },
    {
      name: "zeroday_security_guidelines.txt",
      size: "18 KB",
      modified: "Yesterday, 6:40 PM",
      content:
        "ZeroDay Alliance Security Protocols & Sandboxed Execution environment.",
    },
    {
      name: "notes_todo.txt",
      size: "4 KB",
      modified: "Sep 10, 2026",
      content:
        "1. Verify Framer Motion window transitions\n2. Test Start Menu filtering\n3. Enjoy Windows 11 Mica aesthetics",
    },
  ];

  const drives = [
    { name: "Local Disk (C:)", used: 184, total: 512, pct: 36 },
    { name: "Data Drive (D:)", used: 310, total: 1024, pct: 30 },
  ];

  const handleFileClick = (file: (typeof filesInDir)[0]) => {
    openApp("notepad", file.name, { initialText: file.content });
  };

  return (
    <div
      className={`flex flex-col h-full text-xs select-none ${
        themeMode === "dark"
          ? "bg-[#191a1e] text-neutral-200"
          : "bg-white text-neutral-800"
      }`}
    >
      {/* Top Address & Breadcrumb Navigation Bar */}
      <div
        className={`flex items-center gap-2 px-3 py-2 border-b ${
          themeMode === "dark"
            ? "bg-[#202126] border-white/10"
            : "bg-[#f3f4f6] border-black/10"
        }`}
      >
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCurrentPath("This PC")}
            className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <IconArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <IconArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setCurrentPath("This PC")}
            className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <IconArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Breadcrumb path bar */}
        <div
          className={`flex-1 flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs ${
            themeMode === "dark"
              ? "bg-[#18191c] border-white/10 text-neutral-300"
              : "bg-white border-black/10 text-neutral-700"
          }`}
        >
          <ExplorerFolderIcon className="w-4 h-4 shrink-0" />
          <IconChevronRight className="w-3 h-3 text-neutral-500" />
          <span>{currentPath}</span>
        </div>

        {/* Search Bar */}
        <div
          className={`w-52 flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs ${
            themeMode === "dark"
              ? "bg-[#18191c] border-white/10 text-neutral-300"
              : "bg-white border-black/10 text-neutral-700"
          }`}
        >
          <IconSearch className="w-3.5 h-3.5 text-neutral-400" />
          <input
            type="text"
            placeholder={`Search ${currentPath}`}
            className="w-full bg-transparent outline-none text-xs"
          />
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <div
          className={`w-48 shrink-0 p-2.5 border-r space-y-4 overflow-y-auto ${
            themeMode === "dark"
              ? "bg-[#1c1d22] border-white/10"
              : "bg-[#f9fafb] border-black/10"
          }`}
        >
          <div>
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider px-2">
              Quick access
            </span>
            <div className="mt-1 space-y-0.5">
              {quickFolders.map((folder) => (
                <button
                  key={folder.name}
                  type="button"
                  onClick={() => setCurrentPath(`This PC > ${folder.name}`)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 text-left transition-colors"
                >
                  <FolderIcon className="w-4 h-4 shrink-0" />
                  <span className="truncate text-xs">{folder.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider px-2">
              Drives
            </span>
            <div className="mt-1 space-y-0.5">
              {drives.map((drive) => (
                <button
                  key={drive.name}
                  type="button"
                  onClick={() => setCurrentPath(`This PC > ${drive.name}`)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 text-left transition-colors"
                >
                  <IconHardDrive className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="truncate text-xs">{drive.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Folder/Drive Contents */}
        <div className="flex-1 p-5 overflow-y-auto space-y-6 custom-scrollbar">
          {/* Folders Section */}
          <div>
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
              Folders
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {quickFolders.map((folder) => (
                <div
                  key={folder.name}
                  onClick={() => setCurrentPath(`This PC > ${folder.name}`)}
                  className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer transition-all group"
                >
                  <FolderIcon className="w-8 h-8 group-hover:scale-105 transition-transform" />
                  <div>
                    <p className="font-semibold text-xs group-hover:text-blue-400 transition-colors">
                      {folder.name}
                    </p>
                    <p className="text-[10px] text-neutral-400">
                      {folder.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Devices and Drives */}
          <div>
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
              Devices and drives
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {drives.map((drive) => (
                <div
                  key={drive.name}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                >
                  <IconHardDrive className="w-10 h-10 text-blue-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs">{drive.name}</p>
                    <div className="w-full h-2 rounded-full bg-white/15 my-1.5 overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${drive.pct}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-neutral-400">
                      {drive.total - drive.used} GB free of {drive.total} GB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Files */}
          <div>
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
              Documents & Files (Double click to open in Notepad)
            </h3>
            <div className="border border-white/10 rounded-xl overflow-hidden divide-y divide-white/5">
              {filesInDir.map((file) => (
                <div
                  key={file.name}
                  onDoubleClick={() => handleFileClick(file)}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-white/10 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <IconFileText className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="font-medium text-xs group-hover:text-blue-400 transition-colors">
                        {file.name}
                      </p>
                      <p className="text-[10px] text-neutral-400">
                        Modified: {file.modified}
                      </p>
                    </div>
                  </div>
                  <span className="text-neutral-400 text-xs font-mono">
                    {file.size}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
