import React from "react";

interface FileIconProps {
  name: string;
  isFolder?: boolean;
  isOpen?: boolean;
  className?: string;
}

export function FileIcon({
  name,
  isFolder,
  isOpen,
  className = "w-4 h-4 shrink-0",
}: FileIconProps) {
  if (isFolder) {
    if (isOpen) {
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className}>
          <path
            d="M1.5 3A1.5 1.5 0 0 1 3 1.5h3.172a1.5 1.5 0 0 1 1.06.44l1.208 1.207A.5.5 0 0 0 8.793 3.5H13A1.5 1.5 0 0 1 14.5 5v1.2H1.5V3z"
            fill="#C9A15E"
          />
          <path
            d="M1 6.5h14l-1.3 7.15A1.5 1.5 0 0 1 12.227 15H3.773a1.5 1.5 0 0 1-1.473-1.35L1 6.5z"
            fill="#DDB86C"
          />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <path
          d="M1.5 3A1.5 1.5 0 0 1 3 1.5h3.172a1.5 1.5 0 0 1 1.06.44l1.208 1.207A.5.5 0 0 0 8.793 3.5H13A1.5 1.5 0 0 1 14.5 5v7.5A1.5 1.5 0 0 1 13 14H3a1.5 1.5 0 0 1-1.5-1.5V3z"
          fill="#DDB86C"
        />
      </svg>
    );
  }

  const lower = name.toLowerCase();
  const ext = lower.split(".").pop() || "";

  if (lower === "dockerfile" || lower.startsWith("dockerfile.")) {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#0db7ed" />
        <path
          d="M3 8h2v2H3V8zm2.5 0h2v2h-2V8zm2.5 0h2v2H8V8zm2.5 0h2v2h-2V8zm-5-2.5h2v2h-2v-2zm2.5 0h2v2H8v-2zm2.5 0h2v2h-2v-2z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  if (lower.startsWith(".env")) {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#ecd53f" />
        <path
          d="M8 3.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 2.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
          fill="#1e1e1e"
        />
      </svg>
    );
  }

  if (lower.startsWith(".git")) {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <circle cx="8" cy="8" r="7" fill="#F05032" />
        <path
          d="M6 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm0 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm4-2.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  if (["py", "pyw", "ipynb", "rpy"].includes(ext)) {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <path
          d="M7.9 1.5c-2.4 0-2.3 1-2.3 1l.01 1.1h2.3v.3H4.4s-1.5-.2-1.5 2.2 1.3 2.3 1.3 2.3h.8V7.3s-.1-1.3 1.3-1.3h2.3s1.2 0 1.2-1.2V2.7s.2-1.2-1.9-1.2z"
          fill="#3776AB"
        />
        <circle cx="5.8" cy="2.6" r="0.5" fill="#FFFFFF" />
        <path
          d="M8.1 14.5c2.4 0 2.3-1 2.3-1l-.01-1.1H8.1v-.3h3.5s1.5.2 1.5-2.2-1.3-2.3-1.3-2.3h-.8v1.1s.1 1.3-1.3 1.3H7.4s-1.2 0-1.2 1.2v2.1s-.2 1.2 1.9 1.2z"
          fill="#FFD43B"
        />
        <circle cx="10.2" cy="13.4" r="0.5" fill="#1e1e1e" />
      </svg>
    );
  }

  if (ext === "c" || (ext === "h" && !lower.includes("++"))) {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#00599C" />
        <path
          d="M11 5.5a4 4 0 0 0-3-1.5C5.8 4 4 5.8 4 8s1.8 4 4 4a4 4 0 0 0 3-1.5"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (["cpp", "cc", "cxx", "hpp", "hxx"].includes(ext)) {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#004482" />
        <path
          d="M7 5.5a3 3 0 0 0-2.2-1C3.3 4.5 2 5.8 2 8s1.3 3.5 2.8 3.5a3 3 0 0 0 2.2-1"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8.5 8h2.5m-1.2-1.2v2.4m3.2-1.2h2.5m-1.2-1.2v2.4"
          stroke="#00D8FF"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (["cs", "csx"].includes(ext)) {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#68217A" />
        <path
          d="M7.5 5.5a3 3 0 0 0-2.2-1C3.8 4.5 2.5 5.8 2.5 8s1.3 3.5 2.8 3.5a3 3 0 0 0 2.2-1"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <text
          x="8.5"
          y="10.5"
          fill="#5CE1E6"
          fontSize="7"
          fontWeight="bold"
          fontFamily="monospace"
        >
          #
        </text>
      </svg>
    );
  }

  if (["java", "class", "jar", "jsp"].includes(ext)) {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#EA2D2E" />
        <path
          d="M8 2c-1 1-1 2 0 3m2-3c-1 1-1 2 0 3"
          stroke="#FFD700"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M4.5 6.5h7v4a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-4zm7 1h1.5a1.5 1.5 0 0 1 0 3H11.5"
          stroke="#FFFFFF"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (["kt", "kts"].includes(ext)) {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#181818" />
        <path d="M2 2h12L8 8l6 6H2V2z" fill="url(#kotlinGrad)" />
        <defs>
          <linearGradient
            id="kotlinGrad"
            x1="2"
            y1="2"
            x2="14"
            y2="14"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7F52FF" />
            <stop offset="0.5" stopColor="#C757BC" />
            <stop offset="1" stopColor="#E4485D" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (ext === "go") {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#00ADD8" />
        <text
          x="2.5"
          y="11.5"
          fill="#FFFFFF"
          fontSize="9"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          GO
        </text>
      </svg>
    );
  }

  if (["rs", "rlib"].includes(ext) || lower === "cargo.toml") {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#CE412B" />
        <circle
          cx="8"
          cy="8"
          r="5.5"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeDasharray="2 1"
        />
        <text
          x="5"
          y="11"
          fill="#FFFFFF"
          fontSize="9"
          fontWeight="bold"
          fontFamily="monospace"
        >
          R
        </text>
      </svg>
    );
  }

  if (["php", "phtml"].includes(ext)) {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#777BB4" />
        <text
          x="1.5"
          y="11"
          fill="#FFFFFF"
          fontSize="7"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          PHP
        </text>
      </svg>
    );
  }

  if (["rb", "erb", "rake"].includes(ext)) {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#CC342D" />
        <path
          d="M8 3.5L12 6.5l-4 6-4-6 4-3zM4 6.5h8M8 3.5v9"
          stroke="#FFFFFF"
          strokeWidth="1.1"
        />
      </svg>
    );
  }

  if (ext === "swift") {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#F05138" />
        <path
          d="M13 13c-2.5-1-4-3-4.5-5.5.8 1.2 1.8 1.8 3.5 1.5-1.5-1.5-2.2-3.5-2-6-1.5 2-2 4.5-1.5 7-1.5-.5-2.5-1.5-3-3-.2 2.5 1 4.5 3 5.5-2.5 0-4-1.5-5-3 1 3.5 4.5 5 7.5 4.5z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  if (ext === "dart") {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#0175C2" />
        <path d="M4 4l4 4-4 4V4zm4 4l4-4v8l-4-4z" fill="#5CE1E6" />
      </svg>
    );
  }

  if (["html", "htm"].includes(ext)) {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#E34F26" />
        <path d="M3.5 3.5L4.5 13l3.5 1 3.5-1 1-9.5H3.5z" fill="#E44D26" />
        <path d="M8 4.5v8.5l2.7-.8.7-7.7H8z" fill="#F16529" />
        <path
          d="M5.5 6.5h5l-.2 2H6l.1 1.5h4.1l-.3 2.5L8 13.1l-1.9-.6-.1-1H5"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          fill="none"
        />
      </svg>
    );
  }

  if (ext === "css") {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#1572B6" />
        <text
          x="3.5"
          y="11.5"
          fill="#FFFFFF"
          fontSize="9"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          #
        </text>
      </svg>
    );
  }
  if (["scss", "sass", "less"].includes(ext)) {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#CF649A" />
        <text
          x="2"
          y="11.5"
          fill="#FFFFFF"
          fontSize="7"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          SASS
        </text>
      </svg>
    );
  }

  if (ext === "tsx") {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#1b2533" />
        <path
          d="M2.5 4h5v1.2H5.6v6.8H4.4V5.2H2.5V4zm6 0h1.4l1.3 2.5 1.3-2.5h1.4l-2 3.6 2.1 4.4h-1.4l-1.4-3-1.4 3H8.5l2.1-4.4L8.5 4z"
          fill="#3178C6"
        />
        <circle cx="8" cy="8" r="1.3" fill="#00D8FF" />
      </svg>
    );
  }

  if (["ts", "mts", "cts"].includes(ext)) {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#3178C6" />
        <path
          d="M3 5h4v1.1H5.6v5.9H4.4V6.1H3V5zm5 1.8c.4-.6 1.1-.9 1.9-.9 1.3 0 2.1.8 2.1 2.1v4H10.8V8.1c0-.7-.4-1.1-1-1.1-.7 0-1.1.5-1.1 1.2v3.8H7.5V6.9h1.2v-.1z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  if (ext === "jsx") {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#20232A" />
        <ellipse
          cx="8"
          cy="8"
          rx="6"
          ry="2.2"
          stroke="#61DAFB"
          strokeWidth="0.9"
        />
        <ellipse
          cx="8"
          cy="8"
          rx="6"
          ry="2.2"
          stroke="#61DAFB"
          strokeWidth="0.9"
          transform="rotate(60 8 8)"
        />
        <ellipse
          cx="8"
          cy="8"
          rx="6"
          ry="2.2"
          stroke="#61DAFB"
          strokeWidth="0.9"
          transform="rotate(120 8 8)"
        />
        <circle cx="8" cy="8" r="1.1" fill="#61DAFB" />
      </svg>
    );
  }

  if (["js", "mjs", "cjs"].includes(ext)) {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#F7DF1E" />
        <text
          x="3.5"
          y="12"
          fill="#000000"
          fontSize="9"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          JS
        </text>
      </svg>
    );
  }

  if (ext === "vue") {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#2c3e50" />
        <path d="M2 3h3l3 5.5L11 3h3L8 13.5 2 3z" fill="#41B883" />
        <path d="M5 3h2l1 1.8L9 3h2L8 8.2 5 3z" fill="#34495E" />
      </svg>
    );
  }

  if (ext === "svelte") {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#FF3E00" />
        <path
          d="M6 4a2 2 0 0 1 3-1.5l2 1a2 2 0 0 1 .5 3l-1.5 2a2 2 0 0 0-.5 1.5 2 2 0 0 0 3 1.5"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (["sh", "bash", "zsh", "fish"].includes(ext)) {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#24292E" />
        <path
          d="M4 5l3 3-3 3m4 0h4"
          stroke="#4EC9B0"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (["sql", "pgsql", "mysql", "sqlite"].includes(ext)) {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#E38C00" />
        <ellipse
          cx="8"
          cy="4"
          rx="5"
          ry="2"
          stroke="#FFFFFF"
          strokeWidth="1.1"
        />
        <path
          d="M3 4v4c0 1.1 2.2 2 5 2s5-.9 5-2V4"
          stroke="#FFFFFF"
          strokeWidth="1.1"
        />
        <path
          d="M3 8v4c0 1.1 2.2 2 5 2s5-.9 5-2V8"
          stroke="#FFFFFF"
          strokeWidth="1.1"
        />
      </svg>
    );
  }

  if (["json", "jsonc"].includes(ext)) {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#252526" />
        <text
          x="2.5"
          y="12"
          fill="#CBCB41"
          fontSize="11"
          fontWeight="bold"
          fontFamily="monospace"
        >
          {"{ }"}
        </text>
      </svg>
    );
  }

  if (["yml", "yaml"].includes(ext)) {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#CB171E" />
        <text
          x="2"
          y="11"
          fill="#FFFFFF"
          fontSize="8"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          YML
        </text>
      </svg>
    );
  }

  if (["xml", "svg"].includes(ext)) {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#FF9800" />
        <path
          d="M5 5L2.5 8 5 11m6-6l2.5 3-2.5 3m-4 1l3-8"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (["md", "markdown"].includes(ext)) {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#083FA1" />
        <path
          d="M2 11V5h2l2 2.5L8 5h2v6H8.5V7.5L7 9.5h-1L4.5 7.5V11H2zm9-3.5h1.2V5h1.6v2.5H15L13.5 10 11 7.5z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  if (ext === "lua") {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <circle cx="8" cy="8" r="7" fill="#000080" />
        <circle cx="10" cy="6" r="1.5" fill="#FFFFFF" />
        <text
          x="4"
          y="12"
          fill="#FFFFFF"
          fontSize="7"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          lua
        </text>
      </svg>
    );
  }

  if (ext === "r") {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#276DC3" />
        <text
          x="4.5"
          y="11.5"
          fill="#FFFFFF"
          fontSize="10"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          R
        </text>
      </svg>
    );
  }

  if (["scala", "sc"].includes(ext)) {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className}>
        <rect width="16" height="16" rx="2" fill="#DC322F" />
        <path
          d="M4 12h8V9.5H4V12zm0-3.5h8V6H4v2.5zm0-3.5h8V2.5H4V5z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M3 1.5A1.5 1.5 0 0 1 4.5 0h5.086a1.5 1.5 0 0 1 1.06.44l2.914 2.914a1.5 1.5 0 0 1 .44 1.06V14.5A1.5 1.5 0 0 1 12.5 16h-8A1.5 1.5 0 0 1 3 14.5V1.5z"
        fill="#858585"
      />
      <path d="M9.5 0v3.5a1 1 0 0 0 1 1H14L9.5 0z" fill="#CCCCCC" />
    </svg>
  );
}
