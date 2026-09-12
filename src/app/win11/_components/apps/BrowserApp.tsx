"use client";

import React, { useState } from "react";
import { useWindows } from "../context/WindowsContext";
import {
  IconArrowLeft,
  IconArrowRight,
  IconReload,
  IconHome,
  IconLock,
  IconPlus,
  IconX,
  IconSearch,
  IconWorld,
} from "../icons/Win11Icons";

interface BrowserTab {
  id: string;
  title: string;
  url: string;
}

interface BrowserAppProps {
  initialUrl?: string;
}

export function BrowserApp({ initialUrl }: BrowserAppProps) {
  const { themeMode } = useWindows();

  const [tabs, setTabs] = useState<BrowserTab[]>([
    {
      id: "tab-1",
      title: "Bing - Windows 11 Edge",
      url: initialUrl || "https://www.bing.com",
    },
  ]);
  const [activeTabId, setActiveTabId] = useState("tab-1");
  const [urlInput, setUrlInput] = useState(
    initialUrl || "https://www.bing.com"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const handleAddTab = () => {
    const newId = `tab-${Date.now()}`;
    const newTab: BrowserTab = {
      id: newId,
      title: "New Tab",
      url: "https://www.bing.com",
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newId);
    setUrlInput("https://www.bing.com");
    setSearchSubmitted(false);
  };

  const handleCloseTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    const nextTabs = tabs.filter((t) => t.id !== id);
    setTabs(nextTabs);
    if (activeTabId === id) {
      setActiveTabId(nextTabs[0].id);
      setUrlInput(nextTabs[0].url);
    }
  };

  const handleNavigate = (newUrl: string, title?: string) => {
    const formatted = newUrl.startsWith("http") ? newUrl : `https://${newUrl}`;
    setUrlInput(formatted);
    setTabs(
      tabs.map((t) =>
        t.id === activeTabId
          ? { ...t, url: formatted, title: title || newUrl }
          : t
      )
    );
    setSearchSubmitted(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    handleNavigate(
      `https://www.bing.com/search?q=${encodeURIComponent(searchQuery)}`,
      `${searchQuery} - Bing Search`
    );
    setSearchSubmitted(true);
  };

  const quickLinks = [
    {
      name: "GitHub",
      domain: "github.com",
      color: "#24292e",
      desc: "Code repository",
    },
    {
      name: "Next.js",
      domain: "nextjs.org",
      color: "#000000",
      desc: "React Framework",
    },
    {
      name: "ZeroDay Alliance",
      domain: "zerodayalliance.tech",
      color: "#0078D4",
      desc: "Security intelligence",
    },
    {
      name: "Wikipedia",
      domain: "wikipedia.org",
      color: "#636466",
      desc: "The Free Encyclopedia",
    },
    {
      name: "Tailwind CSS",
      domain: "tailwindcss.com",
      color: "#06B6D4",
      desc: "Modern styling",
    },
    {
      name: "Hacker News",
      domain: "news.ycombinator.com",
      color: "#FF6600",
      desc: "Tech headlines",
    },
  ];

  return (
    <div
      className={`flex flex-col h-full text-xs select-none ${
        themeMode === "dark"
          ? "bg-[#1b1c20] text-neutral-200"
          : "bg-[#f9fafb] text-neutral-800"
      }`}
    >
      <div
        className={`flex items-center px-2 pt-1.5 gap-1 border-b select-none ${
          themeMode === "dark"
            ? "bg-[#18191c] border-white/10"
            : "bg-[#e5e7eb] border-black/10"
        }`}
      >
        <div className="flex items-center gap-1 overflow-x-auto max-w-full">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                onClick={() => {
                  setActiveTabId(tab.id);
                  setUrlInput(tab.url);
                }}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-t-lg max-w-50 cursor-pointer transition-all border-t border-x ${
                  isActive
                    ? themeMode === "dark"
                      ? "bg-[#22252b] text-white border-white/10 shadow-sm"
                      : "bg-white text-neutral-900 border-black/10 shadow-sm"
                    : "hover:bg-white/10 text-neutral-400 border-transparent"
                }`}
              >
                <IconWorld className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate text-xs">{tab.title}</span>
                {tabs.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => handleCloseTab(tab.id, e)}
                    className="p-0.5 rounded-full hover:bg-white/20 text-neutral-400 hover:text-white shrink-0"
                  >
                    <IconX className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleAddTab}
          className="p-1 rounded-md hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          title="New Tab"
        >
          <IconPlus className="w-4 h-4" />
        </button>
      </div>

      <div
        className={`flex items-center gap-2 px-3 py-2 border-b ${
          themeMode === "dark"
            ? "bg-[#22252b] border-white/10"
            : "bg-white border-black/10"
        }`}
      >
        <button
          type="button"
          className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          title="Back"
        >
          <IconArrowLeft className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          title="Forward"
        >
          <IconArrowRight className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => handleNavigate(urlInput)}
          className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          title="Refresh"
        >
          <IconReload className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => handleNavigate("https://www.bing.com", "Bing")}
          className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          title="Home"
        >
          <IconHome className="w-3.5 h-3.5" />
        </button>

        <div
          className={`flex-1 flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
            themeMode === "dark"
              ? "bg-[#18191c] border-white/10 text-neutral-200 focus-within:border-blue-500"
              : "bg-[#f3f4f6] border-black/10 text-neutral-800 focus-within:border-blue-500"
          }`}
        >
          <IconLock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleNavigate(urlInput);
            }}
            className="w-full bg-transparent outline-none text-xs"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {searchSubmitted ? (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-lg font-semibold">
                Search Results for &ldquo;{searchQuery}&rdquo;
              </h2>
              <p className="text-neutral-400 text-xs mt-1">
                About 1,840,000 results (0.24 seconds)
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-1.5">
                <span className="text-[10px] text-emerald-400">
                  https://zerodayalliance.com/threats
                </span>
                <h3 className="text-sm font-semibold text-blue-400 hover:underline cursor-pointer">
                  {searchQuery} - ZeroDay Alliance Comprehensive Analysis
                </h3>
                <p className="text-xs text-neutral-300">
                  Detailed technical analysis, verification methods, and
                  real-time mitigation telemetry on {searchQuery}.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-1.5">
                <span className="text-[10px] text-neutral-400">
                  https://en.wikipedia.org/wiki/
                  {encodeURIComponent(searchQuery)}
                </span>
                <h3 className="text-sm font-semibold text-blue-400 hover:underline cursor-pointer">
                  {searchQuery} - Wikipedia, the free encyclopedia
                </h3>
                <p className="text-xs text-neutral-300">
                  Comprehensive historical background, architecture overview,
                  and community documentation for {searchQuery}.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-1.5">
                <span className="text-[10px] text-neutral-400">
                  https://nextjs.org/docs
                </span>
                <h3 className="text-sm font-semibold text-blue-400 hover:underline cursor-pointer">
                  Next.js App Router Documentation & Guidelines
                </h3>
                <p className="text-xs text-neutral-300">
                  Everything you need to know to build modern, high performance
                  web applications with Next.js and Tailwind CSS.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSearchSubmitted(false)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto flex flex-col items-center justify-center pt-8 pb-12 space-y-8">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-blue-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">
                Microsoft Edge
              </h1>
            </div>

            <form
              onSubmit={handleSearchSubmit}
              className={`w-full max-w-xl flex items-center gap-3 px-4 py-3 rounded-full border shadow-xl transition-all ${
                themeMode === "dark"
                  ? "bg-white/10 border-white/15 focus-within:border-blue-400 focus-within:bg-black/40"
                  : "bg-white border-black/15 focus-within:border-blue-500 focus-within:shadow-2xl"
              }`}
            >
              <IconSearch className="w-5 h-5 text-neutral-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search the web with Bing or enter URL..."
                className="w-full bg-transparent text-sm outline-none"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full text-xs transition-colors shrink-0"
              >
                Search
              </button>
            </form>

            <div className="w-full max-w-xl">
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 text-center">
                Frequently Visited
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {quickLinks.map((link, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSearchQuery(link.name);
                      handleNavigate(`https://${link.domain}`, link.name);
                      setSearchSubmitted(true);
                    }}
                    className="p-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-xs group-hover:text-blue-400 transition-colors">
                        {link.name}
                      </span>
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: link.color }}
                      />
                    </div>
                    <p className="text-[10px] text-neutral-400 truncate">
                      {link.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
