"use client";

import React from "react";
import {
  IconDownload,
  IconX,
  IconCheck,
  IconFolder,
  IconFileZip,
} from "@tabler/icons-react";
import { DownloadItem } from "../types";

interface DownloadShelfProps {
  downloads: DownloadItem[];
  onDismiss: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadShelf: React.FC<DownloadShelfProps> = ({
  downloads,
  onDismiss,
  isOpen,
  onClose,
}) => {
  if (!isOpen || downloads.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#282a2e] border-t border-[#3c4043] shadow-2xl text-gray-200 select-none animate-in slide-in-from-bottom duration-150 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Active and Completed Downloads List */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar flex-1 py-0.5">
          {downloads.map((item) => {
            const isCompleted = item.status === "completed" || item.progress >= 100;
            const progress = Math.min(100, Math.max(0, item.progress));

            return (
              <div
                key={item.id}
                className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-lg bg-[#1e1f22] border border-[#3f4247] hover:border-gray-500 transition-all shrink-0 min-w-[320px] max-w-[400px] shadow-sm"
              >
                {/* Real Chrome Circular Progress Ring / Checkmark */}
                <div className="shrink-0 flex items-center justify-center relative">
                  {!isCompleted ? (
                    <div className="relative w-9 h-9 flex items-center justify-center">
                      {/* SVG Circular Progress Ring */}
                      <svg
                        className="w-9 h-9 -rotate-90 absolute inset-0"
                        viewBox="0 0 36 36"
                      >
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          stroke="#383a40"
                          strokeWidth="3"
                          fill="none"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          stroke="#4f8eff"
                          strokeWidth="3"
                          strokeDasharray="87.96"
                          strokeDashoffset={
                            87.96 - (87.96 * progress) / 100
                          }
                          strokeLinecap="round"
                          fill="none"
                          className="transition-all duration-100 ease-linear"
                        />
                      </svg>
                      <IconDownload className="w-4 h-4 text-blue-400 animate-pulse" />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shadow-inner">
                      <IconCheck className="w-5 h-5 stroke-[2.5]" />
                    </div>
                  )}
                </div>

                {/* File Details & Live Dynamic Progress */}
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-white truncate font-sans">
                      {item.filename}
                    </span>
                    <span className="text-[11px] font-mono text-blue-400 font-bold shrink-0">
                      {!isCompleted ? `${progress}%` : "100%"}
                    </span>
                  </div>

                  {/* Horizontal Linear Progress Bar */}
                  <div className="w-full bg-[#32353b] h-1.5 rounded-full overflow-hidden my-1">
                    <div
                      className={`h-full transition-all duration-100 ease-linear ${
                        isCompleted ? "bg-emerald-500" : "bg-[#4f8eff]"
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Status Metric Line */}
                  <div className="text-[11px] text-gray-400 flex items-center gap-1.5 truncate">
                    {!isCompleted ? (
                      <>
                        <span className="text-gray-300 font-medium">
                          {item.downloadedText || "0 GB / 856.67 GB"}
                        </span>
                        <span>&bull;</span>
                        <span className="text-blue-400 font-semibold">
                          {item.speedText || "100 MB/s"}
                        </span>
                        <span>&bull;</span>
                        <span>{item.timeLeftText || "6s left"}</span>
                      </>
                    ) : (
                      <span className="text-emerald-400 font-medium flex items-center gap-1">
                        <span>{item.filesize}</span>
                        <span>&bull;</span>
                        <span>Download complete</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Action: Show in folder / Dismiss */}
                <div className="flex items-center gap-1.5 shrink-0 pl-1 border-l border-[#33363e]">
                  {isCompleted ? (
                    <button
                      className="text-xs text-blue-400 hover:text-blue-300 hover:underline px-2 py-1 flex items-center gap-1 rounded hover:bg-[#2a2c33] transition-colors"
                      title="Show in folder"
                    >
                      <IconFolder className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Show in folder</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onDismiss(item.id)}
                      className="text-[11px] text-gray-400 hover:text-red-400 px-2 py-1 rounded hover:bg-[#2a2c33] transition-colors"
                      title="Cancel download"
                    >
                      Cancel
                    </button>
                  )}

                  <button
                    onClick={() => onDismiss(item.id)}
                    className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700 transition-colors"
                    title="Dismiss"
                  >
                    <IconX className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Close Download Bar Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onClose}
            className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors flex items-center gap-1"
          >
            <span>Close bar</span>
            <IconX className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
