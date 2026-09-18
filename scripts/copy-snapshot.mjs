// tsc does not emit .json files, and tool-catalog.js resolves ./tools-snapshot.json next to itself.
// Copy it into build/ after every compile.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const from = path.join(root, "src", "tools-snapshot.json");
const to = path.join(root, "build", "tools-snapshot.json");

if (!fs.existsSync(from)) {
  console.error(`missing ${from} — regenerate it with the app repo's gen:mcp-tool-snapshot script`);
  process.exit(1);
}
fs.mkdirSync(path.dirname(to), { recursive: true });
fs.copyFileSync(from, to);
const { toolCount } = JSON.parse(fs.readFileSync(to, "utf-8"));
console.log(`tools-snapshot.json → build/ (${toolCount} tools)`);
