/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  IconFileText,
  IconSettings,
  IconWorld,
  IconDeviceDesktop,
  IconTrash,
  IconTerminal2,
  IconCalculator,
  IconSearch,
  IconWifi,
  IconVolume,
  IconVolume2,
  IconVolume3,
  IconVolume4,
  IconVolumeOff,
  IconBattery,
  IconBattery3,
  IconBattery4,
  IconChevronUp,
  IconMinus,
  IconSquare,
  IconCopy,
  IconX,
  IconPower,
  IconMoon,
  IconSun,
  IconBluetooth,
  IconPlane,
  IconFolder,
  IconFolderFilled,
  IconBell,
  IconLock,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconChevronRight,
  IconReload,
  IconHome,
  IconPlus,
  IconPinned,
  IconClock,
  IconPalette,
  IconInfoCircle,
  IconApps,
  IconNetwork,
  IconEye,
  IconCheck,
  IconFlame,
  IconServer,
  IconUser,
} from "@tabler/icons-react";
import { AppId } from "../types";

export {
  IconFileText,
  IconSettings,
  IconWorld,
  IconDeviceDesktop,
  IconTrash,
  IconTerminal2,
  IconCalculator,
  IconSearch,
  IconWifi,
  IconVolume,
  IconVolume2,
  IconVolume3,
  IconVolume4,
  IconVolumeOff,
  IconBattery,
  IconBattery3,
  IconBattery4,
  IconChevronUp,
  IconMinus,
  IconSquare,
  IconCopy,
  IconX,
  IconPower,
  IconMoon,
  IconSun,
  IconBluetooth,
  IconPlane,
  IconFolder,
  IconFolderFilled,
  IconBell,
  IconLock,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconChevronRight,
  IconReload,
  IconHome,
  IconPlus,
  IconPinned,
  IconClock,
  IconPalette,
  IconInfoCircle,
  IconApps,
  IconNetwork,
  IconEye,
  IconCheck,
  IconFlame,
  IconServer,
  IconUser,
};

export function IconHardDrive({
  className = "w-5 h-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <line x1="3" y1="13" x2="21" y2="13" />
      <circle cx="7" cy="16" r="1" fill="currentColor" />
      <circle cx="11" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

export function IconEthernet({
  className = "w-4 h-4",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4.5H5a2 2 0 0 0-2 2v8.5a2 2 0 0 0 2 2h9.5" />
      <path d="M7 17v2.5" />
      <path d="M12 17v2.5" />
      <path d="M5 19.5h9" />
      <rect x="16.5" y="3.5" width="4.5" height="6.5" rx="1" />
      <path d="M16.5 6h4.5" />
      <path d="M18.75 10v10" />
    </svg>
  );
}

export function WindowsSecurityIcon({
  className = "w-4.5 h-4.5",
}: {
  className?: string;
}) {
  return (
    <img
      src="/win11/icons/windows-security.png"
      alt="Windows Security"
      className={`${className} object-contain select-none pointer-events-none`}
      draggable={false}
    />
  );
}

export function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <img
      src="/win11/icons/check.png"
      alt="Check"
      className={`${className} object-contain select-none pointer-events-none`}
      draggable={false}
    />
  );
}

export function Windows11Logo({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
  return (
    <img
      src="/win11/icons/windows-11.png"
      alt="Start"
      className={`${className} object-contain select-none pointer-events-none`}
      draggable={false}
    />
  );
}

export function EdgeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img
      src="/win11/icons/edge.png"
      alt="Microsoft Edge"
      className={`${className} object-contain select-none pointer-events-none`}
      draggable={false}
    />
  );
}

export function NotepadIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img
      src="/win11/icons/notepad.png"
      alt="Notepad"
      className={`${className} object-contain select-none pointer-events-none`}
      draggable={false}
    />
  );
}

export function SettingsIcon({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
  return (
    <img
      src="/win11/icons/settings.png"
      alt="Settings"
      className={`${className} object-contain select-none pointer-events-none`}
      draggable={false}
    />
  );
}

export function ThisPCIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img
      src="/win11/icons/this-pc.png"
      alt="This PC"
      className={`${className} object-contain select-none pointer-events-none`}
      draggable={false}
    />
  );
}

