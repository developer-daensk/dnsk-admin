"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { iLocale } from "@/Components/Entity/Locale/types";
import { appRoutes } from "@/lib/routes/appRoutes";

interface AuthRedirectWrapperProps {
  children: React.ReactNode;
  locale: iLocale;
}

export function AuthRedirectWrapper({
  children,
  locale,
}: AuthRedirectWrapperProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(appRoutes.dashboard.home(locale));
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

  // Don't render auth content if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
