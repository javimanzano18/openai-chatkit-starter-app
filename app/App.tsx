"use client";

import { useCallback } from "react";
import { ChatKitPanel } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";


export default function App() {
  const { scheme, setScheme } = useColorScheme();

  const handleWidgetAction = useCallback(async (action: unknown) => {
  if (process.env.NODE_ENV !== "production") {
    console.info("[ChatKitPanel] widget action", action);
  }
  
  // ✅ Validación de tipo completa antes de acceder a propiedades
  if (!action || typeof action !== 'object') {
    return;
  }
  
  // ✅ Type guard: verifica que 'type' existe
  if (!('type' in action)) {
    return;
  }
  
  // ✅ Ahora TypeScript sabe que action tiene la propiedad 'type'
  const typedAction = action as { type: string; payload?: { href?: string } };
  
  if (typedAction.type === "open.url") {
    const href = typedAction.payload?.href;
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      console.warn("No se especificó href en el payload del botón open.url");
    }
  }
  
  if (typedAction.type === "carousel.next") {
    // TODO: mover carrusel a siguiente
  }
  
  if (typedAction.type === "carousel.prev") {
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
          onWidgetAction={handleWidgetAction}
          onResponseEnd={handleResponseEnd}
          onThemeRequest={setScheme}
        />
      </div>
    </main>
  );
}
