import { cn } from "../../../../Shadcn/lib/utils";
import { MouseEvent, ReactNode } from "react";
import { useThemeStore } from "../../stores";
import { iTheme } from "../../types";

interface iProps {
  themeTitle: iTheme;
  activeColor: string;
  children: ReactNode;
  handleThemeChange(e: MouseEvent<HTMLButtonElement>): void;
}

export default function SwitchButton({
  themeTitle,
  activeColor,
  children,
  handleThemeChange,
}: iProps) {
  const theme = useThemeStore((s) => s.theme);

  return (
    <button
      onClick={handleThemeChange}
      data-theme={themeTitle}
      className={cn(
        "relative z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors duration-200",
        theme === themeTitle ? activeColor : "text-gray-500"
      )}
      aria-label={`Switch to ${themeTitle} theme`}
      title={`${themeTitle} theme`}
    >
      {children}
    </button>
  );
}
