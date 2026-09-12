"use client";

import React, { useState, useEffect } from "react";
import { ChromeHeader } from "./components/ChromeHeader";
import { GoogleHomePage } from "./components/GoogleHomePage";
import { SearchResultsPage } from "./components/SearchResultsPage";
import { SuspiciousWebsite } from "./components/SuspiciousWebsite";
import { RedditMockPage } from "./components/RedditMockPage";
import { RockstarMockPage } from "./components/RockstarMockPage";
import { ChromeDownloadBubble } from "./components/ChromeDownloadBubble";
import Pwn from "@/components/pwn";
import { ChromeTab, DownloadItem } from "./types";

export default function ChromePage() {
  // Tabs State
  const [tabs, setTabs] = useState<ChromeTab[]>([
    {
      id: "tab-1",
      title: "Google",
      url: "https://www.google.com",
      isSecure: true,
      history: ["https://www.google.com"],
      historyIndex: 0,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState<string>("tab-1");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [renderedUrl, setRenderedUrl] = useState<string>("https://www.google.com");

  // Downloads State
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [isDownloadBubbleOpen, setIsDownloadBubbleOpen] = useState(false);
  const [isFreezing, setIsFreezing] = useState(false);
  const [isPwnActive, setIsPwnActive] = useState(false);

  // Global listener to immediately unfreeze and restore Chrome on exit
  useEffect(() => {
    const handleGlobalPwnExit = () => {
      setIsPwnActive(false);
      setIsFreezing(false);
    };
    window.addEventListener("pwn:exit", handleGlobalPwnExit);
    return () => {
      window.removeEventListener("pwn:exit", handleGlobalPwnExit);
    };
  }, []);

  const handleOpenFile = (filename: string) => {
    setIsDownloadBubbleOpen(false);
    setIsFreezing(true);

    // Freeze screen and flash realistic CMD stager for 850ms, then pop up malware
    setTimeout(() => {
      setIsFreezing(false);
      setIsPwnActive(true);
    }, 850);
  };

  // Active Tab helper
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  // Helper to determine title & security based on URL
  const getTabMetadata = (url: string) => {
    let title = "New Tab";
    let isSecure = true;

    if (url === "https://www.google.com" || url === "") {
      title = "Google";
      isSecure = true;
    } else if (url.includes("google.com/search")) {
      try {
        const u = new URL(url);
        const q = u.searchParams.get("q") || "GTA 6 mod download";
        title = `${q} - Google Search`;
      } catch {
        title = "GTA 6 mod download - Google Search";
      }
      isSecure = true;
    } else if (url.includes("gta6-mods.com")) {
      title = "GTA 6 Mod Engine v2.4 - GTA6-Mods.com";
      isSecure = true;
    } else if (url.includes("nexusmods.com")) {
      title = "GTA 6 Modding Community - Nexus Mods";
      isSecure = true;
    } else if (url.includes("gtainside.com")) {
      title = "GTA 6 PC Mods & Tools - GTAinside";
      isSecure = true;
    } else if (url.includes("moddb.com")) {
      title = "Grand Theft Auto VI Mods - Mod DB";
      isSecure = true;
    } else if (url.includes("gamebanana.com")) {
      title = "GTA 6 Mods & Custom Content - GameBanana";
      isSecure = true;
    } else if (url.includes("steamcommunity.com")) {
      title = "Steam Community :: GTA VI Workshop";
      isSecure = true;
    } else if (url.includes("pcgamer.com")) {
      title = "Best GTA 6 PC Mods Guide - PC Gamer";
      isSecure = true;
    } else if (url.includes("reddit.com")) {
      title = "r/GTA6: PC Modding Discussion - Reddit";
      isSecure = true;
    } else if (url.includes("rockstargames.com")) {
      title = "Grand Theft Auto VI - Rockstar Games";
      isSecure = true;
    } else {
      title = url.replace(/https?:\/\//, "").split("/")[0] || "Webpage";
      isSecure = true;
    }

    return { title, isSecure };
  };

  // Navigate current active tab with realistic network/render delay
  const handleNavigate = (url: string) => {
    const { title, isSecure } = getTabMetadata(url);

    // Immediately update URL in omnibox and tab history (like Chrome)
    setTabs((prevTabs) =>
      prevTabs.map((tab) => {
        if (tab.id !== activeTabId) return tab;
        const newHistory = tab.history.slice(0, tab.historyIndex + 1);
        newHistory.push(url);
        return {
          ...tab,
          url,
          title,
          isSecure,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        };
      })
    );

    // Realistic page request & rendering delay (600ms)
    setIsLoading(true);
    setTimeout(() => {
      setRenderedUrl(url);
      setIsLoading(false);
    }, 600);
  };

  // Back button with realistic delay
  const handleBack = () => {
    if (!activeTab || activeTab.historyIndex <= 0) return;
    const newIndex = activeTab.historyIndex - 1;
    const targetUrl = activeTab.history[newIndex];
    const { title, isSecure } = getTabMetadata(targetUrl);

    setTabs((prevTabs) =>
      prevTabs.map((t) =>
        t.id === activeTab.id
          ? {
              ...t,
              url: targetUrl,
              title,
              isSecure,
              historyIndex: newIndex,
            }
          : t
      )
    );

    setIsLoading(true);
    setTimeout(() => {
      setRenderedUrl(targetUrl);
      setIsLoading(false);
    }, 450);
  };

  // Forward button with realistic delay
  const handleForward = () => {
    if (!activeTab || activeTab.historyIndex >= activeTab.history.length - 1) return;
    const newIndex = activeTab.historyIndex + 1;
    const targetUrl = activeTab.history[newIndex];
    const { title, isSecure } = getTabMetadata(targetUrl);

    setTabs((prevTabs) =>
      prevTabs.map((t) =>
        t.id === activeTab.id
          ? {
              ...t,
              url: targetUrl,
              title,
              isSecure,
              historyIndex: newIndex,
            }
          : t
      )
    );

    setIsLoading(true);
    setTimeout(() => {
      setRenderedUrl(targetUrl);
      setIsLoading(false);
    }, 450);
  };

  // Reload button with realistic delay
  const handleReload = () => {
    if (!activeTab) return;
    setIsLoading(true);
    setTimeout(() => {
      setRenderedUrl(activeTab.url);
      setIsLoading(false);
    }, 500);
  };

  // Home button
  const handleHome = () => {
    handleNavigate("https://www.google.com");
  };

  // New tab
  const handleNewTab = () => {
    const newId = `tab-${Date.now()}`;
    const newTab: ChromeTab = {
      id: newId,
      title: "Google",
      url: "https://www.google.com",
      isSecure: true,
      history: ["https://www.google.com"],
      historyIndex: 0,
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newId);
    setRenderedUrl("https://www.google.com");
  };

  // Select tab
  const handleSelectTab = (id: string) => {
    setActiveTabId(id);
    const targetTab = tabs.find((t) => t.id === id);
    if (targetTab) {
      setRenderedUrl(targetTab.url);
    }
  };

  // Close tab
  const handleCloseTab = (id: string) => {
    if (tabs.length === 1) {
      setTabs([
        {
          id: "tab-1",
          title: "Google",
          url: "https://www.google.com",
          isSecure: true,
          history: ["https://www.google.com"],
          historyIndex: 0,
        },
      ]);
      setActiveTabId("tab-1");
      setRenderedUrl("https://www.google.com");
      return;
    }

    const remaining = tabs.filter((t) => t.id !== id);
    setTabs(remaining);
    if (activeTabId === id) {
      const nextTab = remaining[remaining.length - 1];
      setActiveTabId(nextTab.id);
      setRenderedUrl(nextTab.url);
    }
  };

  // Search handler from Google home or search bar
  const handleSearch = (query: string) => {
    if (query.startsWith("http://") || query.startsWith("https://")) {
      handleNavigate(query);
    } else {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
        query
      )}`;
      handleNavigate(searchUrl);
    }
  };

  // Download trigger from mod site (6 to 7 seconds animation at 100 MB/s)
  const handleTriggerDownload = (filename: string, size: string) => {
    const downloadId = `dl-${Date.now()}`;
    const totalDuration = 6500; // ~6.5 seconds
    const startTime = Date.now();

    const newItem: DownloadItem = {
      id: downloadId,
      filename,
      filesize: size,
      progress: 0,
      status: "downloading",
      url: activeTab?.url || "https://www.gta6-mods.com",
      timestamp: "Just now",
      downloadedText: "0 GB / 856.67 GB",
      speedText: "100.2 MB/s",
      timeLeftText: "7s left",
    };

    setDownloads((prev) => [newItem, ...prev]);
    // During download: only show the clockwise circular animation on toolbar icon
    setIsDownloadBubbleOpen(false);

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        setDownloads((prev) =>
          prev.map((d) =>
            d.id === downloadId
              ? {
                  ...d,
                  progress: 100,
                  status: "completed",
                  downloadedText: "856.67 GB",
                  speedText: "",
                  timeLeftText: "Done",
                }
              : d
          )
        );
        // Download complete: show the popup card matching user screenshot
        setIsDownloadBubbleOpen(true);
      } else {
        const progress = Math.min(
          99,
          Math.max(1, Math.round((elapsed / totalDuration) * 100))
        );
        const downloadedGb = ((progress / 100) * 856.67).toFixed(1);
        const remainingSec = Math.max(
          1,
          Math.ceil((totalDuration - elapsed) / 1000)
        );
        // Live slight fluctuation around 100 MB/s
        const speed = (98.6 + Math.sin(elapsed / 180) * 3.2).toFixed(1);

        setDownloads((prev) =>
          prev.map((d) =>
            d.id === downloadId
              ? {
                  ...d,
                  progress,
                  downloadedText: `${downloadedGb} GB / 856.67 GB`,
                  speedText: `${speed} MB/s`,
                  timeLeftText: `${remainingSec}s left`,
                }
              : d
          )
        );
      }
    }, 100);
  };

  const handleDismissDownload = (id: string) => {
    setDownloads((prev) => prev.filter((d) => d.id !== id));
  };

  // View router
  const renderWebContent = () => {
    const url = renderedUrl || activeTab?.url || "https://www.google.com";

    // GTA6 Mods & Portals
    if (
      url.includes("gta6-mods.com") ||
      url.includes("nexusmods.com") ||
      url.includes("gtainside.com") ||
      url.includes("moddb.com") ||
      url.includes("gamebanana.com") ||
      url.includes("pcgamer.com")
    ) {
      return <SuspiciousWebsite onTriggerDownload={handleTriggerDownload} />;
    }

    // Reddit Mock
    if (url.includes("reddit.com")) {
      return (
        <RedditMockPage
          onGoToSearch={() =>
            handleNavigate("https://www.google.com/search?q=GTA+6+mod+download")
          }
        />
      );
    }

    // Rockstar Games Mock
    if (url.includes("rockstargames.com")) {
      return (
        <RockstarMockPage
          onGoToSearch={() =>
            handleNavigate("https://www.google.com/search?q=GTA+6+mod+download")
          }
        />
      );
    }

    // Google Search Results
    if (url.includes("google.com/search")) {
      let query = "GTA 6 mod download";
      try {
        const u = new URL(url);
        query = u.searchParams.get("q") || "GTA 6 mod download";
      } catch {
        query = "GTA 6 mod download";
      }
      return (
        <SearchResultsPage
          query={query}
          onSearch={handleSearch}
          onNavigate={handleNavigate}
        />
      );
    }

    // Default Google Home
    return <GoogleHomePage onSearch={handleSearch} />;
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#181a1f]">
      {/* Chrome Application Shell (Frozen & Blurred when Pwn is active) */}
      <div
        className={`flex flex-col h-full w-full overflow-hidden text-gray-100 font-sans transition-all duration-300 ${
          isPwnActive || isFreezing
            ? "pointer-events-none select-none filter blur-[0.75px] contrast-[1.02] brightness-[0.96]"
            : ""
        }`}
      >
      {/* Chrome Shell Header */}
      <ChromeHeader
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={handleSelectTab}
        onCloseTab={handleCloseTab}
        onNewTab={handleNewTab}
        onNavigate={handleNavigate}
        onBack={handleBack}
        onForward={handleForward}
        onReload={handleReload}
        onHome={handleHome}
        downloads={downloads}
        onOpenDownloads={() => setIsDownloadBubbleOpen(!isDownloadBubbleOpen)}
        isLoading={isLoading}
      />

      {/* Modern Top-Right Chrome Download Bubble / Tray */}
      <ChromeDownloadBubble
        downloads={downloads}
        isOpen={isDownloadBubbleOpen}
        onClose={() => setIsDownloadBubbleOpen(false)}
        onDismiss={handleDismissDownload}
        onOpenFile={handleOpenFile}
      />

      {/* Browser Viewport */}
      <div className="flex-1 overflow-y-auto relative bg-[#202124]">
        {renderWebContent()}
      </div>
    </div>

    {/* Realistic Flashing CMD Execution Window on Zip Open */}
    {isFreezing && (
      <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/40 backdrop-blur-xs pointer-events-auto select-none">
        <div className="w-[580px] max-w-[90vw] bg-black border border-[#555555] shadow-2xl rounded font-mono text-xs text-neutral-200 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="bg-[#1f1f1f] px-3 py-1.5 flex items-center justify-between border-b border-[#333333]">
            <div className="flex items-center gap-2 text-[11px] text-neutral-300">
              <div className="w-3 h-3 bg-black border border-white flex items-center justify-center text-[8px] font-bold">_</div>
              <span>Administrator: C:\Windows\System32\cmd.exe</span>
            </div>
            <div className="text-[10px] text-neutral-500">PID 7412</div>
          </div>
          <div className="p-3.5 space-y-1.5 text-neutral-100 font-mono text-[11.5px] leading-relaxed">
            <p className="text-neutral-400">Microsoft Windows [Version 10.0.22631.3007]</p>
            <p className="text-neutral-400">(c) Microsoft Corporation. All rights reserved.</p>
            <p className="pt-1 text-white">
              C:\Users\Admin\Downloads&gt; <span className="text-emerald-400 font-bold">tar.exe -xf &quot;GTA6_Mod_Engine_v2.4.zip&quot;</span>
            </p>
            <p className="text-neutral-300">[+] Unpacking payload archive: update_engine_x64.exe ... OK</p>
            <p className="text-neutral-300">[+] Spawning high-integrity execution thread at PID 8192 ...</p>
            <p className="text-amber-400 animate-pulse font-semibold">[!] Hooking Display Driver &amp; Seizing Desktop Window Manager...</p>
          </div>
        </div>
      </div>
    )}

    {/* The Prank Malware Screen Overlay (No Red Background - Blocks Backside) */}
    {isPwnActive && (
      <Pwn
        isOverlay={true}
        onExit={() => {
          setIsPwnActive(false);
          setIsFreezing(false);
        }}
      />
    )}
    </div>
  );
}
