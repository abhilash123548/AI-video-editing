"use client";

import { useEffect } from "react";
import { DemoNav } from "@/components/DemoNav";
import { ChatWidget } from "@/components/ChatWidget";
import { ActiveProvider } from "@/context/ActiveContext";
import { RecordsProvider } from "@/context/RecordsContext";
import { track } from "@/lib/analytics";

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    track("app_view");
  }, []);

  return (
    <RecordsProvider>
      <ActiveProvider>
        <div className="min-h-screen bg-ivory">
          <DemoNav />
          <main className="container-page py-8">{children}</main>
          <ChatWidget />
        </div>
      </ActiveProvider>
    </RecordsProvider>
  );
}
