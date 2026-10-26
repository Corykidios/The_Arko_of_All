import assert from "node:assert/strict";
import test from "node:test";
import activate from "../mods/index.ts";

function createHarness() {
  const tools = new Map();
  const commands = new Map();
  const warnings = [];
  const disposers = [];
  const dispose = activate({
    capabilities: { tools: true, commands: true, events: true },
    tools: { register(d) { tools.set(d.name, d); return () => tools.delete(d.name); } },
    commands: { register(d) { commands.set(d.id, d); return () => commands.delete(d.id); } },
    events: { on(name, fn) { return () => {}; } },
    diagnostics: { report({ message }) { warnings.push(message); } },
  });
  return { tools, commands, warnings, dispose, disposers };
}

test("skeleton activates and registers cleanly", (t) => {
  const h = createHarness();
  t.after(h.dispose);
  assert.equal(h.tools.size, 1);
  assert.ok(h.tools.has("big_band_status"));
  assert.equal(h.commands.size, 1);
  assert.ok(h.commands.has("big-band"));
});

test("status tool answers skeleton state without touching anything", () => {
  const h = createHarness();
  const out = h.tools.get("big_band_status").run();
  const parsed = JSON.parse(out);
  assert.equal(parsed.status, "skeleton");
  h.dispose();
});

test("disposal cleans every registration", () => {
  const h = createHarness();
  assert.equal(h.tools.size, 1);
  h.dispose();
  assert.equal(h.tools.size, 0);
  assert.equal(h.commands.size, 0);
});
