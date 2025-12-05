// FDS Data Tools for BULC MCP Server
// Manage FDS (Fire Dynamics Simulator) properties on furniture items

import { z } from "zod";
import { getBulcClient } from "../bulc-client.js";

// Tool definitions
export const fdsDataTools = [
  {
    name: "bulc_get_fds_data",
    description:
      "Get FDS configuration for a furniture item. " +
      "Returns the FDS category (fire source, detector, sprinkler, HVAC, thermocouple) " +
      "and its configuration parameters.",
    inputSchema: {
      type: "object" as const,
      properties: {
        furnitureId: {
          type: "string",
          description: "Furniture ID to get FDS data from (from bulc_list_furniture)",
        },
      },
      required: ["furnitureId"],
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
    },
  },
  {
    name: "bulc_set_fds_fire_source",
    description:
      "Configure a furniture item as an FDS fire source. " +
      "Supports HRRPUA (Heat Release Rate Per Unit Area) mode with time-based ramping. " +
      "The fire will use the furniture's surface area for HRR calculations.",
    inputSchema: {
      type: "object" as const,
      properties: {
        furnitureId: {
          type: "string",
          description: "Furniture ID to configure as fire source",
        },
        hrrpua: {
          type: "number",
          description: "Heat Release Rate Per Unit Area in kW/m². Default: 500",
        },
        surfaceId: {
          type: "string",
          description: "Custom surface ID. Default: auto-generated",
        },
        color: {
          type: "string",
          description: "Surface color. Options: RED, ORANGE, YELLOW. Default: RED",
        },
        ramp: {
          type: "array",
          description: "Time-based ramp function as array of [time, fraction] pairs. " +
            "Example: [[0, 0], [10, 0.5], [60, 1.0], [120, 1.0], [180, 0]]",
          items: {
            type: "array",
            items: { type: "number" },
          },
        },
        tauQ: {
          type: "number",
          description: "t-squared fire growth coefficient (optional, uses ramp if not set)",
        },
      },
      required: ["furnitureId"],
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
    },
  },
  {
    name: "bulc_set_fds_detector",
    description:
      "Configure a furniture item as an FDS detector (heat or smoke). " +
      "Heat detectors use RTI and activation temperature. " +
      "Smoke detectors use optical obscuration threshold.",
    inputSchema: {
      type: "object" as const,
      properties: {
        furnitureId: {
          type: "string",
          description: "Furniture ID to configure as detector",
        },
        type: {
          type: "string",
          description: "Detector type: 'heat' or 'smoke'. Default: heat",
          enum: ["heat", "smoke"],
        },
        // Heat detector params
        rti: {
          type: "number",
          description: "Response Time Index in (m·s)^0.5. Default: 50 for heat, 1.0 for smoke",
        },
        activationTemperature: {
          type: "number",
          description: "Activation temperature in Celsius (heat detector). Default: 57",
        },
        // Smoke detector params
        alphaE: {
          type: "number",
          description: "Alpha_E parameter for smoke detector. Default: 1.8",
        },
        betaE: {
          type: "number",
          description: "Beta_E parameter for smoke detector. Default: -1.1",
        },
        obscurationThreshold: {
          type: "number",
          description: "Obscuration threshold in %/m (smoke detector). Default: 3.28",
        },
        deviceId: {
          type: "string",
          description: "Custom device ID. Default: auto-generated",
        },
      },
      required: ["furnitureId"],
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
    },
  },
  {
    name: "bulc_set_fds_sprinkler",
    description:
      "Configure a furniture item as an FDS sprinkler. " +
      "Uses RTI and activation temperature for thermal response, " +
      "with water spray parameters for suppression simulation.",
    inputSchema: {
      type: "object" as const,
      properties: {
        furnitureId: {
          type: "string",
          description: "Furniture ID to configure as sprinkler",
        },
        rti: {
          type: "number",
          description: "Response Time Index in (m·s)^0.5. Default: 50",
        },
        activationTemperature: {
          type: "number",
          description: "Activation temperature in Celsius. Default: 68",
        },
        flowRate: {
          type: "number",
          description: "Water flow rate in L/min. Default: 75",
        },
        dropletDiameter: {
          type: "number",
          description: "Median droplet diameter in micrometers. Default: 500",
        },
        sprayAngle: {
          type: "array",
          description: "Spray angle range [min, max] in degrees. Default: [60, 75]",
          items: { type: "number" },
        },
        particlesPerSecond: {
          type: "integer",
          description: "Number of particles per second. Default: 5000",
        },
        deviceId: {
          type: "string",
          description: "Custom device ID. Default: auto-generated",
        },
      },
      required: ["furnitureId"],
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
    },
  },
  {
    name: "bulc_set_fds_hvac",
    description:
      "Configure a furniture item as an FDS HVAC (supply or exhaust vent). " +
      "Assigns surface properties to specific faces of the obstruction. " +
      "Supply vents blow air in, exhaust vents extract air out.",
    inputSchema: {
      type: "object" as const,
      properties: {
        furnitureId: {
          type: "string",
          description: "Furniture ID to configure as HVAC",
        },
        surfaces: {
          type: "object",
          description: "Surface assignment for each face. Keys: minX, maxX, minY, maxY, minZ, maxZ. " +
            "Values: 'INERT', 'supply', or 'exhaust'. Example: {maxZ: 'supply'}",
          properties: {
            minX: { type: "string", enum: ["INERT", "supply", "exhaust"] },
            maxX: { type: "string", enum: ["INERT", "supply", "exhaust"] },
            minY: { type: "string", enum: ["INERT", "supply", "exhaust"] },
            maxY: { type: "string", enum: ["INERT", "supply", "exhaust"] },
            minZ: { type: "string", enum: ["INERT", "supply", "exhaust"] },
            maxZ: { type: "string", enum: ["INERT", "supply", "exhaust"] },
          },
        },
        flowType: {
          type: "string",
          description: "Flow specification type: 'volume' (m³/s) or 'velocity' (m/s). Default: velocity",
          enum: ["volume", "velocity"],
        },
        flowValue: {
          type: "number",
          description: "Flow value (volume in m³/s or velocity in m/s). Default: 4.0",
        },
        temperature: {
          type: "number",
          description: "Supply air temperature in Celsius (supply only). Default: 20",
        },
        surfaceId: {
          type: "string",
          description: "Custom surface ID. Default: auto-generated",
        },
      },
      required: ["furnitureId"],
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
    },
  },
  {
    name: "bulc_set_fds_thermocouple",
    description:
      "Configure a furniture item as an FDS thermocouple for temperature measurement. " +
      "Used to record temperature at specific locations during simulation.",
    inputSchema: {
      type: "object" as const,
      properties: {
        furnitureId: {
          type: "string",
          description: "Furniture ID to configure as thermocouple",
        },
        beadDiameter: {
          type: "number",
          description: "Thermocouple bead diameter in mm. Default: 1.0",
        },
        emissivity: {
          type: "number",
          description: "Bead emissivity (0-1). Default: 0.9",
        },
        deviceId: {
          type: "string",
          description: "Custom device ID. Default: auto-generated",
        },
      },
      required: ["furnitureId"],
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
    },
  },
  {
    name: "bulc_clear_fds_data",
    description:
      "Clear FDS configuration from a furniture item. " +
      "Removes fire source, detector, sprinkler, HVAC, or thermocouple settings.",
    inputSchema: {
      type: "object" as const,
      properties: {
        furnitureId: {
          type: "string",
          description: "Furniture ID to clear FDS data from",
        },
      },
      required: ["furnitureId"],
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
    },
  },
];

