export interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  parentId: string | null;
  content?: string;
  isOpen?: boolean;
}

export interface TabItem {
  id: string;
  fileId: string;
  name: string;
  isDirty?: boolean;
}

export const INITIAL_FILES: FileNode[] = [
  {
    id: "root-src",
    name: "src",
    type: "folder",
    parentId: null,
    isOpen: true,
  },
  {
    id: "src-app",
    name: "app",
    type: "folder",
    parentId: "root-src",
    isOpen: true,
  },
  {
    id: "app-layout",
    name: "layout.tsx",
    type: "file",
    parentId: "src-app",
    content: `export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        montserrat.variable,
        geistMono.variable,
        "font-sans",
        "antialiased"
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}`,
  },
  {
    id: "app-page",
    name: "page.tsx",
    type: "file",
    parentId: "src-app",
    content: `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold tracking-tight">ZeroDay Alliance</h1>
        <p className="mt-4 text-neutral-400">Welcome to PWNed Workspace.</p>
      </div>
    </main>
  );
}`,
  },
  {
    id: "app-globals",
    name: "globals.css",
    type: "file",
    parentId: "src-app",
    content: `@import "tailwindcss";

@layer base {
  body {
    background-color: #1e1e1e;
    color: #d4d4d4;
    font-family: var(--font-geist-mono);
  }
}`,
  },
  {
    id: "root-package-json",
    name: "package.json",
    type: "file",
    parentId: null,
    content: `{
  "name": "pwned",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "16.3.4",
    "react": "19.2.8",
    "react-dom": "19.2.8"
  }
}`,
  },
  {
    id: "root-readme",
    name: "README.md",
    type: "file",
    parentId: null,
    content: `# PWNed VS Code Workspace

Welcome to the authentic VS Code web editor experience.
- Full syntax highlighting matching VS Code Dark Modern
- Add, rename, delete files and folders
- Live code editing with bracket colorization
- Accurate line numbers and active cursor indicators
`,
  },
];
