import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { highlightLine } from '../utils/highlighter';

interface CodeEditorProps {
  content: string;
  fileName: string;
  onChange: (newContent: string) => void;
  onCursorChange?: (line: number, col: number) => void;
}

export function CodeEditor({
  content,
  fileName,
  onChange,
  onCursorChange,
}: CodeEditorProps) {
  const [activeLine, setActiveLine] = useState<number>(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const highlightLayerRef = useRef<HTMLDivElement>(null);

  const lines = useMemo(() => content.split('\n'), [content]);
  const ext = fileName.split('.').pop()?.toLowerCase() || 'tsx';

  // Synchronize cursor position and active line
  const updateCursorPosition = useCallback(() => {
    if (!textareaRef.current) return;
    const selectionStart = textareaRef.current.selectionStart;
    const textBeforeCursor = content.substring(0, selectionStart);
    const lineArr = textBeforeCursor.split('\n');
    const currentLine = lineArr.length;
    const currentCol = lineArr[lineArr.length - 1].length + 1;

    setActiveLine(currentLine);
    onCursorChange?.(currentLine, currentCol);
  }, [content, onCursorChange]);

  // Synchronize scrolling between textarea and highlights
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (gutterRef.current) {
      gutterRef.current.scrollTop = target.scrollTop;
    }
  };

  // Handle Tab key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newContent = content.substring(0, start) + '  ' + content.substring(end);
      onChange(newContent);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
        updateCursorPosition();
      }, 0);
    }
  };

  useEffect(() => {
    updateCursorPosition();
  }, [updateCursorPosition]);

  return (
    <div className="relative flex flex-1 h-full bg-[#1e1e1e] overflow-hidden select-text font-mono">
      {/* Gutter: Line Numbers and Active Line Indicator */}
      <div
        ref={gutterRef}
        className="w-[60px] bg-[#1e1e1e] border-r border-[#2a2a2a] select-none flex flex-col items-end py-2 pr-3 text-[13px] font-mono leading-6 shrink-0 z-10"
      >
        {lines.map((_, idx) => {
          const lineNum = idx + 1;
          const isCurrent = lineNum === activeLine;
          return (
            <div
              key={lineNum}
              className={`w-full flex items-center justify-end gap-1.5 h-6 transition-colors ${
                isCurrent ? 'text-[#c6c6c6] font-semibold' : 'text-[#858585]'
              }`}
            >
              {/* Active line marker '>' matching user's screenshot */}
              {isCurrent ? (
                <span className="text-[#858585] text-[11px] font-bold select-none leading-none">
                  &gt;
                </span>
              ) : (
                <span className="w-2" />
              )}
              <span className="w-6 text-right tabular-nums">{lineNum}</span>
            </div>
          );
        })}
      </div>

      {/* Editor Content Area */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="relative flex-1 h-full overflow-auto py-2 pl-4 text-[14px] leading-6 font-mono no-scrollbar"
      >
        {/* Active line highlight bar */}
        <div
          className="absolute left-0 right-0 pointer-events-none border border-[#2e2e2e] bg-[#282828]/40 transition-all duration-75"
          style={{
            top: `${(activeLine - 1) * 24 + 8}px`,
            height: '24px',
          }}
        />

        {/* Syntax Highlighted Render Layer */}
        <div
          ref={highlightLayerRef}
          aria-hidden="true"
          className="pointer-events-none whitespace-pre select-none font-mono text-[14px] leading-6"
        >
          {lines.map((line, idx) => {
            const lineIndex = idx + 1;
            return (
              <div key={lineIndex} className="h-6 flex items-center">
                {highlightLine(line, lineIndex, ext)}
                {/* Ensure empty line maintains height */}
                {line.length === 0 && <span>&nbsp;</span>}
              </div>
            );
          })}
        </div>

        {/* Real Interactive Textarea Overlay */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={updateCursorPosition}
          onClick={updateCursorPosition}
          onSelect={updateCursorPosition}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          className="absolute inset-0 top-2 left-4 w-[calc(100%-16px)] bg-transparent text-transparent caret-white resize-none outline-none whitespace-pre font-mono text-[14px] leading-6 overflow-hidden p-0 m-0 border-0 selection:bg-[#264f78]/60"
          style={{
            height: `${Math.max(lines.length * 24 + 80, 400)}px`,
            minHeight: '100%',
          }}
        />
      </div>

      {/* Minimap (Right edge) */}
      <div className="hidden lg:flex w-[64px] bg-[#1e1e1e] border-l border-[#282828] select-none flex-col py-2 px-1 opacity-70 hover:opacity-100 transition-opacity shrink-0 relative overflow-hidden">
        {/* Miniature viewport rectangle */}
        <div
          className="absolute left-0 right-0 bg-[#3a3d41]/30 border border-[#5a5d61]/40 rounded-sm pointer-events-none"
          style={{
            top: `${Math.max(0, (activeLine - 1) * 3)}px`,
            height: '40px',
          }}
        />

        {lines.slice(0, 80).map((line, i) => {
          const trimmed = line.trim();
          const indent = line.length - line.trimStart().length;
          return (
            <div
              key={i}
              style={{ paddingLeft: `${Math.min(indent * 2, 24)}px` }}
              className="h-[3px] my-[1px] flex items-center"
            >
              {trimmed.length > 0 && (
                <div
                  className="h-[2px] rounded-[1px]"
                  style={{
                    width: `${Math.min(trimmed.length * 2, 45)}px`,
                    backgroundColor:
                      trimmed.startsWith('export') || trimmed.startsWith('return')
                        ? '#C678DD'
                        : trimmed.startsWith('<')
                        ? '#E06C75'
                        : trimmed.startsWith('"')
                        ? '#CE9178'
                        : '#ABB2BF',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
