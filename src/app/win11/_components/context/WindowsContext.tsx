"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  AppId,
  AppMetadata,
  WindowInstance,
  ThemeMode,
  WallpaperOption,
  QuickSettingsState,
  ContextMenuState,
  CustomWindowData,
} from "../types";

export const APP_REGISTRY: Record<AppId, AppMetadata> = {
  notepad: {
    id: "notepad",
    title: "Notepad",
    iconName: "notepad",
    defaultWidth: 700,
    defaultHeight: 500,
    minWidth: 420,
    minHeight: 320,
    pinnedToTaskbar: false,
    showOnDesktop: false,
    desktopOrder: 1,
  },
  calculator: {
    id: "calculator",
    title: "Calculator",
    iconName: "calculator",
    defaultWidth: 350,
    defaultHeight: 500,
    minWidth: 320,
    minHeight: 440,
    pinnedToTaskbar: false,
    showOnDesktop: false,
    desktopOrder: 2,
  },
  settings: {
    id: "settings",
    title: "Settings",
    iconName: "settings",
    defaultWidth: 850,
    defaultHeight: 560,
    minWidth: 600,
    minHeight: 420,
    pinnedToTaskbar: true,
    showOnDesktop: false,
    desktopOrder: 3,
  },
  "this-pc": {
    id: "this-pc",
    title: "This PC",
    iconName: "this-pc",
    defaultWidth: 780,
    defaultHeight: 520,
    minWidth: 500,
    minHeight: 380,
    pinnedToTaskbar: false,
    showOnDesktop: false,
  },
  "file-explorer": {
    id: "file-explorer",
    title: "File Explorer",
    iconName: "file-explorer",
    defaultWidth: 780,
    defaultHeight: 520,
    minWidth: 500,
    minHeight: 380,
    pinnedToTaskbar: true,
    showOnDesktop: false,
  },
  "recycle-bin": {
    id: "recycle-bin",
    title: "Recycle Bin",
    iconName: "recycle-bin",
    defaultWidth: 720,
    defaultHeight: 480,
    minWidth: 480,
    minHeight: 360,
    pinnedToTaskbar: false,
    showOnDesktop: false,
  },
  browser: {
    id: "browser",
    title: "Microsoft Edge",
    iconName: "browser",
    defaultWidth: 880,
    defaultHeight: 580,
    minWidth: 540,
    minHeight: 400,
    pinnedToTaskbar: false,
    showOnDesktop: false,
  },
  terminal: {
    id: "terminal",
    title: "Terminal",
    iconName: "terminal",
    defaultWidth: 740,
    defaultHeight: 460,
    minWidth: 480,
    minHeight: 340,
    pinnedToTaskbar: false,
    showOnDesktop: false,
  },
  chrome: {
    id: "chrome",
    title: "Google Chrome",
    iconName: "chrome",
    defaultWidth: 900,
    defaultHeight: 600,
    pinnedToTaskbar: false,
    showOnDesktop: false,
  },
  vscode: {
    id: "vscode",
    title: "Visual Studio Code",
    iconName: "vscode",
    defaultWidth: 1000,
    defaultHeight: 650,
    minWidth: 700,
    minHeight: 450,
    pinnedToTaskbar: false,
    showOnDesktop: false,
  },
};

export const WALLPAPER_PRESETS: WallpaperOption[] = [
  {
    id: "bloom-dark",
    name: "Windows 11 Bloom (Dark)",
    path: "/win11/wallpapers/bloom-dark.jpg",
    isDarkTheme: true,
  },
  {
    id: "bloom-light",
    name: "Windows 11 Bloom (Light)",
    path: "/win11/wallpapers/bloom-light.jpg",
    isDarkTheme: false,
  },
  {
    id: "captured-motion",
    name: "Windows 11 Captured Motion",
    path: "/win11/wallpapers/captured-motion.jpg",
    isDarkTheme: true,
  },
  {
    id: "sunrise",
    name: "Windows 11 Sunrise",
    path: "/win11/wallpapers/sunrise.jpg",
    isDarkTheme: false,
  },
  {
    id: "glow",
    name: "Windows 11 Glow",
    path: "/win11/wallpapers/glow.jpg",
    isDarkTheme: true,
  },
];

interface WindowsContextValue {
  windows: WindowInstance[];
  activeWindowId: string | null;
  openApp: (
    appId: AppId,
    title?: string,
    customData?: CustomWindowData
  ) => string;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
  bringToFront: (id: string) => void;

  startMenuOpen: boolean;
  setStartMenuOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  taskViewOpen: boolean;
  setTaskViewOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  quickSettingsOpen: boolean;
  setQuickSettingsOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  calendarOpen: boolean;
  setCalendarOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  closeAllFlyouts: () => void;

