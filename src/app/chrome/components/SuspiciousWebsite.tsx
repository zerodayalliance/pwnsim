"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  IconDownload,
  IconStar,
  IconCheck,
  IconShare,
  IconThumbUp,
  IconCpu,
} from "@tabler/icons-react";

interface ModWebsiteProps {
  onTriggerDownload: (filename: string, size: string) => void;
}

export const SuspiciousWebsite: React.FC<ModWebsiteProps> = ({
  onTriggerDownload,
}) => {
  const [activeTab, setActiveTab] = useState<
    "description" | "files" | "install" | "comments"
  >("description");
  const [likesCount, setLikesCount] = useState(4892);
  const [hasLiked, setHasLiked] = useState(false);
  const [downloadCount, setDownloadCount] = useState(142580);

  const handleDownload = (
    filename = "GTA6_Mod_Engine_v2.4.zip",
    size = "420.69 MB"
  ) => {
    setDownloadCount((prev) => prev + 1);
    onTriggerDownload(filename, size);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikesCount((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikesCount((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#111216] text-gray-200 font-sans select-none pb-24">
      {/* Top Portal Navbar */}
      <header className="bg-[#1b1d24] border-b border-[#2a2d38] sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center font-black text-white text-base shadow">
              VI
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-wider text-base text-white font-sans">
                GTA6-MODS<span className="text-pink-500">.COM</span>
              </span>
              <span className="text-[10px] text-gray-400 -mt-1 hidden sm:block">
                The Community Database for GTA VI PC Mods
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-gray-300">
            <span className="text-pink-400 hover:text-white cursor-pointer transition-colors">
              MODS
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              SCRIPTS &amp; TOOLS
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              VEHICLES
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              GRAPHICS
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              TUTORIALS
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              FORUMS
            </span>
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleDownload()}
              className="bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold px-3.5 py-1.5 rounded transition-colors flex items-center gap-1.5 shadow"
            >
              <IconDownload className="w-3.5 h-3.5" />
              <span>Fast Download</span>
            </button>
            <div className="w-7 h-7 rounded-full bg-[#2a2d38] flex items-center justify-center text-xs font-medium text-gray-300 cursor-pointer">
              U
            </div>
          </div>
        </div>
      </header>

      {/* Sub-nav categories bar */}
      <div className="bg-[#16181f] border-b border-[#252834] px-4 py-2 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[11px] overflow-x-auto no-scrollbar">
          <span className="hover:text-gray-200 cursor-pointer">Home</span>
          <span>&rsaquo;</span>
          <span className="hover:text-gray-200 cursor-pointer">Tools</span>
          <span>&rsaquo;</span>
          <span className="hover:text-gray-200 cursor-pointer">
            Scripting Frameworks
          </span>
          <span>&rsaquo;</span>
          <span className="text-gray-200 font-medium truncate">
            Grand Theft Auto VI Mod Engine &amp; Script Hook v2.4.0
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6">
        {/* Mod Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#262936]">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Grand Theft Auto VI Mod Engine &amp; Script Hook v2.4.0
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mt-1.5">
              <span>
                By{" "}
                <strong className="text-pink-400 hover:underline cursor-pointer">
                  ViceModdingTeam
                </strong>
              </span>
              <span>&bull;</span>
              <span>
                Version: <strong>2.4.0</strong>
              </span>
              <span>&bull;</span>
              <span>
                Updated: <strong>September 2026</strong>
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1 text-amber-400">
                <IconStar className="w-3.5 h-3.5 fill-amber-400" />
                4.9 / 5.0 (1,420 ratings)
              </span>
            </div>
          </div>

          {/* Social / Likes Bar */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold border transition-all ${
                hasLiked
                  ? "bg-pink-600/20 border-pink-500 text-pink-400"
                  : "bg-[#1f222b] border-[#313645] hover:bg-[#282c38] text-gray-300"
              }`}
            >
              <IconThumbUp className="w-3.5 h-3.5" />
              <span>{likesCount.toLocaleString()}</span>
            </button>
            <button className="flex items-center gap-1.5 bg-[#1f222b] border border-[#313645] hover:bg-[#282c38] text-gray-300 px-3 py-1.5 rounded text-xs font-semibold transition-colors">
              <IconShare className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Layout Grid: Gallery + Download Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Left / Center Column: Gallery & Details */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Featured Poster & Media Preview */}
            <div className="bg-[#171922] border border-[#272b38] rounded-xl overflow-hidden shadow-lg">
              {/* Main Banner Image (The GTA 6 Poster) */}
              <div className="relative w-full max-h-[460px] overflow-hidden bg-black flex items-center justify-center">
                <Image
                  src="/gta6_poster.jpg"
                  alt="Grand Theft Auto VI Official Key Art"
                  width={900}
                  height={500}
                  priority
                  className="w-full h-auto object-cover object-center max-h-[460px]"
                />
                <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded text-xs font-medium text-white flex items-center gap-2">
                  <span>Grand Theft Auto VI &bull; Vice City Mod Engine</span>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="p-3 bg-[#13151c] border-t border-[#252836] flex items-center gap-2 overflow-x-auto">
                <div className="w-20 h-12 rounded border-2 border-pink-500 overflow-hidden shrink-0 cursor-pointer relative">
                  <Image
                    src="/gta6_poster.jpg"
                    alt="Poster thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-20 h-12 rounded bg-[#202330] border border-[#2e3344] flex items-center justify-center text-[10px] text-gray-400 font-semibold shrink-0 cursor-pointer hover:bg-[#282c3d]">
                  Trailer UI
                </div>
                <div className="w-20 h-12 rounded bg-[#202330] border border-[#2e3344] flex items-center justify-center text-[10px] text-gray-400 font-semibold shrink-0 cursor-pointer hover:bg-[#282c3d]">
                  Reshade 4K
                </div>
                <div className="w-20 h-12 rounded bg-[#202330] border border-[#2e3344] flex items-center justify-center text-[10px] text-gray-400 font-semibold shrink-0 cursor-pointer hover:bg-[#282c3d]">
                  Car Spawner
                </div>
              </div>
            </div>

            {/* Navigation Tabs (Description, Files, Installation, Comments) */}
            <div className="bg-[#171922] border border-[#272b38] rounded-xl overflow-hidden">
              <div className="flex border-b border-[#252836] bg-[#13151c] px-4 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`py-3 px-4 border-b-2 transition-colors ${
                    activeTab === "description"
                      ? "border-pink-500 text-pink-400"
                      : "border-transparent text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("files")}
                  className={`py-3 px-4 border-b-2 transition-colors ${
                    activeTab === "files"
                      ? "border-pink-500 text-pink-400"
                      : "border-transparent text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Files (3)
                </button>
                <button
                  onClick={() => setActiveTab("install")}
                  className={`py-3 px-4 border-b-2 transition-colors ${
                    activeTab === "install"
                      ? "border-pink-500 text-pink-400"
                      : "border-transparent text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Installation Guide
                </button>
                <button
                  onClick={() => setActiveTab("comments")}
                  className={`py-3 px-4 border-b-2 transition-colors ${
                    activeTab === "comments"
                      ? "border-pink-500 text-pink-400"
                      : "border-transparent text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Comments (184)
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6 text-sm text-gray-300 leading-relaxed font-sans">
                {activeTab === "description" && (
                  <div className="space-y-4">
                    <p>
                      <strong>GTA VI Mod Engine &amp; Script Hook</strong> is
                      the complete community modding framework for Grand Theft
                      Auto VI on PC. It allows developers and gamers to create,
                      load, and run custom ASI plugins, C# scripts, vehicle
                      models, and graphics reshade presets seamlessly.
                    </p>

                    <h3 className="text-base font-bold text-white pt-2">
                      Key Features:
                    </h3>
                    <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-300">
                      <li>
                        Full DirectX 12 hook support for Vice City rendering
                        engine.
                      </li>
                      <li>
                        Includes native ASI loader (
                        <code className="bg-[#202330] px-1 py-0.5 rounded text-pink-300 font-mono">
                          dinput8.dll
                        </code>
                        ).
                      </li>
                      <li>
                        Built-in native trainer menu toggled with{" "}
                        <kbd className="bg-[#202330] px-1.5 py-0.5 rounded border border-gray-600 text-[11px]">
                          F4
                        </kbd>
                        .
                      </li>
                      <li>
                        Weather controller, time multiplier, vehicle spawning,
                        and character selector.
                      </li>
                      <li>
                        Automatic mod folder isolation to prevent altering
                        vanilla core files.
                      </li>
                    </ul>

                    <h3 className="text-base font-bold text-white pt-2">
                      Changelog v2.4.0:
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
                      <li>Added updated memory offsets for patch 1.0.4.</li>
                      <li>
                        Fixed crash when spawning high-polygon sports cars in
                        Vice Beach.
                      </li>
                      <li>
                        Optimized raytraced shadow buffer allocation for
                        smoother FPS.
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === "files" && (
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-[#12141a] border border-[#272b38] flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">
                            GTA6_Mod_Engine_v2.4.0.zip
                          </span>
                          <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-700/50 px-2 py-0.5 rounded font-semibold">
                            LATEST STABLE
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          Size: 420.69 MB &bull; Uploaded: September 11, 2026
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleDownload(
                            "GTA6_Mod_Engine_v2.4.0.zip",
                            "420.69 MB"
                          )
                        }
                        className="bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold px-4 py-2 rounded transition-colors flex items-center gap-1.5"
                      >
                        <IconDownload className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>

                    <div className="p-4 rounded-lg bg-[#12141a] border border-[#272b38] flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">
                            GTA6_Reshade_ViceCity_Ultra.zip
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          Size: 18.4 MB &bull; Uploaded: September 8, 2026
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleDownload(
                            "GTA6_Reshade_ViceCity_Ultra.zip",
                            "18.4 MB"
                          )
                        }
                        className="bg-[#242734] hover:bg-[#2f3344] text-gray-200 text-xs font-bold px-4 py-2 rounded transition-colors flex items-center gap-1.5"
                      >
                        <IconDownload className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "install" && (
                  <div className="space-y-3 text-xs">
                    <h3 className="text-sm font-bold text-white">
                      Quick Installation Guide:
                    </h3>
                    <ol className="list-decimal pl-5 space-y-2 text-gray-300">
                      <li>
                        Download{" "}
                        <code className="bg-[#202330] px-1 py-0.5 rounded text-pink-300 font-mono">
                          GTA6_Mod_Engine_v2.4.0.zip
                        </code>
                        .
                      </li>
                      <li>
                        Extract the archive using 7-Zip or WinRAR into your main
                        GTA 6 installation directory (where{" "}
                        <code className="bg-[#202330] px-1 py-0.5 rounded font-mono">
                          GTA6.exe
                        </code>{" "}
                        is located).
                      </li>
                      <li>
                        Ensure{" "}
                        <code className="bg-[#202330] px-1 py-0.5 rounded font-mono">
                          ScriptHookVI.dll
                        </code>{" "}
                        and{" "}
                        <code className="bg-[#202330] px-1 py-0.5 rounded font-mono">
                          dinput8.dll
                        </code>{" "}
                        are placed in the same directory.
                      </li>
                      <li>
                        Launch the game normally and press{" "}
                        <kbd className="bg-[#202330] px-1.5 py-0.5 rounded border border-gray-600">
                          F4
                        </kbd>{" "}
                        to open the in-game trainer menu.
                      </li>
                    </ol>
                  </div>
                )}

                {activeTab === "comments" && (
                  <div className="space-y-4 text-xs">
                    <div className="p-3 bg-[#12141a] rounded-lg border border-[#272b38]">
                      <div className="flex items-center justify-between font-semibold text-pink-400">
                        <span>ViceCityDrifter</span>
                        <span className="text-gray-400 font-normal text-[11px]">
                          2 hours ago
                        </span>
                      </div>
                      <p className="text-gray-300 mt-1">
                        Works flawlessly with the latest update! Spawning
                        vehicles via F4 menu is smooth and no frame drops.
                        Thanks for maintaining this framework.
                      </p>
                    </div>

                    <div className="p-3 bg-[#12141a] rounded-lg border border-[#272b38]">
                      <div className="flex items-center justify-between font-semibold text-blue-400">
                        <span>RaytraceFanatic</span>
                        <span className="text-gray-400 font-normal text-[11px]">
                          Yesterday
                        </span>
                      </div>
                      <p className="text-gray-300 mt-1">
                        Reshade preset combined with the script hook looks
                        mind-blowing on an RTX 4080. Highly recommend.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Download Box & Details Card */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Primary Download Action Box */}
            <div className="bg-[#171922] border border-[#272b38] rounded-xl p-5 shadow-lg flex flex-col gap-4">
              <div>
                <span className="text-[11px] font-semibold text-pink-400 uppercase tracking-wider block mb-1">
                  Ready to Download
                </span>
                <div className="text-base font-bold text-white">
                  GTA6_Mod_Engine_v2.4.zip
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  Package Size: 420.69 MB &bull; SHA-256 Verified
                </div>
              </div>

              {/* Main Download Button */}
              <button
                onClick={() =>
                  handleDownload("GTA6_Mod_Engine_v2.4.zip", "420.69 MB")
                }
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base py-3.5 px-4 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <IconDownload className="w-5 h-5" />
                <span>DOWNLOAD (420.69 MB)</span>
              </button>

              {/* Alternative Mirrors */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    handleDownload(
                      "GTA6_Mod_Engine_v2.4_Mirror1.zip",
                      "420.69 MB"
                    )
                  }
                  className="bg-[#202330] hover:bg-[#282d3d] border border-[#303546] text-xs text-gray-200 py-2 px-3 rounded font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <IconDownload className="w-3.5 h-3.5 text-blue-400" />
                  <span>Mirror 1</span>
                </button>
                <button
                  onClick={() =>
                    handleDownload(
                      "GTA6_Mod_Engine_v2.4_Mirror2.zip",
                      "420.69 MB"
                    )
                  }
                  className="bg-[#202330] hover:bg-[#282d3d] border border-[#303546] text-xs text-gray-200 py-2 px-3 rounded font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <IconDownload className="w-3.5 h-3.5 text-blue-400" />
                  <span>Mirror 2</span>
                </button>
              </div>

              {/* Verification Info */}
              <div className="bg-[#12141a] p-3 rounded-lg border border-[#252836] text-xs text-gray-400 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span>File Safety:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <IconCheck className="w-3.5 h-3.5" />
                    Verified Clean
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total Downloads:</span>
                  <span className="text-white font-mono">
                    {downloadCount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Compatibility:</span>
                  <span className="text-gray-200">
                    Windows 10 / 11 (64-bit)
                  </span>
                </div>
              </div>
            </div>

            {/* Mod Info Details Card */}
            <div className="bg-[#171922] border border-[#272b38] rounded-xl p-5 text-xs text-gray-300">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <IconCpu className="w-4 h-4 text-pink-400" />
                <span>System Requirements</span>
              </h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex justify-between border-b border-[#242735] pb-1.5">
                  <span>OS</span>
                  <span className="text-gray-200 font-medium">
                    Windows 10/11 64-bit
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#242735] pb-1.5">
                  <span>DirectX</span>
                  <span className="text-gray-200 font-medium">Version 12</span>
                </div>
                <div className="flex justify-between border-b border-[#242735] pb-1.5">
                  <span>Framework</span>
                  <span className="text-gray-200 font-medium">
                    Microsoft .NET 8.0
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Target Game</span>
                  <span className="text-gray-200 font-medium">
                    Grand Theft Auto VI (PC)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-[#202330] py-8 text-center text-xs text-gray-500">
        <p>&copy; 2026 GTA6-Mods.com &bull; Community Modification Archive.</p>
        <p className="mt-1 text-[11px] text-gray-600">
          Grand Theft Auto and all related titles are trademarks of Rockstar
          Games / Take-Two Interactive.
        </p>
      </footer>
    </div>
  );
};
