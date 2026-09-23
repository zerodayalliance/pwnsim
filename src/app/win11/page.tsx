"use client";

import React from "react";
import { WindowsProvider } from "./_components/context/WindowsContext";
import { Desktop } from "./_components/desktop/Desktop";
import { WindowManager } from "./_components/windows/WindowManager";
import { Taskbar } from "./_components/taskbar/Taskbar";
import Pwn from "@/components/pwn";
import { useNetworkPwn } from "@/hooks/useNetworkPwn";

export default function Windows11Desktop() {
  const { isCompromised, isInfecting, threatDetails, resetNetworkPwn } =
    useNetworkPwn({
      deviceType: "win11",
      propagationDelayMs: 500,
      stagerDurationMs: 1400,
    });

  return (
    <WindowsProvider>
      <main
        className={`relative w-screen h-screen overflow-hidden select-none bg-neutral-950 font-sans transition-all duration-300 ${
          isCompromised || isInfecting
            ? "pointer-events-none filter blur-[0.8px] brightness-90"
            : ""
        }`}
      >
        <Desktop>
          <WindowManager />
        </Desktop>

        <Taskbar />
      </main>

      {/* Windows 11 Inbound SMB Exploit / Intrusion Stager Alert */}
      {isInfecting && (
        <div className="fixed inset-0 z-9998 flex items-center justify-center bg-black/60 backdrop-blur-xs pointer-events-auto select-none animate-in fade-in zoom-in-95 duration-150">
          <div className="w-135 max-w-[92vw] bg-[#1c1c1c] border-2 border-red-600 rounded-lg shadow-[0_0_50px_rgba(220,38,38,0.45)] text-neutral-200 overflow-hidden font-sans">
            {/* Title Bar */}
            <div className="bg-[#2b1214] px-4 py-2 flex items-center justify-between border-b border-red-900/60">
              <div className="flex items-center gap-2.5">
                <svg
                  className="w-5 h-5 text-red-500 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4zm-1 6h2v6h-2V8zm0 8h2v2h-2v-2z" />
                </svg>
                <span className="font-semibold text-[13px] text-red-300 tracking-wide">
                  Windows Security — Critical Network Threat Alert
                </span>
              </div>
              <span className="text-[11px] font-mono text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-800">
                0x80070005
              </span>
            </div>

            {/* Alert Body */}
            <div className="p-4 space-y-3 text-[12.5px] leading-relaxed">
              <div className="flex items-start gap-3 bg-red-950/40 p-3 rounded border border-red-900/50">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-ping mt-1 shrink-0" />
                <div>
                  <div className="font-bold text-white text-[13px]">
                    Active Network Worm Intrusion Detected
                  </div>
                  <div className="text-red-300 text-xs mt-0.5">
                    Trojan:Win32/WannaCrypt.Worm!exploit
                  </div>
                </div>
              </div>

              <div className="font-mono text-[11.5px] bg-[#141414] p-3 rounded border border-neutral-800 space-y-1 text-neutral-300">
                <p>
                  <span className="text-neutral-500">Source Host:</span>{" "}
                  <span className="text-amber-400 font-semibold">
                    {threatDetails?.sourceIp || "192.168.1.104"} (
                    {threatDetails?.sourceDevice || "Chrome Client"})
                  </span>
                </p>
                <p>
                  <span className="text-neutral-500">Destination:</span>{" "}
                  <span className="text-blue-400">
                    192.168.1.115:445 (SMBv1 Direct)
                  </span>
                </p>
                <p>
                  <span className="text-neutral-500">Exploit CVE:</span>{" "}
                  <span className="text-rose-400 font-bold">
                    CVE-2017-0144 (MS17-010 EternalBlue)
                  </span>
                </p>
                <p>
                  <span className="text-neutral-500">Kernel Hook:</span>{" "}
                  <span className="text-red-400">
                    lsass.exe PID 628 seized &bull; DoublePulsar ring-0
                  </span>
                </p>
              </div>

              <p className="text-rose-400 text-xs font-semibold animate-pulse flex items-center gap-1.5">
                <span>
                  ⚠️ High-integrity process encryption initiated. Restricting
                  desktop manager...
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Full WannaCry Ransomware Overlay */}
      {isCompromised && (
        <Pwn
          isOverlay={true}
          onExit={() => {
            resetNetworkPwn();
          }}
        />
      )}
    </WindowsProvider>
  );
}
