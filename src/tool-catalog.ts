// Tool catalog — what this server advertises in `tools/list`.
//
// The source of truth is the running BULC app (bridge `GET /tools`). But MCP clients ask for the
// tool list as soon as they connect, which is usually *before* the user has launched BULC — and a
// client that sees an empty list will insist the feature does not exist. So we ship a snapshot of
// the app's tool definitions (names, descriptions, input schemas only — no implementation) and use
// it whenever the app cannot be reached. The moment BULC is running, the live list wins.
//
// Regenerate the snapshot from the app repository:
//   npm run gen:mcp-tool-snapshot -- <path>/src/tools-snapshot.json   (in GUI_program)

import { createRequire } from "node:module";
import { fetchTools, type BridgeTool } from "./bridge-client.js";

const require = createRequire(import.meta.url);
const snapshot = require("./tools-snapshot.json") as {
  toolCount: number;
  tools: BridgeTool[];
};

/** Tools implemented by this server itself rather than forwarded verbatim to the app. */
export const LOCAL_TOOLS: BridgeTool[] = [
  {
    name: "bulc_connection_status",
    description:
      "Check whether the BULC desktop app is running and reachable, how many tools it exposes, " +
      "and which bridge address this server is using. Call this first when a tool call fails.",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "get_project_summary",
    description:
      "Summary of the project currently open in BULC: CHID, title, end time, mesh, and object counts " +
      "(obstacles, fire sources, vents, devices, evacuation agents, sprinkler heads, HVAC terminals).",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "run_simulation",
    description:
      "Save the project currently open in BULC and start the simulation. " +
      "Run validate_project first — it catches decks that cannot run or that would store only the t=0 frame.",
    inputSchema: {
      type: "object",
      properties: {
        folder_name: { type: "string", description: "Output folder name (defaults to the project CHID)" },
        solver_type: {
          type: "string",
          enum: ["gpu", "gpu_cutcell", "cpu_openmp"],
          description: "Solver to run (default gpu)",
        },
      },
      required: [],
    },
  },
];

const LOCAL_NAMES = new Set(LOCAL_TOOLS.map((t) => t.name));

export interface Catalog {
  tools: BridgeTool[];
  /** true = fetched from the running app, false = bundled snapshot (app not reachable) */
  live: boolean;
  appToolCount: number;
}

/**
 * The tool list to advertise. Prefers the running app; falls back to the snapshot.
 * Local tools always come first so they are available in both states.
 */
export async function loadCatalog(): Promise<Catalog> {
  try {
    const live = await fetchTools();
    if (live.length > 0) {
      return {
        tools: [...LOCAL_TOOLS, ...live.filter((t) => !LOCAL_NAMES.has(t.name))],
        live: true,
        appToolCount: live.length,
      };
    }
  } catch {
    // app not running — fall through to the snapshot
  }
  return {
    tools: [...LOCAL_TOOLS, ...snapshot.tools.filter((t) => !LOCAL_NAMES.has(t.name))],
    live: false,
    appToolCount: snapshot.tools.length,
  };
}

export const SNAPSHOT_TOOL_COUNT = snapshot.toolCount;
