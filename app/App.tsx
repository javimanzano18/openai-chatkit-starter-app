"use client";

import { useCallback } from "react";
import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";
import type { FactAction } from "@/components/ChatKitPanel";

export default function App() {
  const { scheme, setScheme } = useColorScheme();

const handleWidgetAction = useCallback(async (action: FactAction) => {
  if (process.env.NODE_ENV !== "production") {
    console.info("[ChatKitPanel] widget action", action);
  }
  if (action.type === "open.url") {
    const href = action.payload.href;
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      console.warn("No se especificó href en el payload del botón open.url");
    }
  }
  if (action.type === "carousel.next") {
    // TODO: lógica de next
  }
  if (action.type === "carousel.prev") {
    // TODO: lógica de prev
  }
}, []);

  



  
  const handleResponseEnd = useCallback(() => {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[ChatKitPanel] response end");
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-end bg-slate-100 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-5xl">
        <ChatKitPanel
          theme={scheme}
          onWidgetAction={handleWidgetAction}
          onResponseEnd={handleResponseEnd}
          onThemeRequest={setScheme}
        />
      </div>
    </main>
  );
}
