"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  IconSearch,
  IconMicrophone,
  IconCamera,
  IconBrandYoutube,
  IconBrandReddit,
  IconBrandGithub,
} from "@tabler/icons-react";

interface GoogleHomePageProps {
  onSearch: (query: string) => void;
}

export const GoogleHomePage: React.FC<GoogleHomePageProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const gtaSuggestions = [
    "GTA 6 mod download",
    "GTA 6 mod download free",
    "GTA 6 PC release date",
    "GTA 6 mod engine PC",
    "GTA 6 system requirements PC",
    "GTA 6 trainer & cheats download",
    "GTA 6 vice city map",
    "GTA 6 graphics reshade 4K",
  ];

  const queryTrimmed = query.trim();
  const filteredSuggestions =
    queryTrimmed.length > 0
      ? gtaSuggestions.filter((s) =>
          s
            .toLowerCase()
            .includes(queryTrimmed.toLowerCase().replace("dowload", "download"))
        ).length > 0
        ? gtaSuggestions.filter((s) =>
            s
              .toLowerCase()
              .includes(
                queryTrimmed.toLowerCase().replace("dowload", "download")
              )
          )
        : [
            queryTrimmed,
            `${queryTrimmed} mod download`,
            `${queryTrimmed} PC download free`,
            "GTA 6 mod download",
          ]
      : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (searchQuery?: string) => {
    const raw = typeof searchQuery === "string" ? searchQuery : query;
    const term = raw.trim() || "GTA 6 mod download";
    setShowSuggestions(false);
    onSearch(term);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearchSubmit(query);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)] bg-[#202124] text-white select-none">
      <div className="flex justify-end items-center gap-4 px-6 py-4 text-sm text-gray-300">
        <button
          type="button"
          onClick={() => handleSearchSubmit("Gmail")}
          className="hover:underline text-xs sm:text-sm text-gray-300"
        >
          Gmail
        </button>
        <button
          type="button"
          onClick={() => handleSearchSubmit("Google Images")}
          className="hover:underline text-xs sm:text-sm text-gray-300"
        >
          Images
        </button>
        <div className="w-8 h-8 rounded-full hover:bg-[#303134] flex items-center justify-center cursor-pointer transition-colors text-gray-300">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#1a73e8] flex items-center justify-center text-xs font-medium text-white shadow">
          A
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center -mt-8 px-4 max-w-2xl mx-auto w-full">
        <div className="mb-8 select-none">
          <div className="text-6xl sm:text-7xl font-medium tracking-tight font-sans flex items-center">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </div>
        </div>

        <div ref={containerRef} className="w-full relative">
          <form onSubmit={handleSubmit} className="w-full relative z-20">
            <div
              className={`flex items-center bg-[#202124] border ${
                showSuggestions
                  ? "rounded-t-3xl border-[#5f6368] bg-[#303134] shadow-2xl"
                  : "rounded-full border-[#5f6368] hover:bg-[#303134] hover:border-transparent hover:shadow-md"
              } px-4 py-3 transition-all`}
            >
              <button
                type="submit"
                className="text-gray-400 hover:text-white mr-3 shrink-0 transition-colors"
                title="Search"
              >
                <IconSearch className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearchSubmit(query);
                  }
                }}
                placeholder="Search Google or type a URL"
                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-base font-sans"
              />

              <div className="flex items-center gap-3 ml-2 text-gray-400 shrink-0">
                <button
                  type="button"
                  onClick={() => handleSearchSubmit("Google Voice Search")}
                  className="hover:text-blue-400 transition-colors"
                  title="Search by voice"
                >
                  <IconMicrophone className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSearchSubmit("Google Lens")}
                  className="hover:text-blue-400 transition-colors"
                  title="Search by image"
                >
                  <IconCamera className="w-5 h-5" />
                </button>
              </div>
            </div>

            {showSuggestions &&
              queryTrimmed.length > 0 &&
              filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-[#303134] rounded-b-3xl shadow-2xl border-t border-[#3c4043] py-2 z-50 overflow-hidden">
                  {filteredSuggestions.slice(0, 5).map((item, index) => (
                    <div
                      key={index}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSearchSubmit(item);
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#3c4043] cursor-pointer transition-colors"
                    >
                      <IconSearch className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="text-sm text-gray-200 hover:text-white">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              )}
          </form>

          <div className="flex items-center justify-center gap-3 mt-6 relative z-10">
            <button
              type="button"
              onClick={() => handleSearchSubmit(query)}
              className="bg-[#303134] hover:bg-[#3c4043] hover:border-[#5f6368] border border-transparent text-sm text-gray-200 px-4 py-2 rounded-md transition-all font-sans cursor-pointer"
            >
              Google Search
            </button>
            <button
              type="button"
              onClick={() => handleSearchSubmit("GTA 6 mod download")}
              className="bg-[#303134] hover:bg-[#3c4043] hover:border-[#5f6368] border border-transparent text-sm text-gray-200 px-4 py-2 rounded-md transition-all font-sans cursor-pointer"
            >
              I&apos;m Feeling Lucky
            </button>
          </div>
        </div>

        <div className="mt-12 w-full">
          <div className="grid grid-cols-5 gap-4 justify-items-center">
            <div
              onClick={() =>
                onSearch("https://www.gta6-mods.com/download/mod-engine-pc")
              }
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-[#303134] group-hover:bg-[#3c4043] flex items-center justify-center transition-all shadow">
                <span className="text-xs font-black text-pink-400">VI</span>
              </div>
              <span className="text-xs text-gray-300 group-hover:text-white truncate max-w-20">
                GTA6 Mods
              </span>
            </div>

            <div
              onClick={() => onSearch("https://www.youtube.com")}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-[#303134] group-hover:bg-[#3c4043] flex items-center justify-center transition-all shadow">
                <IconBrandYoutube className="w-6 h-6 text-red-500" />
              </div>
              <span className="text-xs text-gray-300 group-hover:text-white truncate max-w-20">
                YouTube
              </span>
            </div>

            <div
              onClick={() =>
                onSearch("https://www.reddit.com/r/GTA6/comments/modding_tools")
              }
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-[#303134] group-hover:bg-[#3c4043] flex items-center justify-center transition-all shadow">
                <IconBrandReddit className="w-6 h-6 text-orange-500" />
              </div>
              <span className="text-xs text-gray-300 group-hover:text-white truncate max-w-20">
                r/GTA6
              </span>
            </div>

            <div
              onClick={() => onSearch("https://www.rockstargames.com/VI")}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-[#303134] group-hover:bg-[#3c4043] flex items-center justify-center transition-all shadow">
                <span className="text-sm font-bold text-yellow-400">R★</span>
              </div>
              <span className="text-xs text-gray-300 group-hover:text-white truncate max-w-20">
                Rockstar
              </span>
            </div>

            <div
              onClick={() => onSearch("https://github.com")}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-[#303134] group-hover:bg-[#3c4043] flex items-center justify-center transition-all shadow">
                <IconBrandGithub className="w-6 h-6 text-gray-200" />
              </div>
              <span className="text-xs text-gray-300 group-hover:text-white truncate max-w-20">
                GitHub
              </span>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#171717] text-gray-400 text-xs border-t border-[#2d2f35]">
        <div className="px-6 py-3 border-b border-[#2d2f35]">Google Search</div>
        <div className="flex flex-wrap justify-between items-center px-6 py-3 gap-4">
          <div className="flex items-center gap-6">
            <span className="hover:underline cursor-pointer">About</span>
            <span className="hover:underline cursor-pointer">Advertising</span>
            <span className="hover:underline cursor-pointer">Business</span>
            <span className="hover:underline cursor-pointer">
              How Search works
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:underline cursor-pointer">Privacy</span>
            <span className="hover:underline cursor-pointer">Terms</span>
            <span className="hover:underline cursor-pointer">Settings</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
