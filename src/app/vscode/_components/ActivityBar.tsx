import React from "react";
import {
  IconFiles,
  IconSearch,
  IconGitBranch,
  IconPlayerPlay,
  IconPuzzle,
  IconUserCircle,
  IconSettings,
} from "@tabler/icons-react";

export type ActiveSidebarTab =
  "explorer" | "search" | "git" | "debug" | "extensions";

interface ActivityBarProps {
  activeTab: ActiveSidebarTab;
  onSelectTab: (tab: ActiveSidebarTab) => void;
  isOpen: boolean;
}

export function ActivityBar({
  activeTab,
  onSelectTab,
  isOpen,
}: ActivityBarProps) {
  const topItems = [
    {
      id: "explorer" as const,
      label: "Explorer (Cmd+Shift+E)",
      icon: IconFiles,
    },
    { id: "search" as const, label: "Search (Cmd+Shift+F)", icon: IconSearch },
    {
      id: "git" as const,
      label: "Source Control (Cmd+Shift+G)",
      icon: IconGitBranch,
      badge: "1",
    },
    {
      id: "debug" as const,
      label: "Run and Debug (Cmd+Shift+D)",
      icon: IconPlayerPlay,
    },
    {
      id: "extensions" as const,
      label: "Extensions (Cmd+Shift+X)",
      icon: IconPuzzle,
    },
  ];

  return (
    <nav className="w-[48px] bg-[#181818] border-r border-[#2b2b2b] flex flex-col justify-between items-center py-2 select-none shrink-0 z-10">
      <div className="flex flex-col items-center gap-1 w-full">
        {topItems.map((item) => {
          const Icon = item.icon;
          const isActive = isOpen && activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              title={item.label}
              className={`relative w-full h-[46px] flex items-center justify-center transition-colors group cursor-pointer ${
                isActive
                  ? "text-[#ffffff]"
                  : "text-[#858585] hover:text-[#ffffff]"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#ffffff]" />
              )}
              <Icon className="w-[22px] h-[22px] stroke-[1.6]" />
              {item.badge && (
                <span className="absolute top-2 right-2 bg-[#007acc] text-white text-[10px] font-bold px-1 rounded-full leading-tight min-w-[15px] h-[15px] flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-1 w-full">
        <button
          title="Accounts"
          className="w-full h-[44px] flex items-center justify-center text-[#858585] hover:text-[#ffffff] transition-colors cursor-pointer"
        >
          <IconUserCircle className="w-[22px] h-[22px] stroke-[1.6]" />
        </button>
        <button
          title="Settings"
          className="w-full h-[44px] flex items-center justify-center text-[#858585] hover:text-[#ffffff] transition-colors cursor-pointer"
        >
          <IconSettings className="w-[22px] h-[22px] stroke-[1.6]" />
        </button>
      </div>
    </nav>
  );
}
