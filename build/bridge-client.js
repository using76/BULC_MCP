// BULC bridge client — HTTP to the local BULC desktop app.
//
// BULC (the Electron desktop app) hosts a small HTTP bridge on 127.0.0.1 that exposes the very
// same tool registry its built-in AI assistant uses. This MCP server is a thin client of that
// bridge, which is why it always offers exactly the feature set of the installed app: geometry,
// Shape Studio, mesh, settings, output, fire, detectors, sprinkler (SPR), HVAC, EVAC, results.
//
//   GET  /health                                → { ok, hasProject, toolCount }
//   GET  /tools                                 → { tools: [{ name, description, inputSchema }] }
//   POST /call    { name, args }                → { message, action? }
//   POST /summary {}                            → { summary }
//   POST /run     { folder_name, solver_type }  → { ok, fdsPath, dir }
//
// The bridge binds to 127.0.0.1 only, so nothing outside this machine can reach it.
const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = 8787;
const HEALTH_TIMEOUT_MS = 1500;
const CALL_TIMEOUT_MS = 120_000;
/** Bridge base URL from the environment (BULC_BRIDGE_URL wins over BULC_BRIDGE_HOST/PORT). */
export function bridgeUrl() {
    const explicit = process.env.BULC_BRIDGE_URL?.trim();
    if (explicit)
        return explicit.replace(/\/+$/, "");
    const host = process.env.BULC_BRIDGE_HOST?.trim() || DEFAULT_HOST;
    const port = process.env.BULC_BRIDGE_PORT?.trim() || String(DEFAULT_PORT);
    return `http://${host}:${port}`;
}
export class BulcNotRunningError extends Error {
    constructor(detail) {
        super(`BULC 앱에 연결할 수 없습니다 (${bridgeUrl()}). ` +
            "BULC 데스크톱 앱을 실행한 뒤 다시 시도하세요. " +
            "포트를 바꿨다면 BULC_BRIDGE_PORT 환경변수를 맞춰 주세요." +
            (detail ? ` [${detail}]` : ""));
        this.name = "BulcNotRunningError";
    }
}
async function request(path, init, timeoutMs) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    let res;
    try {
        res = await fetch(`${bridgeUrl()}${path}`, { ...init, signal: controller.signal });
    }
    catch (err) {
        // ECONNREFUSED (app closed), abort (no answer) — both mean "the app is not there".
        throw new BulcNotRunningError(err instanceof Error ? err.message : String(err));
    }
    finally {
        clearTimeout(timer);
    }
    if (!res.ok) {
        const body = await res.text().catch(() => "");
        // 503 is the bridge's own "GUI window missing" answer — the app is starting or has no window.
        if (res.status === 503)
            throw new BulcNotRunningError(body || res.statusText);
        throw new Error(`BULC 브리지 오류 ${res.status}: ${body || res.statusText}`);
    }
    return res.json();
}
function post(path, body) {
    return request(path, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body ?? {}) }, CALL_TIMEOUT_MS);
}
/** Tool definitions of the running app. Throws BulcNotRunningError when it is not up. */
export async function fetchTools() {
    const data = await request("/tools", { method: "GET" }, HEALTH_TIMEOUT_MS * 4);
    const tools = Array.isArray(data?.tools) ? data.tools : [];
    return tools.filter((t) => t && typeof t.name === "string");
}
/** Run one tool against the live app. */
export async function callTool(name, args) {
    return post("/call", { name, args: args ?? {} });
}
/** Project summary (CHID, mesh, object counts). */
export async function fetchSummary() {
    const data = await post("/summary", {});
    return data?.summary ?? data;
}
/** Save the current project and start a simulation in the app. */
export async function startRun(folderName, solverType) {
    return post("/run", { folder_name: folderName, solver_type: solverType });
}
export async function health() {
    try {
        return await request("/health", { method: "GET" }, HEALTH_TIMEOUT_MS);
    }
    catch {
        return null;
    }
}
