// Smoke test — runs the built server against a stub BULC bridge.
//
// It checks the two states that actually matter in practice:
//   (a) BULC is not running  → tools/list still returns the bundled snapshot, calls fail with a
//       clear "launch BULC" message instead of a stack trace;
//   (b) BULC is running      → tools/list comes from the app and tool calls are forwarded verbatim.
//
//   node test/smoke.mjs          (after npm run build)
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import http from "node:http";

let fails = 0;
const ok = (cond, msg) => { console.log(`${cond ? "  PASS" : "  FAIL"}  ${msg}`); if (!cond) fails++; };

const readBody = (req) => new Promise((resolve) => {
  let b = ""; req.on("data", (c) => { b += c; }); req.on("end", () => resolve(b ? JSON.parse(b) : {}));
});

/** Minimal stand-in for the app's bridge host. */
function startStubBridge() {
  const calls = [];
  const server = http.createServer(async (req, res) => {
    res.setHeader("content-type", "application/json");
    if (req.method === "GET" && req.url === "/health") {
      return res.end(JSON.stringify({ ok: true, hasProject: true, toolCount: 2 }));
    }
    if (req.method === "GET" && req.url === "/tools") {
      return res.end(JSON.stringify({
        tools: [
          { name: "set_mesh", description: "live set_mesh", inputSchema: { type: "object", properties: {} } },
          { name: "brand_new_tool", description: "only exists in the running app", inputSchema: { type: "object", properties: {} } },
        ],
      }));
    }
    const body = await readBody(req);
    if (req.url === "/call") {
      calls.push(body);
      return res.end(JSON.stringify({ message: `applied ${body.name}`, action: null }));
    }
    if (req.url === "/summary") return res.end(JSON.stringify({ summary: { chid: "stub", counts: { obstacles: 3 } } }));
    if (req.url === "/run") return res.end(JSON.stringify({ ok: true, fdsPath: "C:/x/stub.fds", dir: "C:/x" }));
    res.statusCode = 404; res.end("{}");
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve({ server, calls, port: server.address().port }));
  });
}

async function connect(env) {
  const transport = new StdioClientTransport({
    command: "node", args: ["build/index.js"],
    env: { ...process.env, ...env },
  });
  const client = new Client({ name: "smoke", version: "1" });
  await client.connect(transport);
  return client;
}
const callText = async (client, name, args = {}) => {
  const r = await client.callTool({ name, arguments: args });
  return { text: r.content?.[0]?.text ?? "", isError: !!r.isError };
};

console.log("=== (a) BULC 미실행 — 스냅샷 폴백 ===");
{
  // 포트 1 은 특권 포트라 절대 열려 있지 않다 → "앱 없음" 상태를 확실히 만든다
  const client = await connect({ BULC_BRIDGE_URL: "http://127.0.0.1:1" });
  const { tools } = await client.listTools();
  ok(tools.length > 190, `스냅샷 도구 ${tools.length}종 노출 (빈 목록이면 클라이언트가 "기능 없음"이라 답한다)`);
  for (const n of ["set_mesh", "auto_multimesh", "preview_fds", "validate_project", "transform_obstacle",
    "set_ambient", "get_simulation_settings", "add_slcf", "shape_add_arch", "evac_add_agent", "spr_add_pipe", "hvac_add_duct"]) {
    ok(tools.some((t) => t.name === n), `  ${n} 포함`);
  }
  ok(tools.some((t) => t.name === "bulc_connection_status"), "  bulc_connection_status(로컬) 포함");
  const status = await callText(client, "bulc_connection_status");
  ok(/연결되지 않았습니다/.test(status.text), `연결 상태를 그대로 보고 — ${status.text.split("\n")[0]}`);
  const call = await callText(client, "set_mesh", { ni: 10, nj: 10, nk: 10 });
  ok(call.isError && /BULC 데스크톱 앱을 실행/.test(call.text), `호출은 안내 메시지로 실패 — ${call.text.slice(0, 70)}`);
  await client.close();
}

console.log("\n=== (b) BULC 실행 중 — 라이브 도구 + 포워딩 ===");
{
  const { server, calls, port } = await startStubBridge();
  const client = await connect({ BULC_BRIDGE_URL: `http://127.0.0.1:${port}` });
  const { tools } = await client.listTools();
  ok(tools.some((t) => t.name === "brand_new_tool"),
    "앱에만 있는 새 도구가 그대로 노출된다 (공개 레포 재빌드 없이 기능이 따라온다)");
  ok(tools.find((t) => t.name === "set_mesh")?.description === "live set_mesh",
    "같은 이름은 라이브 정의가 스냅샷을 이긴다");
  ok(tools.filter((t) => t.name === "get_project_summary").length === 1, "로컬 도구가 중복되지 않는다");

  const r = await callText(client, "set_mesh", { ni: 40, nj: 30, nk: 20 });
  ok(!r.isError && r.text.includes("applied set_mesh"), `도구 호출 포워딩 — ${r.text}`);
  ok(calls.length === 1 && calls[0].args.ni === 40, "인자가 그대로 전달된다 (검증은 앱이 한다)");

  const sum = await callText(client, "get_project_summary");
  ok(/"chid": "stub"/.test(sum.text), "get_project_summary → /summary");
  const run = await callText(client, "run_simulation", { folder_name: "case1" });
  ok(/stub\.fds/.test(run.text), "run_simulation → /run");
  const status = await callText(client, "bulc_connection_status");
  ok(/연결됨/.test(status.text), `연결 상태 보고 — ${status.text.split("\n")[0]}`);

  await client.close();
  server.close();
}

console.log(`\n=== 결과: ${fails === 0 ? "전부 통과" : `실패 ${fails}건`} ===`);
process.exit(fails === 0 ? 0 : 1);
