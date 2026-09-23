"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  IconShieldCheck,
  IconAlertTriangle,
  IconAdjustmentsCog,
  IconBrandChrome,
  IconBrandVscode,
  IconBrandWindows,
  IconRefresh,
  IconFlame,
  IconArrowLeft,
  IconCopy,
  IconCheck,
  IconKey,
  IconTrash,
  IconActivity,
  IconExternalLink,
  IconNetwork,
} from "@tabler/icons-react";
import { useNetworkPwn } from "@/hooks/useNetworkPwn";

interface ActivityLog {
  id: string;
  time: string;
  type: "info" | "trigger" | "reset" | "action";
  message: string;
}

const ENVIRONMENTS = [
  {
    id: "win11",
    title: "Windows 11",
    route: "/win11",
    description:
      "Interactive Windows 11 desktop with start menu, taskbar, settings, file explorer, and full-screen ransomware overlay.",
    icon: IconBrandWindows,
    accent: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      text: "text-blue-400",
    },
    isReady: true,
  },
  {
    id: "win7",
    title: "Windows 7",
    route: "/win7",
    description:
      "Classic Windows 7 Aero glass interface and retro desktop simulation.",
    icon: IconBrandWindows,
    accent: {
      bg: "bg-sky-500/10",
      border: "border-sky-500/20",
      text: "text-sky-400",
    },
    isReady: false,
  },
  {
    id: "chrome",
    title: "Google Chrome",
    route: "/chrome",
    description:
      "Tabbed browser simulation with mock search, downloads tray, and stager archive payload trigger.",
    icon: IconBrandChrome,
    accent: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      text: "text-emerald-400",
    },
    isReady: true,
  },
  {
    id: "vscode",
    title: "Visual Studio Code",
    route: "/vscode",
    description:
      "Code workspace with Monaco editor, terminal, file explorer, and ransomware session takeover.",
    icon: IconBrandVscode,
    accent: {
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      text: "text-cyan-400",
    },
    isReady: true,
  },
];

