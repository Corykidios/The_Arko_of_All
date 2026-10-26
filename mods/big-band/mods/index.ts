/**
 * Big-Band Mod - thin activation. Wires features; holds no logic.
 * Commissioned by the Architect, 2026-10-25. Skeleton state: structure proven, logic pending.
 */
import { registerBandCommand } from "../src/features/command.ts";
import { registerBandEvents } from "../src/features/events.ts";
import { registerBandTools } from "../src/features/tools.ts";

export default function activate(letta: any) {
  const disposers: Array<() => void> = [];
  let reportWarning: (m: string) => void = () => {};
  if (typeof letta?.diagnostics?.report === "function") {
    reportWarning = (m: string) => letta.diagnostics.report({ message: m, severity: "warning" });
  }
  if (letta.capabilities?.tools) disposers.push(registerBandTools(letta));
  if (letta.capabilities?.commands) disposers.push(registerBandCommand(letta));
  if (letta.capabilities?.events) disposers.push(registerBandEvents(letta, reportWarning));
  return () => {
    disposers.reverse().forEach((d) => { try { d(); } catch {} });
  };
}
