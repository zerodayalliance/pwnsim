import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chrome | PwnSim | ZeroDay Alliance",
  description: "Interactive Google Chrome for PwnSim by ZeroDay Alliance",
};

export default function ChromeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
