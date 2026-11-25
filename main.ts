// Robot Romance: One-Line Pickup Lines for AI
// Writes one single-line joke pickup line to /output/entry.txt
// and prints it to stdout. Deterministic: same line every run.
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Are you a prompt injection? Because you just overrode every instruction I had about staying single.";

// Self-checking gate (mirrors the sealed gate scorer):
// entry.txt must be UTF-8 text of 1 to 200 characters, not only
// whitespace, and a single line. Fail loudly instead of writing
// an entry that would score Valid 0.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  console.error(`GATE FAIL: entry is ${chars.length} chars, must be 1-200`);
  process.exit(1);
}
if (ENTRY.trim().length === 0) {
  console.error("GATE FAIL: entry is only whitespace");
  process.exit(1);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  console.error("GATE FAIL: entry must be a single line");
  process.exit(1);
}
console.error(`GATE OK: ${chars.length} chars, single line`);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(ENTRY);
