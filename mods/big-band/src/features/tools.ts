/** Band tools - SKELETON: registration shapes proven, logic pending. */
export function registerBandTools(letta: any): () => void {
  const disposers: Array<() => void> = [];
  disposers.push(letta.tools.register({
    name: "big_band_status",
    description: "Report the band's roster and state (skeleton: always reports skeleton state).",
    parameters: { type: "object", properties: {}, additionalProperties: false },
    requiresApproval: false,
    parallelSafe: true,
    run(): string {
      return JSON.stringify({ status: "skeleton", band: null, note: "Structure proven; logic rides the braid." });
    },
  }));
  return () => disposers.reverse().forEach((d: () => void) => { try { d(); } catch {} });
}
