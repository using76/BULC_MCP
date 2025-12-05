export declare const meshTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            meshId?: undefined;
            xMin?: undefined;
            xMax?: undefined;
            yMin?: undefined;
            yMax?: undefined;
            zMin?: undefined;
            zMax?: undefined;
            iCells?: undefined;
            jCells?: undefined;
            kCells?: undefined;
            cellSize?: undefined;
            padding?: undefined;
            heightAboveRoof?: undefined;
            multiMesh?: undefined;
            maxCells?: undefined;
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
            meshId: {
                type: string;
                description: string;
            };
            xMin: {
                type: string;
                description: string;
            };
            xMax: {
                type: string;
                description: string;
            };
            yMin: {
                type: string;
                description: string;
            };
            yMax: {
                type: string;
                description: string;
            };
            zMin: {
                type: string;
                description: string;
            };
            zMax: {
                type: string;
                description: string;
            };
            iCells: {
                type: string;
                description: string;
            };
            jCells: {
                type: string;
                description: string;
            };
            kCells: {
                type: string;
                description: string;
            };
            cellSize: {
                type: string;
                description: string;
            };
            padding?: undefined;
            heightAboveRoof?: undefined;
            multiMesh?: undefined;
            maxCells?: undefined;
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
            cellSize: {
                type: string;
                description: string;
            };
            padding: {
                type: string;
                description: string;
            };
            heightAboveRoof: {
                type: string;
                description: string;
            };
            multiMesh: {
                type: string;
                description: string;
            };
            maxCells: {
                type: string;
                description: string;
            };
            meshId?: undefined;
            xMin?: undefined;
            xMax?: undefined;
            yMin?: undefined;
            yMax?: undefined;
            zMin?: undefined;
            zMax?: undefined;
            iCells?: undefined;
            jCells?: undefined;
            kCells?: undefined;
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
            meshId: {
                type: string;
                description: string;
            };
            xMin: {
                type: string;
                description: string;
            };
            xMax: {
                type: string;
                description: string;
            };
            yMin: {
                type: string;
                description: string;
            };
            yMax: {
                type: string;
                description: string;
            };
            zMin: {
                type: string;
                description: string;
            };
            zMax: {
                type: string;
                description: string;
            };
            iCells: {
                type: string;
                description: string;
            };
            jCells: {
                type: string;
                description: string;
            };
            kCells: {
                type: string;
                description: string;
            };
            cellSize?: undefined;
            padding?: undefined;
            heightAboveRoof?: undefined;
            multiMesh?: undefined;
            maxCells?: undefined;
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
            meshId: {
                type: string;
                description: string;
            };
            xMin?: undefined;
            xMax?: undefined;
            yMin?: undefined;
            yMax?: undefined;
            zMin?: undefined;
            zMax?: undefined;
            iCells?: undefined;
            jCells?: undefined;
            kCells?: undefined;
            cellSize?: undefined;
            padding?: undefined;
            heightAboveRoof?: undefined;
            multiMesh?: undefined;
            maxCells?: undefined;
        };
        required: string[];
    };
    annotations: {
        readOnlyHint: boolean;
        destructiveHint: boolean;
    };
})[];
export declare function handleMeshTool(name: string, args: Record<string, unknown>): Promise<{
    content: Array<{
        type: string;
        text: string;
    }>;
    isError?: boolean;
}>;
