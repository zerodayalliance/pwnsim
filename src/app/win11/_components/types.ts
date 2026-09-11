export type AppId =
  | "notepad"
  | "settings"
  | "browser"
  | "this-pc"
  | "file-explorer"
  | "recycle-bin"
  | "terminal"
  | "calculator"
  | "vscode"
  | "chrome";

export interface AppMetadata {
  id: AppId;
  title: string;
  iconName: string;
  defaultWidth: number;
  defaultHeight: number;
  minWidth?: number;
  minHeight?: number;
  pinnedToTaskbar?: boolean;
  showOnDesktop?: boolean;
  desktopOrder?: number;
}

export interface CustomWindowData {
  initialText?: string;
  initialTab?: string;
  url?: string;
  [key: string]: unknown;
}

export interface WindowInstance {
  id: string;
  appId: AppId;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  prevBounds?: {
    position: { x: number; y: number };
    size: { width: number; height: number };
  };
  customData?: CustomWindowData;
}

export type ThemeMode = "light" | "dark";

export interface WallpaperOption {
  id: string;
  name: string;
  path: string;
  thumbnail?: string;
  isDarkTheme?: boolean;
}

export interface QuickSettingsState {
  wifi: boolean;
  bluetooth: boolean;
  airplaneMode: boolean;
  nightLight: boolean;
  batterySaver: boolean;
  volume: number;
  brightness: number;
}

export interface ContextMenuState {
  isOpen: boolean;
  x: number;
  y: number;
  type: "desktop" | "icon" | "taskbar";
  targetId?: string;
}
