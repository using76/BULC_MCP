// Room Tools for BULC MCP Server

import { z } from "zod";
import { getBulcClient } from "../bulc-client.js";

// Tool definitions
export const roomTools = [
  {
    name: "bulc_create_room",
    description:
      "Create a new rectangular room at the specified position. " +
      "All coordinates are in centimeters (cm). " +
      "Use bulc_get_spatial_context first if you need to position relative to existing rooms. " +
      "Example: To create a 5m x 4m room, use width=500, depth=400.",
    inputSchema: {
      type: "object" as const,
      properties: {
        x: {
          type: "number",
          description: "X coordinate of bottom-left corner in centimeters",
        },
        y: {
          type: "number",
          description: "Y coordinate of bottom-left corner in centimeters",
        },
        width: {
          type: "number",
          description: "Room width in centimeters (X direction). 1m = 100cm",
        },
        depth: {
          type: "number",
          description: "Room depth in centimeters (Y direction). 1m = 100cm",
        },
        name: {
          type: "string",
          description: "Room name for display (e.g., 'Living Room', '거실')",
        },
        level: {
          type: "integer",
          description: "Floor level index. 0 = ground floor, 1 = first floor. Default: current level",
        },
      },
      required: ["x", "y", "width", "depth"],
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
    },
  },
  {
    name: "bulc_create_room_polygon",
    description:
      "Create a room with a custom polygon shape defined by an array of points. " +
      "Use this for non-rectangular rooms like L-shaped rooms. " +
      "All coordinates are in centimeters.",
    inputSchema: {
      type: "object" as const,
      properties: {
        points: {
          type: "array",
          description:
            "Array of [x, y] coordinate pairs defining the room polygon in centimeters. " +
            "Minimum 3 points required. Points should be in order (clockwise or counter-clockwise).",
          items: {
            type: "array",
            items: { type: "number" },
            minItems: 2,
            maxItems: 2,
          },
          minItems: 3,
        },
        name: {
          type: "string",
          description: "Room name for display",
        },
        level: {
          type: "integer",
          description: "Floor level index. Default: current level",
        },
      },
      required: ["points"],
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
    },
  },
  {
    name: "bulc_list_rooms",
    description:
      "Get a list of all rooms with their IDs, names, positions, and dimensions. " +
      "Use the returned IDs for modify/delete operations.",
    inputSchema: {
      type: "object" as const,
      properties: {
        level: {
          type: "integer",
          description: "Filter by floor level index. Omit to list all rooms.",
        },
      },
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
    },
  },
  {
    name: "bulc_modify_room",
    description:
      "Modify properties of an existing room. Only specified properties will be changed. " +
      "Get room IDs from bulc_list_rooms first.",
    inputSchema: {
      type: "object" as const,
      properties: {
        id: {
          type: "string",
          description: "Room ID to modify (from bulc_list_rooms)",
        },
        name: {
          type: "string",
          description: "New room name",
        },
        x: {
          type: "number",
          description: "New X coordinate of bottom-left corner (cm)",
        },
        y: {
          type: "number",
          description: "New Y coordinate of bottom-left corner (cm)",
        },
        width: {
          type: "number",
          description: "New width (cm)",
        },
        depth: {
          type: "number",
          description: "New depth (cm)",
        },
      },
      required: ["id"],
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
    },
  },
  {
    name: "bulc_delete_room",
    description: "Delete a room by its ID. Get room IDs from bulc_list_rooms.",
    inputSchema: {
      type: "object" as const,
      properties: {
        id: {
          type: "string",
          description: "Room ID to delete",
        },
      },
      required: ["id"],
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
    },
  },
];

// Input validation schemas
const CreateRoomSchema = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number().positive(),
  depth: z.number().positive(),
  name: z.string().optional(),
  level: z.number().int().optional(),
});

const CreateRoomPolygonSchema = z.object({
  points: z.array(z.tuple([z.number(), z.number()])).min(3),
  name: z.string().optional(),
  level: z.number().int().optional(),
});

const ListRoomsSchema = z.object({
  level: z.number().int().optional(),
});

const ModifyRoomSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  x: z.number().optional(),
  y: z.number().optional(),
  width: z.number().positive().optional(),
  depth: z.number().positive().optional(),
});

const DeleteRoomSchema = z.object({
  id: z.string(),
});

// Handler function
export async function handleRoomTool(
  name: string,
  args: Record<string, unknown>
): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  const client = getBulcClient();

  try {
    let result;

    switch (name) {
      case "bulc_create_room": {
        const validated = CreateRoomSchema.parse(args);
        result = await client.sendCommand({
          action: "create_room",
          params: validated,
        });
        break;
      }

      case "bulc_create_room_polygon": {
        const validated = CreateRoomPolygonSchema.parse(args);
        result = await client.sendCommand({
          action: "create_room_polygon",
          params: validated,
        });
        break;
      }

      case "bulc_list_rooms": {
        const validated = ListRoomsSchema.parse(args);
        result = await client.sendCommand({
          action: "list_rooms",
          params: validated,
        });
        break;
      }

      case "bulc_modify_room": {
        const validated = ModifyRoomSchema.parse(args);
        result = await client.sendCommand({
          action: "modify_room",
          params: validated,
        });
        break;
      }

      case "bulc_delete_room": {
        const validated = DeleteRoomSchema.parse(args);
        result = await client.sendCommand({
          action: "delete_room",
          params: validated,
        });
        break;
      }

      default:
        throw new Error(`Unknown room tool: ${name}`);
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
