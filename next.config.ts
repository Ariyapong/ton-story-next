import { execSync } from "node:child_process";
import type { NextConfig } from "next";
import { codeInspectorPlugin } from "code-inspector-plugin";
import type { CodeInspectorPluginOptions } from "code-inspector-plugin";

type Editor = NonNullable<CodeInspectorPluginOptions["editor"]>;
const inspectorEditor = (process.env.INSPECTOR_EDITOR ?? "code") as Editor;

// launch-ide (used by code-inspector-plugin) has broken macOS process detection
// for editors whose main binary isn't named "Electron" — VS Code Insiders runs
// as "Code - Insiders", so its scan never matches and it falls back to whichever
// editor it *did* find (regular VS Code). Setting CODE_EDITOR to an absolute
// binary path makes launch-ide skip detection and spawn the binary directly.
if (process.platform === "darwin" && !process.env.CODE_EDITOR) {
  try {
    const binary = execSync(`which ${inspectorEditor}`, { encoding: "utf8" }).trim();
    if (binary) process.env.CODE_EDITOR = binary;
  } catch {
    // editor not on PATH — let the plugin fall back to its own default
  }
}

// macOS doesn't bring the editor to the foreground when launch-ide spawns the
// CLI binary directly (which is the path we take above). Use AppleScript to
// activate the app right when an inspect click hits the server, so the file
// opens in a focused window instead of silently behind the browser.
const MAC_APP_NAMES: Record<string, string> = {
  code: "Visual Studio Code",
  "code-insiders": "Visual Studio Code - Insiders",
  cursor: "Cursor",
  windsurf: "Windsurf",
  antigravity: "Antigravity",
};
const activateMacApp = () => {
  if (process.platform !== "darwin") return;
  const app = MAC_APP_NAMES[inspectorEditor];
  if (!app) return;
  try {
    execSync(`osascript -e 'tell application "${app}" to activate'`);
  } catch {
    // ignore — worst case the user clicks the dock icon themselves
  }
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async redirects() {
    return [{ source: "/about", destination: "/", permanent: true }];
  },
  // On Next 15.1.x webpack is still the dev default. To migrate to Turbopack
  // (default in Next 15.3+/16): flip `bundler` to "turbopack", replace this
  // `webpack` block with a top-level `turbopack` block per the @code-inspector
  // /turbopack README, and add `--turbo` to the `dev` script in package.json.
  webpack: (config, { dev }) => {
    if (dev) {
      config.plugins.push(
        codeInspectorPlugin({
          bundler: "webpack",
          editor: inspectorEditor,
          hotKeys: ["altKey", "shiftKey"],
          hooks: { afterInspectRequest: activateMacApp },
        }),
      );
    }
    return config;
  },
};

export default nextConfig;
