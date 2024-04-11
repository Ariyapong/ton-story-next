import "../assets/styles/css/tw-main.css";
import "../assets/styles/css/globals.css";

import type { AppProps } from "next/app";
import { NextScript } from "next/document";
import Script from "next/script";
import React from "react";
import { Metadata } from "next";
import { Providers } from "./providers";
import { cookies } from "next/headers";

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
  const cookieStore = cookies();
  const theme = cookieStore.get('theme')
  const { value } = theme || { value: "light" };
console.log("theme server", theme?.value);

  return (
    <html lang="en">
      <body data-theme={theme?.value}>
        <Script id="theme-script" strategy="beforeInteractive">
          {`// Add dark / light detection that runs before next load
            (function() {
              window.__onThemeChange = function() {};
              
              function getCookie(name) {
                const value = "; " + document.cookie;
                const parts = value.split("; " + name+"=");
                if (parts.length === 2) return parts.pop().split(';').shift();
              }
              
              function setTheme(newTheme) {
                console.log("debug setTheme :::::", newTheme);
                window.__theme = newTheme;
                preferredTheme = newTheme;
                document.body.setAttribute("data-theme", newTheme);
                window.__onThemeChange(newTheme);
              }

              var preferredTheme;
              try {
                preferredTheme = getCookie('theme');
                console.log(" preferredTheme theme-script  :::::", preferredTheme);
              } catch (err) {
                console.error(err);
              }

              window.__setPreferredTheme = function(newTheme) {
                console.log("theme-script :::::", newTheme);
                setTheme(newTheme);
                try {
                  document.cookie="theme=" + newTheme + ";" + "expires="
                } catch (err) {}
              };

              var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
              darkQuery.addListener(function(e) {
                window.__setPreferredTheme(e.matches ? "dark" : "light");
              });
              console.log("before set preferredTheme :::::", preferredTheme);
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
