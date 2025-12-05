export declare const contextTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            level: {
                type: string;
                description: string;
            };
            name?: undefined;
            elevation?: undefined;
            floorHeight?: undefined;
            path?: undefined;
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
            level?: undefined;
            name?: undefined;
            elevation?: undefined;
            floorHeight?: undefined;
            path?: undefined;
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
            name: {
                type: string;
                description: string;
            };
            elevation: {
                type: string;
                description: string;
            };
            floorHeight: {
                type: string;
                description: string;
            };
            level?: undefined;
            path?: undefined;
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
            level: {
                type: string;
                description: string;
            };
            name?: undefined;
            elevation?: undefined;
            floorHeight?: undefined;
            path?: undefined;
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
            path: {
                type: string;
                description: string;
            };
            level?: undefined;
            name?: undefined;
            elevation?: undefined;
            floorHeight?: undefined;
        };
        required?: undefined;
    };
    annotations: {
        readOnlyHint: boolean;
        destructiveHint: boolean;
    };
})[];
export declare function handleContextTool(name: string, args: Record<string, unknown>): Promise<{
    content: Array<{
        type: string;
        text: string;
    }>;
    isError?: boolean;
}>;
