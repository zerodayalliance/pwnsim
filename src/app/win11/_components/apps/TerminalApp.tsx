"use client";

import React, { useState, useRef, useEffect } from "react";
import { useWindows } from "../context/WindowsContext";
import { TerminalIcon, IconPlus } from "../icons/Win11Icons";

interface TerminalAppProps {
  windowId: string;
}

export function TerminalApp({ windowId }: TerminalAppProps) {
  const { toggleThemeMode, closeWindow } = useWindows();

  const [history, setHistory] = useState<
    Array<{ text: string; isInput?: boolean }>
  >([
    { text: "Windows PowerShell" },
    { text: "Copyright (C) Microsoft Corporation. All rights reserved." },
    { text: "Try the new cross-platform PowerShell https://aka.ms/pscore6" },
    { text: "Type 'help' or 'neofetch' to view available system commands.\n" },
  ]);

  const [inputVal, setInputVal] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const newHistory = [
      ...history,
      { text: `PS C:\\Users\\ZeroDay> ${cmd}`, isInput: true },
    ];

    const lower = cmd.toLowerCase();
    if (lower === "clear" || lower === "cls") {
      setHistory([]);
      setInputVal("");
      return;
    }

    if (lower === "help") {
      newHistory.push({
        text: `Available commands:
  help      - Display this command reference
  neofetch  - Display system specs & Windows 11 ASCII art
  winver    - Show Windows 11 version details
  ls / dir  - List current directory contents
  theme     - Toggle between Light and Dark mode
  date      - Print current system date and time
  clear     - Clear the terminal console
  exit      - Close this terminal session`,
      });
    } else if (lower === "neofetch" || lower === "fastfetch") {
      newHistory.push({
        text: `
  ########   ########    zeroday@WIN11-DEV-STATION
  ########   ########    -------------------------
  ########   ########    OS: Windows 11 Pro Enterprise x64
  ########   ########    Host: Next.js 16 (App Router)
                         Kernel: React 19.2 + Tailwind CSS v4
  ########   ########    UI Engine: Motion / Framer Motion
  ########   ########    Shell: Windows Terminal PowerShell 7.4
  ########   ########    Resolution: 1920x1080 @ 144Hz
  ########   ########    Memory: 18.4 GB / 64.0 GB
                         Theme: Mica Acrylic Glass
`,
      });
    } else if (lower === "winver") {
      newHistory.push({
        text: `Microsoft Windows 11 Enterprise
Version 23H2 (OS Build 22631.3296)
ZeroDay Alliance Developer Edition
Licensed under MIT.`,
      });
    } else if (lower === "ls" || lower === "dir") {
      newHistory.push({
        text: `Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         9/11/2026   9:42 PM                Documents
d-----         9/11/2026   9:42 PM                Downloads
d-----         9/11/2026   9:42 PM                Pictures
-a----         9/11/2026   9:42 PM           5420 bloom-light.jpg
-a----         9/11/2026   9:42 PM           5182 bloom-dark.jpg
-a----         9/11/2026   9:42 PM           1024 README.md`,
      });
    } else if (lower === "date") {
      newHistory.push({
        text: `${new Date().toString()}`,
      });
    } else if (lower === "theme") {
      toggleThemeMode();
      newHistory.push({
        text: "Theme toggled successfully.",
      });
    } else if (lower.startsWith("echo ")) {
      newHistory.push({
        text: cmd.substring(5),
      });
    } else if (lower === "exit") {
      closeWindow(windowId);
      return;
    } else {
      newHistory.push({
        text: `'${cmd}' is not recognized as an internal or external command. Type 'help' for available commands.`,
      });
    }

    setHistory(newHistory);
    setInputVal("");
  };

  return (
    <div
      className="flex flex-col h-full bg-[#0c0c0c] text-neutral-100 font-mono text-xs select-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Tab Bar */}
      <div className="flex items-center px-2 py-1 bg-[#1a1a1a] border-b border-white/10 select-none">
        <div className="flex items-center gap-2 px-3 py-1 bg-[#0c0c0c] rounded-t-md text-white text-xs border-t border-x border-white/10">
          <TerminalIcon className="w-3.5 h-3.5" />
          <span>PowerShell</span>
        </div>
        <button
          type="button"
          className="p-1 ml-1 text-neutral-400 hover:text-white hover:bg-white/10 rounded"
        >
          <IconPlus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-3 overflow-y-auto custom-scrollbar space-y-1">
        {history.map((item, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap leading-relaxed ${
              item.isInput ? "text-blue-300 font-semibold" : "text-neutral-300"
            }`}
          >
            {item.text}
          </div>
        ))}

        {/* Active Command Line */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 pt-1">
          <span className="text-blue-400 font-semibold shrink-0">
            PS C:\Users\ZeroDay&gt;
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none border-none p-0 font-mono text-xs"
            autoFocus
            spellCheck={false}
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
