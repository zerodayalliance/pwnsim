"use client";

import React, { useState, useEffect, useCallback } from "react";
import { TitleBar } from "./_components/TitleBar";
import { ActivityBar, ActiveSidebarTab } from "./_components/ActivityBar";
import { FileExplorer } from "./_components/FileExplorer";
import { EditorTabs } from "./_components/EditorTabs";
import { CodeEditor } from "./_components/CodeEditor";
import { StatusBar } from "./_components/StatusBar";
import { TerminalPanel } from "./_components/TerminalPanel";
import { INITIAL_FILES, FileNode, TabItem } from "./types";

import Pwn from "@/components/pwn";
import { useNetworkPwn } from "@/hooks/useNetworkPwn";

export default function VSCodePage() {
  const { isCompromised, isInfecting, threatDetails, resetNetworkPwn } =
    useNetworkPwn({
      deviceType: "vscode",
      propagationDelayMs: 800,
      stagerDurationMs: 1400,
    });

  const [files, setFiles] = useState<FileNode[]>(INITIAL_FILES);
  const [activeFileId, setActiveFileId] = useState<string | null>("app-layout");
  const [tabs, setTabs] = useState<TabItem[]>([
    {
      id: "tab-layout",
      fileId: "app-layout",
      name: "layout.tsx",
      isDirty: false,
    },
    { id: "tab-page", fileId: "app-page", name: "page.tsx", isDirty: false },
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeSidebarTab, setActiveSidebarTab] =
    useState<ActiveSidebarTab>("explorer");
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

  const [cursorPos, setCursorPos] = useState({ line: 18, col: 1 });

  const activeFile = files.find((f) => f.id === activeFileId);

  // Switch or open a file
  const handleSelectFile = useCallback(
    (fileId: string) => {
      const file = files.find((f) => f.id === fileId);
      if (!file || file.type !== "file") return;

      setActiveFileId(fileId);

      // If not already in tabs, add it
      setTabs((prev) => {
        const exists = prev.some((t) => t.fileId === fileId);
        if (exists) return prev;
        return [
          ...prev,
          {
            id: `tab-${file.id}`,
            fileId: file.id,
            name: file.name,
            isDirty: false,
          },
        ];
      });
    },
    [files]
  );

  // Close tab
  const handleCloseTab = useCallback(
    (tabId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setTabs((prev) => {
        const nextTabs = prev.filter((t) => t.id !== tabId);
        if (nextTabs.length > 0) {
          // If closed active tab, switch to the last one
          const closedTab = prev.find((t) => t.id === tabId);
          if (closedTab && closedTab.fileId === activeFileId) {
            setActiveFileId(nextTabs[nextTabs.length - 1].fileId);
          }
        } else {
          setActiveFileId(null);
        }
        return nextTabs;
      });
    },
    [activeFileId]
  );

  // Create file or folder
  const handleCreateNode = (
    name: string,
    type: "file" | "folder",
    parentId: string | null
  ) => {
    const newId = `node-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const lower = name.toLowerCase();
    const ext = lower.split(".").pop() || "";

    let defaultContent = `# ${name}\n`;
    if (type === "file") {
      if (["tsx", "jsx"].includes(ext)) {
        defaultContent = `export default function Component() {\n  return (\n    <div>\n      <h1>Hello from Component</h1>\n    </div>\n  );\n}\n`;
      } else if (["ts", "js"].includes(ext)) {
        defaultContent = `export function greet(name: string): string {\n  return \`Hello, \${name}!\`;\n}\n`;
      } else if (["py", "pyw", "ipynb"].includes(ext)) {
        defaultContent = `def main():\n    print("Hello from Python!")\n\nif __name__ == "__main__":\n    main()\n`;
      } else if (ext === "c" || ext === "h") {
        defaultContent = `#include <stdio.h>\n\nint main() {\n    printf("Hello from C!\\n");\n    return 0;\n}\n`;
      } else if (["cpp", "cc", "cxx", "hpp"].includes(ext)) {
        defaultContent = `#include <iostream>\n\nint main() {\n    std::cout << "Hello from C++!" << std::endl;\n    return 0;\n}\n`;
      } else if (ext === "cs") {
        defaultContent = `using System;\n\nnamespace App {\n    class Program {\n        static void Main(string[] args) {\n            Console.WriteLine("Hello from C#!");\n        }\n    }\n}\n`;
      } else if (["java", "class"].includes(ext)) {
        const className = name.replace(/\.[^/.]+$/, "") || "Main";
        defaultContent = `public class ${className} {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java!");\n    }\n}\n`;
      } else if (["kt", "kts"].includes(ext)) {
        defaultContent = `fun main() {\n    println("Hello from Kotlin!")\n}\n`;
      } else if (ext === "go") {
        defaultContent = `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello from Go!")\n}\n`;
      } else if (["rs", "rlib"].includes(ext)) {
        defaultContent = `fn main() {\n    println!("Hello from Rust!");\n}\n`;
      } else if (["php", "phtml"].includes(ext)) {
        defaultContent = `<?php\n\necho "Hello from PHP!\\n";\n`;
      } else if (["rb", "rake"].includes(ext)) {
        defaultContent = `def main\n  puts "Hello from Ruby!"\nend\n\nmain\n`;
      } else if (ext === "swift") {
        defaultContent = `import Foundation\n\nprint("Hello from Swift!")\n`;
      } else if (ext === "dart") {
        defaultContent = `void main() {\n  print("Hello from Dart!");\n}\n`;
      } else if (["html", "htm"].includes(ext)) {
        defaultContent = `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <title>Document</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n</body>\n</html>\n`;
      } else if (["css", "scss", "sass", "less"].includes(ext)) {
        defaultContent = `/* Styles for ${name} */\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n`;
      } else if (["json", "jsonc"].includes(ext)) {
        defaultContent = `{\n  "name": "${name.replace(".json", "")}",\n  "version": "1.0.0"\n}\n`;
      } else if (["sh", "bash", "zsh"].includes(ext)) {
        defaultContent = `#!/usr/bin/env bash\n\necho "Running ${name}..."\n`;
      } else if (ext === "sql") {
        defaultContent = `SELECT id, name, created_at FROM users WHERE status = 'active';\n`;
      } else if (ext === "lua") {
        defaultContent = `print("Hello from Lua!")\n`;
      } else if (ext === "r") {
        defaultContent = `message <- "Hello from R!"\nprint(message)\n`;
      }
    }

    const newNode: FileNode = {
      id: newId,
      name,
      type,
      parentId,
      isOpen: type === "folder" ? true : undefined,
      content: type === "file" ? defaultContent : undefined,
    };

    setFiles((prev) => {
      // If parent is folder, ensure it is open
      const updated = prev.map((item) =>
        item.id === parentId ? { ...item, isOpen: true } : item
      );
      return [...updated, newNode];
    });

    if (type === "file") {
      setActiveFileId(newId);
      setTabs((prev) => [
        ...prev,
        { id: `tab-${newId}`, fileId: newId, name, isDirty: false },
      ]);
    }
  };

  // Delete file or folder
  const handleDeleteNode = (id: string) => {
    // Find all ids to delete (node + descendants)
    const toDelete = new Set<string>();
    const collect = (currId: string) => {
      toDelete.add(currId);
      files
        .filter((f) => f.parentId === currId)
        .forEach((child) => collect(child.id));
    };
    collect(id);

    setFiles((prev) => prev.filter((f) => !toDelete.has(f.id)));
    setTabs((prev) => {
      const remaining = prev.filter((t) => !toDelete.has(t.fileId));
      if (toDelete.has(activeFileId || "")) {
        setActiveFileId(
          remaining.length > 0 ? remaining[remaining.length - 1].fileId : null
        );
      }
      return remaining;
    });
  };

  // Rename node
  const handleRenameNode = (id: string, newName: string) => {
    setFiles((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name: newName } : item))
    );
    setTabs((prev) =>
      prev.map((t) => (t.fileId === id ? { ...t, name: newName } : t))
    );
  };

  // Toggle folder expansion
  const handleToggleFolder = (folderId: string) => {
    setFiles((prev) =>
      prev.map((item) =>
        item.id === folderId ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  // Update content of active file
  const handleContentChange = (newContent: string) => {
    if (!activeFileId) return;
    setFiles((prev) =>
      prev.map((f) =>
        f.id === activeFileId ? { ...f, content: newContent } : f
      )
    );
    setTabs((prev) =>
      prev.map((t) => (t.fileId === activeFileId ? { ...t, isDirty: true } : t))
    );
  };

  // Global keybindings (Cmd+S, Cmd+B, Cmd+J, Ctrl+`, Cmd+`)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        // Save: clear dirty flag
        setTabs((prev) =>
          prev.map((t) =>
            t.fileId === activeFileId ? { ...t, isDirty: false } : t
          )
        );
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        setIsSidebarOpen((prev) => !prev);
      }
      if (
        ((e.metaKey || e.ctrlKey) && e.key === "j") ||
        ((e.ctrlKey || e.metaKey) && e.key === "`")
      ) {
        e.preventDefault();
        setIsPanelOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeFileId]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#181818]">
      {/* VS Code Workbench Shell (Blurred when compromised or stager is infecting) */}
      <div
        className={`flex flex-col h-full w-full overflow-hidden text-[#cccccc] font-sans antialiased select-none transition-all duration-300 ${
          isCompromised || isInfecting
            ? "pointer-events-none filter blur-[0.8px] brightness-90"
            : ""
        }`}
      >
        {/* 1. Title Bar */}
        <TitleBar
          activeFileName={activeFile ? activeFile.name : "pwned"}
          isSidebarOpen={isSidebarOpen}
          isPanelOpen={isPanelOpen}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          onTogglePanel={() => setIsPanelOpen((prev) => !prev)}
        />

        {/* 2. Main Workbench Body */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Activity Bar (Far Left) */}
          <ActivityBar
            activeTab={activeSidebarTab}
            onSelectTab={(tab) => {
              if (activeSidebarTab === tab && isSidebarOpen) {
                setIsSidebarOpen(false);
              } else {
                setActiveSidebarTab(tab);
                setIsSidebarOpen(true);
              }
            }}
            isOpen={isSidebarOpen}
          />

          {/* Primary Sidebar (Explorer or Alternative View) */}
          {isSidebarOpen && (
            <>
              {activeSidebarTab === "explorer" && (
                <FileExplorer
                  files={files}
                  activeFileId={activeFileId}
                  onSelectFile={handleSelectFile}
                  onCreateNode={handleCreateNode}
                  onDeleteNode={handleDeleteNode}
                  onRenameNode={handleRenameNode}
                  onToggleFolder={handleToggleFolder}
                />
              )}

              {activeSidebarTab === "search" && (
                <aside className="w-65 bg-[#181818] border-r border-[#2b2b2b] p-3 text-[13px] shrink-0">
                  <div className="text-[11px] font-semibold text-[#bbbbbb] tracking-wider uppercase mb-3">
                    Search
                  </div>
                  <div className="relative mb-2">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full bg-[#3c3c3c] border border-[#3e3e3e] focus:border-[#007fd4] text-white text-[13px] px-2 py-1 outline-none rounded-none"
                    />
                  </div>
                  <div className="text-[#888888] text-[12px] mt-4">
                    No results found in workspace.
                  </div>
                </aside>
              )}

              {activeSidebarTab === "git" && (
                <aside className="w-65 bg-[#181818] border-r border-[#2b2b2b] p-3 text-[13px] shrink-0">
                  <div className="text-[11px] font-semibold text-[#bbbbbb] tracking-wider uppercase mb-2">
                    Source Control
                  </div>
                  <div className="text-[12px] text-[#cccccc] mb-2 font-medium">
                    Changes (1)
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 hover:bg-[#2a2d2e] rounded cursor-pointer text-[13px]">
                    <span className="text-[#e5c07b]">M layout.tsx</span>
                    <span className="text-[11px] text-[#888888]">src/app</span>
                  </div>
                </aside>
              )}

              {activeSidebarTab === "debug" && (
                <aside className="w-65 bg-[#181818] border-r border-[#2b2b2b] p-3 text-[13px] shrink-0">
                  <div className="text-[11px] font-semibold text-[#bbbbbb] tracking-wider uppercase mb-3">
                    Run and Debug
                  </div>
                  <button className="w-full bg-[#007acc] hover:bg-[#0062a3] text-white py-1.5 px-3 rounded text-[13px] font-medium transition-colors">
                    Run and Debug
                  </button>
                </aside>
              )}

              {activeSidebarTab === "extensions" && (
                <aside className="w-65 bg-[#181818] border-r border-[#2b2b2b] p-3 text-[13px] shrink-0">
                  <div className="text-[11px] font-semibold text-[#bbbbbb] tracking-wider uppercase mb-3">
                    Extensions
                  </div>
                  <input
                    type="text"
                    placeholder="Search Extensions in Marketplace"
                    className="w-full bg-[#3c3c3c] border border-[#3e3e3e] focus:border-[#007fd4] text-white text-[12px] px-2 py-1 outline-none"
                  />
                </aside>
              )}
            </>
          )}

          {/* Editor Area */}
          <main className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e] overflow-hidden">
            {tabs.length > 0 && activeFile ? (
              <>
                {/* Tab strip & breadcrumbs */}
                <EditorTabs
                  tabs={tabs}
                  activeFileId={activeFileId}
                  files={files}
                  onSelectTab={(id) => setActiveFileId(id)}
                  onCloseTab={handleCloseTab}
                />

                {/* Code Editor */}
                <div className="flex-1 min-h-0 relative">
                  <CodeEditor
                    content={activeFile.content || ""}
                    fileName={activeFile.name}
                    onChange={handleContentChange}
                    onCursorChange={(line, col) => setCursorPos({ line, col })}
                  />
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-[#858585] gap-3">
                <div className="text-4xl opacity-20 font-bold">VS Code</div>
                <p className="text-[13px]">
                  Select a file from the Explorer to start editing
                </p>
              </div>
            )}

            {/* Collapsible Bottom Panel */}
            <TerminalPanel
              isOpen={isPanelOpen}
              onClose={() => setIsPanelOpen(false)}
            />
          </main>
        </div>

        {/* 3. Status Bar */}
        <StatusBar
          activeLine={cursorPos.line}
          activeCol={cursorPos.col}
          fileName={activeFile ? activeFile.name : ""}
          isPanelOpen={isPanelOpen}
          onTogglePanel={() => setIsPanelOpen((prev) => !prev)}
        />
      </div>

      {/* VS Code Lateral Worm Breach Alert Stager */}
      {isInfecting && (
        <div className="fixed inset-0 z-9998 flex items-center justify-center bg-black/60 backdrop-blur-xs pointer-events-auto select-none animate-in fade-in zoom-in-95 duration-150">
          <div className="w-140 max-w-[92vw] bg-[#1e1e1e] border-2 border-red-500 shadow-[0_0_45px_rgba(239,68,68,0.4)] rounded text-[#cccccc] font-sans overflow-hidden">
            <div className="bg-[#2a1717] px-3.5 py-2 border-b border-red-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-[12.5px] font-semibold text-red-300">
                  Visual Studio Code — Critical Lateral Intrusion Detected
                </span>
              </div>
              <span className="text-[10.5px] font-mono text-red-400 bg-red-950/70 px-2 py-0.5 rounded border border-red-800">
                PID 4912
              </span>
            </div>
            <div className="p-4 space-y-2.5 font-mono text-[11.5px] leading-relaxed">
              <p className="text-red-400 font-bold">
                [!] Inbound remote exploit connection on TCP Port 445 (SMBv1)
              </p>
              <div className="bg-[#141414] p-3 rounded border border-neutral-800 space-y-1 text-neutral-300 text-[11px]">
                <p>
                  <span className="text-neutral-500">Source:</span>{" "}
                  <span className="text-amber-400">
                    {threatDetails?.sourceIp || "192.168.1.104"}
                  </span>{" "}
                  ({threatDetails?.sourceDevice || "Chrome Host"})
                </p>
                <p>
                  <span className="text-neutral-500">Vector:</span>{" "}
                  <span className="text-rose-400">
                    CVE-2017-0144 EternalBlue SMB Worm
                  </span>
                </p>
                <p>
                  <span className="text-neutral-500">Target:</span>{" "}
                  <span className="text-cyan-400">
                    dev-workstation (192.168.1.180) &bull; node.exe
                  </span>
                </p>
              </div>
              <div className="bg-[#121212] p-2.5 rounded border border-neutral-800 text-[11px] text-rose-300 space-y-0.5">
                <p>&gt; Encrypting: layout.tsx ... [ENCRYPTED]</p>
                <p>&gt; Encrypting: page.tsx ... [ENCRYPTED]</p>
                <p>&gt; Encrypting: types.ts ... [ENCRYPTED]</p>
                <p className="text-amber-400 animate-pulse font-semibold pt-1">
                  &gt; Master cryptographic lock engaged on dev container.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full WannaCry Ransomware Overlay */}
      {isCompromised && (
        <Pwn
          isOverlay={true}
          onExit={() => {
            resetNetworkPwn();
          }}
        />
      )}
    </div>
  );
}
