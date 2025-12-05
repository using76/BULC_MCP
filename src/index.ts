#!/usr/bin/env node

// BULC MCP Server - Main Entry Point
// Connects Claude Desktop to BULC application for building design automation
// Version 2.3 - Full feature set including FDS, Mesh, Simulation, Results, and EVAC with advanced features

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Import all tool modules
import { roomTools, handleRoomTool } from "./tools/room.js";
import { wallTools, handleWallTool } from "./tools/wall.js";
import { contextTools, handleContextTool } from "./tools/context.js";
import { furnitureTools, handleFurnitureTool } from "./tools/furniture.js";
import { fdsDataTools, handleFdsDataTool } from "./tools/fds-data.js";
import { meshTools, handleMeshTool } from "./tools/mesh.js";
import { simulationTools, handleSimulationTool } from "./tools/simulation.js";
import { fdsRunTools, handleFdsRunTool } from "./tools/fds-run.js";
import { resultTools, handleResultTool } from "./tools/result.js";
import { evacTools, handleEvacTool } from "./tools/evac.js";

// Create server instance
const server = new Server(
  {
    name: "bulc-mcp-server",
    version: "2.3.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Combine all tools
const allTools = [
  ...contextTools,      // 8 tools: spatial context, home info, levels, undo/redo, save
  ...roomTools,         // 5 tools: create, create_polygon, list, modify, delete
  ...wallTools,         // 5 tools: create, create_rectangle, list, modify, delete
  ...furnitureTools,    // 5 tools: catalog, place, list, modify, delete
  ...fdsDataTools,      // 7 tools: get, fire_source, detector, sprinkler, hvac, thermocouple, clear
  ...meshTools,         // 5 tools: list, create, auto, modify, delete
  ...simulationTools,   // 4 tools: get_settings, time, output, ambient
  ...fdsRunTools,       // 6 tools: preview, validate, export, run, status, stop
  ...resultTools,       // 5 tools: open_viewer, list_datasets, point_data, aset, report
  ...evacTools,         // 25 tools: setup, stairs, agents, run, results, advanced features
];

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: allTools,
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const safeArgs = (args ?? {}) as Record<string, unknown>;

  try {
    // Route to appropriate handler based on tool name prefix/pattern

    // Room tools
    if (name.startsWith("bulc_") && name.includes("room")) {
      return await handleRoomTool(name, safeArgs);
    }

    // Wall tools
    if (name.startsWith("bulc_") && name.includes("wall")) {
      return await handleWallTool(name, safeArgs);
    }

    // Furniture tools
    if (name.startsWith("bulc_") && name.includes("furniture")) {
      return await handleFurnitureTool(name, safeArgs);
    }

    // FDS Data tools (fire source, detectors, sprinklers, HVAC, thermocouples)
    if (
      name === "bulc_get_fds_data" ||
      name === "bulc_set_fds_fire_source" ||
      name === "bulc_set_fds_detector" ||
      name === "bulc_set_fds_sprinkler" ||
      name === "bulc_set_fds_hvac" ||
      name === "bulc_set_fds_thermocouple" ||
      name === "bulc_clear_fds_data"
    ) {
      return await handleFdsDataTool(name, safeArgs);
    }

    // Mesh tools
    if (name.startsWith("bulc_") && name.includes("mesh")) {
      return await handleMeshTool(name, safeArgs);
    }

    // Simulation settings tools
    if (
      name === "bulc_get_simulation_settings" ||
      name === "bulc_set_simulation_time" ||
      name === "bulc_set_output_settings" ||
      name === "bulc_set_ambient"
    ) {
      return await handleSimulationTool(name, safeArgs);
    }

    // FDS Run tools (preview, validate, export, run, status, stop)
    if (
      name === "bulc_preview_fds" ||
      name === "bulc_validate_fds" ||
      name === "bulc_export_fds" ||
      name === "bulc_run_fds" ||
      name === "bulc_get_fds_status" ||
      name === "bulc_stop_fds"
    ) {
      return await handleFdsRunTool(name, safeArgs);
    }

    // Result viewing tools
    if (
      name === "bulc_open_result_viewer" ||
      name === "bulc_list_result_datasets" ||
      name === "bulc_get_point_data" ||
      name === "bulc_run_aset_analysis" ||
      name === "bulc_generate_report"
    ) {
      return await handleResultTool(name, safeArgs);
    }

    // EVAC tools
    if (name.startsWith("bulc_") && name.includes("evac")) {
      return await handleEvacTool(name, safeArgs);
    }
    // Also handle agent_properties, rset_report, exit_assignment, premovement, fire_coupling as EVAC tools
    if (
      name === "bulc_set_agent_properties" ||
      name === "bulc_generate_rset_report" ||
      name === "bulc_save_evac_result" ||
      name === "bulc_set_exit_assignment" ||
      name === "bulc_set_premovement_time" ||
      name === "bulc_set_fire_coupling"
    ) {
      return await handleEvacTool(name, safeArgs);
    }

    // Context tools (get_spatial_context, get_home_info, levels, undo, redo, save)
    if (
      name === "bulc_get_spatial_context" ||
      name === "bulc_get_home_info" ||
      name === "bulc_list_levels" ||
      name === "bulc_create_level" ||
      name === "bulc_set_current_level" ||
      name === "bulc_undo" ||
      name === "bulc_redo" ||
      name === "bulc_save"
    ) {
      return await handleContextTool(name, safeArgs);
    }

    // Unknown tool
    return {
      content: [
        {
          type: "text",
          text: `Unknown tool: ${name}. Available tools: ${allTools.map((t) => t.name).join(", ")}`,
        },
      ],
      isError: true,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: "text",
          text: `Error executing ${name}: ${message}`,
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  // Log to stderr (stdout is used for MCP communication)
  console.error("BULC MCP Server v2.3 started");
  console.error(`Available tools: ${allTools.length}`);
  console.error("Tool categories:");
  console.error(`  - Context: ${contextTools.length} tools`);
  console.error(`  - Room: ${roomTools.length} tools`);
  console.error(`  - Wall: ${wallTools.length} tools`);
  console.error(`  - Furniture: ${furnitureTools.length} tools`);
  console.error(`  - FDS Data: ${fdsDataTools.length} tools`);
  console.error(`  - Mesh: ${meshTools.length} tools`);
  console.error(`  - Simulation: ${simulationTools.length} tools`);
  console.error(`  - FDS Run: ${fdsRunTools.length} tools`);
  console.error(`  - Results: ${resultTools.length} tools`);
  console.error(`  - EVAC: ${evacTools.length} tools`);
  console.error(`Connecting to BULC on port ${process.env.BULC_PORT || 19840}`);
}

main().catch((error) => {
  console.error("Failed to start BULC MCP Server:", error);
  process.exit(1);
});
