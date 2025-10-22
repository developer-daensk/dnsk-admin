"use client";

import { iLocale } from "@/Components/Entity/Locale/types";
import { Navbar } from "@/Components/Layout/DashboardLayout/Components/Navbar";
import { TopLoader } from "@/Components/Layout/DashboardLayout/Components/TopLoader";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/Components/Shadcn/sidebar";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { DashboardSidebar } from "./Components/DashboardSidebar/DashboardSidebar";
import { appRoutes } from "@/lib/routes/appRoutes";

interface iProps {
  children: ReactNode;
  locale: iLocale;
}

export function DashboardLayout({ children, locale }: iProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(appRoutes.auth.signIn(locale));
    }
  }, [isAuthenticated, isLoading, router, locale]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "13rem",
        } as React.CSSProperties
      }
    >
      <TopLoader />
      <DashboardSidebar locale={locale} />
      <SidebarInset>
        <header className="bg-background flex h-12 shrink-0 items-center gap-2 rounded-t-lg border-b px-4">
          <SidebarTrigger className="ml-1" />
          <Navbar />
        </header>
        <div className="mx-auto flex w-full max-w-[1960px] grow-1 px-4 py-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
