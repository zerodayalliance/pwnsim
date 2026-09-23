import React, { useState } from "react";
import {
  IconPlus,
  IconChevronDown,
  IconTrash,
  IconX,
  IconMaximize,
} from "@tabler/icons-react";

interface TerminalPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TerminalPanel({ isOpen, onClose }: TerminalPanelProps) {
  const [activeTab, setActiveTab] = useState<
    "terminal" | "problems" | "output" | "debug"
  >("terminal");
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([
    "▲ Next.js 16.3.4 (Turbopack)",
    "  - Local:        http://localhost:3000",
    "  - Network:      http://192.168.1.5:3000",
    "  - Environments: .env.local",
    "",
    "✓ Starting...",
    "✓ Ready in 1420ms",
    "✓ Compiled /vscode in 180ms",
  ]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const cmd = inputVal.trim();
    let res = "";
    const lower = cmd.toLowerCase();

    if (cmd === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    } else if (cmd === "ls") {
      res = "package.json  pnpm-lock.yaml  README.md  src/  tsconfig.json";
    } else if (cmd === "git status") {
      res =
        "On branch main\nYour branch is up to date with 'origin/main'.\nChanges not staged for commit:\n  modified:   src/app/vscode/page.tsx";
    } else if (lower.startsWith("python ") || lower.startsWith("python3 ")) {
      res = "Hello from Python!";
    } else if (lower.startsWith("gcc ") || lower.startsWith("clang ")) {
      res = "Compiling C source... [Done] => a.out generated";
    } else if (lower.startsWith("g++ ") || lower.startsWith("clang++ ")) {
      res = "Compiling C++ source... [Done] => a.out generated";
    } else if (lower === "./a.out") {
      res = "Hello, World!";
    } else if (lower.startsWith("javac ")) {
      res = "Compiled Java class files successfully.";
    } else if (lower.startsWith("java ")) {
      res = "Hello from Java!";
    } else if (lower.startsWith("kotlinc ")) {
      res = "Compiling Kotlin source... [Done]";
    } else if (lower.startsWith("go run ")) {
      res = "Hello from Go!";
    } else if (lower.startsWith("cargo run")) {
      res =
        "   Compiling pwned v0.1.0 (/pwned)\n    Finished dev [unoptimized + debuginfo] target(s) in 0.38s\n     Running `target/debug/pwned`\nHello from Rust!";
    } else if (lower.startsWith("node ")) {
      res = "Hello from Node.js!";
    } else if (lower.startsWith("echo ")) {
      res = cmd.slice(5);
    } else {
      res = `zsh: command executed: ${cmd}`;
    }

    setHistory((prev) => [
      ...prev,
      `zerodayalliance@MacBook-Pro pwned % ${cmd}`,
      ...(res ? res.split("\n") : []),
    ]);
    setInputVal("");
  };

  return (
    <div className="h-[200px] bg-[#181818] border-t border-[#2b2b2b] flex flex-col font-sans shrink-0 select-text">
      <div className="h-[32px] bg-[#181818] border-b border-[#252526] flex items-center justify-between px-3 select-none text-[12px]">
        <div className="flex items-center gap-4 text-[#969696] font-medium uppercase tracking-wider text-[11px]">
          <button
            onClick={() => setActiveTab("problems")}
            className={`hover:text-white transition-colors cursor-pointer ${
              activeTab === "problems"
                ? "text-white border-b-2 border-white pb-1"
                : ""
            }`}
          >
            Problems{" "}
            <span className="text-[10px] bg-[#333333] px-1 rounded-full ml-1">
              0
            </span>
          </button>
          <button
            onClick={() => setActiveTab("output")}
            className={`hover:text-white transition-colors cursor-pointer ${
              activeTab === "output"
                ? "text-white border-b-2 border-white pb-1"
                : ""
            }`}
          >
            Output
          </button>
          <button
            onClick={() => setActiveTab("debug")}
            className={`hover:text-white transition-colors cursor-pointer ${
              activeTab === "debug"
                ? "text-white border-b-2 border-white pb-1"
                : ""
            }`}
          >
            Debug Console
          </button>
          <button
            onClick={() => setActiveTab("terminal")}
            className={`hover:text-white transition-colors cursor-pointer ${
              activeTab === "terminal"
                ? "text-white border-b-2 border-white pb-1"
                : ""
            }`}
          >
            Terminal
          </button>
          <button className="hover:text-white transition-colors cursor-pointer">
            Ports
          </button>
        </div>

        <div className="flex items-center gap-1 text-[#888888]">
          <div className="flex items-center gap-1 bg-[#252526] px-2 py-0.5 rounded text-[11px] text-[#cccccc] cursor-pointer hover:bg-[#333333]">
            <span>1: zsh (pnpm run dev)</span>
            <IconChevronDown className="w-3 h-3" />
          </div>
          <button
            title="New Terminal"
            className="p-1 hover:bg-[#333333] hover:text-white rounded"
          >
            <IconPlus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setHistory([])}
            title="Clear Terminal"
            className="p-1 hover:bg-[#333333] hover:text-white rounded"
          >
            <IconTrash className="w-3.5 h-3.5" />
          </button>
          <button
            title="Maximize Panel"
            className="p-1 hover:bg-[#333333] hover:text-white rounded"
          >
            <IconMaximize className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            title="Close Panel (Cmd+J)"
            className="p-1 hover:bg-[#333333] hover:text-white rounded"
          >
            <IconX className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[#181818] p-3 overflow-y-auto font-mono text-[13px] leading-5 text-[#cccccc]">
        {activeTab === "terminal" ? (
          <div>
            {history.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.startsWith("✓")
                    ? "text-[#4ec9b0]"
                    : line.startsWith("▲")
                      ? "text-white font-bold"
                      : line.startsWith("aviksamanta@")
                        ? "text-[#61afef]"
                        : "text-[#cccccc]"
                }
              >
                {line}
              </div>
            ))}

            <form
              onSubmit={handleCommand}
              className="flex items-center gap-2 mt-1"
            >
              <span className="text-[#61afef] shrink-0 select-none">
                zerodayalliance@MacBook-Pro pwned %
              </span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 bg-transparent text-[#ffffff] outline-none border-0 p-0 font-mono text-[13px]"
                autoFocus
              />
            </form>
          </div>
        ) : (
          <div className="text-[#888888] flex items-center justify-center h-full">
            No problems have been detected in the workspace.
          </div>
        )}
      </div>
    </div>
  );
}
