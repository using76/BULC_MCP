// BULC Client - TCP Socket communication with Java application

import * as net from "net";
import type { BulcCommand, BulcResult } from "./types.js";

const DEFAULT_PORT = 19840;
const DEFAULT_HOST = "localhost";
const CONNECTION_TIMEOUT = 5000;
const RESPONSE_TIMEOUT = 30000;

export class BulcClient {
  private port: number;
  private host: string;

  constructor(port: number = DEFAULT_PORT, host: string = DEFAULT_HOST) {
    this.port = port;
    this.host = host;
  }

  async sendCommand(cmd: BulcCommand): Promise<BulcResult> {
    return new Promise((resolve, reject) => {
      const socket = new net.Socket();
      let responseData = "";
      let resolved = false;

      // Connection timeout
      const connectionTimer = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          socket.destroy();
          reject(new Error(
            `BULC 연결 실패: ${this.host}:${this.port}에 연결할 수 없습니다. ` +
            `BULC 애플리케이션이 실행 중인지 확인하세요.`
          ));
        }
      }, CONNECTION_TIMEOUT);

      // Response timeout
      let responseTimer: NodeJS.Timeout | null = null;

      socket.on("connect", () => {
        clearTimeout(connectionTimer);

        // Set response timeout after connection
        responseTimer = setTimeout(() => {
          if (!resolved) {
            resolved = true;
            socket.destroy();
            reject(new Error("BULC 응답 타임아웃: 30초 내에 응답이 없습니다."));
          }
        }, RESPONSE_TIMEOUT);

        // Send command as JSON line
        const json = JSON.stringify(cmd) + "\n";
        socket.write(json);
      });

      socket.on("data", (data) => {
        responseData += data.toString();

        // Check for complete JSON response (ends with newline)
        if (responseData.includes("\n")) {
          if (responseTimer) clearTimeout(responseTimer);
          if (!resolved) {
            resolved = true;
            socket.end();

            try {
              const lines = responseData.trim().split("\n");
              const lastLine = lines[lines.length - 1];
              const result = JSON.parse(lastLine) as BulcResult;
              resolve(result);
            } catch (e) {
              reject(new Error(`Invalid JSON response: ${responseData}`));
            }
          }
        }
      });

      socket.on("error", (err) => {
        clearTimeout(connectionTimer);
        if (responseTimer) clearTimeout(responseTimer);
        if (!resolved) {
          resolved = true;
          reject(new Error(
            `BULC 연결 에러: ${err.message}. ` +
            `BULC 애플리케이션이 실행 중인지 확인하세요.`
          ));
        }
      });

      socket.on("close", () => {
        clearTimeout(connectionTimer);
        if (responseTimer) clearTimeout(responseTimer);
        if (!resolved) {
          resolved = true;
          reject(new Error("BULC 연결이 닫혔습니다."));
        }
      });

      // Connect
      socket.connect(this.port, this.host);
    });
  }

  async isConnected(): Promise<boolean> {
    try {
      const result = await this.sendCommand({ action: "ping", params: {} });
      return result.success === true;
    } catch {
      return false;
    }
  }
}

// Singleton instance
let clientInstance: BulcClient | null = null;

export function getBulcClient(): BulcClient {
  if (!clientInstance) {
    const port = process.env.BULC_PORT ? parseInt(process.env.BULC_PORT) : DEFAULT_PORT;
    clientInstance = new BulcClient(port);
  }
  return clientInstance;
}
