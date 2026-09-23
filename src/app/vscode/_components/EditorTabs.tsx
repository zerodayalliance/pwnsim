import React from "react";
import {
  IconX,
  IconChevronRight,
  IconLayoutColumns,
  IconDots,
} from "@tabler/icons-react";
import { TabItem, FileNode } from "../types";
import { FileIcon } from "./FileIcons";

interface EditorTabsProps {
  tabs: TabItem[];
  activeFileId: string | null;
  files: FileNode[];
  onSelectTab: (fileId: string) => void;
  onCloseTab: (tabId: string, e: React.MouseEvent) => void;
}

export function EditorTabs({
  tabs,
  activeFileId,
  files,
  onSelectTab,
  onCloseTab,
}: EditorTabsProps) {
  const activeFile = files.find((f) => f.id === activeFileId);
  const breadcrumbs: string[] = [];

  if (activeFile) {
    let curr: FileNode | undefined = activeFile;
    while (curr) {
      breadcrumbs.unshift(curr.name);
      curr = files.find((f) => f.id === curr?.parentId);
    }
  }

  return (
    <div className="flex flex-col bg-[#181818] border-b border-[#2b2b2b] shrink-0 select-none">
      <div className="flex items-center justify-between h-[35px] bg-[#181818] overflow-x-auto no-scrollbar">
        <div className="flex items-center h-full">
          {tabs.map((tab) => {
            const isActive = tab.fileId === activeFileId;
            return (
              <div
                key={tab.id}
                onClick={() => onSelectTab(tab.fileId)}
                className={`flex items-center gap-2 h-full px-3 text-[13px] border-r border-[#252526] cursor-pointer group transition-colors relative ${
                  isActive
                    ? "bg-[#1e1e1e] text-[#ffffff] font-normal border-t-2 border-t-[#007acc]"
                    : "bg-[#181818] text-[#969696] hover:bg-[#1f1f1f] hover:text-[#cccccc]"
                }`}
              >
                <FileIcon name={tab.name} className="w-4 h-4 shrink-0" />

                <span className="truncate max-w-[140px]">{tab.name}</span>

                <div className="w-5 h-5 flex items-center justify-center ml-1">
                  {tab.isDirty ? (
                    <div className="w-2 h-2 rounded-full bg-white group-hover:hidden" />
                  ) : null}
                  <button
                    onClick={(e) => onCloseTab(tab.id, e)}
                    title="Close (Cmd+W)"
                    className={`p-0.5 rounded hover:bg-[#333333] hover:text-white ${
                      tab.isDirty ? "hidden group-hover:flex" : "flex"
                    } text-[#aaaaaa]`}
                  >
                    <IconX className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-1 px-3 text-[#aaaaaa] shrink-0">
          <button
            title="Split Editor Right (Cmd+\\)"
            className="p-1 hover:bg-[#333333] hover:text-white rounded"
          >
            <IconLayoutColumns className="w-4 h-4" />
          </button>
          <button
            title="More Actions..."
            className="p-1 hover:bg-[#333333] hover:text-white rounded"
          >
            <IconDots className="w-4 h-4" />
          </button>
        </div>
      </div>

      {activeFile && (
        <div className="h-[22px] bg-[#1e1e1e] border-t border-[#222222] px-4 flex items-center gap-1 text-[11px] text-[#969696] overflow-x-auto no-scrollbar font-sans">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <IconChevronRight className="w-3 h-3 text-[#666666]" />
                )}
                <span
                  className={`flex items-center gap-1 hover:text-white cursor-pointer ${
                    isLast ? "text-[#cccccc] font-medium" : ""
                  }`}
                >
                  {isLast && (
                    <FileIcon name={crumb} className="w-3.5 h-3.5 inline" />
                  )}
                  {crumb}
                </span>
              </React.Fragment>
            );
          })}

          {activeFile.name === "layout.tsx" && (
            <>
              <IconChevronRight className="w-3 h-3 text-[#666666]" />
              <span className="flex items-center gap-1 text-[#cccccc] font-medium hover:text-white cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5C07B] inline-block opacity-80" />
                RootLayout
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
