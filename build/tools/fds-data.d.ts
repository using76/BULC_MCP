export declare const fdsDataTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            furnitureId: {
                type: string;
                description: string;
            };
            hrrpua?: undefined;
            surfaceId?: undefined;
            color?: undefined;
            ramp?: undefined;
            tauQ?: undefined;
            type?: undefined;
            rti?: undefined;
            activationTemperature?: undefined;
            alphaE?: undefined;
            betaE?: undefined;
            obscurationThreshold?: undefined;
            deviceId?: undefined;
            flowRate?: undefined;
            dropletDiameter?: undefined;
            sprayAngle?: undefined;
            particlesPerSecond?: undefined;
            surfaces?: undefined;
            flowType?: undefined;
            flowValue?: undefined;
            temperature?: undefined;
            beadDiameter?: undefined;
            emissivity?: undefined;
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
            furnitureId: {
                type: string;
                description: string;
            };
            hrrpua: {
                type: string;
                description: string;
            };
            surfaceId: {
                type: string;
                description: string;
            };
            color: {
                type: string;
                description: string;
            };
            ramp: {
                type: string;
                description: string;
                items: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
            };
            tauQ: {
                type: string;
                description: string;
            };
            type?: undefined;
            rti?: undefined;
            activationTemperature?: undefined;
            alphaE?: undefined;
            betaE?: undefined;
            obscurationThreshold?: undefined;
            deviceId?: undefined;
            flowRate?: undefined;
            dropletDiameter?: undefined;
            sprayAngle?: undefined;
            particlesPerSecond?: undefined;
            surfaces?: undefined;
            flowType?: undefined;
            flowValue?: undefined;
            temperature?: undefined;
            beadDiameter?: undefined;
            emissivity?: undefined;
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
            furnitureId: {
                type: string;
                description: string;
            };
            type: {
                type: string;
                description: string;
                enum: string[];
            };
            rti: {
                type: string;
                description: string;
            };
            activationTemperature: {
                type: string;
                description: string;
            };
            alphaE: {
                type: string;
                description: string;
            };
            betaE: {
                type: string;
                description: string;
            };
            obscurationThreshold: {
                type: string;
                description: string;
            };
            deviceId: {
                type: string;
                description: string;
            };
            hrrpua?: undefined;
            surfaceId?: undefined;
            color?: undefined;
            ramp?: undefined;
            tauQ?: undefined;
            flowRate?: undefined;
            dropletDiameter?: undefined;
            sprayAngle?: undefined;
            particlesPerSecond?: undefined;
            surfaces?: undefined;
            flowType?: undefined;
            flowValue?: undefined;
            temperature?: undefined;
            beadDiameter?: undefined;
            emissivity?: undefined;
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
            furnitureId: {
                type: string;
                description: string;
            };
            rti: {
                type: string;
                description: string;
            };
            activationTemperature: {
                type: string;
                description: string;
            };
            flowRate: {
                type: string;
                description: string;
            };
            dropletDiameter: {
                type: string;
                description: string;
            };
            sprayAngle: {
                type: string;
                description: string;
                items: {
                    type: string;
                };
            };
            particlesPerSecond: {
                type: string;
                description: string;
            };
            deviceId: {
                type: string;
                description: string;
            };
            hrrpua?: undefined;
            surfaceId?: undefined;
            color?: undefined;
            ramp?: undefined;
            tauQ?: undefined;
            type?: undefined;
            alphaE?: undefined;
            betaE?: undefined;
            obscurationThreshold?: undefined;
            surfaces?: undefined;
            flowType?: undefined;
            flowValue?: undefined;
            temperature?: undefined;
            beadDiameter?: undefined;
            emissivity?: undefined;
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
            furnitureId: {
                type: string;
                description: string;
            };
            surfaces: {
                type: string;
                description: string;
                properties: {
                    minX: {
                        type: string;
                        enum: string[];
                    };
                    maxX: {
                        type: string;
                        enum: string[];
                    };
                    minY: {
                        type: string;
                        enum: string[];
                    };
                    maxY: {
                        type: string;
                        enum: string[];
                    };
                    minZ: {
                        type: string;
                        enum: string[];
                    };
                    maxZ: {
                        type: string;
                        enum: string[];
                    };
                };
            };
            flowType: {
                type: string;
                description: string;
                enum: string[];
            };
            flowValue: {
                type: string;
                description: string;
            };
            temperature: {
                type: string;
                description: string;
            };
            surfaceId: {
                type: string;
                description: string;
            };
            hrrpua?: undefined;
            color?: undefined;
            ramp?: undefined;
            tauQ?: undefined;
            type?: undefined;
            rti?: undefined;
            activationTemperature?: undefined;
            alphaE?: undefined;
            betaE?: undefined;
            obscurationThreshold?: undefined;
            deviceId?: undefined;
            flowRate?: undefined;
            dropletDiameter?: undefined;
            sprayAngle?: undefined;
            particlesPerSecond?: undefined;
            beadDiameter?: undefined;
            emissivity?: undefined;
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
            furnitureId: {
                type: string;
                description: string;
            };
            beadDiameter: {
                type: string;
                description: string;
            };
            emissivity: {
                type: string;
                description: string;
            };
            deviceId: {
                type: string;
                description: string;
            };
            hrrpua?: undefined;
            surfaceId?: undefined;
            color?: undefined;
            ramp?: undefined;
            tauQ?: undefined;
            type?: undefined;
            rti?: undefined;
            activationTemperature?: undefined;
            alphaE?: undefined;
            betaE?: undefined;
            obscurationThreshold?: undefined;
            flowRate?: undefined;
            dropletDiameter?: undefined;
            sprayAngle?: undefined;
            particlesPerSecond?: undefined;
            surfaces?: undefined;
            flowType?: undefined;
            flowValue?: undefined;
            temperature?: undefined;
        };
        required: string[];
    };
    annotations: {
        readOnlyHint: boolean;
        destructiveHint: boolean;
    };
})[];
export declare function handleFdsDataTool(name: string, args: Record<string, unknown>): Promise<{
    content: Array<{
        type: string;
        text: string;
    }>;
    isError?: boolean;
}>;
