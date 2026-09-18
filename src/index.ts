#!/usr/bin/env node
/**
 * BULC MCP Server — AI control of the BULC fire & evacuation simulator.
 *
 * This server is a thin bridge client: every domain tool is executed by the running BULC desktop
 * app through its local HTTP bridge, using the exact same tool registry the app's own AI assistant
 * uses. That is deliberate — it means this server always offers the installed app's full feature
 * set (geometry, Shape Studio, mesh, settings, output, fire, detectors, sprinkler, HVAC, EVAC,
 * results) and never drifts out of sync with it.
 *
 * Previous versions (≤2.3) spoke a private TCP protocol to the legacy Java/SweetHome3D build of
 * BULC and carried their own hand-written tool definitions; those tools no longer exist.
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  BulcNotRunningError,
  bridgeUrl,
  callTool,
  fetchSummary,
  health,
  startRun,
} from "./bridge-client.js";
import { loadCatalog, SNAPSHOT_TOOL_COUNT } from "./tool-catalog.js";

const VERSION = "3.0.0";

const server = new Server(
  { name: "bulc-mcp-server", version: VERSION },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  const catalog = await loadCatalog();
  console.error(
    `[bulc-mcp] tools/list → ${catalog.tools.length} tools ` +
      `(${catalog.live ? "live from BULC" : "bundled snapshot — BULC not running"})`,
  );
  return { tools: catalog.tools };
});

const text = (body: string, isError = false) => ({
  content: [{ type: "text" as const, text: body }],
  ...(isError ? { isError: true } : {}),
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;
  const args = (request.params.arguments ?? {}) as Record<string, unknown>;

  try {
    if (name === "bulc_connection_status") {
      const h = await health();
      if (!h?.ok) {
        return text(
          `BULC 앱에 연결되지 않았습니다.\n` +
            `- 브리지 주소: ${bridgeUrl()}\n` +
            `- 조치: BULC 데스크톱 앱을 실행하세요. 포트를 바꿨다면 BULC_BRIDGE_PORT 를 맞춰 주세요.\n` +
            `- 지금은 내장 스냅샷 도구 목록(${SNAPSHOT_TOOL_COUNT}종)만 보여 주고 있으며, 실제 호출은 앱이 떠야 동작합니다.`,
        );
      }
      return text(
        `BULC 앱 연결됨.\n- 브리지: ${bridgeUrl()}\n- 프로젝트 창: ${h.hasProject ? "있음" : "없음"}\n` +
          `- 앱이 노출하는 도구: ${h.toolCount ?? "?"}종`,
      );
    }

    if (name === "get_project_summary") {
      return text(JSON.stringify(await fetchSummary(), null, 2));
    }

    if (name === "run_simulation") {
      const r = await startRun(args.folder_name as string | undefined, args.solver_type as string | undefined);
      return text(
        `시뮬레이션을 시작했습니다.\n- 덱: ${r?.fdsPath ?? "(경로 없음)"}\n- 출력 폴더: ${r?.dir ?? "(폴더 없음)"}\n` +
          "진행 상황은 BULC 창의 실행 대시보드에서 확인할 수 있습니다.",
      );
    }

    // Everything else is executed by the app, which also validates the arguments against the
    // tool's own schema and answers with a specific error when they are wrong.
    const result = await callTool(name, args);
    const action = result.action
      ? `\n[action] ${result.action.type ?? ""}: ${result.action.summary ?? ""}`
      : "";
    return text(`${result.message ?? ""}${action}`);
  } catch (error) {
    if (error instanceof BulcNotRunningError) return text(error.message, true);
    const message = error instanceof Error ? error.message : String(error);
    return text(`Error executing ${name}: ${message}`, true);
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  // stdout carries the MCP protocol — every log line goes to stderr.
  const h = await health();
  console.error(`BULC MCP Server v${VERSION}`);
  console.error(`Bridge: ${bridgeUrl()}`);
  console.error(
    h?.ok
      ? `BULC 앱 연결됨 — 도구 ${h.toolCount ?? "?"}종 (프로젝트 창 ${h.hasProject ? "있음" : "없음"})`
      : `BULC 앱 미실행 — 내장 스냅샷 도구 ${SNAPSHOT_TOOL_COUNT}종을 목록으로 제공합니다. 앱을 실행하면 호출이 동작합니다.`,
  );
}

main().catch((error) => {
  console.error("Failed to start BULC MCP Server:", error);
  process.exit(1);
});
