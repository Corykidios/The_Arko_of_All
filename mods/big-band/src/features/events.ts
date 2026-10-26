/** Event wiring - SKELETON: the turn_end relay rides the braid. */
export function registerBandEvents(letta: any, reportWarning: (m: string) => void): () => void {
  let off: (() => void) | null = null;
  try {
    if (typeof letta.events?.on === "function") {
      off = letta.events.on("turn_end", () => {
        // SKELETON: relay logic pending. Harmless no-op.
      });
    }
  } catch (e) {
    reportWarning(`big-band: event wiring deferred: ${e instanceof Error ? e.message : String(e)}`);
  }
  return () => { try { off?.(); } catch {} };
}
