// Simulation Settings Tools for BULC MCP Server
// Configure FDS simulation parameters, time, and output settings
import { z } from "zod";
import { getBulcClient } from "../bulc-client.js";
// Tool definitions
export const simulationTools = [
    {
        name: "bulc_get_simulation_settings",
        description: "Get current FDS simulation settings including time, ambient conditions, " +
            "output settings, and numerical parameters.",
        inputSchema: {
            type: "object",
            properties: {},
        },
        annotations: {
            readOnlyHint: true,
            destructiveHint: false,
        },
    },
    {
        name: "bulc_set_simulation_time",
        description: "Set FDS simulation time parameters. " +
            "Controls simulation duration and time step settings.",
        inputSchema: {
            type: "object",
            properties: {
                duration: {
                    type: "number",
                    description: "Total simulation time in seconds. Required.",
                },
                dtInit: {
                    type: "number",
                    description: "Initial time step in seconds. Default: auto (FDS calculates)",
                },
                dtMax: {
                    type: "number",
                    description: "Maximum time step in seconds. Default: auto",
                },
            },
            required: ["duration"],
        },
        annotations: {
            readOnlyHint: false,
            destructiveHint: true,
        },
    },
    {
        name: "bulc_set_output_settings",
        description: "Configure FDS output settings for visualization data. " +
            "Controls slice files, 3D smoke, and device output intervals.",
        inputSchema: {
            type: "object",
            properties: {
                sliceInterval: {
                    type: "number",
                    description: "Interval for slice file output in seconds. Default: 1.0",
                },
                smoke3dInterval: {
                    type: "number",
                    description: "Interval for 3D smoke output in seconds. Default: 1.0",
                },
                deviceInterval: {
                    type: "number",
                    description: "Interval for device output in seconds. Default: 1.0",
                },
                plot3dInterval: {
                    type: "number",
                    description: "Interval for Plot3D output in seconds. Default: 10.0",
                },
                viscosityOutput: {
                    type: "boolean",
                    description: "Include viscosity in output. Default: false",
                },
                massFluxOutput: {
                    type: "boolean",
                    description: "Include mass flux in output. Default: false",
                },
            },
        },
        annotations: {
            readOnlyHint: false,
            destructiveHint: true,
        },
    },
    {
        name: "bulc_set_ambient",
        description: "Set FDS ambient conditions including temperature, pressure, and species.",
        inputSchema: {
            type: "object",
            properties: {
                temperature: {
                    type: "number",
                    description: "Ambient temperature in Celsius. Default: 20",
                },
                pressure: {
                    type: "number",
                    description: "Ambient pressure in Pa. Default: 101325",
                },
                humidity: {
                    type: "number",
                    description: "Relative humidity (0-100%). Default: 40",
                },
                o2MassFraction: {
                    type: "number",
                    description: "Oxygen mass fraction. Default: 0.232",
                },
                co2MassFraction: {
                    type: "number",
                    description: "CO2 mass fraction. Default: 0.000595",
                },
                gravity: {
                    type: "array",
                    description: "Gravity vector [gx, gy, gz] in m/s². Default: [0, 0, -9.81]",
                    items: { type: "number" },
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
const SetSimulationTimeSchema = z.object({
    duration: z.number().positive(),
    dtInit: z.number().positive().optional(),
    dtMax: z.number().positive().optional(),
});
const SetOutputSettingsSchema = z.object({
    sliceInterval: z.number().positive().optional(),
    smoke3dInterval: z.number().positive().optional(),
    deviceInterval: z.number().positive().optional(),
    plot3dInterval: z.number().positive().optional(),
    viscosityOutput: z.boolean().optional(),
    massFluxOutput: z.boolean().optional(),
});
const SetAmbientSchema = z.object({
    temperature: z.number().optional(),
    pressure: z.number().positive().optional(),
    humidity: z.number().min(0).max(100).optional(),
    o2MassFraction: z.number().min(0).max(1).optional(),
    co2MassFraction: z.number().min(0).max(1).optional(),
    gravity: z.array(z.number()).length(3).optional(),
});
// Handler function
export async function handleSimulationTool(name, args) {
    const client = getBulcClient();
    try {
        let result;
        switch (name) {
            case "bulc_get_simulation_settings": {
                result = await client.sendCommand({
                    action: "get_simulation_settings",
                    params: {},
                });
                break;
            }
            case "bulc_set_simulation_time": {
                const validated = SetSimulationTimeSchema.parse(args);
                result = await client.sendCommand({
                    action: "set_simulation_time",
                    params: validated,
                });
                break;
            }
            case "bulc_set_output_settings": {
                const validated = SetOutputSettingsSchema.parse(args);
                result = await client.sendCommand({
                    action: "set_output_settings",
                    params: validated,
                });
                break;
            }
            case "bulc_set_ambient": {
                const validated = SetAmbientSchema.parse(args);
                result = await client.sendCommand({
                    action: "set_ambient",
                    params: validated,
                });
                break;
            }
            default:
                throw new Error(`Unknown simulation tool: ${name}`);
        }
        if (result.success) {
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        }
        else {
            return {
                content: [{ type: "text", text: result.error || "Operation failed" }],
                isError: true,
            };
        }
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
            content: [{ type: "text", text: `Error: ${message}` }],
            isError: true,
        };
    }
}
