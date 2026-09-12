import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Windows 7 | PwnSim | ZeroDay Alliance",
  description: "Interactive Windows 7 Desktop for PwnSim by ZeroDay Alliance",
};

export default function Win7Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
