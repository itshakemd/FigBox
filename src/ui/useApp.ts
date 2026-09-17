import { useState } from "react";
import type { View } from "./types";

export default function useApp() {
  const [activeView] = useState<View>("pill");
  return { activeView };
}