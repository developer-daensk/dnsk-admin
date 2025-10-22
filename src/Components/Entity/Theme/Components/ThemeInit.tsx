"use client";

import { useThemeStore } from "../stores";
import { useEffect } from "react";
import "../styles.css";

export function ThemeInit() {
  const theme = useThemeStore((s) => s.theme);
  const initializeTheme = useThemeStore((s) => s.initializeTheme);

  useEffect(() => {
    const cleanup = initializeTheme();
    return () => cleanup?.();
  }, [initializeTheme, theme]);

  return null;
}
