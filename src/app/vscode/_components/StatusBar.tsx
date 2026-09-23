import React from "react";
import {
  IconGitBranch,
  IconRefresh,
  IconCircleX,
  IconAlertTriangle,
  IconBell,
  IconCheck,
  IconTerminal2,
} from "@tabler/icons-react";

interface StatusBarProps {
  activeLine: number;
  activeCol: number;
  fileName: string;
  isPanelOpen: boolean;
  onTogglePanel: () => void;
}

export function StatusBar({
  activeLine,
  activeCol,
  fileName,
  isPanelOpen,
  onTogglePanel,
}: StatusBarProps) {
  const ext = fileName.split(".").pop()?.toLowerCase() || "";

  const getLanguageMode = () => {
    switch (ext) {
      case "py":
      case "pyw":
      case "ipynb":
        return "Python";
      case "c":
      case "h":
        return "C";
      case "cpp":
      case "cc":
      case "cxx":
      case "hpp":
        return "C++";
      case "cs":
        return "C#";
      case "java":
        return "Java";
      case "kt":
      case "kts":
        return "Kotlin";
      case "go":
        return "Go";
      case "rs":
        return "Rust";
      case "php":
        return "PHP";
      case "rb":
        return "Ruby";
      case "swift":
        return "Swift";
      case "dart":
        return "Dart";
      case "html":
      case "htm":
        return "HTML";
      case "css":
        return "CSS";
      case "scss":
      case "sass":
        return "SCSS";
      case "tsx":
        return "TypeScript JSX";
      case "ts":
        return "TypeScript";
      case "jsx":
        return "JavaScript JSX";
      case "js":
      case "mjs":
      case "cjs":
        return "JavaScript";
      case "json":
        return "JSON";
      case "sql":
        return "SQL";
      case "sh":
      case "bash":
      case "zsh":
        return "Shell Script";
      case "yml":
      case "yaml":
        return "YAML";
      case "md":
        return "Markdown";
      case "vue":
        return "Vue";
      case "svelte":
        return "Svelte";
      case "lua":
        return "Lua";
      case "r":
        return "R";
      default:
        return "Plain Text";
    }
  };

  return (
    <footer className="h-5.5 bg-[#007acc] text-white flex items-center justify-between px-2 text-[12px] select-none font-sans shrink-0 z-20">
      <div className="flex items-center h-full gap-2">
        <div className="h-full bg-[#16825d] px-2 flex items-center gap-1 cursor-pointer font-medium hover:brightness-110">
          <span className="text-[11px]">&gt;&lt;</span>
          <span className="hidden sm:inline text-[11px]">WSL: Ubuntu</span>
        </div>

        <div className="flex items-center gap-1 hover:bg-[#1f8ad2] px-1.5 py-0.5 rounded cursor-pointer transition-colors">
          <IconGitBranch className="w-3.5 h-3.5" />
          <span>main*</span>
        </div>

        <div
          title="Synchronize Changes"
          className="flex items-center hover:bg-[#1f8ad2] p-1 rounded cursor-pointer transition-colors"
        >
          <IconRefresh className="w-3.5 h-3.5" />
        </div>

        <div className="flex items-center gap-1 hover:bg-[#1f8ad2] px-1.5 py-0.5 rounded cursor-pointer transition-colors">
          <IconCircleX className="w-3.5 h-3.5" />
          <span>0</span>
          <IconAlertTriangle className="w-3.5 h-3.5 ml-1" />
          <span>0</span>
        </div>

        <button
          onClick={onTogglePanel}
          title={
            isPanelOpen
              ? "Hide Terminal (Cmd+J / Ctrl+`)"
              : "Show Terminal (Cmd+J / Ctrl+`)"
          }
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded cursor-pointer transition-all ${
            isPanelOpen
              ? "bg-[#005a9e] text-white font-medium shadow-inner"
              : "hover:bg-[#1f8ad2] text-white/90"
          }`}
        >
          <IconTerminal2 className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium">Terminal</span>
          {isPanelOpen && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ec9b0]" />
          )}
        </button>
      </div>

      <div className="flex items-center h-full gap-3 text-[12px]">
        <div className="hover:bg-[#1f8ad2] px-1.5 py-0.5 rounded cursor-pointer transition-colors">
          Ln {activeLine}, Col {activeCol}
        </div>

        <div className="hidden sm:block hover:bg-[#1f8ad2] px-1.5 py-0.5 rounded cursor-pointer transition-colors">
          Spaces: 2
        </div>

        <div className="hidden sm:block hover:bg-[#1f8ad2] px-1.5 py-0.5 rounded cursor-pointer transition-colors">
          UTF-8
        </div>

        <div className="hidden md:block hover:bg-[#1f8ad2] px-1.5 py-0.5 rounded cursor-pointer transition-colors">
          LF
        </div>

        <div className="hover:bg-[#1f8ad2] px-1.5 py-0.5 rounded cursor-pointer transition-colors font-medium">
          {getLanguageMode()}
        </div>

        <div className="hidden lg:flex items-center gap-1 hover:bg-[#1f8ad2] px-1.5 py-0.5 rounded cursor-pointer transition-colors">
          <IconCheck className="w-3.5 h-3.5" />
          <span>Prettier</span>
        </div>

        <div className="hover:bg-[#1f8ad2] p-1 rounded cursor-pointer transition-colors">
          <IconBell className="w-3.5 h-3.5" />
        </div>
      </div>
    </footer>
  );
}
