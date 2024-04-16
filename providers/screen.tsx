// app/providers.tsx
"use client";
import React from "react";
import screenPlugins from '#/plugins/screen'

export function ScreenProviders({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  React.useEffect(() => {
    screenPlugins();
  }, []);

  return <>{children}</>
}
