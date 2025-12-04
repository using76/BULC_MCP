#!/usr/bin/env node

// BULC MCP Server - Main Entry Point
// Connects Claude Desktop to BULC application for building design automation

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { roomTools, handleRoomTool } from "./tools/room.js";
import { wallTools, handleWallTool } from "./tools/wall.js";
import { contextTools, handleContextTool } from "./tools/context.js";
import { furnitureTools, handleFurnitureTool } from "./tools/furniture.js";

// Create server instance
const server = new Server(
  {
    name: "bulc-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Combine all tools
const allTools = [...contextTools, ...roomTools, ...wallTools, ...furnitureTools];

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
    // Route to appropriate handler based on tool name
    if (name.startsWith("bulc_") && name.includes("room")) {
      return await handleRoomTool(name, safeArgs);
    }

    if (name.startsWith("bulc_") && name.includes("wall")) {
      return await handleWallTool(name, safeArgs);
    }

    // Furniture tools
    if (name.startsWith("bulc_") && name.includes("furniture")) {
      return await handleFurnitureTool(name, safeArgs);
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
  console.error("BULC MCP Server started");
  console.error(`Available tools: ${allTools.length}`);
  console.error(`Connecting to BULC on port ${process.env.BULC_PORT || 19840}`);
}

main().catch((error) => {
  console.error("Failed to start BULC MCP Server:", error);
  process.exit(1);
});
