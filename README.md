# PWNed — Interactive Web Simulation Suite

A high-fidelity web simulation suite built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**. It provides authentic, 1:1 pixel-perfect simulations of popular interfaces, featuring realistic animations, state machines, and complete interactive workflows.

---

## Table of Contents

- [Overview](#overview)
- [1. Google Chrome Web Simulation (`/chrome`)](#1-google-chrome-web-simulation-chrome)
  - [Features](#features)
  - [How It Works](#how-it-works)
  - [Key Architecture & Files](#key-architecture--files)
- [2. VS Code Web UI (`/vscode`)](#2-vs-code-web-ui-vscode)
  - [Features](#features-1)
  - [Programming Language Support & Dynamic Icons](#programming-language-support--dynamic-icons)
  - [Integrated Terminal & Shell Execution](#integrated-terminal--shell-execution)
  - [Syntax Highlighting Engine](#syntax-highlighting-engine)
  - [Key Architecture & Files](#key-architecture--files-1)
- [Getting Started](#getting-started)
- [Tech Stack](#tech-stack)

---

## Overview

PWNed contains two fully functional, self-contained desktop web simulations:
1. **Google Chrome Web Simulation** (`/chrome`): A pixel-perfect recreation of Google Chrome browser with dynamic tabs, Google Search with autocomplete suggestions, realistic query latency, an interactive download portal, and Chrome's authentic download animation & tray.
2. **VS Code Web UI** (`/vscode`): An uncompromised VS Code clone with file/folder creation, dynamic file icon resolution for all major programming languages, Dark+ syntax highlighting matching native VS Code, multi-tab editing, line gutter with active cursor tracking, minimap, and an integrated interactive terminal.

---

## 1. Google Chrome Web Simulation (`/chrome`)

Accessible at: `http://localhost:3000/chrome`

### Features
- **Authentic Chrome Window Shell**:
  - Native-styled top tab strip with add tab (`+`) and close tab (`×`) actions.
  - Omnibox / address bar with lock icon, URL path, voice search, and Google Lens icons.
  - Standard navigation controls: Back, Forward, Reload, Extensions puzzle icon, and profile avatar.
  - Bookmarks bar with quick links (YouTube, Gmail, GitHub, Docs).
- **Realistic Google Search Experience**:
  - Live query autocomplete when typing searches (e.g. typing `gta` or `gta 6 mod download` shows suggested queries).
  - Search loading animation with realistic delay to simulate network requests.
  - Comprehensive search results page with verified domain badges, breadcrumb URLs, and search filter tabs (*All*, *Images*, *Videos*, *News*, *Maps*).
- **Interactive GTA 6 Mod Download Portal**:
  - Authentic mod portal page featuring official artwork, download stats, system requirements, and release version info.
  - Dynamic file size display ranging from 45 MB to 856.67 GB.
- **Chrome Download Animation & Tray**:
  - **Toolbar Icon Progress**: Realistic 6.5-second 100 MB/s download animation featuring Chrome's clockwise radial ring progress indicator on the top-right toolbar icon.
  - **Download Tray Dropdown**: When complete, clicking or finishing the download presents Chrome's download popup with:
    - File name, file size, and completion timestamp.
    - **"Show in folder"** action.
    - **"Direct run"** executable launcher.

### How It Works
1. **Tab & Navigation State**: Manages active tabs, history stacks, and URL resolution via `ChromeTab` models in `src/app/chrome/types.ts`.
2. **Search State Machine**: Monitors omnibox and page inputs to switch views smoothly between the New Tab Page (NTP), search results, and destination websites.
3. **Download Engine**: Implements a step-by-step timer calculating elapsed bytes and percentage to animate the circular SVG download icon before triggering the download drawer.

### Key Architecture & Files
- [`src/app/chrome/page.tsx`](file:///Users/aviksamanta/Desktop/Ultimate%20Project/pwned/src/app/chrome/page.tsx): Main Chrome shell, omnibox, tab controller, search results, and download drawer.
- [`src/app/chrome/types.ts`](file:///Users/aviksamanta/Desktop/Ultimate%20Project/pwned/src/app/chrome/types.ts): Tab interfaces, search result data structures, and download state definitions.

---

## 2. VS Code Web UI (`/vscode`)

Accessible at: `http://localhost:3000/vscode`

### Features
- **Window Title Bar & Command Palette**:
  - macOS window buttons (Close, Minimize, Maximize).
  - Standard application menu items: `File`, `Edit`, `Selection`, `View`, `Go`, `Run`, `Terminal`, `Help`.
  - Centered Search / Command Palette bar displaying the current workspace and active file (`pwned — layout.tsx`) with shortcut `⌘P`.
  - Right-aligned layout controls to toggle the Primary Sidebar, Bottom Panel, and Secondary Sidebar.
- **Activity Bar (48px)**:
  - Navigation icons: **Explorer** (with active white indicator), **Search**, **Source Control** (with badge `1`), **Run and Debug**, and **Extensions**.
  - Bottom icons for **Accounts** and **Settings** gear.
- **Interactive File Explorer**:
  - Collapsible folder tree with hierarchical indentation guide lines.
  - **Inline File & Folder Creation**: Click the **New File** or **New Folder** buttons on the workspace header or within any folder. The inline input renders with VS Code's iconic blue focus border (`border-[#007fd4]`). Pressing `Enter` commits the file/folder, while `Escape` cancels.
  - Inline **Rename** and **Delete** buttons for all tree items.
- **Editor Tabs & Breadcrumbs**:
  - Multi-tab strip showing file icons, tab titles, dirty change indicators (`●`), and close buttons (`×`).
  - Breadcrumb hierarchy tracking file nesting: `src > app > layout.tsx > RootLayout`.
- **Live Code Editor**:
  - Line numbers gutter with active line highlighted in bold white and inactive in `#858585`.
  - Active line indicator `>` in the gutter matching native VS Code.
  - Active line border and subtle background highlight.
  - Real typing support: tab indentation (2 spaces), cursor tracking with line & column reporting, and undo/redo support.
  - **Minimap**: Right-hand miniature code overview with a synchronized viewport slider.

---

### Programming Language Support & Dynamic Icons

When adding files with different extensions, the explorer automatically resolves their authentic VS Code file icon and provides starter boilerplate code:

| Language | Extensions | Icon Description |
| :--- | :--- | :--- |
| **Python** | `.py`, `.pyw`, `.ipynb` | Intertwined blue & yellow snakes |
| **C** | `.c`, `.h` | Blue badge with bold white **C** |
| **C++** | `.cpp`, `.cc`, `.cxx`, `.hpp` | Dark blue badge with cyan **C++** |
| **C#** | `.cs`, `.csx` | Purple badge with **C#** |
| **Java** | `.java`, `.class`, `.jar` | Red badge with steaming coffee cup |
| **Kotlin** | `.kt`, `.kts` | Official purple/pink/orange Kotlin geometric flag |
| **Go** | `.go` | Cyan badge with bold white **GO** |
| **Rust** | `.rs`, `.rlib`, `Cargo.toml` | Rust gear with **R** |
| **TypeScript / TSX** | `.ts`, `.tsx` | Blue TS badge / Cyan React atom badge |
| **JavaScript / JSX** | `.js`, `.jsx` | Yellow JS badge / React atom badge |
| **HTML / CSS / SCSS** | `.html`, `.css`, `.scss`, `.sass` | Orange HTML5 shield, Blue `#`, Pink SASS |
| **PHP** | `.php`, `.phtml` | Purple oval with **PHP** |
| **Ruby** | `.rb`, `.rake` | Red faceted gemstone |
| **Swift** | `.swift` | Orange flying swift bird |
| **Dart / Flutter** | `.dart` | Cyan Dart chevrons |
| **Vue & Svelte** | `.vue`, `.svelte` | Vue green/blue logo & Svelte orange logo |
| **Shell Script** | `.sh`, `.bash`, `.zsh` | Dark terminal prompt `>_` |
| **SQL** | `.sql` | Amber database cylinder |
| **Config & DevOps** | `.json`, `.yml`, `.env`, `Dockerfile`, `.git*` | Curly brackets, YML badge, key, Docker whale, Git branch |
| **Lua, R, Scala** | `.lua`, `.r`, `.scala` | Language-specific icons |

---

### Integrated Terminal & Shell Execution

The terminal panel can be toggled using any of the following methods:
1. **Status Bar Button**: Click the dedicated **Terminal** button on the bottom bar (with active status indicator dot).
2. **Top Menu Bar**: Click **Terminal** in the top menu, or hover to access *New Terminal*, *Split Terminal*, or *Run Active File*.
3. **Window Header Toggle**: Click the bottom dock toggle button in the top right.
4. **Keyboard Shortcuts**: Press `Ctrl + \`` / `Cmd + \`` (standard VS Code terminal shortcut) or `Cmd + J`.

#### Interactive Shell Commands:
The integrated terminal accepts real input and executes simulated commands with authentic colorized output:
- `python main.py` → Executes Python script and outputs `Hello from Python!`.
- `gcc main.c` → `Compiling C source... [Done] => a.out generated`.
- `java Main` → `Hello from Java!`.
- `kotlinc main.kt` → `Compiling Kotlin source... [Done]`.
- `go run main.go` → `Hello from Go!`.
- `cargo run` → Compiles and outputs `Hello from Rust!`.
- `node index.js` → `Hello from Node.js!`.
- `ls`, `git status`, `clear`, `echo <text>`.

---

### Syntax Highlighting Engine

The custom syntax engine in [`highlighter.tsx`](file:///Users/aviksamanta/Desktop/Ultimate%20Project/pwned/src/app/vscode/utils/highlighter.tsx) replicates VS Code Dark+ / One Dark themes:
- **Keywords** (`export`, `default`, `function`, `return`, `def`, `class`, `import`): `#C678DD` (Purple)
- **Functions** (`RootLayout`, `cn`, `main`): `#E5C07B` (Gold/Yellow)
- **Types & Generics** (`LayoutProps<"/">`, `Metadata`, `String`): `#4EC9B0` (Teal/Cyan)
- **JSX/HTML Tags** (`<html`, `<body`, `</div>`): `#E06C75` (Pink/Coral)
- **Attributes & Identifiers** (`lang`, `className`, `children`): `#9CDCFE` (Light Blue)
- **Strings** (`"en"`, `"h-full"`, `"font-sans"`): `#CE9178` (Orange/Coral)
- **Comments** (`//`, `#`): `#6A9955` (Muted Green)
- **Rainbow Bracket Pair Colorization**: Cycles between Gold (`#FFD700`), Purple (`#DA70D6`), and Blue (`#179FFF`).

---

### Key Architecture & Files
- [`src/app/vscode/page.tsx`](file:///Users/aviksamanta/Desktop/Ultimate%20Project/pwned/src/app/vscode/page.tsx): Main workbench assembly, file state management, tab operations, and global shortcuts.
- [`src/app/vscode/types.ts`](file:///Users/aviksamanta/Desktop/Ultimate%20Project/pwned/src/app/vscode/types.ts): `FileNode`, `TabItem`, and initial file tree definitions.
- [`src/app/vscode/components/FileExplorer.tsx`](file:///Users/aviksamanta/Desktop/Ultimate%20Project/pwned/src/app/vscode/components/FileExplorer.tsx): Tree explorer with inline file/folder creation, rename, and delete actions.
- [`src/app/vscode/components/FileIcons.tsx`](file:///Users/aviksamanta/Desktop/Ultimate%20Project/pwned/src/app/vscode/components/FileIcons.tsx): Vector file icons for all programming languages and file formats.
- [`src/app/vscode/components/CodeEditor.tsx`](file:///Users/aviksamanta/Desktop/Ultimate%20Project/pwned/src/app/vscode/components/CodeEditor.tsx): Synchronized editor overlay with gutter numbers, active line indicator, and minimap.
- [`src/app/vscode/components/EditorTabs.tsx`](file:///Users/aviksamanta/Desktop/Ultimate%20Project/pwned/src/app/vscode/components/EditorTabs.tsx): Multi-tab strip and breadcrumb hierarchy path.
- [`src/app/vscode/components/TitleBar.tsx`](file:///Users/aviksamanta/Desktop/Ultimate%20Project/pwned/src/app/vscode/components/TitleBar.tsx): Top window title bar, application menus, command search palette, and layout toggles.
- [`src/app/vscode/components/ActivityBar.tsx`](file:///Users/aviksamanta/Desktop/Ultimate%20Project/pwned/src/app/vscode/components/ActivityBar.tsx): Primary 48px activity navigation bar.
- [`src/app/vscode/components/TerminalPanel.tsx`](file:///Users/aviksamanta/Desktop/Ultimate%20Project/pwned/src/app/vscode/components/TerminalPanel.tsx): Dockable integrated terminal with interactive command prompt and tab switcher.
- [`src/app/vscode/components/StatusBar.tsx`](file:///Users/aviksamanta/Desktop/Ultimate%20Project/pwned/src/app/vscode/components/StatusBar.tsx): Bottom status bar with line/column tracking, encoding, language mode, and git branch.
- [`src/app/vscode/utils/highlighter.tsx`](file:///Users/aviksamanta/Desktop/Ultimate%20Project/pwned/src/app/vscode/utils/highlighter.tsx): Tokenizer and syntax highlighter for TypeScript, JSX, Python, C, C++, Java, Kotlin, Go, Rust, CSS, JSON, and Markdown.

---

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Run the local development server**:
   ```bash
   pnpm run dev
   ```

3. **Navigate to the simulated applications**:
   - **Chrome Web Simulation**: [http://localhost:3000/chrome](http://localhost:3000/chrome)
   - **VS Code Web UI**: [http://localhost:3000/vscode](http://localhost:3000/vscode)

---

## Tech Stack

- **Framework**: [Next.js 16 (Turbopack)](https://nextjs.org/)
- **UI & Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [@tabler/icons-react](https://tabler.io/icons) + Custom High-Fidelity SVG Codicons
- **Typography**: [Geist Mono](https://vercel.com/font) & Montserrat
