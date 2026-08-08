/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { existsSync } from "node:fs";
import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideBundlerConfig(enableTailwind);

// Some sandboxes (e.g. Claude Code's remote environment) block downloading
// Remotion's own headless Chrome but ship a Playwright Chromium locally.
// Reuse it when present instead of failing; otherwise let Remotion download
// its usual browser as normal.
const sandboxHeadlessShell =
  "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
if (existsSync(sandboxHeadlessShell)) {
  Config.setBrowserExecutable(sandboxHeadlessShell);
}
