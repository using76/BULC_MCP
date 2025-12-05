export declare const simulationTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            duration?: undefined;
            dtInit?: undefined;
            dtMax?: undefined;
            sliceInterval?: undefined;
            smoke3dInterval?: undefined;
            deviceInterval?: undefined;
            plot3dInterval?: undefined;
            viscosityOutput?: undefined;
            massFluxOutput?: undefined;
            temperature?: undefined;
            pressure?: undefined;
            humidity?: undefined;
            o2MassFraction?: undefined;
            co2MassFraction?: undefined;
            gravity?: undefined;
        };
        required?: undefined;
    };
    annotations: {
        readOnlyHint: boolean;
        destructiveHint: boolean;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            duration: {
                type: string;
                description: string;
            };
            dtInit: {
                type: string;
                description: string;
            };
            dtMax: {
                type: string;
                description: string;
            };
            sliceInterval?: undefined;
            smoke3dInterval?: undefined;
            deviceInterval?: undefined;
            plot3dInterval?: undefined;
            viscosityOutput?: undefined;
            massFluxOutput?: undefined;
            temperature?: undefined;
            pressure?: undefined;
            humidity?: undefined;
            o2MassFraction?: undefined;
            co2MassFraction?: undefined;
            gravity?: undefined;
        };
        required: string[];
    };
    annotations: {
        readOnlyHint: boolean;
        destructiveHint: boolean;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sliceInterval: {
                type: string;
                description: string;
            };
            smoke3dInterval: {
                type: string;
                description: string;
            };
            deviceInterval: {
                type: string;
                description: string;
            };
            plot3dInterval: {
                type: string;
                description: string;
            };
            viscosityOutput: {
                type: string;
                description: string;
            };
            massFluxOutput: {
                type: string;
                description: string;
            };
            duration?: undefined;
            dtInit?: undefined;
            dtMax?: undefined;
            temperature?: undefined;
            pressure?: undefined;
            humidity?: undefined;
            o2MassFraction?: undefined;
            co2MassFraction?: undefined;
            gravity?: undefined;
        };
        required?: undefined;
    };
    annotations: {
        readOnlyHint: boolean;
        destructiveHint: boolean;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            temperature: {
                type: string;
                description: string;
            };
            pressure: {
                type: string;
                description: string;
            };
            humidity: {
                type: string;
                description: string;
            };
            o2MassFraction: {
                type: string;
                description: string;
            };
            co2MassFraction: {
                type: string;
                description: string;
            };
            gravity: {
                type: string;
                description: string;
                items: {
                    type: string;
                };
            };
            duration?: undefined;
            dtInit?: undefined;
            dtMax?: undefined;
            sliceInterval?: undefined;
            smoke3dInterval?: undefined;
            deviceInterval?: undefined;
            plot3dInterval?: undefined;
            viscosityOutput?: undefined;
            massFluxOutput?: undefined;
        };
        required?: undefined;
    };
    annotations: {
        readOnlyHint: boolean;
        destructiveHint: boolean;
    };
})[];
export declare function handleSimulationTool(name: string, args: Record<string, unknown>): Promise<{
    content: Array<{
        type: string;
        text: string;
    }>;
    isError?: boolean;
}>;