export default function AdminPage() {
  const { isCompromised, threatDetails, triggerNetworkPwn, resetNetworkPwn } =
    useNetworkPwn({ deviceType: "admin" });

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const decryptionKey =
    process.env.NEXT_PUBLIC_PWN_DECRYPT_KEY || "WCRY-2026-ZDA";

  const [logs, setLogs] = useState<ActivityLog[]>([]);

  const prevCompromisedRef = useRef<boolean | null>(null);

  // Log state transitions when compromise status changes
  useEffect(() => {
    if (prevCompromisedRef.current === null) {
      prevCompromisedRef.current = isCompromised;
      return;
    }
    if (prevCompromisedRef.current === isCompromised) return;
    prevCompromisedRef.current = isCompromised;

    const timer = setTimeout(() => {
      const time = new Date().toLocaleTimeString();
      setLogs((prev) => [
        {
          id: `${Date.now()}-${isCompromised ? "comp" : "reset"}`,
          time,
          type: isCompromised ? "trigger" : "reset",
          message: isCompromised
            ? threatDetails?.sourceDevice
              ? `Simulation triggered by ${threatDetails.sourceDevice} (${threatDetails.filename || "payload.zip"})`
              : "Ransomware simulation active across connected environments."
            : "Simulation reset: all environments restored.",
        },
        ...prev.slice(0, 49),
      ]);
    }, 0);

    return () => clearTimeout(timer);
  }, [isCompromised, threatDetails]);

  const handleTrigger = () => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [
      {
        id: `${Date.now()}-manual-trigger`,
        time,
        type: "trigger",
        message: "Manual trigger: started WannaCry simulation.",
      },
      ...prev.slice(0, 49),
    ]);
    triggerNetworkPwn({
      sourceDevice: "Admin Console",
      filename: "GTA6_Mod_Engine_v2.4.zip",
    });
  };

  const handleReset = () => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [
      {
        id: `${Date.now()}-manual-reset`,
        time,
        type: "reset",
        message: "Manual reset: restored all environments.",
      },
      ...prev.slice(0, 49),
    ]);
    resetNetworkPwn();
  };

  const copyShareLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.origin).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
        const time = new Date().toLocaleTimeString();
        setLogs((prev) => [
          {
            id: `${Date.now()}-link-copy`,
            time,
            type: "action",
            message: `Copied simulation URL (${window.location.origin}) to clipboard.`,
          },
          ...prev.slice(0, 49),
        ]);
      });
    }
  };

  const copyKey = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(decryptionKey).then(() => {
        setCopiedKey(true);
        setTimeout(() => setCopiedKey(false), 2000);
        const time = new Date().toLocaleTimeString();
        setLogs((prev) => [
          {
            id: `${Date.now()}-key-copy`,
            time,
            type: "action",
            message: `Copied decryption key to clipboard: ${decryptionKey}`,
          },
          ...prev.slice(0, 49),
        ]);
      });
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="min-h-screen bg-[#0d0f14] text-neutral-100 font-sans p-4 md:p-8 selection:bg-rose-500 selection:text-white">
      {/* Top Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono"
          >
            <IconArrowLeft size={16} /> Home
          </Link>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Admin Console
          </h1>
        </div>

        {/* Global Simulation Status & Quick Link */}
        <div className="flex items-center gap-3">
          <div
            className={`px-3.5 py-1.5 rounded-xl border flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              isCompromised
                ? "bg-rose-950/70 border-rose-500/80 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.25)] animate-pulse"
                : "bg-emerald-950/40 border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
            }`}
          >
            {isCompromised ? (
              <>
                <IconAlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Simulation Active</span>
              </>
            ) : (
              <>
                <IconShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Simulation Idle</span>
              </>
            )}
          </div>

          <button
            onClick={copyShareLink}
            className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs font-mono text-neutral-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            title="Copy URL to test across multiple browser tabs or devices"
          >
            {copiedLink ? (
              <IconCheck size={14} className="text-emerald-400" />
            ) : (
              <IconCopy size={14} />
            )}
            <span>{copiedLink ? "Copied Link!" : "Share URL"}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto mt-6 space-y-6">
        {/* Simulation Controls Panel */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
          <div>
            <h2 className="text-sm font-semibold text-white">
              Simulation Controls
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Trigger or reset the WannaCry ransomware simulation across open
              tabs and connected devices.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleTrigger}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(225,29,72,0.3)] cursor-pointer"
            >
              <IconFlame size={16} /> Trigger Simulation
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(5,150,105,0.25)] cursor-pointer"
            >
              <IconRefresh size={16} /> Reset Simulation
            </button>
          </div>
        </div>

        {/* Environments Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <IconAdjustmentsCog size={16} className="text-cyan-400" />
              Simulation Environments ({ENVIRONMENTS.length})
            </h2>
            <span className="text-[11px] text-neutral-500 font-mono">
              Open each target to test live interaction
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ENVIRONMENTS.map((env) => {
              const Icon = env.icon;
              const isTargetCompromised = isCompromised && env.isReady;

              return (
                <div
                  key={env.id}
                  className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between backdrop-blur-md ${
                    isTargetCompromised
                      ? "bg-rose-950/20 border-rose-500/60 shadow-[0_0_25px_rgba(244,63,94,0.15)]"
                      : "bg-neutral-900/50 border-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          size={22}
                          className={`shrink-0 ${env.accent.text}`}
                        />
                        <h3 className="text-sm font-bold text-white leading-tight">
                          {env.title}
                        </h3>
                      </div>

                      <span
                        className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                          !env.isReady
                            ? "bg-neutral-800 border-neutral-700 text-neutral-400"
                            : isTargetCompromised
                              ? "bg-rose-500/20 border-rose-500/50 text-rose-400 animate-pulse"
                              : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        }`}
                      >
                        {!env.isReady
                          ? "COMING SOON"
                          : isTargetCompromised
                            ? "ACTIVE"
                            : "READY"}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                      {env.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-800/80">
                    <Link
                      href={env.route}
                      target="_blank"
                      className="w-full py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-center flex items-center justify-center gap-1.5 text-neutral-200 hover:text-white transition-colors"
                    >
                      <span>Launch {env.title}</span>
                      <IconExternalLink size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Configuration & Architecture Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Test Decryption Key Card */}
          <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <IconKey size={18} />
                <h3 className="text-xs font-mono uppercase tracking-wider font-bold">
                  Simulation Decryption Key
                </h3>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Use this key in the Wana Decrypt0r 2.0 window on any compromised
                environment to test file decryption and recovery:
              </p>
            </div>
            <div className="flex items-center gap-2 bg-neutral-950 p-2.5 rounded-xl border border-neutral-800 font-mono text-xs mt-auto min-h-10.5">
              <code className="text-amber-300 font-bold flex-1 select-all">
                {decryptionKey}
              </code>
              <button
                onClick={copyKey}
                className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copiedKey ? (
                  <IconCheck size={13} className="text-emerald-400" />
                ) : (
                  <IconCopy size={13} />
                )}
                <span>{copiedKey ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Cross-Tab / LAN Sync Card */}
          <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <IconNetwork size={18} />
                <h3 className="text-xs font-mono uppercase tracking-wider font-bold">
                  Multi-Tab &amp; LAN Synchronization
                </h3>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Synchronizes simulation and reset events across open browser
                windows via BroadcastChannel, and across devices on the same
                network using Server-Sent Events (
                <code className="text-neutral-300 text-[11px]">
                  /api/pwn/events
                </code>
                ).
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 bg-neutral-950 p-2.5 rounded-xl border border-neutral-800 mt-auto min-h-10.5">
              <span>
                Channel:{" "}
                <strong className="text-neutral-200">pwn_network_mesh</strong>
              </span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Real Activity & Event Audit Log */}
        <div className="bg-black/80 border border-neutral-800 rounded-2xl p-4 sm:p-5 font-mono text-xs shadow-2xl">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800 text-neutral-400">
            <div className="flex items-center gap-2">
              <IconActivity size={16} className="text-emerald-400" />
              <span className="font-bold text-neutral-200">
                Simulation Activity Log
              </span>
              <span className="text-[11px] text-neutral-500 font-normal">
                ({logs.length} events recorded)
              </span>
            </div>
            {logs.length > 0 && (
              <button
                onClick={clearLogs}
                className="text-[11px] text-neutral-500 hover:text-neutral-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <IconTrash size={12} /> Clear Log
              </button>
            )}
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-2 text-neutral-300 text-[11.5px] leading-relaxed select-text">
            {logs.length === 0 ? (
              <p className="text-neutral-500 italic py-2">
                No activity recorded yet. Trigger a simulation or reset to see
                events.
              </p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="flex items-start gap-2.5">
                  <span
                    className="text-neutral-500 shrink-0 select-none"
                    suppressHydrationWarning
                  >
                    [{log.time}]
                  </span>
                  <span
                    className={`font-semibold shrink-0 uppercase text-[10px] px-1.5 py-0.5 rounded border ${
                      log.type === "trigger"
                        ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                        : log.type === "reset"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : log.type === "action"
                            ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                            : "bg-neutral-800 border-neutral-700 text-neutral-400"
                    }`}
                  >
                    {log.type}
                  </span>
                  <span className="text-neutral-300 flex-1">{log.message}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
