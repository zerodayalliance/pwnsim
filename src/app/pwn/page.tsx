import Pwn from "@/components/pwn";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Pwn Demo | PwnSim | ZeroDay Alliance",
  description: "Interactive Pwn Demo for PwnSim by ZeroDay Alliance",
};

export default function PwnDemo() {
  return (
    <main className="relative h-screen w-screen overflow-hidden select-none bg-[#0a0d14]">
      {/* Frozen Desktop Background (Backside blocked) */}
      <div className="absolute inset-0 filter blur-[0.75px] brightness-[0.96] pointer-events-none">
        <Image
          src="/win11/wallpapers/bloom-dark.jpg"
          alt="Frozen Windows Desktop"
          fill
          priority
          className="object-cover"
        />
        {/* Subtle grid of desktop icons */}
        <div className="absolute top-4 left-4 flex flex-col gap-5">
          <div className="flex flex-col items-center gap-1 w-18 p-1 rounded hover:bg-white/10 text-white text-[11px] text-center drop-shadow">
            <div className="w-10 h-10 rounded bg-blue-500/30 flex items-center justify-center border border-white/20">
              📁
            </div>
            <span>This PC</span>
          </div>
          <div className="flex flex-col items-center gap-1 w-18 p-1 rounded hover:bg-white/10 text-white text-[11px] text-center drop-shadow">
            <div className="w-10 h-10 rounded bg-amber-500/30 flex items-center justify-center border border-white/20">
              🗜️
            </div>
            <span className="truncate max-w-[70px]">GTA6_Mod.zip</span>
          </div>
          <div className="flex flex-col items-center gap-1 w-18 p-1 rounded hover:bg-white/10 text-white text-[11px] text-center drop-shadow">
            <div className="w-10 h-10 rounded bg-emerald-500/30 flex items-center justify-center border border-white/20">
              🌐
            </div>
            <span>Chrome</span>
          </div>
        </div>
      </div>

      {/* Malware Locker Window & Screen Blocker with Red Page Background */}
      <Pwn />
    </main>
  );
}
