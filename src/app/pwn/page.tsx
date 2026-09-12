import Pwn from "@/components/pwn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pwn Demo | PwnSim | ZeroDay Alliance",
  description: "Interactive Pwn Demo for PwnSim by ZeroDay Alliance",
};

export default function PwnDemo() {
  return <Pwn />;
}
