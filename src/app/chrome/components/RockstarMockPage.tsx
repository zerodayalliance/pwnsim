"use client";

import React from "react";
import Image from "next/image";

interface RockstarMockPageProps {
  onGoToSearch: () => void;
}

export const RockstarMockPage: React.FC<RockstarMockPageProps> = ({ onGoToSearch }) => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans select-none">
      {/* Rockstar Navbar */}
      <header className="border-b border-neutral-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-yellow-400 text-black font-black text-base flex items-center justify-center rounded-sm">
            R★
          </div>
          <span className="font-extrabold tracking-widest text-sm text-neutral-300 uppercase">
            Rockstar Games
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onGoToSearch}
            className="text-xs bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded font-bold uppercase tracking-wider transition-colors"
          >
            Back to Search
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto w-full px-6 py-12 flex flex-col items-center text-center">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 mb-8 max-h-[420px]">
          <Image
            src="/gta6_poster.jpg"
            alt="Rockstar Games Official GTA VI Key Art"
            width={1200}
            height={600}
            priority
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div className="text-left">
              <span className="text-pink-500 font-bold tracking-widest text-xs uppercase block">
                Official Announcement
              </span>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                Grand Theft Auto VI
              </h1>
            </div>
            <div className="hidden sm:block text-right">
              <span className="text-xs text-neutral-400 block">Coming</span>
              <span className="text-xl font-black text-yellow-400">2026</span>
            </div>
          </div>
        </div>

        <p className="max-w-2xl text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
          Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond in the biggest, most immersive evolution of the Grand Theft Auto series yet.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="px-4 py-2 rounded bg-neutral-900 border border-neutral-700 text-xs font-bold text-neutral-300">
            PLAYSTATION 5
          </div>
          <div className="px-4 py-2 rounded bg-neutral-900 border border-neutral-700 text-xs font-bold text-neutral-300">
            XBOX SERIES X|S
          </div>
          <div className="px-4 py-2 rounded bg-neutral-900/40 border border-neutral-800 text-xs font-medium text-neutral-500 line-through">
            PC (Not Announced)
          </div>
        </div>
      </div>
    </div>
  );
};
