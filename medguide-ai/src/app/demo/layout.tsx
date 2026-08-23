"use client";

import { useEffect } from "react";
import { DemoModeBanner } from "@/components/DemoModeBanner";
import { DemoNav } from "@/components/DemoNav";
import { ChatWidget } from "@/components/ChatWidget";
import { ActiveProvider } from "@/context/ActiveContext";
import { track } from "@/lib/analytics";

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    track("demo_started");
  }, []);

  return (
    <ActiveProvider>
      <div className="min-h-screen bg-ivory">
        <DemoModeBanner />
        <DemoNav />
        <main className="container-page py-8">{children}</main>
        <ChatWidget />
      </div>
    </ActiveProvider>
  );
}
