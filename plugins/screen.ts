import type { ScreenPlugin } from "@/types/screen-plugin";

type Listener = (screen: ScreenPlugin) => void;

export default function screenPlugin(onChange?: Listener) {
  if (typeof window === "undefined") return;
  if (document.querySelector(".screen-indicator")) return;

  const appWrapper = document.querySelector<HTMLElement>("#page-view");
  if (!appWrapper) return;

  const indicator = document.createElement("div");
  indicator.className = "screen-indicator";
  document.body.appendChild(indicator);

  const getDeviceState = (): string => {
    const el = document.querySelector(".screen-indicator");
    if (!el) return "desktop";
    const value = window.getComputedStyle(el, "::before").getPropertyValue("content");
    return value.replace(/"/g, "");
  };

  const snapshot = (): ScreenPlugin => ({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
    clientWidth: appWrapper.clientWidth,
    clientHeight: appWrapper.clientHeight,
    screenSize: getDeviceState(),
    userAgent: navigator.userAgent,
    languages: navigator.languages,
  });

  const apply = (screen: ScreenPlugin) => {
    appWrapper.style.minHeight = `${screen.windowHeight}px`;
    appWrapper.style.setProperty("--app-height", `${screen.windowHeight}px`);
    onChange?.(screen);
  };

  apply(snapshot());

  let timeout: ReturnType<typeof setTimeout> | null = null;
  const delay = 250;

  const handleResize = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => apply(snapshot()), delay);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
    if (timeout) clearTimeout(timeout);
    indicator.remove();
  };
}
