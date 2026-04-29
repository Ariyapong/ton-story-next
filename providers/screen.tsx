"use client";

import { useEffect } from "react";
import screenPlugin from "@/plugins/screen";

export function ScreenProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const teardown = screenPlugin();
    return () => {
      teardown?.();
    };
  }, []);

  return <>{children}</>;
}
