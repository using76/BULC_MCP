// Wall Tools for BULC MCP Server

import { z } from "zod";
import { getBulcClient } from "../bulc-client.js";

// Tool definitions
export const wallTools = [
  {
    name: "bulc_create_wall",
    description:
      "Create a wall segment between two points. " +
      "All coordinates are in centimeters. " +
      "For rectangular rooms, consider using bulc_create_walls_rectangle instead.",
    inputSchema: {
      type: "object" as const,
      properties: {
        xStart: {
          type: "number",
          description: "X coordinate of wall start point (cm)",
        },
        yStart: {
          type: "number",
          description: "Y coordinate of wall start point (cm)",
        },
        xEnd: {
          type: "number",
          description: "X coordinate of wall end point (cm)",
        },
        yEnd: {
          type: "number",
          description: "Y coordinate of wall end point (cm)",
        },
        thickness: {
          type: "number",
          description: "Wall thickness in centimeters. Default: 10",
        },
        height: {
          type: "number",
          description: "Wall height in centimeters. Default: 250",
        },
        level: {
          type: "integer",
          description: "Floor level index. Default: current level",
        },
      },
      required: ["xStart", "yStart", "xEnd", "yEnd"],
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
    },
  },
  {
    name: "bulc_create_walls_rectangle",
    description:
      "Create 4 connected walls forming a rectangular enclosure. " +
      "This is the recommended way to create walls for rectangular rooms. " +
      "All coordinates are in centimeters.",
    inputSchema: {
      type: "object" as const,
      properties: {
        x: {
          type: "number",
          description: "X coordinate of bottom-left corner (cm)",
        },
        y: {
          type: "number",
          description: "Y coordinate of bottom-left corner (cm)",
        },
        width: {
          type: "number",
          description: "Rectangle width in centimeters",
        },
        depth: {
          type: "number",
          description: "Rectangle depth in centimeters",
        },
        thickness: {
          type: "number",
          description: "Wall thickness in centimeters. Default: 10",
        },
        height: {
          type: "number",
          description: "Wall height in centimeters. Default: 250",
        },
        level: {
          type: "integer",
          description: "Floor level index. Default: current level",
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
    name: "bulc_list_walls",
    description:
      "Get a list of all walls with their IDs, coordinates, thickness, and height. " +
      "Use the returned IDs for modify/delete operations.",
    inputSchema: {
      type: "object" as const,
      properties: {
        level: {
          type: "integer",
          description: "Filter by floor level index. Omit to list all.",
        },
      },
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
    },
  },
  {
    name: "bulc_modify_wall",
    description:
      "Modify properties of an existing wall. Only specified properties will be changed. " +
      "Get wall IDs from bulc_list_walls.",
    inputSchema: {
      type: "object" as const,
      properties: {
        id: {
          type: "string",
          description: "Wall ID to modify (from bulc_list_walls)",
        },
        xStart: { type: "number", description: "New start X (cm)" },
        yStart: { type: "number", description: "New start Y (cm)" },
        xEnd: { type: "number", description: "New end X (cm)" },
        yEnd: { type: "number", description: "New end Y (cm)" },
        thickness: { type: "number", description: "New thickness (cm)" },
        height: { type: "number", description: "New height (cm)" },
      },
      required: ["id"],
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
    },
  },
  {
    name: "bulc_delete_wall",
    description: "Delete a wall by its ID. Get wall IDs from bulc_list_walls.",
    inputSchema: {
      type: "object" as const,
      properties: {
        id: {
          type: "string",
          description: "Wall ID to delete",
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
const CreateWallSchema = z.object({
  xStart: z.number(),
  yStart: z.number(),
  xEnd: z.number(),
  yEnd: z.number(),
  thickness: z.number().positive().optional(),
  height: z.number().positive().optional(),
  level: z.number().int().optional(),
});

const CreateWallsRectangleSchema = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number().positive(),
  depth: z.number().positive(),
  thickness: z.number().positive().optional(),
  height: z.number().positive().optional(),
  level: z.number().int().optional(),
});

const ListWallsSchema = z.object({
  level: z.number().int().optional(),
});

const ModifyWallSchema = z.object({
  id: z.string(),
  xStart: z.number().optional(),
  yStart: z.number().optional(),
  xEnd: z.number().optional(),
  yEnd: z.number().optional(),
  thickness: z.number().positive().optional(),
  height: z.number().positive().optional(),
});

const DeleteWallSchema = z.object({
  id: z.string(),
});

// Handler function
export async function handleWallTool(
  name: string,
  args: Record<string, unknown>
): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  const client = getBulcClient();

  try {
    let result;

    switch (name) {
      case "bulc_create_wall": {
        const validated = CreateWallSchema.parse(args);
        result = await client.sendCommand({
          action: "create_wall",
          params: validated,
        });
        break;
      }

      case "bulc_create_walls_rectangle": {
        const validated = CreateWallsRectangleSchema.parse(args);
        result = await client.sendCommand({
          action: "create_walls_rectangle",
          params: validated,
        });
        break;
      }

      case "bulc_list_walls": {
        const validated = ListWallsSchema.parse(args);
        result = await client.sendCommand({
          action: "list_walls",
          params: validated,
        });
        break;
      }

      case "bulc_modify_wall": {
        const validated = ModifyWallSchema.parse(args);
        result = await client.sendCommand({
          action: "modify_wall",
          params: validated,
        });
        break;
      }

      case "bulc_delete_wall": {
        const validated = DeleteWallSchema.parse(args);
        result = await client.sendCommand({
          action: "delete_wall",
          params: validated,
        });
        break;
      }

      default:
        throw new Error(`Unknown wall tool: ${name}`);
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
