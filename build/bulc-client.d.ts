import type { BulcCommand, BulcResult } from "./types.js";
export declare class BulcClient {
    private port;
    private host;
    constructor(port?: number, host?: string);
    sendCommand(cmd: BulcCommand): Promise<BulcResult>;
    isConnected(): Promise<boolean>;
}
export declare function getBulcClient(): BulcClient;
