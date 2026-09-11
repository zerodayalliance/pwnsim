"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  IconFolder,
  IconExternalLink,
} from "@tabler/icons-react";
import { DownloadItem } from "../types";

interface ChromeDownloadBubbleProps {
  downloads: DownloadItem[];
  isOpen: boolean;
  onClose: () => void;
  onDismiss: (id: string) => void;
}

export const ChromeDownloadBubble: React.FC<ChromeDownloadBubbleProps> = ({
  downloads,
  isOpen,
  onClose,
  onDismiss,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        bubbleRef.current &&
        !bubbleRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen || downloads.length === 0) return null;

  // Show the most recent completed or active item
  const latestItem = downloads[0];
  const isCompleted = latestItem.status === "completed" || latestItem.progress >= 100;

  const handleDirectRun = (e: React.MouseEvent, filename: string) => {
    e.stopPropagation();
    setToastMessage(`⚡ Executing ${filename}... Starting GTA VI Mod Loader Engine`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleShowInFolder = (e: React.MouseEvent, filename: string) => {
    e.stopPropagation();
    setToastMessage(`📁 Opened directory: C:\\Users\\Pwned\\Downloads\\${filename}`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <>
      {/* Chrome Modern Download Popup - Exact Match to Chrome Screenshot */}
      <div
        ref={bubbleRef}
        className="absolute top-12 right-6 z-50 bg-[#1e1f22] border border-[#383a42] rounded-2xl shadow-2xl text-gray-200 select-none overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 font-sans min-w-[340px] max-w-[400px]"
      >
        <div className="p-3">
          {downloads.slice(0, 3).map((item) => {
            const itemCompleted = item.status === "completed" || item.progress >= 100;

            return (
              <div
                key={item.id}
                onClick={(e) => handleDirectRun(e, item.filename)}
                className="group flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-[#2b2d33] transition-colors cursor-pointer"
              >
                {/* Left: Yellow Zipped Folder Icon */}
                <div className="shrink-0 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 drop-shadow-sm"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    {/* Back folder tab */}
                    <path
                      d="M4 8C4 6.89543 4.89543 6 6 6H12L14.5 9H26C27.1046 9 28 9.89543 28 11V14H4V8Z"
                      fill="#E09B14"
                    />
                    {/* Front folder body */}
                    <rect
                      x="3"
                      y="11"
                      width="26"
                      height="16"
                      rx="2.5"
                      fill="#F6B828"
                    />
                    {/* Zipper band across folder */}
                    <rect
                      x="3"
                      y="17.5"
                      width="26"
                      height="3"
                      fill="#D38A09"
                      opacity="0.5"
                    />
                    {/* Zipper teeth */}
                    <path
                      d="M4 19H28"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      strokeDasharray="2 1.5"
                      strokeLinecap="round"
                    />
                    {/* Zipper pull tab */}
                    <rect
                      x="14"
                      y="17"
                      width="4.5"
                      height="5.5"
                      rx="1"
                      fill="#E5E7EB"
                      stroke="#9CA3AF"
                      strokeWidth="0.8"
                    />
                    <circle cx="16.25" cy="20.5" r="0.9" fill="#4B5563" />
                  </svg>
                </div>

                {/* Center: File Name & Size Status */}
                <div className="flex-1 min-w-0 pr-2">
                  <div className="text-[13px] font-medium text-white truncate group-hover:text-blue-400 transition-colors">
                    {item.filename}
                  </div>
                  <div className="text-xs text-[#9aa0a6] mt-0.5 font-normal">
                    {itemCompleted
                      ? `${item.filesize} \u2022 Done`
                      : `${item.downloadedText || "0 GB"} \u2022 ${item.speedText || "100 MB/s"}`}
                  </div>
                </div>

                {/* Right: Two Action Icons - Folder & External Run */}
                <div className="flex items-center gap-1 shrink-0">
                  {/* Option 1: Show in folder */}
                  <button
                    onClick={(e) => handleShowInFolder(e, item.filename)}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#383a42] transition-colors"
                    title="Show in folder"
                  >
                    <IconFolder className="w-5 h-5 stroke-[1.6]" />
                  </button>

                  {/* Option 2: Direct Run / Open */}
                  <button
                    onClick={(e) => handleDirectRun(e, item.filename)}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#383a42] transition-colors"
                    title="Direct run"
                  >
                    <IconExternalLink className="w-5 h-5 stroke-[1.6]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulated System Toast for Direct Run / Show in Folder */}
      {toastMessage && (
        <div className="fixed top-14 right-6 z-50 bg-[#252830] border border-blue-500/50 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right duration-150">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping shrink-0" />
          <span className="font-medium font-sans">{toastMessage}</span>
        </div>
      )}
    </>
  );
};
