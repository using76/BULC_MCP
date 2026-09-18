/** Bridge base URL from the environment (BULC_BRIDGE_URL wins over BULC_BRIDGE_HOST/PORT). */
export declare function bridgeUrl(): string;
export declare class BulcNotRunningError extends Error {
    constructor(detail?: string);
}
export interface BridgeTool {
    name: string;
    description: string;
    inputSchema: Record<string, unknown>;
}
/** Tool definitions of the running app. Throws BulcNotRunningError when it is not up. */
export declare function fetchTools(): Promise<BridgeTool[]>;
/** Run one tool against the live app. */
export declare function callTool(name: string, args: unknown): Promise<{
    message: string;
    action?: any;
}>;
/** Project summary (CHID, mesh, object counts). */
export declare function fetchSummary(): Promise<any>;
/** Save the current project and start a simulation in the app. */
export declare function startRun(folderName?: string, solverType?: string): Promise<any>;
export declare function health(): Promise<{
    ok: boolean;
    hasProject?: boolean;
    toolCount?: number;
} | null>;
