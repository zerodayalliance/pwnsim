"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChromeTab, DownloadItem } from "../types";

interface ChromeHeaderProps {
  tabs: ChromeTab[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onNewTab: () => void;
  onNavigate: (url: string) => void;
  onBack: () => void;
  onForward: () => void;
  onReload: () => void;
  onHome: () => void;
  downloads: DownloadItem[];
  onOpenDownloads: () => void;
  isLoading?: boolean;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}

export const ChromeHeader: React.FC<ChromeHeaderProps> = ({
  tabs,
  activeTabId,
  onSelectTab,
  onCloseTab,
  onNewTab,
  onNavigate,
  onBack,
  onForward,
  onReload,
  onHome,
  downloads,
  onOpenDownloads,
  isLoading = false,
  onMinimize,
  onMaximize,
  onClose,
}) => {
  const router = useRouter();
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const [inputUrl, setInputUrl] = useState(activeTab?.url || "");
  const [prevTabUrl, setPrevTabUrl] = useState(activeTab?.url || "");
  const [isFocused, setIsFocused] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (activeTab?.url !== prevTabUrl) {
    setPrevTabUrl(activeTab?.url || "");
    if (!isFocused) {
      setInputUrl(activeTab?.url || "");
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      let target = inputUrl.trim();
      if (!target) return;

      if (
        !target.startsWith("http://") &&
        !target.startsWith("https://") &&
        !target.startsWith("chrome://")
      ) {
        if (target.includes(".") && !target.includes(" ")) {
          target = "https://" + target;
        } else {
          target = `https://www.google.com/search?q=${encodeURIComponent(target)}`;
        }
      }
      onNavigate(target);
      inputRef.current?.blur();
    }
  };

  const activeDownloadsCount = downloads.filter(
    (d) => d.status === "downloading"
  ).length;

  const handleMinimize =
    onMinimize ||
    (() => {
      router.push("/");
    });

  const handleMaximize =
    onMaximize ||
    (() => {
      if (typeof document !== "undefined") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
          setIsMaximized(true);
        } else {
          document.exitFullscreen().catch(() => {});
          setIsMaximized(false);
        }
      }
    });

  const handleClose =
    onClose ||
    (() => {
      router.push("/");
    });

  return (
    <header className="flex flex-col bg-[#1f1f23] text-gray-200 select-none border-b border-[#2d2f36]">
      {/* Chrome Window Titlebar & Tab Strip */}
      <div className="flex items-center h-10.5 bg-[#1f1f23] select-none">
        {/* Left: Tab Search Down-Chevron Button (Windows Chrome style) */}
        <div className="pl-2 pr-1 flex items-center shrink-0">
          <button
            title="Search tabs"
            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#2f3136] transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        {/* Center: Tabs Strip */}
        <div className="flex items-end h-full gap-1 flex-1 min-w-0 overflow-x-auto no-scrollbar pt-1.5">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`group relative flex items-center gap-2 px-3.5 h-8.5 text-xs rounded-t-lg transition-colors max-w-60 min-w-32.5 cursor-pointer ${
                  isActive
                    ? "bg-[#2b2d31] text-white shadow-sm font-medium"
                    : "text-gray-400 hover:bg-[#282a2e] hover:text-gray-200"
                }`}
              >
                {/* Tab Favicon */}
                <div className="shrink-0 flex items-center justify-center">
                  {isActive && isLoading ? (
                    <div className="w-3.5 h-3.5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin shrink-0" />
                  ) : tab.url.includes("google.com") ? (
                    /* Google 4-Color Favicon */
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                  ) : tab.url.includes("reddit.com") ? (
                    /* Reddit Official Alien Snoo */
                    <svg
                      className="w-3.5 h-3.5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="#FF4500"
                    >
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.56 12 8 12.56 8 13.25c0 .69.56 1.25 1.25 1.25.69 0 1.25-.56 1.25-1.25 0-.69-.56-1.25-1.25-1.25zm5.5 0c-.69 0-1.25.56-1.25 1.25 0 .69.56 1.25 1.25 1.25.69 0 1.25-.56 1.25-1.25 0-.69-.56-1.25-1.25-1.25zm-5.454 4.25a.34.34 0 0 0-.25.105.34.34 0 0 0 0 .48c.846.847 2.148 1.05 2.954 1.05s2.108-.203 2.954-1.05a.34.34 0 0 0 0-.48.34.34 0 0 0-.48 0c-.672.67-1.737.838-2.474.838s-1.802-.168-2.474-.838a.34.34 0 0 0-.23-.105z" />
                    </svg>
                  ) : tab.url.includes("rockstar") ? (
                    <span className="w-3.5 h-3.5 rounded bg-black flex items-center justify-center text-[9px] font-bold text-yellow-400 shrink-0 border border-yellow-400/40">
                      R★
                    </span>
                  ) : tab.url.includes("gta") || tab.url.includes("mod") ? (
                    <span className="w-3.5 h-3.5 rounded bg-pink-950 flex items-center justify-center text-[8px] font-black text-pink-400 shrink-0 border border-pink-500/50">
                      VI
                    </span>
                  ) : (
                    /* Clean Globe SVG */
                    <svg
                      className="w-3.5 h-3.5 text-gray-400 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  )}
                </div>

                {/* Tab Title */}
                <span className="truncate flex-1 font-sans">{tab.title}</span>

                {/* Tab Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(tab.id);
                  }}
                  className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                    isActive
                      ? "text-gray-400 hover:bg-[#3b3e45] hover:text-white"
                      : "opacity-0 group-hover:opacity-100 text-gray-400 hover:bg-[#3b3e45]"
                  }`}
                  title="Close tab"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  >
                    <line x1="1" y1="1" x2="9" y2="9" />
                    <line x1="9" y1="1" x2="1" y2="9" />
                  </svg>
                </button>
              </div>
            );
          })}

          {/* New Tab Button */}
          <button
            onClick={onNewTab}
            className="w-7 h-7 mb-1 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#2f3136] transition-colors shrink-0 ml-1"
            title="New tab"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>

        {/* Right: Windows Window Caption Controls (Minimize, Maximize/Restore, Close) */}
        <div className="flex items-center h-full shrink-0 ml-2 select-none">
          {/* Minimize */}
          <button
            onClick={handleMinimize}
            title="Minimize"
            className="w-11.5 h-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 active:bg-white/15 transition-colors cursor-pointer"
          >
            <svg width="10" height="1" viewBox="0 0 10 1">
              <rect width="10" height="1" fill="currentColor" />
            </svg>
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={handleMaximize}
            title={isMaximized ? "Restore Down" : "Maximize"}
            className="w-11.5 h-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 active:bg-white/15 transition-colors cursor-pointer"
          >
            {isMaximized ? (
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M2.5 0.5h7v7h-7z" />
                <path d="M0.5 2.5h7v7h-7z" fill="#1f1f23" />
              </svg>
            ) : (
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <rect x="0.5" y="0.5" width="9" height="9" />
              </svg>
            )}
          </button>

          {/* Close */}
          <button
            onClick={handleClose}
            title="Close"
            className="w-11.5 h-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#e81123] active:bg-[#c4101e] transition-colors cursor-pointer"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <line x1="0" y1="0" x2="10" y2="10" />
              <line x1="10" y1="0" x2="0" y2="10" />
            </svg>
          </button>
        </div>
      </div>

      {/* Chrome Navigation & Omnibox Bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#2b2d31]">
        {/* Navigation buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-[#3b3e45] transition-colors"
            title="Click to go back"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <button
            onClick={onForward}
            className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-[#3b3e45] transition-colors"
            title="Click to go forward"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          <button
            onClick={onReload}
            className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-[#3b3e45] transition-colors"
            title={isLoading ? "Stop loading this page" : "Reload this page"}
          >
            {isLoading ? (
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 4 23 10 17 10"></polyline>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
            )}
          </button>
          <button
            onClick={onHome}
            className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-[#3b3e45] transition-colors"
            title="Open Google"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </button>
        </div>

        {/* Omnibox / URL Bar */}
        <div
          className={`flex items-center flex-1 bg-[#1f1f23] rounded-full px-3 py-1.5 border transition-all ${
            isFocused
              ? "border-[#4f8eff] ring-2 ring-[#4f8eff]/20 shadow-inner"
              : "border-[#3a3c42] hover:border-[#4c4e57]"
          }`}
        >
          {/* Chrome Tune / Security Settings Icon */}
          <div
            className="flex items-center text-gray-400 mr-2 shrink-0 cursor-pointer hover:text-gray-200"
            title="View site information"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
          </div>

          {/* URL Input */}
          <input
            ref={inputRef}
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              setInputUrl(activeTab?.url || "");
            }}
            placeholder="Search Google or type a URL"
            className="w-full bg-transparent text-xs sm:text-sm text-gray-100 placeholder-gray-500 focus:outline-none font-sans"
          />

          {/* Omnibox actions: Bookmark Star */}
          <div className="flex items-center gap-1 text-gray-400 shrink-0 ml-1">
            <button
              className="p-1 hover:text-yellow-400 transition-colors cursor-pointer"
              title="Bookmark this tab"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </button>
          </div>
        </div>

        {/* Extensions, Downloads & Profile */}
        <div className="flex items-center gap-1 shrink-0 ml-1">
          {(() => {
            const activeDownload = downloads.find(
              (d) => d.status === "downloading"
            );
            const hasDownloads = downloads.length > 0;
            const progress = activeDownload?.progress || 0;

            return (
              <button
                onClick={onOpenDownloads}
                className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  activeDownload
                    ? "bg-[#383a48] text-[#c2e7ff]"
                    : hasDownloads
                      ? "bg-[#383a48] text-[#c2e7ff] hover:bg-[#434656]"
                      : "text-gray-300 hover:text-white hover:bg-[#3b3e45]"
                }`}
                title={
                  activeDownload
                    ? `Downloading: ${progress}% (${activeDownload.speedText || "100 MB/s"})`
                    : "Downloads"
                }
              >
                {/* Clockwise Progress Ring around icon while downloading */}
                {activeDownload && (
                  <svg
                    className="w-8 h-8 -rotate-90 absolute inset-0 pointer-events-none"
                    viewBox="0 0 32 32"
                  >
                    <circle
                      cx="16"
                      cy="16"
                      r="13"
                      stroke="#484a56"
                      strokeWidth="2.5"
                      fill="none"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="13"
                      stroke="#a8c7fa"
                      strokeWidth="2.5"
                      strokeDasharray="81.68"
                      strokeDashoffset={81.68 - (81.68 * progress) / 100}
                      strokeLinecap="round"
                      fill="none"
                      className="transition-all duration-100 ease-linear"
                    />
                  </svg>
                )}

                {/* Clean Chrome Download Icon */}
                <svg
                  className="w-4 h-4 text-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                  <path d="M7 11l5 5l5 -5" />
                  <path d="M12 4l0 12" />
                </svg>

                {activeDownloadsCount > 0 && !activeDownload && (
                  <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-blue-500 text-[9px] font-bold text-white rounded-full flex items-center justify-center">
                    {activeDownloadsCount}
                  </span>
                )}
              </button>
            );
          })()}

          {/* Chrome Extensions Puzzle Icon */}
          <button
            className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-[#3b3e45] transition-colors"
            title="Extensions"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19.439 7.85c0-1.571-1.286-2.85-2.87-2.85a3.86 3.86 0 0 0-3.414 2H8.845a2 2 0 0 0-2 2v3.085a3.86 3.86 0 0 0-2 3.415c0 1.584 1.299 2.87 2.87 2.87.697 0 1.33-.25 1.83-.665l.3.665h3.011a3.86 3.86 0 0 0 3.414-2h3.169a2 2 0 0 0 2-2V11.26a3.86 3.86 0 0 0-2-3.41z" />
            </svg>
          </button>

          {/* Google Account Profile Icon */}
          <div
            className="w-7 h-7 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] flex items-center justify-center text-xs font-bold text-white shadow cursor-pointer ml-0.5 transition-colors"
            title="Google Account: PwnSim Security"
          >
            P
          </div>

          {/* Chrome 3-Dots Menu */}
          <button
            className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-[#3b3e45] transition-colors"
            title="Customize and control Google Chrome"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="2"></circle>
              <circle cx="12" cy="12" r="2"></circle>
              <circle cx="12" cy="19" r="2"></circle>
            </svg>
          </button>
        </div>
      </div>

      {/* Chrome Loading Progress Bar Line */}
      {isLoading && (
        <div className="w-full h-0.5 bg-[#2b2d31] overflow-hidden">
          <div className="h-full bg-[#4f8eff] animate-pulse w-full transition-all duration-500" />
        </div>
      )}

      {/* Bookmarks Bar */}
      <div className="flex items-center gap-2 px-4 py-1.5 bg-[#232428] text-xs text-gray-300 border-t border-[#2d2f35] overflow-x-auto no-scrollbar">
        <button
          onClick={() => onNavigate("https://www.google.com")}
          className="flex items-center gap-1.5 hover:bg-[#32343a] px-2 py-0.5 rounded transition-colors"
        >
          {/* Google 4-Color Favicon */}
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Google</span>
        </button>

        <button
          onClick={() =>
            onNavigate("https://www.google.com/search?q=GTA+6+mod+download")
          }
          className="flex items-center gap-1.5 hover:bg-[#32343a] px-2 py-0.5 rounded transition-colors text-blue-400"
        >
          <span>GTA 6 Mod Search</span>
        </button>

        <button
          onClick={() =>
            onNavigate("https://www.gta6-mods.com/download/mod-engine-pc")
          }
          className="flex items-center gap-1.5 hover:bg-[#32343a] px-2 py-0.5 rounded transition-colors"
        >
          <span className="text-[10px] font-black text-pink-400">VI</span>
          <span>GTA6-Mods.com</span>
        </button>

        <button
          onClick={() =>
            onNavigate("https://www.reddit.com/r/GTA6/comments/modding_tools")
          }
          className="flex items-center gap-1.5 hover:bg-[#32343a] px-2 py-0.5 rounded transition-colors"
        >
          {/* Reddit Official Icon */}
          <svg
            className="w-3.5 h-3.5 shrink-0"
            viewBox="0 0 24 24"
            fill="#FF4500"
          >
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.56 12 8 12.56 8 13.25c0 .69.56 1.25 1.25 1.25.69 0 1.25-.56 1.25-1.25 0-.69-.56-1.25-1.25-1.25zm5.5 0c-.69 0-1.25.56-1.25 1.25 0 .69.56 1.25 1.25 1.25.69 0 1.25-.56 1.25-1.25 0-.69-.56-1.25-1.25-1.25zm-5.454 4.25a.34.34 0 0 0-.25.105.34.34 0 0 0 0 .48c.846.847 2.148 1.05 2.954 1.05s2.108-.203 2.954-1.05a.34.34 0 0 0 0-.48.34.34 0 0 0-.48 0c-.672.67-1.737.838-2.474.838s-1.802-.168-2.474-.838a.34.34 0 0 0-.23-.105z" />
          </svg>
          <span>r/GTA6</span>
        </button>

        <button
          onClick={() => onNavigate("https://www.rockstargames.com/VI")}
          className="flex items-center gap-1.5 hover:bg-[#32343a] px-2 py-0.5 rounded transition-colors"
        >
          <span className="font-bold text-yellow-400 text-[10px]">R★</span>
          <span>Rockstar Games</span>
        </button>

        <button
          onClick={() => onNavigate("https://www.youtube.com")}
          className="flex items-center gap-1.5 hover:bg-[#32343a] px-2 py-0.5 rounded transition-colors"
        >
          {/* YouTube Official Logo */}
          <svg
            className="w-3.5 h-3.5 shrink-0"
            viewBox="0 0 24 24"
            fill="#FF0000"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          <span>YouTube</span>
        </button>
      </div>
    </header>
  );
};
