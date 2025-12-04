// Furniture Tools for BULC MCP Server
// Place and manage furniture items on the floor plan

import { z } from "zod";
import { getBulcClient } from "../bulc-client.js";

// Tool definitions
export const furnitureTools = [
  {
    name: "bulc_list_furniture_catalog",
    description:
      "Get a list of available furniture items from the catalog. " +
      "Use category filter to narrow down results. " +
      "Returns catalog IDs needed for bulc_place_furniture.",
    inputSchema: {
      type: "object" as const,
      properties: {
        category: {
          type: "string",
          description:
            "Filter by category (e.g., 'Seats', 'Tables', 'Beds', 'Doors', 'Windows', 'Lights')",
        },
        search: {
          type: "string",
          description: "Search by name (partial match)",
        },
        limit: {
          type: "integer",
          description: "Maximum number of results to return. Default: 20",
        },
      },
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
    },
  },
  {
    name: "bulc_place_furniture",
    description:
      "Place a furniture item at the specified position. " +
      "Get catalog IDs from bulc_list_furniture_catalog first. " +
      "All coordinates are in centimeters.",
    inputSchema: {
      type: "object" as const,
      properties: {
        catalogId: {
          type: "string",
          description: "Catalog ID from bulc_list_furniture_catalog",
        },
        x: {
          type: "number",
          description: "X coordinate in centimeters",
        },
        y: {
          type: "number",
          description: "Y coordinate in centimeters",
        },
        elevation: {
          type: "number",
          description: "Height from floor in centimeters. Default: 0",
        },
        angle: {
          type: "number",
          description: "Rotation angle in degrees (0-360). Default: 0",
        },
        width: {
          type: "number",
          description: "Custom width in centimeters (optional, overrides catalog)",
        },
        depth: {
          type: "number",
          description: "Custom depth in centimeters (optional, overrides catalog)",
        },
        height: {
          type: "number",
          description: "Custom height in centimeters (optional, overrides catalog)",
        },
        name: {
          type: "string",
          description: "Custom name for display",
        },
        level: {
          type: "integer",
          description: "Floor level index. Default: current level",
        },
      },
      required: ["catalogId", "x", "y"],
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
    },
  },
  {
    name: "bulc_list_furniture",
    description:
      "Get a list of all placed furniture with their IDs, positions, and properties. " +
      "Use the returned IDs for modify/delete operations.",
    inputSchema: {
      type: "object" as const,
      properties: {
        level: {
          type: "integer",
          description: "Filter by floor level index. Omit to list all.",
        },
        room: {
          type: "string",
          description: "Filter by room name or ID",
        },
        category: {
          type: "string",
          description: "Filter by furniture category",
        },
      },
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
    },
  },
  {
    name: "bulc_modify_furniture",
    description:
      "Modify properties of an existing furniture item. " +
      "Only specified properties will be changed. " +
      "Get furniture IDs from bulc_list_furniture.",
    inputSchema: {
      type: "object" as const,
      properties: {
        id: {
          type: "string",
          description: "Furniture ID to modify (from bulc_list_furniture)",
        },
        x: {
          type: "number",
          description: "New X coordinate (cm)",
        },
        y: {
          type: "number",
          description: "New Y coordinate (cm)",
        },
        elevation: {
          type: "number",
          description: "New elevation from floor (cm)",
        },
        angle: {
          type: "number",
          description: "New rotation angle (degrees)",
        },
        width: {
          type: "number",
          description: "New width (cm)",
        },
        depth: {
          type: "number",
          description: "New depth (cm)",
        },
        height: {
          type: "number",
          description: "New height (cm)",
        },
        name: {
          type: "string",
          description: "New display name",
        },
        visible: {
          type: "boolean",
          description: "Visibility state",
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
    name: "bulc_delete_furniture",
    description: "Delete a furniture item by its ID. Get furniture IDs from bulc_list_furniture.",
    inputSchema: {
      type: "object" as const,
      properties: {
        id: {
          type: "string",
          description: "Furniture ID to delete",
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
const ListCatalogSchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  limit: z.number().int().positive().optional(),
});

const PlaceFurnitureSchema = z.object({
  catalogId: z.string(),
  x: z.number(),
  y: z.number(),
  elevation: z.number().optional(),
  angle: z.number().optional(),
  width: z.number().positive().optional(),
  depth: z.number().positive().optional(),
  height: z.number().positive().optional(),
  name: z.string().optional(),
  level: z.number().int().optional(),
});

const ListFurnitureSchema = z.object({
  level: z.number().int().optional(),
  room: z.string().optional(),
  category: z.string().optional(),
});

const ModifyFurnitureSchema = z.object({
  id: z.string(),
  x: z.number().optional(),
  y: z.number().optional(),
  elevation: z.number().optional(),
  angle: z.number().optional(),
  width: z.number().positive().optional(),
  depth: z.number().positive().optional(),
  height: z.number().positive().optional(),
  name: z.string().optional(),
  visible: z.boolean().optional(),
});

const DeleteFurnitureSchema = z.object({
  id: z.string(),
});

// Handler function
export async function handleFurnitureTool(
  name: string,
  args: Record<string, unknown>
): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  const client = getBulcClient();

  try {
    let result;

    switch (name) {
      case "bulc_list_furniture_catalog": {
        const validated = ListCatalogSchema.parse(args);
        result = await client.sendCommand({
          action: "list_furniture_catalog",
          params: validated,
        });
        break;
      }

      case "bulc_place_furniture": {
        const validated = PlaceFurnitureSchema.parse(args);
        result = await client.sendCommand({
          action: "place_furniture",
          params: validated,
        });
        break;
      }

      case "bulc_list_furniture": {
        const validated = ListFurnitureSchema.parse(args);
        result = await client.sendCommand({
          action: "list_furniture",
          params: validated,
        });
        break;
      }

      case "bulc_modify_furniture": {
        const validated = ModifyFurnitureSchema.parse(args);
        result = await client.sendCommand({
          action: "modify_furniture",
          params: validated,
        });
        break;
      }

      case "bulc_delete_furniture": {
        const validated = DeleteFurnitureSchema.parse(args);
        result = await client.sendCommand({
          action: "delete_furniture",
          params: validated,
        });
        break;
      }

      default:
        throw new Error(`Unknown furniture tool: ${name}`);
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
