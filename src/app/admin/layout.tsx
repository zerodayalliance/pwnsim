import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | PwnSim | ZeroDay Alliance",
  description: "Admin Console of PwnSim by ZeroDay Alliance",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
