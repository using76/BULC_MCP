// Mesh Tools for BULC MCP Server
// Manage FDS computational mesh (grid) settings

import { z } from "zod";
import { getBulcClient } from "../bulc-client.js";

// Tool definitions
export const meshTools = [
  {
    name: "bulc_list_meshes",
    description:
      "Get a list of all FDS computational meshes. " +
      "Returns mesh IDs, dimensions, cell sizes, and bounding coordinates.",
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
    name: "bulc_create_mesh",
    description:
      "Create a new FDS computational mesh with specified dimensions and cell count. " +
      "The mesh defines the computational domain for fire simulation.",
    inputSchema: {
      type: "object" as const,
      properties: {
        meshId: {
          type: "string",
          description: "Mesh identifier. Default: MESH_1, MESH_2, etc.",
        },
        xMin: {
          type: "number",
          description: "Minimum X coordinate in meters",
        },
        xMax: {
          type: "number",
          description: "Maximum X coordinate in meters",
        },
        yMin: {
          type: "number",
          description: "Minimum Y coordinate in meters",
        },
        yMax: {
          type: "number",
          description: "Maximum Y coordinate in meters",
        },
        zMin: {
          type: "number",
          description: "Minimum Z coordinate in meters. Default: 0",
        },
        zMax: {
          type: "number",
          description: "Maximum Z coordinate in meters",
        },
        iCells: {
          type: "integer",
          description: "Number of cells in X direction",
        },
        jCells: {
          type: "integer",
          description: "Number of cells in Y direction",
        },
        kCells: {
          type: "integer",
          description: "Number of cells in Z direction",
        },
        cellSize: {
          type: "number",
          description: "Uniform cell size in meters (alternative to specifying cell counts). " +
            "If provided, cell counts will be calculated automatically.",
        },
      },
      required: ["xMin", "xMax", "yMin", "yMax", "zMax"],
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
    },
  },
  {
    name: "bulc_auto_mesh",
    description:
      "Automatically generate FDS mesh based on building geometry. " +
      "Creates optimized mesh covering all rooms and walls with specified resolution. " +
      "Can create single mesh or multiple meshes for multi-level buildings.",
    inputSchema: {
      type: "object" as const,
      properties: {
        cellSize: {
          type: "number",
          description: "Target cell size in meters. Default: 0.2 (20cm)",
        },
        padding: {
          type: "number",
          description: "Padding around geometry in meters. Default: 0.5",
        },
        heightAboveRoof: {
          type: "number",
          description: "Additional height above highest point in meters. Default: 1.0",
        },
        multiMesh: {
          type: "boolean",
          description: "Create separate meshes per floor level. Default: false (single mesh)",
        },
        maxCells: {
          type: "integer",
          description: "Maximum total cell count. Auto-adjusts cell size if exceeded. Default: 1000000",
        },
      },
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
    },
  },
  {
    name: "bulc_modify_mesh",
    description:
      "Modify an existing FDS mesh. Change dimensions, cell counts, or other properties.",
    inputSchema: {
      type: "object" as const,
      properties: {
        meshId: {
          type: "string",
          description: "Mesh ID to modify",
        },
        xMin: {
          type: "number",
          description: "New minimum X coordinate in meters",
        },
        xMax: {
          type: "number",
          description: "New maximum X coordinate in meters",
        },
        yMin: {
          type: "number",
          description: "New minimum Y coordinate in meters",
        },
        yMax: {
          type: "number",
          description: "New maximum Y coordinate in meters",
        },
        zMin: {
          type: "number",
          description: "New minimum Z coordinate in meters",
        },
        zMax: {
          type: "number",
          description: "New maximum Z coordinate in meters",
        },
        iCells: {
          type: "integer",
          description: "New number of cells in X direction",
        },
        jCells: {
          type: "integer",
          description: "New number of cells in Y direction",
        },
        kCells: {
          type: "integer",
          description: "New number of cells in Z direction",
        },
      },
      required: ["meshId"],
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
    },
  },
  {
    name: "bulc_delete_mesh",
    description: "Delete an FDS mesh by its ID.",
    inputSchema: {
      type: "object" as const,
      properties: {
        meshId: {
          type: "string",
          description: "Mesh ID to delete",
        },
      },
      required: ["meshId"],
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
    },
  },
];

// Input validation schemas
const CreateMeshSchema = z.object({
  meshId: z.string().optional(),
  xMin: z.number(),
  xMax: z.number(),
  yMin: z.number(),
  yMax: z.number(),
  zMin: z.number().optional(),
  zMax: z.number(),
  iCells: z.number().int().positive().optional(),
  jCells: z.number().int().positive().optional(),
  kCells: z.number().int().positive().optional(),
  cellSize: z.number().positive().optional(),
});

const AutoMeshSchema = z.object({
  cellSize: z.number().positive().optional(),
  padding: z.number().optional(),
  heightAboveRoof: z.number().optional(),
  multiMesh: z.boolean().optional(),
  maxCells: z.number().int().positive().optional(),
});

const ModifyMeshSchema = z.object({
  meshId: z.string(),
  xMin: z.number().optional(),
  xMax: z.number().optional(),
  yMin: z.number().optional(),
  yMax: z.number().optional(),
  zMin: z.number().optional(),
  zMax: z.number().optional(),
  iCells: z.number().int().positive().optional(),
  jCells: z.number().int().positive().optional(),
  kCells: z.number().int().positive().optional(),
});

const DeleteMeshSchema = z.object({
  meshId: z.string(),
});

// Handler function
export async function handleMeshTool(
  name: string,
  args: Record<string, unknown>
): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  const client = getBulcClient();

  try {
    let result;

    switch (name) {
      case "bulc_list_meshes": {
        result = await client.sendCommand({
          action: "list_meshes",
          params: {},
        });
        break;
      }

      case "bulc_create_mesh": {
        const validated = CreateMeshSchema.parse(args);
        result = await client.sendCommand({
          action: "create_mesh",
          params: validated,
        });
        break;
      }

      case "bulc_auto_mesh": {
        const validated = AutoMeshSchema.parse(args);
        result = await client.sendCommand({
          action: "auto_mesh",
          params: validated,
        });
        break;
      }

      case "bulc_modify_mesh": {
        const validated = ModifyMeshSchema.parse(args);
        result = await client.sendCommand({
          action: "modify_mesh",
          params: validated,
        });
        break;
      }

      case "bulc_delete_mesh": {
        const validated = DeleteMeshSchema.parse(args);
        result = await client.sendCommand({
          action: "delete_mesh",
          params: validated,
        });
        break;
      }

      default:
        throw new Error(`Unknown mesh tool: ${name}`);
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
