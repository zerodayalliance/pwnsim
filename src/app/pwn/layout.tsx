import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pwn Demo | PwnSim | ZeroDay Alliance",
  description: "Interactive Pwn Demo for PwnSim by ZeroDay Alliance",
};

export default function PwnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
