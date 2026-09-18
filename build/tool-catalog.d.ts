import { type BridgeTool } from "./bridge-client.js";
/** Tools implemented by this server itself rather than forwarded verbatim to the app. */
export declare const LOCAL_TOOLS: BridgeTool[];
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
export declare function loadCatalog(): Promise<Catalog>;
export declare const SNAPSHOT_TOOL_COUNT: number;
