import "../assets/styles/css/tw-main.css";
import "../assets/styles/css/globals.css";

import type { AppProps } from "next/app";
import { NextScript } from "next/document";
import Script from "next/script";
import React from "react";
import { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Ton Story",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script id="theme-script" strategy="beforeInteractive">
          {`// Add dark / light detection that runs before next load
            (function() {
              window.__onThemeChange = function() {};
              
              function setTheme(newTheme) {
                window.__theme = newTheme;
                preferredTheme = newTheme;
                document.body.setAttribute("data-theme", newTheme);
                window.__onThemeChange(newTheme);
              }

              var preferredTheme;
              try {
                preferredTheme = localStorage.getItem("theme");
              } catch (err) {}

              window.__setPreferredTheme = function(newTheme) {
                setTheme(newTheme);
                try {
                  localStorage.setItem("theme", newTheme);
                } catch (err) {}
              };

              var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

              darkQuery.addListener(function(e) {
                window.__setPreferredTheme(e.matches ? "dark" : "light");
              });

              setTheme(preferredTheme || (darkQuery.matches ? "dark" : "light"));
            })();
      `}
        </Script>
        <Providers>{children}</Providers>
        {/* <NextScript /> */}
      </body>
    </html>
  );
}
