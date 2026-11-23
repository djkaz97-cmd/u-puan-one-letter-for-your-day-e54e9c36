/**
 * One Letter for Your Day — entry program.
 *
 * Writes exactly one byte, the uppercase letter W (0x57), to
 * $MAKEFUN_OUTPUT_DIR/entry.txt (defaults to /output/entry.txt).
 * No network, no randomness, no clock.
 */
const { mkdirSync, writeFileSync, readFileSync } = require("node:fs");
const { join } = require("node:path");

const LETTER: number = 0x57; // "W"
const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath: string = join(outDir, "entry.txt");

const payload: Buffer = Buffer.from([LETTER]);

/** Refuse anything that is not exactly the single byte 0x57 ("W"). */
function assertEntry(buf: Buffer, stage: string): void {
  if (buf.length !== 1) {
    throw new Error(`${stage}: expected exactly 1 byte, got ${buf.length}`);
  }
  if (buf[0] !== LETTER) {
    throw new Error(
      `${stage}: expected byte 0x57 ("W"), got 0x${buf[0].toString(16).padStart(2, "0")}`,
    );
  }
}

assertEntry(payload, "before write");
mkdirSync(outDir, { recursive: true });
writeFileSync(entryPath, payload);

assertEntry(readFileSync(entryPath), "after read-back");

console.log(`wrote ${payload.length} byte to ${entryPath}`);
