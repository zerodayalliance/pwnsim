import React, { useState, useRef, useEffect } from 'react';
import {
  IconChevronRight,
  IconChevronDown,
  IconFilePlus,
  IconFolderPlus,
  IconRefresh,
  IconFold,
  IconDots,
  IconTrash,
  IconPencil,
} from '@tabler/icons-react';
import { FileNode } from '../types';
import { FileIcon } from './FileIcons';

interface FileExplorerProps {
  files: FileNode[];
  activeFileId: string | null;
  onSelectFile: (fileId: string) => void;
  onCreateNode: (name: string, type: 'file' | 'folder', parentId: string | null) => void;
  onDeleteNode: (id: string) => void;
  onRenameNode: (id: string, newName: string) => void;
  onToggleFolder: (folderId: string) => void;
}

export function FileExplorer({
  files,
  activeFileId,
  onSelectFile,
  onCreateNode,
  onDeleteNode,
  onRenameNode,
  onToggleFolder,
}: FileExplorerProps) {
  // Creating new file/folder state
  const [creationState, setCreationState] = useState<{
    type: 'file' | 'folder';
    parentId: string | null;
  } | null>(null);
  const [creationInput, setCreationInput] = useState('');

  // Renaming state
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameInput, setRenameInput] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (creationState && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [creationState]);

  useEffect(() => {
    if (renamingId && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [renamingId]);

  const handleCommitCreation = () => {
    if (creationState && creationInput.trim()) {
      onCreateNode(creationInput.trim(), creationState.type, creationState.parentId);
    }
    setCreationState(null);
    setCreationInput('');
  };

  const handleCommitRename = (id: string) => {
    if (renameInput.trim()) {
      onRenameNode(id, renameInput.trim());
    }
    setRenamingId(null);
    setRenameInput('');
  };

  const startCreate = (type: 'file' | 'folder', parentId: string | null = null, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCreationState({ type, parentId });
    setCreationInput('');
  };

  const startRename = (node: FileNode, e: React.MouseEvent) => {
    e.stopPropagation();
    setRenamingId(node.id);
    setRenameInput(node.name);
  };

  // Build hierarchical tree
  const rootNodes = files.filter((f) => f.parentId === null);

  const renderTree = (nodes: FileNode[], depth: number = 0) => {
    return nodes.map((node) => {
      const isFolder = node.type === 'folder';
      const isOpen = isFolder ? !!node.isOpen : false;
      const isActive = activeFileId === node.id;
      const isRenaming = renamingId === node.id;
      const childNodes = files.filter((f) => f.parentId === node.id);

      return (
        <div key={node.id} className="w-full select-none">
          {/* Node Row */}
          <div
            onClick={() => {
              if (isFolder) {
                onToggleFolder(node.id);
              } else {
                onSelectFile(node.id);
              }
            }}
            style={{ paddingLeft: `${depth * 14 + 10}px` }}
            className={`flex items-center justify-between h-[22px] group text-[13px] font-sans cursor-pointer transition-colors ${
              isActive
                ? 'bg-[#37373d] text-[#ffffff]'
                : 'text-[#cccccc] hover:bg-[#2a2d2e] hover:text-[#ffffff]'
            }`}
          >
            <div className="flex items-center gap-1.5 flex-1 min-w-0 pr-2">
              {/* Chevron for folder or spacer */}
              {isFolder ? (
                <span className="w-4 h-4 flex items-center justify-center text-[#c5c5c5] shrink-0">
                  {isOpen ? (
                    <IconChevronDown className="w-3.5 h-3.5 stroke-[2]" />
                  ) : (
                    <IconChevronRight className="w-3.5 h-3.5 stroke-[2]" />
                  )}
                </span>
              ) : (
                <span className="w-4 h-4 shrink-0" />
              )}

              {/* Icon */}
              <FileIcon name={node.name} isFolder={isFolder} isOpen={isOpen} />

              {/* Name or Rename Input */}
              {isRenaming ? (
                <input
                  ref={renameInputRef}
                  value={renameInput}
                  onChange={(e) => setRenameInput(e.target.value)}
                  onBlur={() => handleCommitRename(node.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCommitRename(node.id);
                    if (e.key === 'Escape') setRenamingId(null);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-[#3c3c3c] border border-[#007fd4] text-white text-[13px] px-1 py-0 h-[19px] outline-none rounded-none w-full"
                />
              ) : (
                <span className="truncate text-[13px] font-normal leading-none tracking-tight">
                  {node.name}
                </span>
              )}
            </div>

            {/* Hover Actions */}
            <div className="hidden group-hover:flex items-center gap-0.5 pr-2 shrink-0">
              {isFolder && (
                <>
                  <button
                    onClick={(e) => startCreate('file', node.id, e)}
                    title="New File..."
                    className="p-0.5 text-[#aaaaaa] hover:text-white hover:bg-[#333333] rounded"
                  >
                    <IconFilePlus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => startCreate('folder', node.id, e)}
                    title="New Folder..."
                    className="p-0.5 text-[#aaaaaa] hover:text-white hover:bg-[#333333] rounded"
                  >
                    <IconFolderPlus className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
              <button
                onClick={(e) => startRename(node, e)}
                title="Rename (Enter)"
                className="p-0.5 text-[#aaaaaa] hover:text-white hover:bg-[#333333] rounded"
              >
                <IconPencil className="w-3 h-3" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNode(node.id);
                }}
                title="Delete"
                className="p-0.5 text-[#aaaaaa] hover:text-[#f87171] hover:bg-[#333333] rounded"
              >
                <IconTrash className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Inline creation directly under this folder if targeted */}
          {isFolder && isOpen && creationState && creationState.parentId === node.id && (
            <div
              style={{ paddingLeft: `${(depth + 1) * 14 + 10}px` }}
              className="flex items-center gap-1.5 h-[24px] bg-[#2a2d2e] pr-2"
            >
              <span className="w-4 h-4 shrink-0" />
              <FileIcon
                name={creationInput}
                isFolder={creationState.type === 'folder'}
                isOpen={false}
              />
              <input
                ref={inputRef}
                value={creationInput}
                onChange={(e) => setCreationInput(e.target.value)}
                onBlur={handleCommitCreation}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCommitCreation();
                  if (e.key === 'Escape') setCreationState(null);
                }}
                className="bg-[#3c3c3c] border border-[#007fd4] text-white text-[13px] px-1 py-0 h-[19px] outline-none rounded-none w-full"
                placeholder={creationState.type === 'file' ? 'file.tsx' : 'folder-name'}
              />
            </div>
          )}

          {/* Recursive children if folder is open */}
          {isFolder && isOpen && childNodes.length > 0 && (
            <div>{renderTree(childNodes, depth + 1)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <aside className="w-[260px] bg-[#181818] border-r border-[#2b2b2b] flex flex-col h-full select-none text-[13px] shrink-0">
      {/* Explorer Header */}
      <div className="h-[35px] flex items-center justify-between px-4 text-[#bbbbbb] font-semibold text-[11px] tracking-wider uppercase">
        <span>Explorer</span>
        <button
          title="More Actions..."
          className="p-1 hover:bg-[#333333] rounded text-[#aaaaaa] hover:text-white"
        >
          <IconDots className="w-4 h-4" />
        </button>
      </div>

      {/* Workspace Accordion */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="flex items-center justify-between px-2 h-[22px] bg-[#1f1f1f] text-[#ffffff] font-bold text-[11px] tracking-wide uppercase cursor-pointer group">
          <div className="flex items-center gap-1">
            <IconChevronDown className="w-3.5 h-3.5 stroke-[2]" />
            <span>PWNED</span>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={(e) => startCreate('file', null, e)}
              title="New File..."
              className="p-1 hover:bg-[#333333] rounded text-[#cccccc] hover:text-white"
            >
              <IconFilePlus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => startCreate('folder', null, e)}
              title="New Folder..."
              className="p-1 hover:bg-[#333333] rounded text-[#cccccc] hover:text-white"
            >
              <IconFolderPlus className="w-3.5 h-3.5" />
            </button>
            <button
              title="Refresh Explorer"
              className="p-1 hover:bg-[#333333] rounded text-[#cccccc] hover:text-white"
            >
              <IconRefresh className="w-3.5 h-3.5" />
            </button>
            <button
              title="Collapse Folders in Explorer"
              className="p-1 hover:bg-[#333333] rounded text-[#cccccc] hover:text-white"
            >
              <IconFold className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Root level inline creation */}
        {creationState && creationState.parentId === null && (
          <div className="flex items-center gap-1.5 h-[24px] bg-[#2a2d2e] px-3 my-0.5">
            <span className="w-4 h-4 shrink-0" />
            <FileIcon
              name={creationInput}
              isFolder={creationState.type === 'folder'}
              isOpen={false}
            />
            <input
              ref={inputRef}
              value={creationInput}
              onChange={(e) => setCreationInput(e.target.value)}
              onBlur={handleCommitCreation}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCommitCreation();
                if (e.key === 'Escape') setCreationState(null);
              }}
              className="bg-[#3c3c3c] border border-[#007fd4] text-white text-[13px] px-1 py-0 h-[19px] outline-none rounded-none w-full"
              placeholder={creationState.type === 'file' ? 'filename.tsx' : 'folder'}
            />
          </div>
        )}

        {/* Tree items */}
        <div className="py-1">{renderTree(rootNodes, 0)}</div>
      </div>
    </aside>
  );
}
