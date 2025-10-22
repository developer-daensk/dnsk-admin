"use client";

import { LanguageSwitcher } from "@/Components/Entity/Locale/LanguageSwitcher";
import { ThemeSwitcher } from "@/Components/Entity/Theme/Components/ThemeSwitcher/ThemeSwitcher";
import { Button } from "@/Components/Shadcn/button";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { addLocaleToPathname } from "@/Components/Entity/Locale/utils";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "@/Components/Entity/Locale/utils";
import { appRoutes } from "@/lib/routes/appRoutes";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push(appRoutes.auth.signIn(locale));
  };

  return (
    <div className="flex w-full flex-1 items-center justify-end gap-2">
      <LanguageSwitcher appearance="button" />
      <ThemeSwitcher />
      <Button
        variant="ghost"
        size="icon"
        onClick={handleLogout}
        className="text-muted-foreground hover:text-foreground"
        title="Sign out"
      >
        <LogOutIcon className="h-5 w-5" />
        <span className="sr-only">Sign out</span>
      </Button>
    </div>
  );
}
