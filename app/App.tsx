"use client";

import { useCallback } from "react";
import { ChatKitPanel } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";


export default function App() {
  const { scheme, setScheme } = useColorScheme();

  // ✅ handler sin tipado restrictivo
  const handleWidgetAction = useCallback(async (action: any) => {
    if (process.env.NODE_ENV !== "production") {
      console.info("[ChatKitPanel] widget action", action);
    }

    if (action?.type === "open.url") {
      const href = action?.payload?.href as string | undefined;
      if (href) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        console.warn("No se especificó href en el payload del botón open.url");
      }
    }

    if (action?.type === "carousel.next") {
      // TODO: mover carrusel a siguiente
    }

    if (action?.type === "carousel.prev") {
      // TODO: mover carrusel a anterior
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
        {/* ✅ pasamos un wrapper para evitar tipado contextual de la prop */}
        <ChatKitPanel
          theme={scheme}
          onWidgetAction={(a) => handleWidgetAction(a as any)}
          onResponseEnd={handleResponseEnd}
          onThemeRequest={setScheme}
        />
      </div>
    </main>
  );
}
