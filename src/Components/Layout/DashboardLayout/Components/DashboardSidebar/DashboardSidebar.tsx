"use client";

import { iLocale } from "@/Components/Entity/Locale/types";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/Components/Shadcn/sidebar";
import { getMainNavItems } from "../../constants";
import { getDictionary } from "../../i18n";
import { NavGroup } from "./NavGroup";
import { UserProfileDropdown } from "./UserProfileDropdown";

interface iProps {
  locale: iLocale;
}

export function DashboardSidebar({ locale }: iProps) {
  const dictionary = getDictionary(locale);

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* <UserRole dictionary={dictionary} /> */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavGroup
          label={dictionary.mainTitle}
          items={getMainNavItems(dictionary, locale)}
        />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserProfileDropdown locale={locale} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
