// Context Tools for BULC MCP Server
// These tools provide information about the current state of the project

import { z } from "zod";
import { getBulcClient } from "../bulc-client.js";

// Tool definitions
export const contextTools = [
  {
    name: "bulc_get_spatial_context",
    description:
      "Get the current spatial layout of the project including all rooms, walls, levels, and their exact coordinates. " +
      "IMPORTANT: Call this first when you need to place elements relative to existing objects (e.g., 'next to the living room', 'above the kitchen'). " +
      "Returns bounds, room positions, wall positions, and level information. " +
      "Use this to calculate coordinates before calling create functions.",
    inputSchema: {
      type: "object" as const,
      properties: {
        level: {
          type: "integer",
          description: "Filter by floor level index. 0 = ground floor. Omit to get all levels.",
        },
      },
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
    },
  },
  {
    name: "bulc_get_home_info",
    description:
      "Get general information about the current project including file path, modification status, level count, room count, wall count, and furniture count.",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
    },
  },
  {
    name: "bulc_list_levels",
    description:
      "Get all floor levels with their names, elevations (height from ground), and floor heights (ceiling height).",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
    },
  },
  {
    name: "bulc_create_level",
    description:
      "Create a new floor level. Elevation is the height from ground (Z=0) to the floor surface in centimeters.",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description: "Level name (e.g., '2층', 'Second Floor', '지하')",
        },
        elevation: {
          type: "number",
          description: "Floor elevation in cm from ground. If omitted, placed above highest existing level. Use negative for basement.",
        },
        floorHeight: {
          type: "number",
          description: "Floor-to-ceiling height in cm. Default: 280",
        },
      },
      required: ["name"],
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
    },
  },
  {
    name: "bulc_set_current_level",
    description:
      "Set which floor level is currently active for editing. New rooms/walls will be created on this level by default.",
    inputSchema: {
      type: "object" as const,
      properties: {
        level: {
          type: "integer",
          description: "Level index to set as current (0 = ground floor, 1 = first floor, etc.)",
        },
      },
      required: ["level"],
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
    },
  },
  {
    name: "bulc_undo",
    description: "Undo the last operation. Returns information about what was undone.",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
    },
  },
  {
    name: "bulc_redo",
    description: "Redo the last undone operation. Returns information about what was redone.",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
    },
  },
  {
    name: "bulc_save",
    description: "Save the current project to file.",
    inputSchema: {
      type: "object" as const,
      properties: {
        path: {
          type: "string",
          description: "File path to save to. If omitted, saves to current file (overwrites).",
        },
      },
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
    },
  },
];

// Input validation schemas
const GetSpatialContextSchema = z.object({
  level: z.number().int().optional(),
});

const CreateLevelSchema = z.object({
  name: z.string(),
  elevation: z.number().optional(),
  floorHeight: z.number().positive().optional(),
});

const SetCurrentLevelSchema = z.object({
  level: z.number().int().min(0),
});

const SaveSchema = z.object({
  path: z.string().optional(),
});

// Handler function
export async function handleContextTool(
  name: string,
  args: Record<string, unknown>
): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  const client = getBulcClient();

  try {
    let result;

    switch (name) {
      case "bulc_get_spatial_context": {
        const validated = GetSpatialContextSchema.parse(args);
        result = await client.sendCommand({
          action: "get_spatial_context",
          params: validated,
        });
        break;
      }

      case "bulc_get_home_info": {
        result = await client.sendCommand({
          action: "get_home_info",
          params: {},
        });
        break;
      }

      case "bulc_list_levels": {
        result = await client.sendCommand({
          action: "list_levels",
          params: {},
        });
        break;
      }

      case "bulc_create_level": {
        const validated = CreateLevelSchema.parse(args);
        result = await client.sendCommand({
          action: "create_level",
          params: validated,
        });
        break;
      }

      case "bulc_set_current_level": {
        const validated = SetCurrentLevelSchema.parse(args);
        result = await client.sendCommand({
          action: "set_current_level",
          params: validated,
        });
        break;
      }

      case "bulc_undo": {
        result = await client.sendCommand({
          action: "undo",
          params: {},
        });
        break;
      }

      case "bulc_redo": {
        result = await client.sendCommand({
          action: "redo",
          params: {},
        });
        break;
      }

      case "bulc_save": {
        const validated = SaveSchema.parse(args);
        result = await client.sendCommand({
          action: "save",
          params: validated,
        });
        break;
      }

      default:
        throw new Error(`Unknown context tool: ${name}`);
    }

    if (result.success) {
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    } else {
      return {
        content: [{ type: "text", text: result.error || "Operation failed" }],
        isError: true,
      };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      content: [{ type: "text", text: `Error: ${message}` }],
      isError: true,
    };
  }
}
