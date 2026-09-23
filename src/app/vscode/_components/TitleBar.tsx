import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface TitleBarProps {
  activeFileName?: string;
  isSidebarOpen: boolean;
  isPanelOpen: boolean;
  onToggleSidebar: () => void;
  onTogglePanel: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}

export function TitleBar({
  activeFileName = "layout.tsx",
  isSidebarOpen,
  isPanelOpen,
  onToggleSidebar,
  onTogglePanel,
  onMinimize,
  onMaximize,
  onClose,
}: TitleBarProps) {
  const router = useRouter();
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMinimize =
    onMinimize ||
    (() => {
      router.push("/");
    });

  const handleMaximize =
    onMaximize ||
    (() => {
      if (typeof document !== "undefined") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
          setIsMaximized(true);
        } else {
          document.exitFullscreen().catch(() => {});
          setIsMaximized(false);
        }
      }
    });

  const handleClose =
    onClose ||
    (() => {
      router.push("/");
    });

  return (
    <header className="h-8.75 bg-[#181818] text-[#cccccc] flex items-center justify-between pl-2 pr-0 border-b border-[#2b2b2b] select-none text-[12px] shrink-0">
      <div className="flex items-center gap-1.5 h-full">
        <div
          className="flex items-center justify-center w-7 h-7 rounded hover:bg-[#2a2d2e] cursor-pointer transition-colors mr-0.5"
          title="Visual Studio Code"
        >
          <svg
            className="w-4 h-4 text-[#007acc] shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.5 2.5L7.8 10.3 3.5 7 1.5 8.2v7.6L3.5 17l4.3-3.3 9.7 7.8 5-2.5V5l-5-2.5zm0 3.7v11.6L9.6 12 17.5 6.2zM3.5 10l2.5 2-2.5 2v-4z" />
          </svg>
        </div>

        <div className="hidden md:flex items-center gap-1 text-[#cccccc] font-normal text-[12px]">
          <span className="hover:bg-[#333333] px-2 py-1 rounded cursor-pointer transition-colors">
            File
          </span>
          <span className="hover:bg-[#333333] px-2 py-1 rounded cursor-pointer transition-colors">
            Edit
          </span>
          <span className="hover:bg-[#333333] px-2 py-1 rounded cursor-pointer transition-colors">
            Selection
          </span>
          <span className="hover:bg-[#333333] px-2 py-1 rounded cursor-pointer transition-colors">
            View
          </span>
          <span className="hover:bg-[#333333] px-2 py-1 rounded cursor-pointer transition-colors">
            Go
          </span>
          <span className="hover:bg-[#333333] px-2 py-1 rounded cursor-pointer transition-colors">
            Run
          </span>
          <div className="relative group">
            <button
              onClick={onTogglePanel}
              className={`hover:bg-[#333333] px-2 py-1 rounded cursor-pointer transition-colors text-[12px] ${
                isPanelOpen ? "text-white bg-[#333333]" : "text-[#cccccc]"
              }`}
            >
              Terminal
            </button>
            <div className="hidden group-hover:flex flex-col absolute top-full left-0 mt-0.5 w-52 bg-[#252526] border border-[#454545] shadow-2xl rounded py-1 z-50 text-[12px] text-[#cccccc]">
              <button
                onClick={() => {
                  if (!isPanelOpen) onTogglePanel();
                }}
                className="px-3 py-1.5 hover:bg-[#094771] hover:text-white text-left flex items-center justify-between"
              >
                <span>New Terminal</span>
                <span className="text-[10px] text-[#888888] font-mono">
                  Ctrl+`
                </span>
              </button>
              <button
                onClick={() => {
                  if (!isPanelOpen) onTogglePanel();
                }}
                className="px-3 py-1.5 hover:bg-[#094771] hover:text-white text-left flex items-center justify-between"
              >
                <span>Split Terminal</span>
                <span className="text-[10px] text-[#888888] font-mono">
                  Ctrl+Shift+5
                </span>
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
                <span>{isPanelOpen ? "Hide Terminal" : "Show Terminal"}</span>
                <span className="text-[10px] text-[#888888] font-mono">
                  Ctrl+J
                </span>
              </button>
            </div>
          </div>
          <span className="hover:bg-[#333333] px-2 py-1 rounded cursor-pointer transition-colors">
            Help
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center flex-1 max-w-135 mx-4">
        <div className="w-full max-w-120 h-6 bg-[#222222] hover:bg-[#282828] border border-[#3c3c3c] rounded-lg flex items-center px-3 gap-2 text-[#999999] hover:text-[#cccccc] transition-colors cursor-pointer text-[12px]">
          <svg
            className="w-3.5 h-3.5 text-[#888888]"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="6.5" cy="6.5" r="4.75" />
            <line x1="10" y1="10" x2="14.5" y2="14.5" strokeLinecap="round" />
          </svg>
          <span className="flex-1 text-center font-normal text-[12px] truncate">
            pwnsim — {activeFileName}
          </span>
          <kbd className="hidden sm:inline text-[10px] bg-[#2a2d2e] px-1.5 py-0.5 rounded border border-[#3e3e3e] text-[#888888] font-mono">
            Ctrl+P
          </kbd>
        </div>
      </div>

      <div className="flex items-center h-full text-[#cccccc]">
        <div className="flex items-center gap-0.5 mr-2">
          <button
            onClick={onToggleSidebar}
            title="Toggle Primary Side Bar (Ctrl+B)"
            className={`w-7 h-7 flex items-center justify-center rounded hover:bg-[#333333] transition-colors ${
              isSidebarOpen ? "text-[#ffffff]" : "text-[#888888]"
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h11A1.5 1.5 0 0 1 15 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H5V3H2.5zm3.5 10h7.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H6v10z" />
            </svg>
          </button>

          <button
            onClick={onTogglePanel}
            title="Toggle Panel (Ctrl+J)"
            className={`w-7 h-7 flex items-center justify-center rounded hover:bg-[#333333] transition-colors ${
              isPanelOpen ? "text-[#ffffff]" : "text-[#888888]"
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h11A1.5 1.5 0 0 1 15 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V10H2V3.5zm0 7.5h12v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11z" />
            </svg>
          </button>

          <button
            title="Toggle Secondary Side Bar"
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#333333] text-[#888888] hover:text-[#cccccc] transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h11A1.5 1.5 0 0 1 15 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2 3.5a.5.5 0 0 1 .5-.5H10v10H2.5a.5.5 0 0 1-.5-.5v-9zm9-.5v10h2.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H11z" />
            </svg>
          </button>

          <button
            title="Customize Layout"
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#333333] text-[#888888] hover:text-[#cccccc] transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2.5 2A1.5 1.5 0 0 0 1 3.5v9A1.5 1.5 0 0 0 2.5 14h11a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 13.5 2h-11zM2 3.5a.5.5 0 0 1 .5-.5H7v4.5H2V3.5zm0 5.5h5V13H2.5a.5.5 0 0 1-.5-.5V9zm6 4V8h6v4.5a.5.5 0 0 1-.5.5H8zm6-5.5H8V3h5.5a.5.5 0 0 1 .5.5V7.5z" />
            </svg>
          </button>
        </div>

        <div className="flex items-center h-full">
          <button
            onClick={handleMinimize}
            title="Minimize"
            className="w-11.5 h-full flex items-center justify-center text-[#cccccc] hover:text-white hover:bg-white/10 active:bg-white/15 transition-colors cursor-pointer"
          >
            <svg width="10" height="1" viewBox="0 0 10 1">
              <rect width="10" height="1" fill="currentColor" />
            </svg>
          </button>

          <button
            onClick={handleMaximize}
            title={isMaximized ? "Restore Down" : "Maximize"}
            className="w-11.5 h-full flex items-center justify-center text-[#cccccc] hover:text-white hover:bg-white/10 active:bg-white/15 transition-colors cursor-pointer"
          >
            {isMaximized ? (
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M2.5 0.5h7v7h-7z" />
                <path d="M0.5 2.5h7v7h-7z" fill="#181818" />
              </svg>
            ) : (
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <rect x="0.5" y="0.5" width="9" height="9" />
              </svg>
            )}
          </button>

          <button
            onClick={handleClose}
            title="Close"
            className="w-11.5 h-full flex items-center justify-center text-[#cccccc] hover:text-white hover:bg-[#e81123] active:bg-[#bf0f1d] transition-colors cursor-pointer"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <line x1="0" y1="0" x2="10" y2="10" />
              <line x1="10" y1="0" x2="0" y2="10" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
