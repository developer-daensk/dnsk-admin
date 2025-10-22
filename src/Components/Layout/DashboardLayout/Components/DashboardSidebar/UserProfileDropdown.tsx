"use client";

import { iLocale } from "@/Components/Entity/Locale/types";
import { addLocaleToPathname } from "@/Components/Entity/Locale/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/Shadcn/popover";
import { Separator } from "@/Components/Shadcn/separator";
import { SidebarMenuButton } from "@/Components/Shadcn/sidebar";
import { getUserLogoSign } from "@/lib/utils/getUserLogoSign";
import { LogOutIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { getProfileMenuItems } from "../../constants";
import { getDictionary } from "../../i18n";
import { appRoutes } from "@/lib/routes/appRoutes";

interface iProps {
  locale: iLocale;
}

export function UserProfileDropdown({ locale }: iProps) {
  const dictionary = getDictionary(locale);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuthStore();

  const userLogoSign = getUserLogoSign();

  return (
    <Popover open={isProfileMenuOpen} onOpenChange={setIsProfileMenuOpen}>
      <PopoverTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <div className="bg-sidebar-accent text-sidebar-accent-foreground flex aspect-square size-8 items-center justify-center rounded-lg text-xs">
            {userLogoSign}
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {/* {user?.firstName} {user?.lastName} */}
            </span>
            <span className="text-muted-foreground truncate text-xs">
              {/* {user?.emailAddress} */}
            </span>
          </div>
          <MoreVerticalIcon className="size-4 transition-colors duration-200 group-data-[collapsible=icon]:hidden" />
        </SidebarMenuButton>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        className="w-56 p-2"
        sideOffset={8}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 p-2">
            <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg text-sm font-medium">
              {userLogoSign}
            </div>
            <div className="grid text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {/* {user?.firstName} {user?.lastName} */}
              </span>
              <span className="text-muted-foreground truncate text-xs">
                {/* {user?.emailAddress} */}
              </span>
            </div>
          </div>
          <Separator />
          <div className="grid gap-1">
            {getProfileMenuItems(dictionary, locale).map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                {item.icon && <item.icon className="size-4" />}
                <span>{item.title}</span>
              </Link>
            ))}
            <Separator />
            <button
              onClick={() => {
                setIsProfileMenuOpen(false);
                logout();
                router.push(appRoutes.auth.signIn(locale));
              }}
              className="hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors"
            >
              <LogOutIcon className="size-4" />
              <span>{dictionary.actions.logOut}</span>
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
