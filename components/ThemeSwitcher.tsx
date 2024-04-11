"use client";
import React, { useEffect } from "react";
import { cookies } from "next/headers";
import { getCookie as getCookieClient } from '../utils/cookies'

const getTheme = () => {
  if (typeof window === "undefined") return null;
  // return localStorage?.getItem("theme") || "light";
  return getCookieClient('theme') || "light";
};
function ThemeSwitcher({ ...props }) {
  const [theme, setTheme] = React.useState(["light", "dark", "sepia"]);
  const [currentTheme, setCurrentTheme] = React.useState<string | null>(
    ""
  );

  const handleSwitchTheme = () => {
    console.log("switch theme : ", window.__theme);
    // if (window.__theme === "dark") {
    //   window.__setPreferredTheme("light");
    // } else {
    //   window.__setPreferredTheme("dark");
    // }
    nextTheme();
  };

  const nextTheme = () => {
    if(!currentTheme) return;
    const nextThemeIndex = (theme.indexOf(currentTheme) + 1) % theme.length;
    const nextTheme = theme[nextThemeIndex];
    setCurrentTheme(nextTheme);
    // localStorage.setItem("theme", nextTheme);
    window.__setPreferredTheme(nextTheme);
  };

  useEffect(() => {
    setCurrentTheme(getTheme());
  }, []);

  return (
    <div>
      <button onClick={handleSwitchTheme}>{currentTheme}</button>
    </div>
  );
}

export default ThemeSwitcher;
