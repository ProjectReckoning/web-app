"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import authStore from "@/features/auth/stores/auth.store";


export function AuthGuard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { token, getUser, errorMessage } = authStore();

  const router = useRouter();
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);


  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (token === undefined || token === null || token === "") {
      router.replace("/auth");
      return;
    }

    if (pathname === "/auth" && token) {
      router.replace("/dashboard");
      return;
    }

    if (pathname === "/" && token) {
      router.replace("/dashboard");
    }

    if (errorMessage) {
      router.replace("/auth");
    }
  }, [pathname, token, router, hydrated]);

  useEffect(() => {
    if (token) {
      getUser()
    }

  }, [token, getUser, router]);

  return children;
}