export function ExplorerFolderIcon({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
  return (
    <img
      src="/win11/icons/file-explorer.png"
      alt="File Explorer"
      className={`${className} object-contain select-none pointer-events-none`}
      draggable={false}
    />
  );
}

export function FolderIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img
      src="/win11/icons/folder.png"
      alt="Folder"
      className={`${className} object-contain select-none pointer-events-none`}
      draggable={false}
    />
  );
}

export function RecycleBinIcon({
  className = "w-6 h-6",
}: {
  className?: string;
  empty?: boolean;
}) {
  return (
    <img
      src="/win11/icons/recycle-bin.png"
      alt="Recycle Bin"
      className={`${className} object-contain select-none pointer-events-none`}
      draggable={false}
    />
  );
}

export function TerminalIcon({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
  return (
    <img
      src="/win11/icons/terminal.png"
      alt="Terminal"
      className={`${className} object-contain select-none pointer-events-none`}
      draggable={false}
    />
  );
}

export function CalculatorIcon({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
  return (
    <img
      src="/win11/icons/calculator.png"
      alt="Calculator"
      className={`${className} object-contain select-none pointer-events-none`}
      draggable={false}
    />
  );
}

export function VSCodeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img
      src="/win11/icons/vscode.png"
      alt="Visual Studio Code"
      className={`${className} object-contain select-none pointer-events-none`}
      draggable={false}
    />
  );
}

export function ChromeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img
      src="/win11/icons/chrome.png"
      alt="Google Chrome"
      className={`${className} object-contain select-none pointer-events-none`}
      draggable={false}
    />
  );
}

