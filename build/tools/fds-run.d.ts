export declare const fdsRunTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            includeComments: {
                type: string;
                description: string;
            };
            outputPath?: undefined;
            filename?: undefined;
            includeGeometry?: undefined;
            mpiProcesses?: undefined;
            openmpThreads?: undefined;
            force?: undefined;
        };
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
            includeComments?: undefined;
            outputPath?: undefined;
            filename?: undefined;
            includeGeometry?: undefined;
            mpiProcesses?: undefined;
            openmpThreads?: undefined;
            force?: undefined;
        };
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
            outputPath: {
                type: string;
                description: string;
            };
            filename: {
                type: string;
                description: string;
            };
            includeGeometry: {
                type: string;
                description: string;
            };
            includeComments?: undefined;
            mpiProcesses?: undefined;
            openmpThreads?: undefined;
            force?: undefined;
        };
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
            mpiProcesses: {
                type: string;
                description: string;
            };
            openmpThreads: {
                type: string;
                description: string;
            };
            outputPath: {
                type: string;
                description: string;
            };
            includeComments?: undefined;
            filename?: undefined;
            includeGeometry?: undefined;
            force?: undefined;
        };
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
            force: {
                type: string;
                description: string;
            };
            includeComments?: undefined;
            outputPath?: undefined;
            filename?: undefined;
            includeGeometry?: undefined;
            mpiProcesses?: undefined;
            openmpThreads?: undefined;
        };
    };
    annotations: {
        readOnlyHint: boolean;
        destructiveHint: boolean;
    };
})[];
export declare function handleFdsRunTool(name: string, args: Record<string, unknown>): Promise<{
    content: Array<{
        type: string;
        text: string;
    }>;
    isError?: boolean;
}>;
