export interface ChromeTab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  isSecure: boolean;
  history: string[];
  historyIndex: number;
}

export interface SearchResult {
  id: string;
  title: string;
  url: string;
  displayUrl: string;
  snippet: string;
  siteName: string;
  date?: string;
}

export interface DownloadItem {
  id: string;
  filename: string;
  filesize: string;
  progress: number;
  status: "downloading" | "completed";
  url: string;
  timestamp: string;
  downloadedText?: string;
  speedText?: string;
  timeLeftText?: string;
}
