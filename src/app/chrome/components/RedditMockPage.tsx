"use client";

import React from "react";
import {
  IconBrandReddit,
  IconArrowUp,
  IconArrowDown,
  IconMessageCircle,
  IconShare,
  IconBookmark,
} from "@tabler/icons-react";

interface RedditMockPageProps {
  onGoToSearch: () => void;
}

export const RedditMockPage: React.FC<RedditMockPageProps> = ({ onGoToSearch }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0e1113] text-gray-200 font-sans select-none pb-20">
      {/* Reddit Header */}
      <header className="bg-[#1a1a1b] border-b border-[#343536] px-6 py-2.5 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-orange-500 font-black text-xl tracking-tighter">
            <IconBrandReddit className="w-7 h-7" />
            <span className="text-white font-bold text-base hidden sm:inline">reddit</span>
          </div>
          <div className="bg-[#272729] px-3 py-1 rounded-full text-xs text-gray-300 font-semibold ml-2">
            r/GTA6
          </div>
        </div>

        <button
          onClick={onGoToSearch}
          className="text-xs bg-[#d93a00] hover:bg-[#ff4500] text-white px-3 py-1.5 rounded-full font-bold transition-colors"
        >
          Back to Google Search
        </button>
      </header>

      {/* Main Post Container */}
      <div className="max-w-4xl mx-auto w-full px-4 py-6">
        <div className="bg-[#1a1a1b] border border-[#343536] rounded-xl overflow-hidden flex">
          {/* Vote sidebar */}
          <div className="bg-[#151516] p-3 flex flex-col items-center gap-1 border-r border-[#343536] shrink-0 w-12">
            <IconArrowUp className="w-5 h-5 text-orange-500 cursor-pointer hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-white">3.8k</span>
            <IconArrowDown className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-500 transition-colors" />
          </div>

          {/* Post Content */}
          <div className="p-5 flex-1">
            {/* Meta */}
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
              <span className="font-bold text-white">r/GTA6</span>
              <span>&bull;</span>
              <span>Posted by u/ViceCityCoder</span>
              <span>&bull;</span>
              <span>2 days ago</span>
              <span className="bg-[#272729] text-gray-300 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                COMMUNITY DISCUSSION
              </span>
            </div>

            {/* Title */}
            <h1 className="text-xl font-bold text-white mb-4">
              GTA 6 PC Modding Framework &amp; Script Hook Early Architecture Discussion
            </h1>

            {/* Body */}
            <div className="text-sm text-gray-300 space-y-4 leading-relaxed border-b border-[#343536] pb-5">
              <p>
                With early documentation for GTA 6 modding emerging on GTA6-Mods.com and Nexus, here is an overview of how the new DirectX 12 ASI loader and script injection framework works compared to GTA 5&apos;s ScriptHookV.
              </p>

              <h3 className="font-bold text-white text-base">Key Technical Improvements:</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-300">
                <li>Native DirectX 12 hook support for dynamic shader remapping.</li>
                <li>Asynchronous memory injection via clean ASI loaders.</li>
                <li>Multi-threaded script hooks for complex AI and traffic modifications.</li>
                <li>Built-in sandbox mod directories so you never have to replace vanilla RPF game files.</li>
              </ul>

              <p className="text-xs text-gray-400">
                Check out the latest releases and discussion threads over on the community mod portals.
              </p>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center gap-4 text-xs text-gray-400 pt-3">
              <div className="flex items-center gap-1.5 hover:bg-[#272729] px-2 py-1 rounded cursor-pointer">
                <IconMessageCircle className="w-4 h-4" />
                <span>312 Comments</span>
              </div>
              <div className="flex items-center gap-1.5 hover:bg-[#272729] px-2 py-1 rounded cursor-pointer">
                <IconShare className="w-4 h-4" />
                <span>Share</span>
              </div>
              <div className="flex items-center gap-1.5 hover:bg-[#272729] px-2 py-1 rounded cursor-pointer">
                <IconBookmark className="w-4 h-4" />
                <span>Save</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