// Input validation schemas
const GetFdsDataSchema = z.object({
  furnitureId: z.string(),
});

const SetFireSourceSchema = z.object({
  furnitureId: z.string(),
  hrrpua: z.number().positive().optional(),
  surfaceId: z.string().optional(),
  color: z.enum(["RED", "ORANGE", "YELLOW"]).optional(),
  ramp: z.array(z.array(z.number()).length(2)).optional(),
  tauQ: z.number().optional(),
});

const SetDetectorSchema = z.object({
  furnitureId: z.string(),
  type: z.enum(["heat", "smoke"]).optional(),
  rti: z.number().positive().optional(),
  activationTemperature: z.number().optional(),
  alphaE: z.number().optional(),
  betaE: z.number().optional(),
  obscurationThreshold: z.number().positive().optional(),
  deviceId: z.string().optional(),
});

const SetSprinklerSchema = z.object({
  furnitureId: z.string(),
  rti: z.number().positive().optional(),
  activationTemperature: z.number().optional(),
  flowRate: z.number().positive().optional(),
  dropletDiameter: z.number().positive().optional(),
  sprayAngle: z.array(z.number()).length(2).optional(),
  particlesPerSecond: z.number().int().positive().optional(),
  deviceId: z.string().optional(),
});

const SetHvacSchema = z.object({
  furnitureId: z.string(),
  surfaces: z.object({
    minX: z.enum(["INERT", "supply", "exhaust"]).optional(),
    maxX: z.enum(["INERT", "supply", "exhaust"]).optional(),
    minY: z.enum(["INERT", "supply", "exhaust"]).optional(),
    maxY: z.enum(["INERT", "supply", "exhaust"]).optional(),
    minZ: z.enum(["INERT", "supply", "exhaust"]).optional(),
    maxZ: z.enum(["INERT", "supply", "exhaust"]).optional(),
  }).optional(),
  flowType: z.enum(["volume", "velocity"]).optional(),
  flowValue: z.number().optional(),
  temperature: z.number().optional(),
  surfaceId: z.string().optional(),
});

