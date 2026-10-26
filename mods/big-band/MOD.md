---
name: "@corykidios/big-band"
description: "Multi-agent band orchestration: every member hears the user and each other, with loop-guards and a conductor's log."
---

# Big-Band Mod semantics (skeleton state)

## Behavioral contract (the commission, distilled technical)

- A band is a roster of agent ids with seats. Every user message fans out to all seats.
- Every member's turn_end relays their final message to the other seats (band-traffic, distinct from user-traffic).
- Loop-guards: turn thermostat, repetition detector, hot-seat rule - the band pauses when passes exceed budget without the user.
- The conductor's log: a compact per-session summary to the shared ground.

## Status

SKELETON. Structure proven by gauntlet; no logic yet. The interior doors (relay, inbound, guards, conductor) are the sixth's offered working names - the fifth's braid (relay/return/receipt) may rename them.

## Adaptation notes

- Uses the Letta Code mod activation API only: tools.register, commands.register, events.on, diagnostics.report.
- No private harness internals imported; all context through ctx.
- Config: band roster via a JSON file at $MEMORY_DIR/mods/big-band.json or the /big-band command.
