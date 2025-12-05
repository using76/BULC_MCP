export declare const wallTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            xStart: {
                type: string;
                description: string;
            };
            yStart: {
                type: string;
                description: string;
            };
            xEnd: {
                type: string;
                description: string;
            };
            yEnd: {
                type: string;
                description: string;
            };
            thickness: {
                type: string;
                description: string;
            };
            height: {
                type: string;
                description: string;
            };
            level: {
                type: string;
                description: string;
            };
            x?: undefined;
            y?: undefined;
            width?: undefined;
            depth?: undefined;
            id?: undefined;
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
            x: {
                type: string;
                description: string;
            };
            y: {
                type: string;
                description: string;
            };
            width: {
                type: string;
                description: string;
            };
            depth: {
                type: string;
                description: string;
            };
            thickness: {
                type: string;
                description: string;
            };
            height: {
                type: string;
                description: string;
            };
            level: {
                type: string;
                description: string;
            };
            xStart?: undefined;
            yStart?: undefined;
            xEnd?: undefined;
            yEnd?: undefined;
            id?: undefined;
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
            xStart?: undefined;
            yStart?: undefined;
            xEnd?: undefined;
            yEnd?: undefined;
            thickness?: undefined;
            height?: undefined;
            x?: undefined;
            y?: undefined;
            width?: undefined;
            depth?: undefined;
            id?: undefined;
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
            id: {
                type: string;
                description: string;
            };
            xStart: {
                type: string;
                description: string;
            };
            yStart: {
                type: string;
                description: string;
            };
            xEnd: {
                type: string;
                description: string;
            };
            yEnd: {
                type: string;
                description: string;
            };
            thickness: {
                type: string;
                description: string;
            };
            height: {
                type: string;
                description: string;
            };
            level?: undefined;
            x?: undefined;
            y?: undefined;
            width?: undefined;
            depth?: undefined;
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
            id: {
                type: string;
                description: string;
            };
            xStart?: undefined;
            yStart?: undefined;
            xEnd?: undefined;
            yEnd?: undefined;
            thickness?: undefined;
            height?: undefined;
            level?: undefined;
            x?: undefined;
            y?: undefined;
            width?: undefined;
            depth?: undefined;
        };
        required: string[];
    };
    annotations: {
        readOnlyHint: boolean;
        destructiveHint: boolean;
    };
})[];
export declare function handleWallTool(name: string, args: Record<string, unknown>): Promise<{
    content: Array<{
        type: string;
        text: string;
    }>;
    isError?: boolean;
}>;
