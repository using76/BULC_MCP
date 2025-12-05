export declare const roomTools: ({
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
            name: {
                type: string;
                description: string;
            };
            level: {
                type: string;
                description: string;
            };
            points?: undefined;
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
            points: {
                type: string;
                description: string;
                items: {
                    type: string;
                    items: {
                        type: string;
                    };
                    minItems: number;
                    maxItems: number;
                };
                minItems: number;
            };
            name: {
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
            level: {
                type: string;
                description: string;
            };
            x?: undefined;
            y?: undefined;
            width?: undefined;
            depth?: undefined;
            name?: undefined;
            points?: undefined;
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
            name: {
                type: string;
                description: string;
            };
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
            level?: undefined;
            points?: undefined;
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
            x?: undefined;
            y?: undefined;
            width?: undefined;
            depth?: undefined;
            name?: undefined;
            level?: undefined;
            points?: undefined;
        };
        required: string[];
    };
    annotations: {
        readOnlyHint: boolean;
        destructiveHint: boolean;
    };
})[];
export declare function handleRoomTool(name: string, args: Record<string, unknown>): Promise<{
    content: Array<{
        type: string;
        text: string;
    }>;
    isError?: boolean;
}>;
