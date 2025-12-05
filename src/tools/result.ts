// Result Viewing Tools for BULC MCP Server
// View and analyze FDS simulation results

import { z } from "zod";
import { getBulcClient } from "../bulc-client.js";

// Tool definitions
export const resultTools = [
  {
    name: "bulc_open_result_viewer",
    description:
      "Open the FDS result viewer window. " +
      "Loads simulation results from the specified SMV file or last simulation.",
    inputSchema: {
      type: "object" as const,
      properties: {
        smvPath: {
          type: "string",
          description: "Path to .smv file. Default: auto-detect from last simulation",
        },
        loadGeometry: {
          type: "boolean",
          description: "Load 3D geometry (OBJ file). Default: true",
        },
      },
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
    },
  },
  {
    name: "bulc_list_result_datasets",
    description:
      "List available datasets in the loaded FDS results. " +
      "Returns slices, smoke3d volumes, Plot3D, devices, and other data types.",
    inputSchema: {
      type: "object" as const,
      properties: {
        type: {
          type: "string",
          description: "Filter by data type: 'slice', 'smoke3d', 'plot3d', 'device', 'all'. Default: all",
          enum: ["slice", "smoke3d", "plot3d", "device", "all"],
        },
      },
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
    },
  },
  {
    name: "bulc_get_point_data",
    description:
      "Extract time-series data at a specific point in the simulation domain. " +
      "Useful for getting temperature, visibility, or species concentration at a location.",
    inputSchema: {
      type: "object" as const,
      properties: {
        x: {
          type: "number",
          description: "X coordinate in meters",
        },
        y: {
          type: "number",
          description: "Y coordinate in meters",
        },
        z: {
          type: "number",
          description: "Z coordinate in meters",
        },
        variable: {
          type: "string",
          description: "Variable to extract: 'temp', 'visibility', 'co', 'co2', 'o2', 'velocity'",
          enum: ["temp", "visibility", "co", "co2", "o2", "velocity"],
        },
        dataSource: {
          type: "string",
          description: "Data source: 'plot3d' or 'slice'. Default: plot3d",
          enum: ["plot3d", "slice"],
        },
      },
      required: ["x", "y", "z", "variable"],
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
    },
  },
  {
    name: "bulc_run_aset_analysis",
    description:
      "Run ASET (Available Safe Egress Time) analysis at a specified exit location. " +
      "Evaluates safety criteria: temperature <60C, visibility >5m, CO <1400ppm, CO2 <5%, O2 >15%.",
    inputSchema: {
      type: "object" as const,
      properties: {
        exitX: {
          type: "number",
          description: "Exit X coordinate in meters",
        },
        exitY: {
          type: "number",
          description: "Exit Y coordinate in meters",
        },
        exitZ: {
          type: "number",
          description: "Exit Z coordinate in meters. Default: 1.8 (breathing height)",
        },
        criteria: {
          type: "object",
          description: "Custom safety criteria (optional)",
          properties: {
            maxTemperature: {
              type: "number",
              description: "Max safe temperature in Celsius. Default: 60",
            },
            minVisibility: {
              type: "number",
              description: "Min visibility in meters. Default: 5",
            },
            maxCo: {
              type: "number",
              description: "Max CO in ppm. Default: 1400",
            },
            maxCo2: {
              type: "number",
              description: "Max CO2 in percent. Default: 5",
            },
            minO2: {
              type: "number",
              description: "Min O2 in percent. Default: 15",
            },
          },
        },
      },
      required: ["exitX", "exitY"],
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
    },
  },
  {
    name: "bulc_generate_report",
    description:
      "Generate an analysis report from FDS simulation results. " +
      "Supports ASET, RSET, and combined safety analysis reports.",
    inputSchema: {
      type: "object" as const,
      properties: {
        reportType: {
          type: "string",
          description: "Report type: 'aset', 'rset', 'combined'. Default: aset",
          enum: ["aset", "rset", "combined"],
        },
        outputPath: {
          type: "string",
          description: "Output directory for report. Default: same as results",
        },
        language: {
          type: "string",
          description: "Report language: 'EN', 'KO', 'JP', 'CN'. Default: EN",
          enum: ["EN", "KO", "JP", "CN"],
        },
        includeGraphs: {
          type: "boolean",
          description: "Include time-series graphs. Default: true",
        },
        includeSlices: {
          type: "boolean",
          description: "Include slice visualizations. Default: true",
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
const OpenResultViewerSchema = z.object({
  smvPath: z.string().optional(),
  loadGeometry: z.boolean().optional(),
});

const ListResultDatasetsSchema = z.object({
  type: z.enum(["slice", "smoke3d", "plot3d", "device", "all"]).optional(),
});

const GetPointDataSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
  variable: z.enum(["temp", "visibility", "co", "co2", "o2", "velocity"]),
  dataSource: z.enum(["plot3d", "slice"]).optional(),
});

const RunAsetAnalysisSchema = z.object({
  exitX: z.number(),
  exitY: z.number(),
  exitZ: z.number().optional(),
  criteria: z.object({
    maxTemperature: z.number().optional(),
    minVisibility: z.number().positive().optional(),
    maxCo: z.number().positive().optional(),
    maxCo2: z.number().positive().optional(),
    minO2: z.number().positive().optional(),
  }).optional(),
});

const GenerateReportSchema = z.object({
  reportType: z.enum(["aset", "rset", "combined"]).optional(),
  outputPath: z.string().optional(),
  language: z.enum(["EN", "KO", "JP", "CN"]).optional(),
  includeGraphs: z.boolean().optional(),
  includeSlices: z.boolean().optional(),
});

// Handler function
export async function handleResultTool(
  name: string,
  args: Record<string, unknown>
): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  const client = getBulcClient();

  try {
    let result;

    switch (name) {
      case "bulc_open_result_viewer": {
        const validated = OpenResultViewerSchema.parse(args);
        result = await client.sendCommand({
          action: "open_result_viewer",
          params: validated,
        });
        break;
      }

      case "bulc_list_result_datasets": {
        const validated = ListResultDatasetsSchema.parse(args);
        result = await client.sendCommand({
          action: "list_result_datasets",
          params: validated,
        });
        break;
      }

      case "bulc_get_point_data": {
        const validated = GetPointDataSchema.parse(args);
        result = await client.sendCommand({
          action: "get_point_data",
          params: validated,
        });
        break;
      }

      case "bulc_run_aset_analysis": {
        const validated = RunAsetAnalysisSchema.parse(args);
        result = await client.sendCommand({
          action: "run_aset_analysis",
          params: validated,
        });
        break;
      }

      case "bulc_generate_report": {
        const validated = GenerateReportSchema.parse(args);
        result = await client.sendCommand({
          action: "generate_report",
          params: validated,
        });
        break;
      }

      default:
        throw new Error(`Unknown result tool: ${name}`);
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
