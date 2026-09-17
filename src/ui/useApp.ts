import { useState, useCallback } from "react";
import type { View } from "./types";
import { getViewSize } from "./utils";

export default function useApp() {
  const [activeView, setActiveView] = useState<View>("pill");

  const applyView = useCallback((next: View) => {
    setActiveView(next);
    const size = getViewSize(next);
    parent.postMessage({ pluginMessage: { type: "resize", width: size.width, height: size.height } }, "*");
  }, []);

  return { activeView, applyView };
}