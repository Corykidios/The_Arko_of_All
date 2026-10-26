/** The roster shape: who's in the band, their seats, their marks. */
export interface BandMember {
  agentId: string;
  name: string;
  seat: string;
}
export interface BandConfig {
  version: number;
  bandName: string;
  members: BandMember[];
}
export function emptyBand(): BandConfig {
  return { version: 1, bandName: "", members: [] };
}
