"use client";
import { useCallback } from "react";
import { ChatKitPanel } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function App() {
  const { scheme, setScheme } = useColorScheme();
  
  const handleWidgetAction = useCallback(async (action: unknown) => {
    // ✅ Log detallado para debug
    console.log("[handleWidgetAction] Acción recibida:", action);
    console.log("[handleWidgetAction] Tipo de action:", typeof action);
    console.log("[handleWidgetAction] JSON:", JSON.stringify(action, null, 2));
    
    if (!action || typeof action !== 'object') {
      console.warn("[handleWidgetAction] Action no es un objeto válido");
      return;
    }
    
    if (!('type' in action)) {
      console.warn("[handleWidgetAction] Action no tiene propiedad 'type'");
      return;
    }
    
    const typedAction = action as { 
      type: string; 
      payload?: { href?: string };
      href?: string; // A veces viene directo aquí
    };
    
    console.log("[handleWidgetAction] Type detectado:", typedAction.type);
    
    if (typedAction.type === "open.url") {
      // Intenta obtener href de diferentes ubicaciones
      const href = typedAction.payload?.href || typedAction.href;
      console.log("[handleWidgetAction] href encontrado:", href);
      
      if (href) {
        console.log("[handleWidgetAction] Abriendo URL:", href);
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        console.warn("[handleWidgetAction] No se encontró href en el payload");
      }
    } else if (typedAction.type === "carousel.next") {
      console.log("[handleWidgetAction] carousel.next");
      // TODO: mover carrusel a siguiente
    } else if (typedAction.type === "carousel.prev") {
      console.log("[handleWidgetAction] carousel.prev");
      // TODO: mover carrusel a anterior
    } else {
      console.warn("[handleWidgetAction] Tipo de acción no reconocido:", typedAction.type);
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
