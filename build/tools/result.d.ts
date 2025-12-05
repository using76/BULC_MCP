export declare const resultTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            smvPath: {
                type: string;
                description: string;
            };
            loadGeometry: {
                type: string;
                description: string;
            };
            type?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            variable?: undefined;
            dataSource?: undefined;
            exitX?: undefined;
            exitY?: undefined;
            exitZ?: undefined;
            criteria?: undefined;
            reportType?: undefined;
            outputPath?: undefined;
            language?: undefined;
            includeGraphs?: undefined;
            includeSlices?: undefined;
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
            type: {
                type: string;
                description: string;
                enum: string[];
            };
            smvPath?: undefined;
            loadGeometry?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            variable?: undefined;
            dataSource?: undefined;
            exitX?: undefined;
            exitY?: undefined;
            exitZ?: undefined;
            criteria?: undefined;
            reportType?: undefined;
            outputPath?: undefined;
            language?: undefined;
            includeGraphs?: undefined;
            includeSlices?: undefined;
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
            x: {
                type: string;
                description: string;
            };
            y: {
                type: string;
                description: string;
            };
            z: {
                type: string;
                description: string;
            };
            variable: {
                type: string;
                description: string;
                enum: string[];
            };
            dataSource: {
                type: string;
                description: string;
                enum: string[];
            };
            smvPath?: undefined;
            loadGeometry?: undefined;
            type?: undefined;
            exitX?: undefined;
            exitY?: undefined;
            exitZ?: undefined;
            criteria?: undefined;
            reportType?: undefined;
            outputPath?: undefined;
            language?: undefined;
            includeGraphs?: undefined;
            includeSlices?: undefined;
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
            exitX: {
                type: string;
                description: string;
            };
            exitY: {
                type: string;
                description: string;
            };
            exitZ: {
                type: string;
                description: string;
            };
            criteria: {
                type: string;
                description: string;
                properties: {
                    maxTemperature: {
                        type: string;
                        description: string;
                    };
                    minVisibility: {
                        type: string;
                        description: string;
                    };
                    maxCo: {
                        type: string;
                        description: string;
                    };
                    maxCo2: {
                        type: string;
                        description: string;
                    };
                    minO2: {
                        type: string;
                        description: string;
                    };
                };
            };
            smvPath?: undefined;
            loadGeometry?: undefined;
            type?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            variable?: undefined;
            dataSource?: undefined;
            reportType?: undefined;
            outputPath?: undefined;
            language?: undefined;
            includeGraphs?: undefined;
            includeSlices?: undefined;
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
            reportType: {
                type: string;
                description: string;
                enum: string[];
            };
            outputPath: {
                type: string;
                description: string;
            };
            language: {
                type: string;
                description: string;
                enum: string[];
            };
            includeGraphs: {
                type: string;
                description: string;
            };
            includeSlices: {
                type: string;
                description: string;
            };
            smvPath?: undefined;
            loadGeometry?: undefined;
            type?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            variable?: undefined;
            dataSource?: undefined;
            exitX?: undefined;
            exitY?: undefined;
            exitZ?: undefined;
            criteria?: undefined;
        };
        required?: undefined;
    };
    annotations: {
        readOnlyHint: boolean;
        destructiveHint: boolean;
    };
})[];
export declare function handleResultTool(name: string, args: Record<string, unknown>): Promise<{
    content: Array<{
        type: string;
        text: string;
    }>;
    isError?: boolean;
}>;
