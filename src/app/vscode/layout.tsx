import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VS Code | PwnSim | ZeroDay Alliance",
  description: "Interactive Visual Studio Code for PwnSim by ZeroDay Alliance",
};

export default function VSCodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