const SetThermocoupleSchema = z.object({
  furnitureId: z.string(),
  beadDiameter: z.number().positive().optional(),
  emissivity: z.number().min(0).max(1).optional(),
  deviceId: z.string().optional(),
});

const ClearFdsDataSchema = z.object({
  furnitureId: z.string(),
});

// Handler function
export async function handleFdsDataTool(
  name: string,
  args: Record<string, unknown>
): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  const client = getBulcClient();

  try {
    let result;

    switch (name) {
      case "bulc_get_fds_data": {
        const validated = GetFdsDataSchema.parse(args);
        result = await client.sendCommand({
          action: "get_fds_data",
          params: validated,
        });
        break;
      }

      case "bulc_set_fds_fire_source": {
        const validated = SetFireSourceSchema.parse(args);
        result = await client.sendCommand({
          action: "set_fds_fire_source",
          params: validated,
        });
        break;
      }

      case "bulc_set_fds_detector": {
        const validated = SetDetectorSchema.parse(args);
        result = await client.sendCommand({
          action: "set_fds_detector",
          params: validated,
        });
        break;
      }

      case "bulc_set_fds_sprinkler": {
        const validated = SetSprinklerSchema.parse(args);
        result = await client.sendCommand({
          action: "set_fds_sprinkler",
          params: validated,
        });
        break;
      }

      case "bulc_set_fds_hvac": {
        const validated = SetHvacSchema.parse(args);
        result = await client.sendCommand({
          action: "set_fds_hvac",
          params: validated,
        });
        break;
      }

      case "bulc_set_fds_thermocouple": {
        const validated = SetThermocoupleSchema.parse(args);
        result = await client.sendCommand({
          action: "set_fds_thermocouple",
          params: validated,
        });
        break;
      }

      case "bulc_clear_fds_data": {
        const validated = ClearFdsDataSchema.parse(args);
        result = await client.sendCommand({
          action: "clear_fds_data",
          params: validated,
        });
        break;
      }

      default:
        throw new Error(`Unknown FDS data tool: ${name}`);
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
