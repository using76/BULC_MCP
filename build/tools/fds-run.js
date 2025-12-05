// FDS Run Tools for BULC MCP Server
// Preview, validate, export, and run FDS simulations
import { z } from "zod";
import { getBulcClient } from "../bulc-client.js";
// Tool definitions
export const fdsRunTools = [
    {
        name: "bulc_preview_fds",
        description: "Generate a preview of the FDS input file without saving. " +
            "Returns the complete FDS input file content for review.",
        inputSchema: {
            type: "object",
            properties: {
                includeComments: {
                    type: "boolean",
                    description: "Include explanatory comments in output. Default: true",
                },
            },
        },
        annotations: {
            readOnlyHint: true,
            destructiveHint: false,
        },
    },
    {
        name: "bulc_validate_fds",
        description: "Validate FDS configuration for errors and warnings. " +
            "Checks mesh consistency, fire source setup, boundary conditions, etc.",
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
        name: "bulc_export_fds",
        description: "Export the FDS input file to disk. " +
            "Creates the .fds file and any required supporting files.",
        inputSchema: {
            type: "object",
            properties: {
                outputPath: {
                    type: "string",
                    description: "Output directory path. Default: same as project file",
                },
                filename: {
                    type: "string",
                    description: "FDS filename (without extension). Default: project name",
                },
                includeGeometry: {
                    type: "boolean",
                    description: "Export OBJ geometry file. Default: true",
                },
            },
        },
        annotations: {
            readOnlyHint: false,
            destructiveHint: true,
        },
    },
    {
        name: "bulc_run_fds",
        description: "Start FDS simulation. " +
            "Runs the simulation in background and returns immediately. " +
            "Use bulc_get_fds_status to monitor progress.",
        inputSchema: {
            type: "object",
            properties: {
                mpiProcesses: {
                    type: "integer",
                    description: "Number of MPI processes. Default: auto (based on mesh count)",
                },
                openmpThreads: {
                    type: "integer",
                    description: "Number of OpenMP threads per process. Default: 1",
                },
                outputPath: {
                    type: "string",
                    description: "Output directory. Default: BULC_result folder",
                },
            },
        },
        annotations: {
            readOnlyHint: false,
            destructiveHint: true,
        },
    },
    {
        name: "bulc_get_fds_status",
        description: "Get current FDS simulation status. " +
            "Returns running state, progress, current simulation time, and estimated completion.",
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
        name: "bulc_stop_fds",
        description: "Stop a running FDS simulation. " +
            "Sends stop signal and waits for graceful shutdown.",
        inputSchema: {
            type: "object",
            properties: {
                force: {
                    type: "boolean",
                    description: "Force kill if graceful stop fails. Default: false",
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
const PreviewFdsSchema = z.object({
    includeComments: z.boolean().optional(),
});
const ExportFdsSchema = z.object({
    outputPath: z.string().optional(),
    filename: z.string().optional(),
    includeGeometry: z.boolean().optional(),
});
const RunFdsSchema = z.object({
    mpiProcesses: z.number().int().positive().optional(),
    openmpThreads: z.number().int().positive().optional(),
    outputPath: z.string().optional(),
});
const StopFdsSchema = z.object({
    force: z.boolean().optional(),
});
// Handler function
export async function handleFdsRunTool(name, args) {
    const client = getBulcClient();
    try {
        let result;
        switch (name) {
            case "bulc_preview_fds": {
                const validated = PreviewFdsSchema.parse(args);
                result = await client.sendCommand({
                    action: "preview_fds",
                    params: validated,
                });
                break;
            }
            case "bulc_validate_fds": {
                result = await client.sendCommand({
                    action: "validate_fds",
                    params: {},
                });
                break;
            }
            case "bulc_export_fds": {
                const validated = ExportFdsSchema.parse(args);
                result = await client.sendCommand({
                    action: "export_fds",
                    params: validated,
                });
                break;
            }
            case "bulc_run_fds": {
                const validated = RunFdsSchema.parse(args);
                result = await client.sendCommand({
                    action: "run_fds",
                    params: validated,
                });
                break;
            }
            case "bulc_get_fds_status": {
                result = await client.sendCommand({
                    action: "get_fds_status",
                    params: {},
                });
                break;
            }
            case "bulc_stop_fds": {
                const validated = StopFdsSchema.parse(args);
                result = await client.sendCommand({
                    action: "stop_fds",
                    params: validated,
                });
                break;
            }
            default:
                throw new Error(`Unknown FDS run tool: ${name}`);
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
