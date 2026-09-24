"use client";

import { useRouter } from "next/navigation";
import Pwn from "@/components/pwn";

export default function PwnDemo() {
  const router = useRouter();

  return (
    <main className="relative h-screen w-screen overflow-hidden select-none bg-[#0a0d14]">
      <Pwn onExit={() => router.push("/")} />
    </main>
  );
}
