# BULC MCP Server

<p align="center">
  <img src="icon.png" alt="BULC Logo" width="200"/>
</p>

<p align="center">
  <strong>Drive the BULC fire &amp; evacuation simulator from Claude, in plain language</strong>
</p>

<p align="center">
  <a href="#what-you-can-do">What you can do</a> •
  <a href="#how-it-works">How it works</a> •
  <a href="#installation">Installation</a> •
  <a href="#examples">Examples</a> •
  <a href="#troubleshooting">Troubleshooting</a> •
  <a href="#privacy">Privacy</a>
</p>

---

## Overview

BULC MCP Server is a [Model Context Protocol](https://modelcontextprotocol.io) server that connects
Claude (Claude Desktop, Claude Code, or any MCP client) to the **BULC** desktop application —
Meteor Simulation's GPU-accelerated fire dynamics simulator with a 2D/3D building editor.

Describe what you want and Claude builds it in the app: rooms and walls, the computational mesh,
fire sources, detectors, sprinkler piping, HVAC ducts, evacuation agents, output slices — then
checks the deck and starts the run. Everything appears in the BULC window as it happens.

## What you can do

The server exposes **the app's own tool set** (200 tools as of BULC 0.79), so it covers what the
installed version of BULC covers:

| Area | Examples |
|---|---|
| **Geometry** | `add_obstacle`, `add_wall`, `add_floor`, `add_door`, `add_window`, `add_hole`, `transform_obstacle` (move/scale/rotate), `place_furniture`, `list_obstacles` |
| **Shape Studio** | `shape_add_box/cylinder/sphere/cone/torus/wedge/polygon_prism/revolve/arch`, `shape_boolean`, `shape_array`, `shape_mirror`, `shape_export_obst`, `shape_export_geom`, `shape_export_stl/obj` |
| **Mesh** | `set_mesh`, `set_mesh_cell_size`, `auto_fit_mesh`, `list_meshes`, `set_meshes`, `slice_mesh`, `merge_meshes`, `auto_multimesh`, `auto_cutcell_mesh` |
| **Settings** | `set_time`, `set_simulation_mode`, `set_turbulence_model`, `set_numerics` (CFL/VN/flux limiter), `set_ambient` (temperature, humidity, CO₂), `get_simulation_settings`, `add_raw_namelist` |
| **Output** | `set_chid`, `add_slcf`/`update_slcf`/`list_slcf`, `add_bndf`/`list_bndf`, `set_plot3d_outputs`, `update_dump_config`, `preview_fds` (see the deck without saving) |
| **Fire &amp; materials** | `add_fire`, `update_reaction`, `add_species`, `add_material`, `add_surface`, `assign_surface`, material/surface libraries |
| **Devices &amp; systems** | `add_heat_detector`, `add_smoke_detector`, `add_thermocouple`, `add_sprinkler`, `add_control`, `spr_*` (sprinkler piping &amp; hydraulics), `hvac_*` (ducts, diffusers, air handlers) |
| **Evacuation** | `evac_add_agent`, `evac_add_agents_batch`, `evac_add_stair`, `evac_add_waypoint`, `evac_add_journey`, `evac_update_setup` |
| **Run &amp; results** | `validate_project` (pre-flight check), `run_simulation`, `result_set_time`, `result_set_colormap`, `result_set_legend_range`, `result_set_particles` |

Run `bulc_connection_status` at any time to see whether the app is connected and how many tools it
is exposing.

## How it works

```
Claude  ──stdio(MCP)──▶  bulc-mcp-server  ──HTTP 127.0.0.1:8787──▶  BULC desktop app
                                                                     │
                                                    the app's own tool registry
                                                    (the same one its built-in
                                                     AI assistant uses)
                                                                     │
                                                              live 2D/3D editor,
                                                              FDS deck, GPU solver
```

The server holds **no model of its own**. It asks the running app for its tool list and forwards
calls to it, so:

- the tools you get always match the BULC version you have installed — upgrade the app and new
  tools appear without touching this server;
- argument validation, undo, and the project state all live in the app, exactly as when you use it
  by hand;
- the bridge listens on `127.0.0.1` only. Nothing is exposed to your network, and no project data
  leaves your machine.

If BULC is not running yet, the server still advertises a bundled snapshot of the tool list
(`src/tools-snapshot.json` — descriptions and schemas only), so Claude knows what is possible and
asks you to launch the app instead of claiming the feature does not exist.

## Installation

### Prerequisites

1. **BULC desktop app** — download from [Meteor Simulation](https://www.msimul.com)
2. **Node.js 18 or newer**
3. **Claude Desktop** (or any MCP client)

### Setup

```bash
git clone https://github.com/using76/BULC_MCP.git
cd BULC_MCP
npm install
npm run build
```

Add the server to your MCP client. Claude Desktop config file:

- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "bulc": {
      "command": "node",
      "args": ["<path-to-repo>/build/index.js"]
    }
  }
}
```

Restart Claude Desktop, then **launch BULC**. That is all — the bridge is on by default.

### Configuration

| Variable | Default | Purpose |
|---|---|---|
| `BULC_BRIDGE_PORT` | `8787` | Bridge port. Must match the app's `BULC_BRIDGE_PORT`. |
| `BULC_BRIDGE_HOST` | `127.0.0.1` | Bridge host. |
| `BULC_BRIDGE_URL` | — | Full base URL; overrides host and port. |

On the app side the bridge is enabled by default; `BULC_BRIDGE=0` turns it off.

## Examples

> "Build a 8 × 6 m room, 3 m high, with a door on the south wall."

> "Use 20 cm cells, then split the mesh at x = 4 and show me the mesh deck."

> "Put a 500 kW/m² fire on a 1 m² patch in the middle of the floor, polyurethane fuel."

> "Ambient temperature 25 °C, 55 % humidity, end time 120 seconds."

> "Add a temperature slice at y = 3 and a wall-temperature boundary output, dump every second."

> "Make the ceiling a half-round vault 3 m wide and export it as voxels."

> "Check the deck for problems, then run it on the GPU."

Claude will call `validate_project` before running and tell you about anything that would keep the
deck from running — a dangling `SURF_ID`, an output interval longer than the end time (which would
store only the t = 0 frame), a domain with no `OPEN` boundary, and so on.

## Troubleshooting

**"BULC 앱에 연결할 수 없습니다" / tools fail immediately**
The app is not running, or it is on a different port. Launch BULC and run `bulc_connection_status`.
If you changed the port in the app, set `BULC_BRIDGE_PORT` for the server too.

**Claude lists tools but says the feature is missing**
The tool list was taken from the bundled snapshot because BULC was not running when your client
connected. Launch BULC and restart the MCP client so it fetches the live list.

**A tool call is rejected with "Tool input error"**
That message comes from the app: it validates every argument against the tool's schema and names
what is missing, mistyped, or misspelled. Claude can usually fix it on the next attempt.

## Upgrading from v2.x

Versions up to 2.3 talked to the **legacy Java/SweetHome3D build of BULC** over a private TCP
protocol on port 19840, with their own hand-written tools (`bulc_create_room`, `bulc_create_wall`,
`bulc_list_levels`, …). Those tools and that protocol are gone — v3 targets the current BULC
desktop app and uses the app's own tool names (`add_obstacle`, `add_wall`, `set_mesh`, …). Remove
`BULC_PORT` from your MCP client config; it is no longer read.

## Privacy

This server runs entirely on your machine and talks only to `127.0.0.1`. See
[PRIVACY_POLICY.md](PRIVACY_POLICY.md).

## License

MIT — see [LICENSE](LICENSE).
