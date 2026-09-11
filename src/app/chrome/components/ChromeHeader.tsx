"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  IconArrowLeft,
  IconArrowRight,
  IconRotateClockwise,
  IconHome,
  IconLock,
  IconStar,
  IconDotsVertical,
  IconPlus,
  IconX,
  IconPuzzle,
  IconWorld,
  IconDownload,
  IconBrandGoogle,
  IconBrandReddit,
  IconBrandYoutube,
  IconBrandGithub,
} from "@tabler/icons-react";
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
}) => {
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const [inputUrl, setInputUrl] = useState(activeTab?.url || "");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isFocused && activeTab) {
      setInputUrl(activeTab.url);
    }
  }, [activeTab?.url, isFocused, activeTab]);

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

  return (
    <header className="flex flex-col bg-[#1f1f23] text-gray-200 select-none border-b border-[#2d2f36]">
      {/* Chrome Window Titlebar & Tab Strip */}
      <div className="flex items-center pt-2 px-3 gap-2 overflow-x-auto no-scrollbar">
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-2 mr-2 pl-1 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer hover:opacity-85" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] cursor-pointer hover:opacity-85" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] cursor-pointer hover:opacity-85" />
        </div>

        {/* Tab List */}
        <div className="flex items-center gap-1 flex-1 min-w-0 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`group relative flex items-center gap-2 px-3.5 py-2 text-xs rounded-t-lg transition-colors max-w-[240px] min-w-[130px] cursor-pointer ${
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
                    <IconBrandGoogle className="w-3.5 h-3.5 text-blue-400" />
                  ) : tab.url.includes("reddit.com") ? (
                    <IconBrandReddit className="w-3.5 h-3.5 text-orange-500" />
                  ) : tab.url.includes("rockstar") ? (
                    <span className="text-[11px] font-bold text-yellow-400">R★</span>
                  ) : tab.url.includes("gta") || tab.url.includes("mod") ? (
                    <span className="text-[10px] font-black text-pink-400">VI</span>
                  ) : (
                    <IconWorld className="w-3.5 h-3.5 text-gray-400" />
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
                  <IconX className="w-3 h-3" />
                </button>
              </div>
            );
          })}

          {/* New Tab Button */}
          <button
            onClick={onNewTab}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-[#2f3136] transition-colors shrink-0 ml-1"
            title="New tab"
          >
            <IconPlus className="w-4 h-4" />
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
            <IconArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onForward}
            className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-[#3b3e45] transition-colors"
            title="Click to go forward"
          >
            <IconArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={isLoading ? onReload : onReload}
            className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-[#3b3e45] transition-colors"
            title={isLoading ? "Stop loading" : "Reload this page"}
          >
            {isLoading ? (
              <IconX className="w-4 h-4 text-gray-300" />
            ) : (
              <IconRotateClockwise className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={onHome}
            className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-[#3b3e45] transition-colors"
            title="Open Google"
          >
            <IconHome className="w-4 h-4" />
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
          {/* Lock Icon */}
          <div
            className="flex items-center text-gray-400 mr-2 shrink-0"
            title="Connection security"
          >
            <IconLock className="w-3.5 h-3.5 text-gray-400" />
          </div>

          {/* URL Input */}
          <input
            ref={inputRef}
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search Google or type a URL"
            className="w-full bg-transparent text-xs sm:text-sm text-gray-100 placeholder-gray-500 focus:outline-none font-sans"
          />

          {/* Omnibox actions */}
          <div className="flex items-center gap-1 text-gray-400 shrink-0 ml-1">
            <button
              className="p-1 hover:text-yellow-400 transition-colors"
              title="Bookmark this tab"
            >
              <IconStar className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Extensions, Downloads & Profile */}
        <div className="flex items-center gap-1 shrink-0 ml-1">
          {(() => {
            const activeDownload = downloads.find((d) => d.status === "downloading");
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
                    {/* Track */}
                    <circle
                      cx="16"
                      cy="16"
                      r="13"
                      stroke="#484a56"
                      strokeWidth="2.5"
                      fill="none"
                    />
                    {/* Clockwise Animated Stroke */}
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

                {/* The exact Chrome download icon from user prompt */}
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

          <button
            className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-[#3b3e45] transition-colors"
            title="Extensions"
          >
            <IconPuzzle className="w-4 h-4" />
          </button>

          <div
            className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shadow cursor-pointer ml-1"
            title="Google Account"
          >
            P
          </div>

          <button
            className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-[#3b3e45] transition-colors"
            title="Chrome menu"
          >
            <IconDotsVertical className="w-4 h-4" />
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
          <IconBrandGoogle className="w-3.5 h-3.5 text-blue-400" />
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
          <span className="text-[10px] font-bold text-pink-400">VI</span>
          <span>GTA6-Mods.com</span>
        </button>
        <button
          onClick={() =>
            onNavigate("https://www.reddit.com/r/GTA6/comments/modding_tools")
          }
          className="flex items-center gap-1.5 hover:bg-[#32343a] px-2 py-0.5 rounded transition-colors"
        >
          <IconBrandReddit className="w-3.5 h-3.5 text-orange-500" />
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
          <IconBrandYoutube className="w-3.5 h-3.5 text-red-500" />
          <span>YouTube</span>
        </button>
      </div>
    </header>
  );
};
