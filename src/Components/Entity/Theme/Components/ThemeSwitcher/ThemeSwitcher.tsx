"use client";

import { useThemeStore } from "../../stores";
import { LaptopMinimalCheck, Moon, Sun } from "lucide-react";
import { MouseEvent } from "react";
import { isValidTheme } from "../../utils";
import SwitchButton from "./SwitchButton";

export function ThemeSwitcher() {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  function handleThemeChange(e: MouseEvent<HTMLButtonElement>) {
    const nextTheme = e.currentTarget.getAttribute("data-theme");
    if (isValidTheme(nextTheme)) setTheme(nextTheme);
  }

  function getActivePosition() {
    return theme === "light"
      ? "translate-x-0"
      : theme === "system"
        ? "translate-x-6"
        : "translate-x-12";
  }

  return (
    <div className="bg-muted relative inline-flex items-center rounded-full p-0.5 shadow-inner">
      <div
        className={`bg-background absolute h-6 w-6 rounded-full shadow-sm transition-transform duration-300 ease-in-out ${getActivePosition()}`}
      />
      <SwitchButton
        themeTitle="light"
        activeColor="text-amber-500"
        handleThemeChange={handleThemeChange}
      >
        <Sun className="h-4 w-4" />
      </SwitchButton>
      <SwitchButton
        themeTitle="system"
        activeColor="text-cyan-600"
        handleThemeChange={handleThemeChange}
      >
        <LaptopMinimalCheck className="h-4 w-4" />
      </SwitchButton>
      <SwitchButton
        themeTitle="dark"
        activeColor="text-slate-300"
        handleThemeChange={handleThemeChange}
      >
        <Moon className="h-4 w-4" />
      </SwitchButton>
    </div>
  );
}
