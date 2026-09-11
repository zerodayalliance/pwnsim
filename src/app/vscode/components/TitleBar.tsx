import React from 'react';
import {
  IconSearch,
  IconLayoutSidebarLeftCollapse,
  IconLayoutBottombarCollapse,
  IconLayoutSidebarRightCollapse,
  IconLayoutGrid,
} from '@tabler/icons-react';

interface TitleBarProps {
  activeFileName?: string;
  isSidebarOpen: boolean;
  isPanelOpen: boolean;
  onToggleSidebar: () => void;
  onTogglePanel: () => void;
}

export function TitleBar({
  activeFileName = 'layout.tsx',
  isSidebarOpen,
  isPanelOpen,
  onToggleSidebar,
  onTogglePanel,
}: TitleBarProps) {
  return (
    <header className="h-[35px] bg-[#181818] text-[#cccccc] flex items-center justify-between px-3 border-b border-[#2b2b2b] select-none text-[12px] shrink-0">
      {/* Left: Window Dots & App Menus */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 mr-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] cursor-pointer" />
        </div>

        <div className="hidden md:flex items-center gap-3 text-[#cccccc] font-normal text-[12px]">
          <span className="hover:bg-[#333333] px-2 py-0.5 rounded cursor-pointer transition-colors">
            File
          </span>
          <span className="hover:bg-[#333333] px-2 py-0.5 rounded cursor-pointer transition-colors">
            Edit
          </span>
          <span className="hover:bg-[#333333] px-2 py-0.5 rounded cursor-pointer transition-colors">
            Selection
          </span>
          <span className="hover:bg-[#333333] px-2 py-0.5 rounded cursor-pointer transition-colors">
            View
          </span>
          <span className="hover:bg-[#333333] px-2 py-0.5 rounded cursor-pointer transition-colors">
            Go
          </span>
          <span className="hover:bg-[#333333] px-2 py-0.5 rounded cursor-pointer transition-colors">
            Run
          </span>
          <div className="relative group">
            <button
              onClick={onTogglePanel}
              className={`hover:bg-[#333333] px-2 py-0.5 rounded cursor-pointer transition-colors text-[12px] ${
                isPanelOpen ? 'text-white bg-[#333333]' : 'text-[#cccccc]'
              }`}
            >
              Terminal
            </button>
            <div className="hidden group-hover:flex flex-col absolute top-full left-0 mt-1 w-48 bg-[#252526] border border-[#454545] shadow-xl rounded py-1 z-50 text-[12px] text-[#cccccc]">
              <button
                onClick={() => {
                  if (!isPanelOpen) onTogglePanel();
                }}
                className="px-3 py-1.5 hover:bg-[#094771] hover:text-white text-left flex items-center justify-between"
              >
                <span>New Terminal</span>
                <span className="text-[10px] text-[#888888]">⌃`</span>
              </button>
              <button
                onClick={() => {
                  if (!isPanelOpen) onTogglePanel();
                }}
                className="px-3 py-1.5 hover:bg-[#094771] hover:text-white text-left flex items-center justify-between"
              >
                <span>Split Terminal</span>
                <span className="text-[10px] text-[#888888]">⌘\</span>
              </button>
              <button
                onClick={() => {
                  if (!isPanelOpen) onTogglePanel();
                }}
                className="px-3 py-1.5 hover:bg-[#094771] hover:text-white text-left flex items-center justify-between"
              >
                <span>Run Active File</span>
              </button>
              <div className="border-t border-[#3c3c3c] my-1" />
              <button
                onClick={onTogglePanel}
                className="px-3 py-1.5 hover:bg-[#094771] hover:text-white text-left flex items-center justify-between"
              >
                <span>{isPanelOpen ? 'Hide Terminal' : 'Show Terminal'}</span>
                <span className="text-[10px] text-[#888888]">⌘J</span>
              </button>
            </div>
          </div>
          <span className="hover:bg-[#333333] px-2 py-0.5 rounded cursor-pointer transition-colors">
            Help
          </span>
        </div>
      </div>

      {/* Center: Command Palette / Search Pill */}
      <div className="flex items-center justify-center flex-1 max-w-[540px] mx-4">
        <div className="w-full max-w-[480px] h-[24px] bg-[#222222] hover:bg-[#282828] border border-[#3c3c3c] rounded-[4px] flex items-center px-3 gap-2 text-[#999999] hover:text-[#cccccc] transition-colors cursor-pointer text-[12px]">
          <IconSearch className="w-3.5 h-3.5 text-[#888888]" />
          <span className="flex-1 text-center font-normal text-[12px] truncate">
            pwned — {activeFileName}
          </span>
          <kbd className="hidden sm:inline text-[10px] bg-[#2a2d2e] px-1 py-0.2 rounded border border-[#3e3e3e] text-[#888888]">
            ⌘P
          </kbd>
        </div>
      </div>

      {/* Right: Layout & Split Controls */}
      <div className="flex items-center gap-1.5 text-[#cccccc]">
        <button
          onClick={onToggleSidebar}
          title="Toggle Primary Side Bar (Cmd+B)"
          className={`p-1 rounded hover:bg-[#333333] transition-colors ${
            isSidebarOpen ? 'text-[#ffffff]' : 'text-[#888888]'
          }`}
        >
          <IconLayoutSidebarLeftCollapse className="w-4 h-4" />
        </button>
        <button
          onClick={onTogglePanel}
          title="Toggle Panel (Cmd+J)"
          className={`p-1 rounded hover:bg-[#333333] transition-colors ${
            isPanelOpen ? 'text-[#ffffff]' : 'text-[#888888]'
          }`}
        >
          <IconLayoutBottombarCollapse className="w-4 h-4" />
        </button>
        <button
          title="Toggle Secondary Side Bar"
          className="p-1 rounded hover:bg-[#333333] text-[#888888] transition-colors"
        >
          <IconLayoutSidebarRightCollapse className="w-4 h-4" />
        </button>
        <button
          title="Customize Layout"
          className="p-1 rounded hover:bg-[#333333] text-[#888888] transition-colors"
        >
          <IconLayoutGrid className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
