"use client";

import React, { useState } from "react";
import {
  IconSearch,
  IconMicrophone,
  IconCamera,
  IconWorld,
  IconBrandReddit,
  IconBrandSteam,
  IconBrandGithub,
} from "@tabler/icons-react";

interface SearchResultsPageProps {
  query: string;
  onSearch: (query: string) => void;
  onNavigate: (url: string) => void;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  query,
  onSearch,
  onNavigate,
}) => {
  const [searchInput, setSearchInput] = useState(query);
  const [activeCategory, setActiveCategory] = useState("All");

  React.useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const results = [
    {
      id: "res-1",
      title: "GTA6-Mods.com - GTA 6 Mods, Tools, Scripts & Community Downloads",
      url: "https://www.gta6-mods.com/download/mod-engine-pc",
      displayUrl: "https://www.gta6-mods.com › tools › gta-6-mod-engine",
      siteName: "GTA6-Mods.com",
      snippet:
        "Download Grand Theft Auto VI Mod Engine & Script Hook v2.4 for PC. Includes Vice City ultra raytracing presets, community trainer scripts, vehicle spawners, and easy one-click mod installer.",
      sublinks: [
        {
          title: "Download Mod Engine v2.4 (PC)",
          desc: "Latest stable mod loader package with ASI injector.",
        },
        {
          title: "Vice City 4K Reshade Preset",
          desc: "Ultra-realistic lighting and raytraced reflections.",
        },
        {
          title: "Trainer & Money Mod",
          desc: "Gameplay spawner and custom script framework.",
        },
        {
          title: "Installation & Setup Guide",
          desc: "Step-by-step tutorial on installing mods on PC.",
        },
      ],
      iconType: "gta",
    },
    {
      id: "res-2",
      title: "Nexus Mods :: Grand Theft Auto VI Modding Community Hub",
      url: "https://www.nexusmods.com/gta6/mods/1",
      displayUrl: "https://www.nexusmods.com › gta6 › mods",
      siteName: "Nexus Mods",
      snippet:
        "Explore top rated Grand Theft Auto VI mods on Nexus Mods. Download Vortex mod manager support, high resolution car skins, sound overhauls, and character customization packs.",
      iconType: "nexus",
    },
    {
      id: "res-3",
      title: "GTAInside - GTA 6 PC Mod Downloads, Cars, Tools & Addons",
      url: "https://www.gtainside.com/en/gta6/mods",
      displayUrl: "https://www.gtainside.com › en › gta6 › mods",
      siteName: "GTAinside",
      snippet:
        "The leading portal for GTA modding since 2003. Browse verified GTA 6 mods, custom cars, scripts, and utilities uploaded and reviewed daily by the modding community.",
      iconType: "gtainside",
    },
    {
      id: "res-4",
      title: "r/GTA6 - Comprehensive Guide to GTA 6 PC Modding & Community Tools",
      url: "https://www.reddit.com/r/GTA6/comments/modding_tools",
      displayUrl: "https://www.reddit.com › r/GTA6 › comments › modding_guide",
      siteName: "Reddit",
      snippet:
        "Community megathread: Everything we know about early GTA 6 modding frameworks, texture tools, reverse engineering, and script hooks.",
      iconType: "reddit",
    },
    {
      id: "res-5",
      title: "Grand Theft Auto VI - Rockstar Games Official Website",
      url: "https://www.rockstargames.com/VI",
      displayUrl: "https://www.rockstargames.com › VI",
      siteName: "Rockstar Games",
      snippet:
        "Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond in the biggest evolution of the series yet. Coming 2026.",
      iconType: "rockstar",
    },
    {
      id: "res-6",
      title: "ModDB :: Grand Theft Auto VI Community Mods, Patches & Addons",
      url: "https://www.moddb.com/games/grand-theft-auto-vi/mods",
      displayUrl: "https://www.moddb.com › games › grand-theft-auto-vi › mods",
      siteName: "Mod DB",
      snippet:
        "Browse and download Grand Theft Auto VI mods, addons, total conversions, textures, and trainer plugins created by the ModDB community. Full game package size: 856.67 MB.",
      iconType: "moddb",
    },
    {
      id: "res-7",
      title: "Steam Community :: Grand Theft Auto VI PC Community Hub & Workshop",
      url: "https://steamcommunity.com/app/271590/discussions/gta6",
      displayUrl: "https://steamcommunity.com › app › gta6 › workshop",
      siteName: "Steam Community",
      snippet:
        "All Discussions, Screenshots, Artwork, Broadcasts, Videos, Workshop mods, News, and Guides for Grand Theft Auto VI on PC.",
      iconType: "steam",
    },
    {
      id: "res-8",
      title: "PC Gamer - Best GTA 6 PC Mods, Graphics Overhauls, and Setup Guide",
      url: "https://www.pcgamer.com/best-gta-6-mods-pc-guide",
      displayUrl: "https://www.pcgamer.com › hardware › best-gta-6-mods",
      siteName: "PC Gamer",
      snippet:
        "Everything you need to know about Grand Theft Auto 6 PC modding: essential script hooks, 4K raytracing texture packs (856.67 MB total asset suite), and performance guides.",
      iconType: "pcgamer",
    },
    {
      id: "res-9",
      title: "GameBanana - The GTA 6 Modding & Custom Content Community",
      url: "https://gamebanana.com/games/18920",
      displayUrl: "https://gamebanana.com › games › gta-6-mods",
      siteName: "GameBanana",
      snippet:
        "Free Grand Theft Auto VI mods, skins, UI themes, sound effects, custom weapons, and reshade packs uploaded and rated by contributors worldwide.",
      iconType: "gamebanana",
    },
    {
      id: "res-10",
      title: "GitHub - OpenVI / ScriptHookVI: C++ Native Script Extender for GTA VI",
      url: "https://github.com/OpenVI/ScriptHookVI-Core",
      displayUrl: "https://github.com › OpenVI › ScriptHookVI-Core",
      siteName: "GitHub",
      snippet:
        "Open-source native script extender, ASI loader plugin, and memory hook framework for Grand Theft Auto VI on PC. Full support for next-gen 856.67 MB game assets.",
      iconType: "github",
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  const navCategories = [
    "All",
    "Images",
    "Videos",
    "News",
    "Shopping",
    "Maps",
    "More",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#202124] text-white select-none">
      {/* Top Google Search Header */}
      <div className="border-b border-[#3c4043] px-6 pt-5 pb-0 bg-[#202124] sticky top-0 z-20">
        <div className="flex items-center gap-6 max-w-5xl">
          {/* Google Logo Mini */}
          <div
            onClick={() => onSearch("https://www.google.com")}
            className="text-2xl font-medium cursor-pointer shrink-0 select-none font-sans"
          >
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </div>

          {/* Search Bar Input */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-2xl relative"
          >
            <div className="flex items-center bg-[#303134] rounded-full px-4 py-2.5 shadow-md border border-transparent hover:border-[#5f6368] focus-within:border-[#8ab4f8] transition-all">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search Google"
                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm font-sans"
              />

              <div className="flex items-center gap-3 text-gray-400 ml-2 shrink-0">
                <button
                  type="button"
                  className="hover:text-blue-400 transition-colors"
                >
                  <IconMicrophone className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="hover:text-blue-400 transition-colors"
                >
                  <IconCamera className="w-4 h-4" />
                </button>
                <button
                  type="submit"
                  className="hover:text-blue-400 transition-colors pl-2 border-l border-gray-600"
                >
                  <IconSearch className="w-4 h-4 text-blue-400" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Google Navigation Tabs */}
        <div className="flex items-center gap-6 mt-4 max-w-5xl pl-20 sm:pl-28 text-sm text-gray-400 font-sans overflow-x-auto no-scrollbar">
          {navCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-3 text-xs transition-colors border-b-2 font-medium ${
                activeCategory === cat
                  ? "text-[#8ab4f8] border-[#8ab4f8]"
                  : "text-gray-400 border-transparent hover:text-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="ml-auto pb-3 text-xs text-gray-400 hover:text-gray-200 cursor-pointer">
            Tools
          </div>
        </div>
      </div>

      {/* Results Stats */}
      <div className="max-w-4xl px-6 sm:px-28 py-3 text-xs text-gray-400 border-b border-[#2d2f35]">
        About 12,400,000 results (0.38 seconds)
      </div>

      {/* Results List */}
      <div className="max-w-4xl px-6 sm:px-28 py-6 pb-20 flex flex-col gap-8">
        {results.map((result) => (
          <div key={result.id} className="flex flex-col group">
            {/* Site meta row */}
            <div
              onClick={() => onNavigate(result.url)}
              className="flex items-center gap-3 cursor-pointer mb-1"
            >
              <div className="w-7 h-7 rounded-full bg-[#303134] flex items-center justify-center shrink-0 border border-[#3c4043]">
                {result.iconType === "reddit" ? (
                  <IconBrandReddit className="w-4 h-4 text-orange-500" />
                ) : result.iconType === "rockstar" ? (
                  <span className="text-[10px] font-bold text-yellow-400">R★</span>
                ) : result.iconType === "steam" ? (
                  <IconBrandSteam className="w-4 h-4 text-sky-400" />
                ) : result.iconType === "github" ? (
                  <IconBrandGithub className="w-4 h-4 text-gray-200" />
                ) : result.iconType === "moddb" ? (
                  <span className="text-[9px] font-black text-red-500">DB</span>
                ) : result.iconType === "gta" ? (
                  <span className="text-[10px] font-black text-pink-400">VI</span>
                ) : (
                  <IconWorld className="w-4 h-4 text-gray-400" />
                )}
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-gray-200 font-medium">
                  {result.siteName}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {result.displayUrl}
                </span>
              </div>
            </div>

            {/* Clickable Title */}
            <h2
              onClick={() => onNavigate(result.url)}
              className="text-lg text-[#8ab4f8] group-hover:underline cursor-pointer font-sans font-normal leading-snug mt-0.5"
            >
              {result.title}
            </h2>

            {/* Snippet */}
            <p className="text-sm text-[#bdc1c6] leading-relaxed font-sans mt-1">
              {result.snippet}
            </p>

            {/* Sublinks if present */}
            {result.sublinks && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-2">
                {result.sublinks.map((sub, sIdx) => (
                  <div
                    key={sIdx}
                    onClick={() => onNavigate(result.url)}
                    className="cursor-pointer hover:underline"
                  >
                    <div className="text-xs text-[#8ab4f8] font-medium">
                      {sub.title}
                    </div>
                    <div className="text-[11px] text-gray-400 leading-normal">
                      {sub.desc}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
