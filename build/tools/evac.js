// EVAC (Evacuation Simulation) Tools for BULC MCP Server
// Configure and run JuPedSim-based pedestrian evacuation simulations
import { z } from "zod";
import { getBulcClient } from "../bulc-client.js";
// Tool definitions
export const evacTools = [
    // Setup Tools
    {
        name: "bulc_set_evac_time",
        description: "Set evacuation simulation time parameters. " +
            "Controls total simulation duration and time step resolution.",
        inputSchema: {
            type: "object",
            properties: {
                simulationTime: {
                    type: "number",
                    description: "Total simulation time in seconds. Default: 300",
                },
                timeStep: {
                    type: "number",
                    description: "Simulation time step in seconds. Default: 0.1",
                },
            },
            required: ["simulationTime"],
        },
        annotations: {
            readOnlyHint: false,
            destructiveHint: true,
        },
    },
    {
        name: "bulc_get_evac_settings",
        description: "Get current EVAC simulation settings including model type, " +
            "agent parameters, and stair configurations.",
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
        name: "bulc_set_evac_model",
        description: "Set the evacuation simulation model type and parameters. " +
            "Supports CollisionFreeSpeed, SocialForce, and GeneralizedCentrifugal models.",
        inputSchema: {
            type: "object",
            properties: {
                model: {
                    type: "string",
                    description: "Model type: 'CollisionFreeSpeed', 'SocialForce', 'GeneralizedCentrifugal'. Default: CollisionFreeSpeed",
                    enum: ["CollisionFreeSpeed", "SocialForce", "GeneralizedCentrifugal"],
                },
                simulationTime: {
                    type: "number",
                    description: "Maximum simulation time in seconds. Default: 300",
                },
                timeStep: {
                    type: "number",
                    description: "Simulation time step in seconds. Default: 0.1",
                },
                // CollisionFreeSpeed params
                strengthNeighborRepulsion: {
                    type: "number",
                    description: "Neighbor repulsion strength (CollisionFreeSpeed). Default: 8.0",
                },
                rangeNeighborRepulsion: {
                    type: "number",
                    description: "Neighbor repulsion range in meters (CollisionFreeSpeed). Default: 0.1",
                },
                // SocialForce params
                bodyForce: {
                    type: "number",
                    description: "Body force constant (SocialForce). Default: 120000",
                },
                friction: {
                    type: "number",
                    description: "Friction coefficient (SocialForce). Default: 240000",
                },
            },
        },
        annotations: {
            readOnlyHint: false,
            destructiveHint: true,
        },
    },
    // Stair Tools
    {
        name: "bulc_list_evac_stairs",
        description: "List all configured evacuation stairs for multi-level buildings.",
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
        name: "bulc_setup_evac_stair",
        description: "Configure a furniture item as an evacuation stair connection between floors. " +
            "Defines entry/exit positions, capacity, and travel speed.",
        inputSchema: {
            type: "object",
            properties: {
                furnitureId: {
                    type: "string",
                    description: "Furniture ID to configure as stair",
                },
                fromFloor: {
                    type: "integer",
                    description: "Source floor index (0=ground floor)",
                },
                toFloor: {
                    type: "integer",
                    description: "Destination floor index",
                },
                entryX: {
                    type: "number",
                    description: "Entry point X coordinate in cm",
                },
                entryY: {
                    type: "number",
                    description: "Entry point Y coordinate in cm",
                },
                exitX: {
                    type: "number",
                    description: "Exit point X coordinate in cm",
                },
                exitY: {
                    type: "number",
                    description: "Exit point Y coordinate in cm",
                },
                width: {
                    type: "number",
                    description: "Stair width in meters. Default: 1.2",
                },
                capacity: {
                    type: "integer",
                    description: "Max people on stair at once. Default: 10",
                },
                travelSpeed: {
                    type: "number",
                    description: "Travel speed in m/s. Default: 0.6",
                },
            },
            required: ["furnitureId", "fromFloor", "toFloor"],
        },
        annotations: {
            readOnlyHint: false,
            destructiveHint: true,
        },
    },
    {
        name: "bulc_clear_evac_stair",
        description: "Remove stair configuration from a furniture item.",
        inputSchema: {
            type: "object",
            properties: {
                furnitureId: {
                    type: "string",
                    description: "Furniture ID to clear stair config from",
                },
            },
            required: ["furnitureId"],
        },
        annotations: {
            readOnlyHint: false,
            destructiveHint: true,
        },
    },
    // Agent Tools
    {
        name: "bulc_list_evac_agents",
        description: "List all evacuation agents with their positions and properties.",
        inputSchema: {
            type: "object",
            properties: {
                level: {
                    type: "integer",
                    description: "Filter by floor level. Omit for all levels.",
                },
                room: {
                    type: "string",
                    description: "Filter by room name or ID",
                },
            },
        },
        annotations: {
            readOnlyHint: true,
            destructiveHint: false,
        },
    },
    {
        name: "bulc_place_evac_agents",
        description: "Place evacuation agents in rooms or at specific positions. " +
            "Can place by count (random distribution) or at exact coordinates.",
        inputSchema: {
            type: "object",
            properties: {
                room: {
                    type: "string",
                    description: "Room name or ID to place agents in",
                },
                level: {
                    type: "integer",
                    description: "Floor level index. Default: current level",
                },
                count: {
                    type: "integer",
                    description: "Number of agents to place randomly. Required if no positions given.",
                },
                positions: {
                    type: "array",
                    description: "Specific positions as [[x1,y1], [x2,y2], ...] in cm. Alternative to count.",
                    items: {
                        type: "array",
                        items: { type: "number" },
                    },
                },
                agentRadius: {
                    type: "number",
                    description: "Agent radius in meters. Default: 0.25",
                },
                desiredSpeed: {
                    type: "number",
                    description: "Desired walking speed in m/s. Default: 1.2",
                },
                maxSpeed: {
                    type: "number",
                    description: "Maximum walking speed in m/s. Default: 1.5",
                },
                minSpacing: {
                    type: "number",
                    description: "Minimum spacing between agents in meters. Default: 0.5",
                },
            },
        },
        annotations: {
            readOnlyHint: false,
            destructiveHint: true,
        },
    },
    {
        name: "bulc_clear_evac_agents",
        description: "Clear evacuation agents from specified room or all rooms.",
        inputSchema: {
            type: "object",
            properties: {
                room: {
                    type: "string",
                    description: "Room name or ID to clear. Omit to clear all.",
                },
                level: {
                    type: "integer",
                    description: "Floor level to clear. Omit to clear all levels.",
                },
            },
        },
        annotations: {
            readOnlyHint: false,
            destructiveHint: true,
        },
    },
    {
        name: "bulc_set_agent_properties",
        description: "Set default properties for evacuation agents (radius, speed, etc.).",
        inputSchema: {
            type: "object",
            properties: {
                agentRadius: {
                    type: "number",
                    description: "Default agent radius in meters. Default: 0.25",
                },
                desiredSpeed: {
                    type: "number",
                    description: "Default desired speed in m/s. Default: 1.2",
                },
                maxSpeed: {
                    type: "number",
                    description: "Default max speed in m/s. Default: 1.5",
                },
                minSpacing: {
                    type: "number",
                    description: "Minimum spacing for random placement in meters. Default: 0.5",
                },
            },
        },
        annotations: {
            readOnlyHint: false,
            destructiveHint: true,
        },
    },
    // Advanced Tools
    {
        name: "bulc_list_evac_exits",
        description: "List all detected evacuation exits (doors converted to exits).",
        inputSchema: {
            type: "object",
            properties: {
                level: {
                    type: "integer",
                    description: "Filter by floor level",
                },
            },
        },
        annotations: {
            readOnlyHint: true,
            destructiveHint: false,
        },
    },
    {
        name: "bulc_validate_evac",
        description: "Validate evacuation setup for errors and warnings. " +
            "Checks agents, exits, walkable areas, and stair configurations.",
        inputSchema: {
            type: "object",
            properties: {},
        },
        annotations: {
            readOnlyHint: true,
            destructiveHint: false,
        },
    },
    // Run Tools
    {
        name: "bulc_run_evac",
        description: "Start evacuation simulation using JuPedSim. " +
            "Returns immediately; use bulc_get_evac_status to monitor progress.",
        inputSchema: {
            type: "object",
            properties: {
                multiLevel: {
                    type: "boolean",
                    description: "Use multi-level simulation with stairs. Default: auto-detect",
                },
            },
        },
        annotations: {
            readOnlyHint: false,
            destructiveHint: true,
        },
    },
    {
        name: "bulc_get_evac_status",
        description: "Get current evacuation simulation status including progress, " +
            "evacuated count, and estimated completion time.",
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
        name: "bulc_stop_evac",
        description: "Stop a running evacuation simulation.",
        inputSchema: {
            type: "object",
            properties: {},
        },
        annotations: {
            readOnlyHint: false,
            destructiveHint: true,
        },
    },
    // Result Tools
    {
        name: "bulc_load_evac_result",
        description: "Load evacuation results from a .evac file for visualization.",
        inputSchema: {
            type: "object",
            properties: {
                evacPath: {
                    type: "string",
                    description: "Path to .evac file. Default: auto-detect from last simulation",
                },
            },
        },
        annotations: {
            readOnlyHint: false,
            destructiveHint: false,
        },
    },
    {
        name: "bulc_get_evac_summary",
        description: "Get evacuation result summary including total time, " +
            "per-agent exit times, and statistics.",
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
        name: "bulc_generate_rset_report",
        description: "Generate RSET (Required Safe Egress Time) analysis report " +
            "from evacuation simulation results.",
        inputSchema: {
            type: "object",
            properties: {
                outputPath: {
                    type: "string",
                    description: "Output directory for report. Default: same as results",
                },
                language: {
                    type: "string",
                    description: "Report language: 'EN', 'KO', 'JP', 'CN'. Default: EN",
                    enum: ["EN", "KO", "JP", "CN"],
                },
                includeAgentDetails: {
                    type: "boolean",
                    description: "Include per-agent exit times. Default: true",
                },
            },
        },
        annotations: {
            readOnlyHint: false,
            destructiveHint: true,
        },
    },
    {
        name: "bulc_save_evac_result",
        description: "Save current evacuation results to a .evac file.",
        inputSchema: {
            type: "object",
            properties: {
                outputPath: {
                    type: "string",
                    description: "Output path for .evac file. Default: project folder",
                },
                filename: {
                    type: "string",
                    description: "Filename without extension. Default: project name",
                },
            },
        },
        annotations: {
            readOnlyHint: false,
            destructiveHint: true,
        },
    },
    // Advanced Stair Tools
    {
        name: "bulc_modify_evac_stair",
        description: "Modify an existing evacuation stair configuration. " +
            "Update capacity, speed, or position properties.",
        inputSchema: {
            type: "object",
            properties: {
                furnitureId: {
                    type: "string",
                    description: "Furniture ID of the stair to modify",
                },
                entryX: {
                    type: "number",
                    description: "New entry point X coordinate in cm",
                },
                entryY: {
                    type: "number",
                    description: "New entry point Y coordinate in cm",
                },
                exitX: {
                    type: "number",
                    description: "New exit point X coordinate in cm",
                },
                exitY: {
                    type: "number",
                    description: "New exit point Y coordinate in cm",
                },
                width: {
                    type: "number",
                    description: "New stair width in meters",
                },
                capacity: {
                    type: "integer",
                    description: "New maximum capacity",
                },
                travelSpeed: {
                    type: "number",
                    description: "New travel speed in m/s",
                },
            },
            required: ["furnitureId"],
        },
        annotations: {
            readOnlyHint: false,
            destructiveHint: true,
        },
    },
    // Exit Assignment Tools
    {
        name: "bulc_set_exit_assignment",
        description: "Set the exit assignment strategy for evacuation agents. " +
            "Determines how agents choose which exit to use.",
        inputSchema: {
            type: "object",
            properties: {
                mode: {
                    type: "string",
                    description: "Assignment mode: 'NEAREST' (closest exit), 'SHORTEST_PATH' (shortest walking path), 'BALANCED' (balance exit flow), 'CUSTOM' (manual assignment)",
                    enum: ["NEAREST", "SHORTEST_PATH", "BALANCED", "CUSTOM"],
                },
                balanceThreshold: {
                    type: "number",
                    description: "For BALANCED mode: max agents per exit ratio difference. Default: 0.2",
                },
                customAssignments: {
                    type: "array",
                    description: "For CUSTOM mode: array of {agentIds: [...], exitId: '...'} assignments",
                    items: {
                        type: "object",
                        properties: {
                            agentIds: {
                                type: "array",
                                items: { type: "integer" },
                            },
                            exitId: {
                                type: "string",
                            },
                        },
                    },
                },
            },
            required: ["mode"],
        },
        annotations: {
            readOnlyHint: false,
            destructiveHint: true,
        },
    },
    // Pre-movement Time Tools
    {
        name: "bulc_set_premovement_time",
        description: "Set pre-movement time parameters for evacuation agents. " +
            "Includes detection time and reaction time with statistical distributions.",
        inputSchema: {
            type: "object",
            properties: {
                detectionTime: {
                    type: "number",
                    description: "Fire detection time in seconds. Default: 0 (instant detection)",
                },
                reactionTimeMean: {
                    type: "number",
                    description: "Mean reaction time in seconds. Default: 30",
                },
                reactionTimeStdDev: {
                    type: "number",
                    description: "Reaction time standard deviation in seconds. Default: 10",
                },
                distribution: {
                    type: "string",
                    description: "Distribution type: 'NORMAL', 'LOGNORMAL', 'UNIFORM'. Default: NORMAL",
                    enum: ["NORMAL", "LOGNORMAL", "UNIFORM"],
                },
                minReactionTime: {
                    type: "number",
                    description: "Minimum reaction time in seconds. Default: 0",
                },
                maxReactionTime: {
                    type: "number",
                    description: "Maximum reaction time in seconds. For UNIFORM distribution.",
                },
                applyPerRoom: {
                    type: "boolean",
                    description: "Apply different reaction times per room. Default: false",
                },
                roomSettings: {
                    type: "array",
                    description: "Per-room settings: [{room: '...', reactionTimeMean: ...}, ...]",
                    items: {
                        type: "object",
                        properties: {
                            room: { type: "string" },
                            reactionTimeMean: { type: "number" },
                            reactionTimeStdDev: { type: "number" },
                        },
                    },
                },
            },
        },
        annotations: {
            readOnlyHint: false,
            destructiveHint: true,
        },
    },
    // Fire-EVAC Coupling Tools
    {
        name: "bulc_set_fire_coupling",
        description: "Configure fire-evacuation coupling for FDS+EVAC integration. " +
            "Sets visibility and temperature thresholds that affect agent behavior.",
        inputSchema: {
            type: "object",
            properties: {
                enabled: {
                    type: "boolean",
                    description: "Enable fire-EVAC coupling. Default: false",
                },
                visibilityThreshold: {
                    type: "number",
                    description: "Visibility threshold in meters. Agents avoid areas below this. Default: 5",
                },
                temperatureThreshold: {
                    type: "number",
                    description: "Temperature threshold in Celsius. Agents avoid areas above this. Default: 60",
                },
                coThreshold: {
                    type: "number",
                    description: "CO concentration threshold in ppm. Default: 1400",
                },
                speedReductionFactor: {
                    type: "number",
                    description: "Speed reduction factor in smoke (0-1). Default: 0.5",
                },
                updateInterval: {
                    type: "number",
                    description: "Fire data update interval in seconds. Default: 1.0",
                },
                fdsResultPath: {
                    type: "string",
                    description: "Path to FDS result files (.smv). Auto-detected if not specified.",
                },
            },
        },
        annotations: {
            readOnlyHint: false,
            destructiveHint: true,
        },
    },
    // Detailed Result Tools
    {
        name: "bulc_get_evac_result",
        description: "Get detailed evacuation results including per-agent trajectories, " +
            "exit statistics, and flow rate analysis.",
        inputSchema: {
            type: "object",
            properties: {
                includeTrajectories: {
                    type: "boolean",
                    description: "Include full trajectory data for each agent. Default: false",
                },
                includeFlowRates: {
                    type: "boolean",
                    description: "Include exit flow rate analysis. Default: true",
                },
                includeBottlenecks: {
                    type: "boolean",
                    description: "Identify bottleneck locations. Default: true",
                },
                timeRange: {
                    type: "array",
                    description: "Time range [startTime, endTime] in seconds. Default: full simulation",
                    items: { type: "number" },
                },
                agentIds: {
                    type: "array",
                    description: "Specific agent IDs to include. Default: all agents",
                    items: { type: "integer" },
                },
            },
        },
        annotations: {
            readOnlyHint: true,
            destructiveHint: false,
        },
    },
    // Viewer Tools
    {
        name: "bulc_open_evac_viewer",
        description: "Open the 3D evacuation result viewer window. " +
            "Displays agents on the building model with timeline playback.",
        inputSchema: {
            type: "object",
            properties: {
                evacPath: {
                    type: "string",
                    description: "Path to .evac file. Default: auto-detect from last simulation",
                },
                objPath: {
                    type: "string",
                    description: "Path to .obj 3D model file. Default: auto-detect",
                },
                autoPlay: {
                    type: "boolean",
                    description: "Start playback automatically. Default: false",
                },
                playbackSpeed: {
                    type: "number",
                    description: "Playback speed multiplier (0.25 to 8.0). Default: 1.0",
                },
                agentScale: {
                    type: "number",
                    description: "Agent display scale (0.5 to 5.0). Default: 1.0",
                },
            },
        },
        annotations: {
            readOnlyHint: false,
            destructiveHint: false,
        },
    },
];
// Input validation schemas
const SetEvacModelSchema = z.object({
    model: z.enum(["CollisionFreeSpeed", "SocialForce", "GeneralizedCentrifugal"]).optional(),
    simulationTime: z.number().positive().optional(),
    timeStep: z.number().positive().optional(),
    strengthNeighborRepulsion: z.number().optional(),
    rangeNeighborRepulsion: z.number().optional(),
    bodyForce: z.number().optional(),
    friction: z.number().optional(),
});
const SetupEvacStairSchema = z.object({
    furnitureId: z.string(),
    fromFloor: z.number().int().min(0),
    toFloor: z.number().int().min(0),
    entryX: z.number().optional(),
    entryY: z.number().optional(),
    exitX: z.number().optional(),
    exitY: z.number().optional(),
    width: z.number().positive().optional(),
    capacity: z.number().int().positive().optional(),
    travelSpeed: z.number().positive().optional(),
});
const ClearEvacStairSchema = z.object({
    furnitureId: z.string(),
});
const ListEvacAgentsSchema = z.object({
    level: z.number().int().optional(),
    room: z.string().optional(),
});
const PlaceEvacAgentsSchema = z.object({
    room: z.string().optional(),
    level: z.number().int().optional(),
    count: z.number().int().positive().optional(),
    positions: z.array(z.array(z.number()).length(2)).optional(),
    agentRadius: z.number().positive().optional(),
    desiredSpeed: z.number().positive().optional(),
    maxSpeed: z.number().positive().optional(),
    minSpacing: z.number().positive().optional(),
});
const ClearEvacAgentsSchema = z.object({
    room: z.string().optional(),
    level: z.number().int().optional(),
});
const SetAgentPropertiesSchema = z.object({
    agentRadius: z.number().positive().optional(),
    desiredSpeed: z.number().positive().optional(),
    maxSpeed: z.number().positive().optional(),
    minSpacing: z.number().positive().optional(),
});
const ListEvacExitsSchema = z.object({
    level: z.number().int().optional(),
});
const RunEvacSchema = z.object({
    multiLevel: z.boolean().optional(),
});
const LoadEvacResultSchema = z.object({
    evacPath: z.string().optional(),
});
const GenerateRsetReportSchema = z.object({
    outputPath: z.string().optional(),
    language: z.enum(["EN", "KO", "JP", "CN"]).optional(),
    includeAgentDetails: z.boolean().optional(),
});
const SaveEvacResultSchema = z.object({
    outputPath: z.string().optional(),
    filename: z.string().optional(),
});
const SetEvacTimeSchema = z.object({
    simulationTime: z.number().positive(),
    timeStep: z.number().positive().optional(),
});
const ModifyEvacStairSchema = z.object({
    furnitureId: z.string(),
    entryX: z.number().optional(),
    entryY: z.number().optional(),
    exitX: z.number().optional(),
    exitY: z.number().optional(),
    width: z.number().positive().optional(),
    capacity: z.number().int().positive().optional(),
    travelSpeed: z.number().positive().optional(),
});
const SetExitAssignmentSchema = z.object({
    mode: z.enum(["NEAREST", "SHORTEST_PATH", "BALANCED", "CUSTOM"]),
    balanceThreshold: z.number().positive().optional(),
    customAssignments: z.array(z.object({
        agentIds: z.array(z.number().int()),
        exitId: z.string(),
    })).optional(),
});
const SetPremovementTimeSchema = z.object({
    detectionTime: z.number().min(0).optional(),
    reactionTimeMean: z.number().min(0).optional(),
    reactionTimeStdDev: z.number().min(0).optional(),
    distribution: z.enum(["NORMAL", "LOGNORMAL", "UNIFORM"]).optional(),
    minReactionTime: z.number().min(0).optional(),
    maxReactionTime: z.number().positive().optional(),
    applyPerRoom: z.boolean().optional(),
    roomSettings: z.array(z.object({
        room: z.string(),
        reactionTimeMean: z.number().optional(),
        reactionTimeStdDev: z.number().optional(),
    })).optional(),
});
const SetFireCouplingSchema = z.object({
    enabled: z.boolean().optional(),
    visibilityThreshold: z.number().positive().optional(),
    temperatureThreshold: z.number().positive().optional(),
    coThreshold: z.number().positive().optional(),
    speedReductionFactor: z.number().min(0).max(1).optional(),
    updateInterval: z.number().positive().optional(),
    fdsResultPath: z.string().optional(),
});
const GetEvacResultSchema = z.object({
    includeTrajectories: z.boolean().optional(),
    includeFlowRates: z.boolean().optional(),
    includeBottlenecks: z.boolean().optional(),
    timeRange: z.array(z.number()).length(2).optional(),
    agentIds: z.array(z.number().int()).optional(),
});
const OpenEvacViewerSchema = z.object({
    evacPath: z.string().optional(),
    objPath: z.string().optional(),
    autoPlay: z.boolean().optional(),
    playbackSpeed: z.number().min(0.25).max(8.0).optional(),
    agentScale: z.number().min(0.5).max(5.0).optional(),
});
// Handler function
export async function handleEvacTool(name, args) {
    const client = getBulcClient();
    try {
        let result;
        switch (name) {
            case "bulc_get_evac_settings": {
                result = await client.sendCommand({
                    action: "get_evac_settings",
                    params: {},
                });
                break;
            }
            case "bulc_set_evac_model": {
                const validated = SetEvacModelSchema.parse(args);
                result = await client.sendCommand({
                    action: "set_evac_model",
                    params: validated,
                });
                break;
            }
            case "bulc_list_evac_stairs": {
                result = await client.sendCommand({
                    action: "list_evac_stairs",
                    params: {},
                });
                break;
            }
            case "bulc_setup_evac_stair": {
                const validated = SetupEvacStairSchema.parse(args);
                result = await client.sendCommand({
                    action: "setup_evac_stair",
                    params: validated,
                });
                break;
            }
            case "bulc_clear_evac_stair": {
                const validated = ClearEvacStairSchema.parse(args);
                result = await client.sendCommand({
                    action: "clear_evac_stair",
                    params: validated,
                });
                break;
            }
            case "bulc_list_evac_agents": {
                const validated = ListEvacAgentsSchema.parse(args);
                result = await client.sendCommand({
                    action: "list_evac_agents",
                    params: validated,
                });
                break;
            }
            case "bulc_place_evac_agents": {
                const validated = PlaceEvacAgentsSchema.parse(args);
                result = await client.sendCommand({
                    action: "place_evac_agents",
                    params: validated,
                });
                break;
            }
            case "bulc_clear_evac_agents": {
                const validated = ClearEvacAgentsSchema.parse(args);
                result = await client.sendCommand({
                    action: "clear_evac_agents",
                    params: validated,
                });
                break;
            }
            case "bulc_set_agent_properties": {
                const validated = SetAgentPropertiesSchema.parse(args);
                result = await client.sendCommand({
                    action: "set_agent_properties",
                    params: validated,
                });
                break;
            }
            case "bulc_list_evac_exits": {
                const validated = ListEvacExitsSchema.parse(args);
                result = await client.sendCommand({
                    action: "list_evac_exits",
                    params: validated,
                });
                break;
            }
            case "bulc_validate_evac": {
                result = await client.sendCommand({
                    action: "validate_evac",
                    params: {},
                });
                break;
            }
            case "bulc_run_evac": {
                const validated = RunEvacSchema.parse(args);
                result = await client.sendCommand({
                    action: "run_evac",
                    params: validated,
                });
                break;
            }
            case "bulc_get_evac_status": {
                result = await client.sendCommand({
                    action: "get_evac_status",
                    params: {},
                });
                break;
            }
            case "bulc_stop_evac": {
                result = await client.sendCommand({
                    action: "stop_evac",
                    params: {},
                });
                break;
            }
            case "bulc_load_evac_result": {
                const validated = LoadEvacResultSchema.parse(args);
                result = await client.sendCommand({
                    action: "load_evac_result",
                    params: validated,
                });
                break;
            }
            case "bulc_get_evac_summary": {
                result = await client.sendCommand({
                    action: "get_evac_summary",
                    params: {},
                });
                break;
            }
            case "bulc_generate_rset_report": {
                const validated = GenerateRsetReportSchema.parse(args);
                result = await client.sendCommand({
                    action: "generate_rset_report",
                    params: validated,
                });
                break;
            }
            case "bulc_save_evac_result": {
                const validated = SaveEvacResultSchema.parse(args);
                result = await client.sendCommand({
                    action: "save_evac_result",
                    params: validated,
                });
                break;
            }
            case "bulc_set_evac_time": {
                const validated = SetEvacTimeSchema.parse(args);
                result = await client.sendCommand({
                    action: "set_evac_time",
                    params: validated,
                });
                break;
            }
            case "bulc_modify_evac_stair": {
                const validated = ModifyEvacStairSchema.parse(args);
                result = await client.sendCommand({
                    action: "modify_evac_stair",
                    params: validated,
                });
                break;
            }
            case "bulc_set_exit_assignment": {
                const validated = SetExitAssignmentSchema.parse(args);
                result = await client.sendCommand({
                    action: "set_exit_assignment",
                    params: validated,
                });
                break;
            }
            case "bulc_set_premovement_time": {
                const validated = SetPremovementTimeSchema.parse(args);
                result = await client.sendCommand({
                    action: "set_premovement_time",
                    params: validated,
                });
                break;
            }
            case "bulc_set_fire_coupling": {
                const validated = SetFireCouplingSchema.parse(args);
                result = await client.sendCommand({
                    action: "set_fire_coupling",
                    params: validated,
                });
                break;
            }
            case "bulc_get_evac_result": {
                const validated = GetEvacResultSchema.parse(args);
                result = await client.sendCommand({
                    action: "get_evac_result",
                    params: validated,
                });
                break;
            }
            case "bulc_open_evac_viewer": {
                const validated = OpenEvacViewerSchema.parse(args);
                result = await client.sendCommand({
                    action: "open_evac_viewer",
                    params: validated,
                });
                break;
            }
            default:
                throw new Error(`Unknown EVAC tool: ${name}`);
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