  currentWallpaper: WallpaperOption;
  setWallpaper: (wp: WallpaperOption) => void;
  themeMode: ThemeMode;
  setThemeMode: (theme: ThemeMode) => void;
  toggleThemeMode: () => void;
  taskbarAlignment: "center" | "left";
  setTaskbarAlignment: (align: "center" | "left") => void;

  quickSettings: QuickSettingsState;
  updateQuickSettings: (partial: Partial<QuickSettingsState>) => void;
  contextMenu: ContextMenuState;
  setContextMenu: (state: ContextMenuState) => void;
  selectedDesktopIcons: string[];
  setSelectedDesktopIcons: React.Dispatch<React.SetStateAction<string[]>>;
  selectedDesktopIcon: string | null;
  setSelectedDesktopIcon: (id: string | null) => void;

  recycleBinItems: string[];
  emptyRecycleBin: () => void;
  restoreRecycleBin: () => void;
}

const WindowsContext = createContext<WindowsContextValue | undefined>(
  undefined
);

export function WindowsProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [highestZIndex, setHighestZIndex] = useState<number>(10);

  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [taskViewOpen, setTaskViewOpen] = useState(false);
  const [quickSettingsOpen, setQuickSettingsOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [currentWallpaper, setCurrentWallpaper] = useState<WallpaperOption>(
    WALLPAPER_PRESETS[0]
  );
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  const [taskbarAlignment, setTaskbarAlignment] = useState<"center" | "left">(
    "center"
  );

  const [selectedDesktopIcons, setSelectedDesktopIcons] = useState<string[]>(
    []
  );
  const selectedDesktopIcon = selectedDesktopIcons[0] ?? null;
  const setSelectedDesktopIcon = useCallback((id: string | null) => {
    setSelectedDesktopIcons(id ? [id] : []);
  }, []);
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    isOpen: false,
    x: 0,
    y: 0,
    type: "desktop",
  });

  const [quickSettings, setQuickSettings] = useState<QuickSettingsState>({
    wifi: false,
    bluetooth: true,
    airplaneMode: false,
    nightLight: false,
    batterySaver: false,
    volume: 75,
    brightness: 67,
  });

  const [recycleBinItems, setRecycleBinItems] = useState<string[]>([
    "meeting_notes_2024.docx",
    "setup_installer_v1.0.exe",
    "deprecated_script.py",
    "screenshot_debug.png",
  ]);

  const closeAllFlyouts = useCallback(() => {
    setStartMenuOpen(false);
    setSearchOpen(false);
    setTaskViewOpen(false);
    setQuickSettingsOpen(false);
    setCalendarOpen(false);
    setContextMenu((prev) => (prev.isOpen ? { ...prev, isOpen: false } : prev));
  }, []);

  const bringToFront = useCallback((id: string) => {
    setHighestZIndex((prev) => {
      const nextZ = prev + 1;
      setWindows((wins) =>
        wins.map((w) => (w.id === id ? { ...w, zIndex: nextZ } : w))
      );
      return nextZ;
    });
    setActiveWindowId(id);
  }, []);

  const focusWindow = useCallback(
    (id: string) => {
      setWindows((wins) =>
        wins.map((w) => {
          if (w.id === id) {
            return { ...w, isMinimized: false };
          }
          return w;
        })
      );
      bringToFront(id);
      closeAllFlyouts();
    },
    [bringToFront, closeAllFlyouts]
  );

  const openApp = useCallback(
    (appId: AppId, title?: string, customData?: CustomWindowData): string => {
      closeAllFlyouts();

      if (appId === "chrome") {
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.href = "/chrome";
        return "chrome";
      }
      if (appId === "vscode") {
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.href = "/vscode";
        return "vscode";
      }

      const meta = APP_REGISTRY[appId];
      const appTitle = title || meta?.title || "Application";

      const existingIndex = windows.findIndex((w) => w.appId === appId);
      if (existingIndex !== -1) {
        const existing = windows[existingIndex];
        if (existing.isMinimized) {
          setWindows((wins) =>
            wins.map((w) =>
              w.id === existing.id ? { ...w, isMinimized: false } : w
            )
          );
        }
        focusWindow(existing.id);
        return existing.id;
      }

      const windowId = `${appId}-${Date.now()}`;
      const offsetCount = windows.length % 8;
      const initialX = Math.max(40, 80 + offsetCount * 32);
      const initialY = Math.max(30, 40 + offsetCount * 28);
      const width = meta?.defaultWidth || 700;
      const height = meta?.defaultHeight || 500;

      const newWindow: WindowInstance = {
        id: windowId,
        appId,
        title: appTitle,
        isMinimized: false,
        isMaximized: false,
        zIndex: highestZIndex + 1,
        position: { x: initialX, y: initialY },
        size: { width, height },
        customData,
      };

      setHighestZIndex((prev) => prev + 1);
      setWindows((wins) => [...wins, newWindow]);
      setActiveWindowId(windowId);
      return windowId;
    },
    [closeAllFlyouts, windows, highestZIndex, focusWindow]
  );

  const closeWindow = useCallback(
    (id: string) => {
      setWindows((wins) => {
        const remaining = wins.filter((w) => w.id !== id);
        if (activeWindowId === id) {
          const nextActive = remaining
            .filter((w) => !w.isMinimized)
            .sort((a, b) => b.zIndex - a.zIndex)[0];
          setActiveWindowId(nextActive ? nextActive.id : null);
        }
        return remaining;
      });
    },
    [activeWindowId]
  );

  const minimizeWindow = useCallback(
    (id: string) => {
      setWindows((wins) =>
        wins.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
      );
      if (activeWindowId === id) {
        const remaining = windows
          .filter((w) => w.id !== id && !w.isMinimized)
          .sort((a, b) => b.zIndex - a.zIndex);
        setActiveWindowId(remaining.length > 0 ? remaining[0].id : null);
      }
    },
    [activeWindowId, windows]
  );

  const maximizeWindow = useCallback(
    (id: string) => {
      setWindows((wins) =>
        wins.map((w) => {
          if (w.id !== id) return w;
          if (w.isMaximized) {
            return {
              ...w,
              isMaximized: false,
              position: w.prevBounds?.position || { x: 100, y: 50 },
              size: w.prevBounds?.size || { width: 700, height: 500 },
            };
          } else {
            return {
              ...w,
              isMaximized: true,
              prevBounds: { position: { ...w.position }, size: { ...w.size } },
              position: { x: 0, y: 0 },
              size: {
                width: typeof window !== "undefined" ? window.innerWidth : 1200,
                height:
                  typeof window !== "undefined" ? window.innerHeight - 52 : 750,
              },
            };
          }
        })
      );
      bringToFront(id);
    },
    [bringToFront]
  );

  const updatePosition = useCallback(
    (id: string, position: { x: number; y: number }) => {
      setWindows((wins) =>
        wins.map((w) => (w.id === id ? { ...w, position } : w))
      );
    },
    []
  );

  const updateSize = useCallback(
    (id: string, size: { width: number; height: number }) => {
      setWindows((wins) => wins.map((w) => (w.id === id ? { ...w, size } : w)));
    },
    []
  );

  const toggleThemeMode = useCallback(() => {
    setThemeMode((prev) => {
      const nextTheme = prev === "dark" ? "light" : "dark";
      if (nextTheme === "light") {
        setCurrentWallpaper(WALLPAPER_PRESETS[0]);
      } else {
        setCurrentWallpaper(WALLPAPER_PRESETS[1]);
      }
      return nextTheme;
    });
  }, []);

  const setWallpaper = useCallback((wp: WallpaperOption) => {
    setCurrentWallpaper(wp);
    if (wp.isDarkTheme !== undefined) {
      setThemeMode(wp.isDarkTheme ? "dark" : "light");
    }
  }, []);

  const updateQuickSettings = useCallback(
    (partial: Partial<QuickSettingsState>) => {
      setQuickSettings((prev) => ({ ...prev, ...partial }));
    },
    []
  );

  const emptyRecycleBin = useCallback(() => {
    setRecycleBinItems([]);
  }, []);

  const restoreRecycleBin = useCallback(() => {
    setRecycleBinItems(["restored_document.docx", "project_archive.zip"]);
  }, []);

  return (
    <WindowsContext.Provider
      value={{
        windows,
        activeWindowId,
        openApp,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updatePosition,
        updateSize,
        bringToFront,

        startMenuOpen,
        setStartMenuOpen,
        searchOpen,
        setSearchOpen,
        taskViewOpen,
        setTaskViewOpen,
        quickSettingsOpen,
        setQuickSettingsOpen,
        calendarOpen,
        setCalendarOpen,
        closeAllFlyouts,

        currentWallpaper,
        setWallpaper,
        themeMode,
        setThemeMode,
        toggleThemeMode,
        taskbarAlignment,
        setTaskbarAlignment,

        quickSettings,
        updateQuickSettings,
        contextMenu,
        setContextMenu,
        selectedDesktopIcons,
        setSelectedDesktopIcons,
        selectedDesktopIcon,
        setSelectedDesktopIcon,

        recycleBinItems,
        emptyRecycleBin,
        restoreRecycleBin,
      }}
    >
      {children}
    </WindowsContext.Provider>
  );
}

export function useWindows() {
  const context = useContext(WindowsContext);
  if (!context) {
    throw new Error("useWindows must be used within a WindowsProvider");
  }
  return context;
}
