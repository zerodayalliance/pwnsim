export interface ThreatDetails {
  name: string;
  cve: string;
  vector: string;
  sourceDevice: string;
  sourceIp: string;
  infectedIpList: string[];
  filename?: string;
  initiatedAt: number;
}

export interface NetworkCompromiseState {
  isCompromised: boolean;
  compromiseId: string | null;
  timestamp: number;
  threatDetails: ThreatDetails | null;
}

export type NetworkEventType = "status" | "compromise" | "reset" | "ping";

export interface NetworkEvent {
  type: NetworkEventType;
  state: NetworkCompromiseState;
  timestamp: number;
}

type EventListener = (event: NetworkEvent) => void;

interface GlobalPwnHub {
  state: NetworkCompromiseState;
  listeners: Set<EventListener>;
}

const DEFAULT_STATE: NetworkCompromiseState = {
  isCompromised: false,
  compromiseId: null,
  timestamp: Date.now(),
  threatDetails: null,
};

const globalHub: GlobalPwnHub = (() => {
  const g = globalThis as unknown as { __pwnGlobalHub?: GlobalPwnHub };
  if (!g.__pwnGlobalHub) {
    g.__pwnGlobalHub = {
      state: { ...DEFAULT_STATE },
      listeners: new Set<EventListener>(),
    };
  }
  return g.__pwnGlobalHub;
})();

export function getNetworkState(): NetworkCompromiseState {
  return globalHub.state;
}

export function subscribeNetworkEvents(listener: EventListener): () => void {
  globalHub.listeners.add(listener);
  return () => {
    globalHub.listeners.delete(listener);
  };
}

export function broadcastEvent(type: NetworkEventType) {
  const event: NetworkEvent = {
    type,
    state: globalHub.state,
    timestamp: Date.now(),
  };

  for (const listener of Array.from(globalHub.listeners)) {
    try {
      listener(event);
    } catch {
      // Ignore dead listeners
    }
  }
}

export function triggerNetworkCompromise(params?: {
  sourceDevice?: string;
  sourceIp?: string;
  filename?: string;
}): NetworkCompromiseState {
  const now = Date.now();
  globalHub.state = {
    isCompromised: true,
    compromiseId: `pwn-${now}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: now,
    threatDetails: {
      name: "Trojan:Win32/WannaCrypt!rsm",
      cve: "CVE-2017-0144 (EternalBlue / MS17-010)",
      vector: "SMBv1 Remote Code Execution & Lateral Propagation",
      sourceDevice:
        params?.sourceDevice || "Google Chrome Client (Patient Zero)",
      sourceIp: params?.sourceIp || "192.168.1.104",
      infectedIpList: [
        "192.168.1.104 (Chrome Client)",
        "192.168.1.115 (Windows 11 Workstation)",
        "192.168.1.180 (VS Code Dev Server)",
      ],
      filename: params?.filename || "GTA6_Mod_Engine_v2.4.zip",
      initiatedAt: now,
    },
  };

  broadcastEvent("compromise");
  return globalHub.state;
}

export function resetNetworkCompromise(): NetworkCompromiseState {
  globalHub.state = {
    isCompromised: false,
    compromiseId: null,
    timestamp: Date.now(),
    threatDetails: null,
  };

  broadcastEvent("reset");
  return globalHub.state;
}
