"use client";

import { removeLocaleFromPathname } from "@/Components/Entity/Locale/utils";
import { cn } from "@/Components/Shadcn/lib/utils";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/Components/Shadcn/sidebar";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import { iNavItem } from "../../types";
import { iLocale } from "@/Components/Entity/Locale/types";

interface iProps {
  label: string;
  items: iNavItem[];
  locale?: iLocale;
}

export function NavGroup({ label, items }: iProps) {
  const pathname = usePathname();
  const { purePathName } = removeLocaleFromPathname(pathname);

  // Calculate initial open items synchronously to prevent hydration mismatch
  const initialOpenItems = useMemo(() => {
    const activeParents: string[] = [];
    items.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          (child) => purePathName === child.href
        );
        if (hasActiveChild) {
          activeParents.push(item.href);
        }
      }
    });
    return activeParents;
  }, [purePathName, items]);

  const [openItems, setOpenItems] = useState<string[]>(initialOpenItems);

  const toggleItem = (href: string) => {
    setOpenItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href]
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = purePathName === item.href;
            const hasChildren = !!item.children && item.children.length > 0;
            const isOpen = openItems.includes(item.href);
            const hasActiveChild =
              hasChildren &&
              !!item.children?.some((child) => purePathName === child.href);

            return (
              <SidebarMenuItem key={item.href}>
                {hasChildren ? (
                  <>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={isActive || hasActiveChild}
                      className="w-full"
                      onClick={() => toggleItem(item.href)}
                    >
                      {item.icon && <item.icon className="size-4" />}
                      <span>{item.title}</span>
                      <ChevronRightIcon
                        className={cn(
                          "ml-auto size-4 transition-transform duration-200",
                          { "rotate-90": isOpen }
                        )}
                      />
                      {item.badge && (
                        <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                      )}
                    </SidebarMenuButton>
                    {isOpen && (
                      <SidebarMenuSub className="transition-all duration-200 ease-in-out">
                        {item.children?.map((child) => (
                          <SidebarMenuSubItem key={child.href}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={purePathName === child.href}
                            >
                              <Link href={child.href}>
                                {child.icon && (
                                  <child.icon className="size-4" />
                                )}
                                <span>{child.title}</span>
                                {child.badge && (
                                  <SidebarMenuBadge>
                                    {child.badge}
                                  </SidebarMenuBadge>
                                )}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </>
                ) : (
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={isActive}
                  >
                    <Link href={item.href}>
                      {item.icon && <item.icon className="size-4" />}
                      <span>{item.title}</span>
                      {item.badge && (
                        <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