export function WeatherPartlyCloudyNightIcon({
  className = "w-7 h-7",
  badge = 1,
}: {
  className?: string;
  badge?: number | string | null;
}) {
  const id = React.useId();
  const moonGradId = `weather-moon-grad-${id}`;
  const cloudTopGradId = `weather-cloud-top-grad-${id}`;
  const cloudBtmGradId = `weather-cloud-btm-grad-${id}`;
  const cloudShadowId = `weather-cloud-shadow-${id}`;
  const badgeShadowId = `weather-badge-shadow-${id}`;

  return (
    <svg
      viewBox="0 0 32 32"
      className={`${className} shrink-0 overflow-visible`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={moonGradId}
          x1="6"
          y1="7"
          x2="20"
          y2="25"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFCA28" />
          <stop offset="45%" stopColor="#FFA000" />
          <stop offset="100%" stopColor="#F57C00" />
        </linearGradient>

        <linearGradient
          id={cloudTopGradId}
          x1="8"
          y1="5"
          x2="8"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#E6F0FC" />
          <stop offset="85%" stopColor="#B2CDF3" />
          <stop offset="100%" stopColor="#95BEF0" />
        </linearGradient>

        <linearGradient
          id={cloudBtmGradId}
          x1="16"
          y1="14"
          x2="16"
          y2="25"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#EAF3FD" />
          <stop offset="75%" stopColor="#B7D2F7" />
          <stop offset="100%" stopColor="#8DB6F1" />
        </linearGradient>

        <filter id={cloudShadowId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="1.2"
            stdDeviation="1"
            floodColor="#000000"
            floodOpacity="0.28"
          />
        </filter>

        <filter id={badgeShadowId} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="0"
            dy="0.8"
            stdDeviation="0.8"
            floodColor="#000000"
            floodOpacity="0.25"
          />
        </filter>
      </defs>

      <path
        d="M 10 7 C 6.5 9 4.2 13.2 4.5 17.5 C 4.8 22 8.5 25.5 13.5 25.5 C 16.8 25.5 19.8 23.8 21.5 21 C 18 22.2 14.2 21 11.8 18.2 C 9.5 15.5 9.2 11.5 10 7 Z"
        fill={`url(#${moonGradId})`}
      />

      <g filter={`url(#${cloudShadowId})`}>
        <path
          d="M 4.5 13.5 H 12.8 C 14.3 13.5 15.6 12.3 15.4 10.8 C 15.2 9.5 14.1 8.5 12.8 8.6 C 12.3 6.6 10.4 5.2 8.3 5.3 C 6.5 5.4 5 6.7 4.5 8.5 C 3.1 8.9 2.1 10.3 2.2 11.9 C 2.4 13 3.3 13.5 4.5 13.5 Z"
          fill={`url(#${cloudTopGradId})`}
        />
        <ellipse
          cx="8.5"
          cy="7.2"
          rx="3.2"
          ry="1.6"
          fill="#FFFFFF"
          fillOpacity="0.75"
        />
      </g>

      <g filter={`url(#${cloudShadowId})`}>
        <path
          d="M 11.5 24.5 H 22.5 C 24.4 24.5 26 23 25.9 21.1 C 25.8 19.5 24.5 18.2 22.9 18 C 22.5 15.8 20.5 14.2 18.2 14.2 C 16.8 14.2 15.5 14.9 14.7 16 C 14 15.5 13.1 15.2 12.1 15.4 C 10.2 15.8 8.8 17.5 8.9 19.4 C 7.8 20 7.1 21.2 7.3 22.5 C 7.6 23.8 8.9 24.5 11.5 24.5 Z"
          fill={`url(#${cloudBtmGradId})`}
        />
        <ellipse
          cx="18"
          cy="16.3"
          rx="3.5"
          ry="1.6"
          fill="#FFFFFF"
          fillOpacity="0.8"
        />
        <ellipse
          cx="12.5"
          cy="17.2"
          rx="2.5"
          ry="1.3"
          fill="#FFFFFF"
          fillOpacity="0.65"
        />
      </g>

      {badge !== null && badge !== undefined && (
        <g filter={`url(#${badgeShadowId})`}>
          <circle
            cx="20.5"
            cy="7.5"
            r="5.8"
            fill="#FF8389"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.5"
          />
          <text
            x="20.5"
            y="10.2"
            textAnchor="middle"
            fill="#18181b"
            fontSize="8.5"
            fontWeight="700"
            fontFamily="'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif"
          >
            {badge}
          </text>
        </g>
      )}
    </svg>
  );
}

export function AppIconRenderer({
  appId,
  className = "w-6 h-6",
}: {
  appId: AppId | string;
  className?: string;
}) {
  switch (appId) {
    case "notepad":
      return <NotepadIcon className={className} />;
    case "settings":
      return <SettingsIcon className={className} />;
    case "browser":
      return <EdgeIcon className={className} />;
    case "this-pc":
      return <ThisPCIcon className={className} />;
    case "file-explorer":
      return <ExplorerFolderIcon className={className} />;
    case "recycle-bin":
      return <RecycleBinIcon className={className} />;
    case "terminal":
      return <TerminalIcon className={className} />;
    case "calculator":
      return <CalculatorIcon className={className} />;
    case "vscode":
      return <VSCodeIcon className={className} />;
    case "chrome":
      return <ChromeIcon className={className} />;
    default:
      return <ExplorerFolderIcon className={className} />;
  }
}

export function Win11SearchIcon({
  className = "w-6 h-6",
  themeMode = "dark",
}: {
  className?: string;
  themeMode?: "dark" | "light";
}) {
  const isDark = themeMode === "dark";
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="10.5"
        cy="10.5"
        r="6.5"
        fill={isDark ? "#383a40" : "#f0f2f5"}
      />
      <circle
        cx="10.5"
        cy="10.5"
        r="6.5"
        stroke={isDark ? "#FFFFFF" : "#1f2024"}
        strokeWidth="2.5"
      />
      <path
        d="M15.4 15.4L20.2 20.2"
        stroke={isDark ? "#FFFFFF" : "#1f2024"}
        strokeWidth="2.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconTaskView({
  className = "w-6 h-6",
}: {
  className?: string;
  themeMode?: "dark" | "light";
}) {
  return (
    <img
      src="/win11/icons/task-view.png"
      alt="Task View"
      className={`${className} object-contain select-none pointer-events-none`}
      draggable={false}
    />
  );
}
