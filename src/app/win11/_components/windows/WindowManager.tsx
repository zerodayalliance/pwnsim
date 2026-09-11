"use client";

import React from "react";
import { AnimatePresence } from "motion/react";
import { useWindows } from "../context/WindowsContext";
import { WindowFrame } from "./WindowFrame";
import { NotepadApp } from "../apps/NotepadApp";
import { SettingsApp } from "../apps/SettingsApp";
import { BrowserApp } from "../apps/BrowserApp";
import { ThisPCApp } from "../apps/ThisPCApp";
import { RecycleBinApp } from "../apps/RecycleBinApp";
import { TerminalApp } from "../apps/TerminalApp";
import { CalculatorApp } from "../apps/CalculatorApp";
import { WindowInstance } from "../types";

export function WindowManager() {
  const { windows } = useWindows();

  const renderAppContent = (win: WindowInstance) => {
    switch (win.appId) {
      case "notepad":
        return (
          <NotepadApp
            windowId={win.id}
            initialText={win.customData?.initialText}
          />
        );
      case "settings":
        return <SettingsApp initialTab={win.customData?.initialTab} />;
      case "browser":
        return <BrowserApp initialUrl={win.customData?.url} />;
      case "this-pc":
      case "file-explorer":
        return <ThisPCApp />;
      case "recycle-bin":
        return <RecycleBinApp />;
      case "terminal":
        return <TerminalApp windowId={win.id} />;
      case "calculator":
        return <CalculatorApp />;
      default:
        return (
          <div className="p-8 text-center text-neutral-400">
            Application ({win.appId})
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {windows.map((win) => (
        <WindowFrame key={win.id} window={win}>
          {renderAppContent(win)}
        </WindowFrame>
      ))}
    </AnimatePresence>
  );
}
