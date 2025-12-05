export declare const furnitureTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            category: {
                type: string;
                description: string;
            };
            search: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            catalogId?: undefined;
            x?: undefined;
            y?: undefined;
            elevation?: undefined;
            angle?: undefined;
            width?: undefined;
            depth?: undefined;
            height?: undefined;
            name?: undefined;
            level?: undefined;
            room?: undefined;
            id?: undefined;
            visible?: undefined;
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
            catalogId: {
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
            elevation: {
                type: string;
                description: string;
            };
            angle: {
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
            height: {
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
            category?: undefined;
            search?: undefined;
            limit?: undefined;
            room?: undefined;
            id?: undefined;
            visible?: undefined;
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
            room: {
                type: string;
                description: string;
            };
            category: {
                type: string;
                description: string;
            };
            search?: undefined;
            limit?: undefined;
            catalogId?: undefined;
            x?: undefined;
            y?: undefined;
            elevation?: undefined;
            angle?: undefined;
            width?: undefined;
            depth?: undefined;
            height?: undefined;
            name?: undefined;
            id?: undefined;
            visible?: undefined;
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
            x: {
                type: string;
                description: string;
            };
            y: {
                type: string;
                description: string;
            };
            elevation: {
                type: string;
                description: string;
            };
            angle: {
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
            height: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            visible: {
                type: string;
                description: string;
            };
            category?: undefined;
            search?: undefined;
            limit?: undefined;
            catalogId?: undefined;
            level?: undefined;
            room?: undefined;
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
            category?: undefined;
            search?: undefined;
            limit?: undefined;
            catalogId?: undefined;
            x?: undefined;
            y?: undefined;
            elevation?: undefined;
            angle?: undefined;
            width?: undefined;
            depth?: undefined;
            height?: undefined;
            name?: undefined;
            level?: undefined;
            room?: undefined;
            visible?: undefined;
        };
        required: string[];
    };
    annotations: {
        readOnlyHint: boolean;
        destructiveHint: boolean;
    };
})[];
export declare function handleFurnitureTool(name: string, args: Record<string, unknown>): Promise<{
    content: Array<{
        type: string;
        text: string;
    }>;
    isError?: boolean;
}>;
