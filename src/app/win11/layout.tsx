import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Windows 11 | PwnSim | ZeroDay Alliance",
  description: "Interactive Windows 11 Desktop for PwnSim by ZeroDay Alliance",
};

export default function Win11Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full overflow-hidden select-none">{children}</div>
  );
}
