"use client";

import React, { useState } from "react";
import {
  IconShieldExclamation,
  IconX,
  IconCheck,
  IconTerminal2,
  IconLock,
  IconClock,
  IconFileZip,
} from "@tabler/icons-react";
import { DownloadItem } from "../types";

interface ThreatModalProps {
  item: DownloadItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ThreatModal: React.FC<ThreatModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<
    "analysis" | "payload" | "checklist"
  >("analysis");

  if (!isOpen) return null;

  const redFlags = [
    {
      title: "Absurdly Small File Size",
      severity: "CRITICAL",
      description:
        "The site claims to offer the entire 'GTA 6 Mod Loader & Developer Game Engine' in just 45.2 MB. A real next-gen open world game mod with 4K textures is tens of gigabytes. 45 MB is typical for a bundled dropper/stealer executable.",
      icon: <IconFileZip className="w-5 h-5 text-red-400" />,
    },
    {
      title: "Demanding to Disable Antivirus / Defender",
      severity: "CRITICAL",
      description:
        "Classic social engineering tactic. Malicious sites tell users that detections like 'Trojan.Win32.Agent' are '100% false positives' so victims will turn off security shields before running the malicious payload.",
      icon: <IconShieldExclamation className="w-5 h-5 text-red-400" />,
    },
    {
      title: "Insecure HTTP Protocol & Cheap TLD (.xyz)",
      severity: "HIGH",
      description:
        "The URL 'http://gta6-mods-free-vip-download.xyz' has no valid TLS/SSL certificate and uses an ephemeral disposable domain frequently favored by phishing/malware distribution campaigns.",
      icon: <IconLock className="w-5 h-5 text-amber-400" />,
    },
    {
      title: "Fake Countdown Timer & Artificial Urgency",
      severity: "HIGH",
      description:
        "A ticking countdown timer and 'Only 3 VIP server slots left' create artificial panic to make visitors download immediately without double-checking safety.",
      icon: <IconClock className="w-5 h-5 text-amber-400" />,
    },
    {
      title: "Suspicious Testimonial Hints (CMD window flashing)",
      severity: "HIGH",
      description:
        "A fake review notes: 'Why did a black CMD window flash for 2 seconds?'. This is the quintessential behavior of a silent bat script or PowerShell stager installing persistence or downloading a second-stage info-stealer.",
      icon: <IconTerminal2 className="w-5 h-5 text-yellow-400" />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#181a20] border border-red-500/50 rounded-2xl max-w-2xl w-full text-gray-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-linear-to-r from-red-950 via-[#231818] to-[#181a20] p-5 border-b border-red-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/30 border border-red-500/50 flex items-center justify-center text-red-400">
              <IconShieldExclamation className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Cyber Threat Intelligence Inspector
                </h3>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-red-600 text-white uppercase tracking-wider">
                  THREAT DETECTED
                </span>
              </div>
              <p className="text-xs text-red-200/80 mt-0.5 font-mono">
                Target: {item?.filename || "GTA6_Ultra_Mod_Setup_v2.4.exe"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-[#2d3039] bg-[#14161b] px-5 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("analysis")}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === "analysis"
                ? "border-red-500 text-red-400"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            5 Red Flags Detected
          </button>
          <button
            onClick={() => setActiveTab("payload")}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === "payload"
                ? "border-red-500 text-red-400"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            Simulated Payload Analysis
          </button>
          <button
            onClick={() => setActiveTab("checklist")}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === "checklist"
                ? "border-red-500 text-red-400"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            Defense Checklist
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === "analysis" && (
            <div className="space-y-3">
              <p className="text-xs text-gray-300">
                This mock website is a textbook illustration of a{" "}
                <strong>fake video game crack / mod scam</strong> designed to
                deliver information stealers (e.g., RedLine, LummaC2) or
                ransomware:
              </p>

              {redFlags.map((flag, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#1f222b] border border-[#2f3442] flex items-start gap-3"
                >
                  <div className="p-2 rounded-lg bg-black/40 shrink-0 mt-0.5">
                    {flag.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">
                        {idx + 1}. {flag.title}
                      </h4>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          flag.severity === "CRITICAL"
                            ? "bg-red-950 text-red-400 border border-red-800"
                            : "bg-amber-950 text-amber-300 border border-amber-800"
                        }`}
                      >
                        {flag.severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                      {flag.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "payload" && (
            <div className="space-y-3">
              <div className="p-3 bg-black/60 rounded-xl border border-red-500/30 font-mono text-[11px] text-red-300 space-y-1">
                <div className="text-gray-400 font-bold">
                  # Disassembly / Static Strings Inspection:
                </div>
                <div className="text-emerald-400">
                  &gt; Target: GTA6_Ultra_Mod_Setup_v2.4.exe
                </div>
                <div className="text-gray-300">
                  &gt; File Hash (SHA-256): e8c399b1...4a29f8c1
                </div>
                <div className="text-yellow-400">
                  &gt; Detected signature: Trojan:Win32/Stealer.Lumma!MTB
                </div>
                <div className="text-red-400">
                  &gt; High Entropy: 7.92 (Heavily Packed / Encrypted
                  Executable)
                </div>
                <div className="text-gray-300">
                  &gt; Embedded Resource: Dropper batch script &amp; PowerShell
                  base64 payload
                </div>
                <div className="text-yellow-300">
                  &gt; C2 Domain: c2-node7.darknet-stealer.biz:8080
                </div>
                <div className="text-red-400">
                  &gt; Capabilities: Steals saved browser passwords, Discord
                  tokens, crypto wallets
                </div>
              </div>

              <div className="p-3 bg-[#1e222d] rounded-xl text-xs text-gray-300">
                <strong className="text-white block mb-1">
                  What would happen if executed on a real machine?
                </strong>
                The dropper would briefly flash a command prompt window, add a
                registry persistence key under{" "}
                <code className="bg-black/50 px-1 py-0.5 rounded text-amber-300">
                  HKCU\Software\Microsoft\Windows\CurrentVersion\Run
                </code>
                , extract session cookies and Discord tokens, and exfiltrate
                them to the attacker&apos;s Telegram/C2 bot.
              </div>
            </div>
          )}

          {activeTab === "checklist" && (
            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-white">
                How to protect yourself from fake game downloads:
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <IconCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Verify official release status:</strong> GTA 6 is
                    scheduled exclusively for consoles first. Any PC version or
                    mod available before official PC release is guaranteed
                    malware.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Never disable Antivirus for a download:</strong>{" "}
                    Legitimate modding platforms (like Nexus Mods or CurseForge)
                    do not require users to turn off Defender or run unknown
                    .exe files.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Inspect file extensions:</strong> Mod files for
                    games are typically .asi, .dll, .rpf, or script files placed
                    in a game directory—rarely a standalone 45MB installer .exe.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Use VirusTotal or sandbox:</strong> Scan any
                    downloaded file on VirusTotal before opening.
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#14161b] border-t border-[#2d3039] flex items-center justify-between text-xs">
          <span className="text-gray-400">Simulated Sandbox Environment</span>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-lg transition-colors"
          >
            Acknowledge &amp; Return
          </button>
        </div>
      </div>
    </div>
  );
};
