"use client";

import React, { useState, useRef } from "react";
import { useWindows } from "../context/WindowsContext";

interface NotepadAppProps {
  windowId: string;
  initialText?: string;
}

export function NotepadApp({ windowId, initialText }: NotepadAppProps) {
  const { themeMode, closeWindow } = useWindows();
  const [content, setContent] = useState(
    initialText ??
      `Windows 11 Notepad
Version 11.2402.10.0

A clean, modern text editor with seamless typing experience.
Type anywhere to take notes or draft documents.

Shortcut commands:
• Ctrl + S: Save file
• Ctrl + A: Select all
`
  );

  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const [zoom, setZoom] = useState(100);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const updateCursorPosition = () => {
    if (!textareaRef.current) return;
    const text = textareaRef.current.value.substring(
      0,
      textareaRef.current.selectionStart
    );
    const lines = text.split("\n");
    setCursorPos({
      line: lines.length,
      col: lines[lines.length - 1].length + 1,
    });
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.txt";
    a.click();
    URL.revokeObjectURL(url);
    setActiveMenu(null);
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  return (
    <div
      className={`flex flex-col h-full text-xs select-none ${
        themeMode === "dark"
          ? "bg-[#191919] text-[#e0e0e0]"
          : "bg-[#ffffff] text-[#1f1f1f]"
      }`}
      onClick={() => activeMenu && setActiveMenu(null)}
    >
      <div
        className={`flex items-center px-2 py-1 border-b select-none relative ${
          themeMode === "dark"
            ? "bg-[#202020] border-white/10"
            : "bg-[#f3f3f3] border-black/10"
        }`}
      >
        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenu(activeMenu === "file" ? null : "file");
            }}
            className={`px-2.5 py-1 rounded hover:bg-white/10 transition-colors ${
              activeMenu === "file" ? "bg-white/15" : ""
            }`}
          >
            File
          </button>
          {activeMenu === "file" && (
            <div
              className={`absolute top-full left-0 mt-1 w-44 py-1.5 rounded-lg shadow-xl border backdrop-blur-xl z-50 ${
                themeMode === "dark"
                  ? "bg-[#2b2b2b] border-white/15 text-neutral-200"
                  : "bg-white border-black/15 text-neutral-800"
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  setContent("");
                  setActiveMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors"
              >
                New
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors flex justify-between"
              >
                <span>Save As...</span>
                <span className="opacity-60 text-[10px]">Ctrl+S</span>
              </button>
              <div className="my-1 border-t border-white/10" />
              <button
                type="button"
                onClick={() => closeWindow(windowId)}
                className="w-full text-left px-3 py-1.5 hover:bg-red-600 hover:text-white transition-colors"
              >
                Exit
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenu(activeMenu === "edit" ? null : "edit");
            }}
            className={`px-2.5 py-1 rounded hover:bg-white/10 transition-colors ${
              activeMenu === "edit" ? "bg-white/15" : ""
            }`}
          >
            Edit
          </button>
          {activeMenu === "edit" && (
            <div
              className={`absolute top-full left-0 mt-1 w-40 py-1.5 rounded-lg shadow-xl border backdrop-blur-xl z-50 ${
                themeMode === "dark"
                  ? "bg-[#2b2b2b] border-white/15 text-neutral-200"
                  : "bg-white border-black/15 text-neutral-800"
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  textareaRef.current?.select();
                  setActiveMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors flex justify-between"
              >
                <span>Select All</span>
                <span className="opacity-60 text-[10px]">Ctrl+A</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setContent(
                    (prev) => prev + `\n[${new Date().toLocaleTimeString()}] `
                  );
                  setActiveMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors"
              >
                Time / Date
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenu(activeMenu === "view" ? null : "view");
            }}
            className={`px-2.5 py-1 rounded hover:bg-white/10 transition-colors ${
              activeMenu === "view" ? "bg-white/15" : ""
            }`}
          >
            View
          </button>
          {activeMenu === "view" && (
            <div
              className={`absolute top-full left-0 mt-1 w-36 py-1.5 rounded-lg shadow-xl border backdrop-blur-xl z-50 ${
                themeMode === "dark"
                  ? "bg-[#2b2b2b] border-white/15 text-neutral-200"
                  : "bg-white border-black/15 text-neutral-800"
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  setZoom((prev) => Math.min(200, prev + 10));
                  setActiveMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors"
              >
                Zoom In (+10%)
              </button>
              <button
                type="button"
                onClick={() => {
                  setZoom((prev) => Math.max(50, prev - 10));
                  setActiveMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors"
              >
                Zoom Out (-10%)
              </button>
              <button
                type="button"
                onClick={() => {
                  setZoom(100);
                  setActiveMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors"
              >
                Reset Zoom (100%)
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 p-3 overflow-hidden relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            updateCursorPosition();
          }}
          onKeyUp={updateCursorPosition}
          onClick={updateCursorPosition}
          style={{ fontSize: `${(13 * zoom) / 100}px` }}
          className="w-full h-full bg-transparent resize-none outline-none font-mono leading-relaxed select-text"
          placeholder="Start typing your document..."
          spellCheck={false}
        />
      </div>

      <div
        className={`flex items-center justify-between px-4 py-1 text-[11px] border-t select-none ${
          themeMode === "dark"
            ? "bg-[#202020] border-white/10 text-neutral-400"
            : "bg-[#f3f3f3] border-black/10 text-neutral-600"
        }`}
      >
        <div className="flex items-center gap-4">
          <span>{charCount} characters</span>
          <span>{wordCount} words</span>
        </div>
        <div className="flex items-center gap-4 font-mono">
          <span>
            Ln {cursorPos.line}, Col {cursorPos.col}
          </span>
          <span>{zoom}%</span>
          <span>Windows (CRLF)</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
}
