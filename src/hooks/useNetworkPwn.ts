"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ThreatDetails } from "@/lib/pwnState";

export interface UseNetworkPwnOptions {
  deviceType: "chrome" | "win11" | "vscode" | "admin" | "other";
  propagationDelayMs?: number;
  stagerDurationMs?: number;
}

export function useNetworkPwn({
  deviceType,
  propagationDelayMs = deviceType === "chrome"
    ? 0
    : deviceType === "win11"
      ? 450
      : 850,
  stagerDurationMs = deviceType === "chrome" ? 900 : 1200,
}: UseNetworkPwnOptions) {
  const [isCompromised, setIsCompromised] = useState(false);
  const [isInfecting, setIsInfecting] = useState(false);
  const [threatDetails, setThreatDetails] = useState<ThreatDetails | null>(
    null
  );

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const playIntrusionSound = useCallback(() => {
    try {
      if (typeof window === "undefined") return;
      if (!audioCtxRef.current) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (AudioCtx) {
          audioCtxRef.current = new AudioCtx();
        }
      }
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const now = ctx.currentTime;
      [349.23, 440.0, 554.37].forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
      });
    } catch {}
  }, []);

  const clearPendingTimeouts = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  const handleInfectionTriggered = useCallback(
    (details: ThreatDetails | null, isLocalOrigin: boolean) => {
      clearPendingTimeouts();
      setThreatDetails(details);

      const delay = isLocalOrigin ? 0 : propagationDelayMs;

      const t1 = setTimeout(() => {
        setIsInfecting(true);
        playIntrusionSound();

        const t2 = setTimeout(() => {
          setIsInfecting(false);
          setIsCompromised(true);
        }, stagerDurationMs);

        timeoutsRef.current.push(t2);
      }, delay);

      timeoutsRef.current.push(t1);
    },
    [propagationDelayMs, stagerDurationMs, playIntrusionSound]
  );

  const handleDisinfected = useCallback(() => {
    clearPendingTimeouts();
    setIsInfecting(false);
    setIsCompromised(false);
    setThreatDetails(null);
  }, []);

  const resetNetworkPwn = useCallback(async () => {
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        const bc = new BroadcastChannel("pwn_network_mesh");
        bc.postMessage({ type: "reset" });
        bc.close();
      }
    } catch {}

    handleDisinfected();

    try {
      await fetch("/api/pwn/reset", { method: "POST" });
    } catch {}
  }, [handleDisinfected]);

  useEffect(() => {
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        channel = new BroadcastChannel("pwn_network_mesh");
        channel.onmessage = (event) => {
          const {
            type,
            threatDetails: details,
            originDevice,
          } = event.data || {};
          if (type === "compromise") {
            const isLocal = originDevice === deviceType;
            handleInfectionTriggered(details, isLocal);
          } else if (type === "reset") {
            handleDisinfected();
          }
        };
      }
    } catch {}

    let eventSource: EventSource | null = null;
    let fallbackPoll: NodeJS.Timeout | null = null;

    const connectSSE = () => {
      if (typeof window === "undefined" || !("EventSource" in window)) return;

      try {
        eventSource = new EventSource("/api/pwn/events");

        eventSource.onmessage = (e) => {
          try {
            const data = JSON.parse(e.data);
            if (data.type === "compromise") {
              const isLocal = data.state?.threatDetails?.sourceDevice
                ?.toLowerCase()
                .includes(deviceType);
              handleInfectionTriggered(data.state?.threatDetails, isLocal);
            } else if (data.type === "reset") {
              handleDisinfected();
            } else if (data.type === "status") {
              if (data.state?.isCompromised) {
                setThreatDetails(data.state.threatDetails);
                setIsCompromised(true);
              } else {
                setIsCompromised(false);
              }
            }
          } catch {}
        };

        eventSource.onerror = () => {
          if (eventSource) {
            eventSource.close();
            eventSource = null;
          }
          if (!fallbackPoll) {
            fallbackPoll = setInterval(async () => {
              try {
                const res = await fetch("/api/pwn/status");
                const json = await res.json();
                if (json.state?.isCompromised) {
                  if (!isCompromised && !isInfecting) {
                    handleInfectionTriggered(json.state.threatDetails, false);
                  }
                } else if (isCompromised) {
                  handleDisinfected();
                }
              } catch {}
            }, 3000);
          }
        };
      } catch {}
    };

    connectSSE();

    const handleLocalExit = () => {
      resetNetworkPwn();
    };

    window.addEventListener("pwn:exit", handleLocalExit);

    return () => {
      clearPendingTimeouts();
      window.removeEventListener("pwn:exit", handleLocalExit);
      if (channel) channel.close();
      if (eventSource) eventSource.close();
      if (fallbackPoll) clearInterval(fallbackPoll);
    };
  }, [
    deviceType,
    handleInfectionTriggered,
    handleDisinfected,
    resetNetworkPwn,
    isCompromised,
    isInfecting,
  ]);

  const triggerNetworkPwn = useCallback(
    async (params?: { filename?: string; sourceDevice?: string }) => {
      try {
        if (typeof window !== "undefined" && "BroadcastChannel" in window) {
          const bc = new BroadcastChannel("pwn_network_mesh");
          bc.postMessage({
            type: "compromise",
            originDevice: deviceType,
            threatDetails: {
              name: "Trojan:Win32/WannaCrypt!rsm",
              sourceDevice: params?.sourceDevice || `Device (${deviceType})`,
              filename: params?.filename || "GTA6_Mod_Engine_v2.4.zip",
              initiatedAt: Date.now(),
            },
          });
          bc.close();
        }
      } catch {}

      handleInfectionTriggered(
        {
          name: "Trojan:Win32/WannaCrypt!rsm",
          cve: "CVE-2017-0144 (EternalBlue)",
          vector: "SMBv1 Remote Code Execution",
          sourceDevice: params?.sourceDevice || `Device (${deviceType})`,
          sourceIp: "192.168.1.104",
          infectedIpList: [
            "192.168.1.104 (Chrome Client)",
            "192.168.1.115 (Windows 11 Workstation)",
            "192.168.1.180 (VS Code Dev Server)",
          ],
          filename: params?.filename || "GTA6_Mod_Engine_v2.4.zip",
          initiatedAt: Date.now(),
        },
        true
      );

      try {
        await fetch("/api/pwn/trigger", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sourceDevice:
              params?.sourceDevice || `Google Chrome (${deviceType})`,
            filename: params?.filename || "GTA6_Mod_Engine_v2.4.zip",
          }),
        });
      } catch {}
    },
    [deviceType, handleInfectionTriggered]
  );

  const dismissLocalPwn = useCallback(() => {
    setIsCompromised(false);
    setIsInfecting(false);
  }, []);

  return {
    isCompromised,
    isInfecting,
    threatDetails,
    triggerNetworkPwn,
    resetNetworkPwn,
    dismissLocalPwn,
  };
}
