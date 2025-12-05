export declare const evacTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            simulationTime: {
                type: string;
                description: string;
            };
            timeStep: {
                type: string;
                description: string;
            };
            model?: undefined;
            strengthNeighborRepulsion?: undefined;
            rangeNeighborRepulsion?: undefined;
            bodyForce?: undefined;
            friction?: undefined;
            furnitureId?: undefined;
            fromFloor?: undefined;
            toFloor?: undefined;
            entryX?: undefined;
            entryY?: undefined;
            exitX?: undefined;
            exitY?: undefined;
            width?: undefined;
            capacity?: undefined;
            travelSpeed?: undefined;
            level?: undefined;
            room?: undefined;
            count?: undefined;
            positions?: undefined;
            agentRadius?: undefined;
            desiredSpeed?: undefined;
            maxSpeed?: undefined;
            minSpacing?: undefined;
            multiLevel?: undefined;
            evacPath?: undefined;
            outputPath?: undefined;
            language?: undefined;
            includeAgentDetails?: undefined;
            filename?: undefined;
            mode?: undefined;
            balanceThreshold?: undefined;
            customAssignments?: undefined;
            detectionTime?: undefined;
            reactionTimeMean?: undefined;
            reactionTimeStdDev?: undefined;
            distribution?: undefined;
            minReactionTime?: undefined;
            maxReactionTime?: undefined;
            applyPerRoom?: undefined;
            roomSettings?: undefined;
            enabled?: undefined;
            visibilityThreshold?: undefined;
            temperatureThreshold?: undefined;
            coThreshold?: undefined;
            speedReductionFactor?: undefined;
            updateInterval?: undefined;
            fdsResultPath?: undefined;
            includeTrajectories?: undefined;
            includeFlowRates?: undefined;
            includeBottlenecks?: undefined;
            timeRange?: undefined;
            agentIds?: undefined;
            objPath?: undefined;
            autoPlay?: undefined;
            playbackSpeed?: undefined;
            agentScale?: undefined;
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
            simulationTime?: undefined;
            timeStep?: undefined;
            model?: undefined;
            strengthNeighborRepulsion?: undefined;
            rangeNeighborRepulsion?: undefined;
            bodyForce?: undefined;
            friction?: undefined;
            furnitureId?: undefined;
            fromFloor?: undefined;
            toFloor?: undefined;
            entryX?: undefined;
            entryY?: undefined;
            exitX?: undefined;
            exitY?: undefined;
            width?: undefined;
            capacity?: undefined;
            travelSpeed?: undefined;
            level?: undefined;
            room?: undefined;
            count?: undefined;
            positions?: undefined;
            agentRadius?: undefined;
            desiredSpeed?: undefined;
            maxSpeed?: undefined;
            minSpacing?: undefined;
            multiLevel?: undefined;
            evacPath?: undefined;
            outputPath?: undefined;
            language?: undefined;
            includeAgentDetails?: undefined;
            filename?: undefined;
            mode?: undefined;
            balanceThreshold?: undefined;
            customAssignments?: undefined;
            detectionTime?: undefined;
            reactionTimeMean?: undefined;
            reactionTimeStdDev?: undefined;
            distribution?: undefined;
            minReactionTime?: undefined;
            maxReactionTime?: undefined;
            applyPerRoom?: undefined;
            roomSettings?: undefined;
            enabled?: undefined;
            visibilityThreshold?: undefined;
            temperatureThreshold?: undefined;
            coThreshold?: undefined;
            speedReductionFactor?: undefined;
            updateInterval?: undefined;
            fdsResultPath?: undefined;
            includeTrajectories?: undefined;
            includeFlowRates?: undefined;
            includeBottlenecks?: undefined;
            timeRange?: undefined;
            agentIds?: undefined;
            objPath?: undefined;
            autoPlay?: undefined;
            playbackSpeed?: undefined;
            agentScale?: undefined;
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
            model: {
                type: string;
                description: string;
                enum: string[];
            };
            simulationTime: {
                type: string;
                description: string;
            };
            timeStep: {
                type: string;
                description: string;
            };
            strengthNeighborRepulsion: {
                type: string;
                description: string;
            };
            rangeNeighborRepulsion: {
                type: string;
                description: string;
            };
            bodyForce: {
                type: string;
                description: string;
            };
            friction: {
                type: string;
                description: string;
            };
            furnitureId?: undefined;
            fromFloor?: undefined;
            toFloor?: undefined;
            entryX?: undefined;
            entryY?: undefined;
            exitX?: undefined;
            exitY?: undefined;
            width?: undefined;
            capacity?: undefined;
            travelSpeed?: undefined;
            level?: undefined;
            room?: undefined;
            count?: undefined;
            positions?: undefined;
            agentRadius?: undefined;
            desiredSpeed?: undefined;
            maxSpeed?: undefined;
            minSpacing?: undefined;
            multiLevel?: undefined;
            evacPath?: undefined;
            outputPath?: undefined;
            language?: undefined;
            includeAgentDetails?: undefined;
            filename?: undefined;
            mode?: undefined;
            balanceThreshold?: undefined;
            customAssignments?: undefined;
            detectionTime?: undefined;
            reactionTimeMean?: undefined;
            reactionTimeStdDev?: undefined;
            distribution?: undefined;
            minReactionTime?: undefined;
            maxReactionTime?: undefined;
            applyPerRoom?: undefined;
            roomSettings?: undefined;
            enabled?: undefined;
            visibilityThreshold?: undefined;
            temperatureThreshold?: undefined;
            coThreshold?: undefined;
            speedReductionFactor?: undefined;
            updateInterval?: undefined;
            fdsResultPath?: undefined;
            includeTrajectories?: undefined;
            includeFlowRates?: undefined;
            includeBottlenecks?: undefined;
            timeRange?: undefined;
            agentIds?: undefined;
            objPath?: undefined;
            autoPlay?: undefined;
            playbackSpeed?: undefined;
            agentScale?: undefined;
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
            furnitureId: {
                type: string;
                description: string;
            };
            fromFloor: {
                type: string;
                description: string;
            };
            toFloor: {
                type: string;
                description: string;
            };
            entryX: {
                type: string;
                description: string;
            };
            entryY: {
                type: string;
                description: string;
            };
            exitX: {
                type: string;
                description: string;
            };
            exitY: {
                type: string;
                description: string;
            };
            width: {
                type: string;
                description: string;
            };
            capacity: {
                type: string;
                description: string;
            };
            travelSpeed: {
                type: string;
                description: string;
            };
            simulationTime?: undefined;
            timeStep?: undefined;
            model?: undefined;
            strengthNeighborRepulsion?: undefined;
            rangeNeighborRepulsion?: undefined;
            bodyForce?: undefined;
            friction?: undefined;
            level?: undefined;
            room?: undefined;
            count?: undefined;
            positions?: undefined;
            agentRadius?: undefined;
            desiredSpeed?: undefined;
            maxSpeed?: undefined;
            minSpacing?: undefined;
            multiLevel?: undefined;
            evacPath?: undefined;
            outputPath?: undefined;
            language?: undefined;
            includeAgentDetails?: undefined;
            filename?: undefined;
            mode?: undefined;
            balanceThreshold?: undefined;
            customAssignments?: undefined;
            detectionTime?: undefined;
            reactionTimeMean?: undefined;
            reactionTimeStdDev?: undefined;
            distribution?: undefined;
            minReactionTime?: undefined;
            maxReactionTime?: undefined;
            applyPerRoom?: undefined;
            roomSettings?: undefined;
            enabled?: undefined;
            visibilityThreshold?: undefined;
            temperatureThreshold?: undefined;
            coThreshold?: undefined;
            speedReductionFactor?: undefined;
            updateInterval?: undefined;
            fdsResultPath?: undefined;
            includeTrajectories?: undefined;
            includeFlowRates?: undefined;
            includeBottlenecks?: undefined;
            timeRange?: undefined;
            agentIds?: undefined;
            objPath?: undefined;
            autoPlay?: undefined;
            playbackSpeed?: undefined;
            agentScale?: undefined;
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
            simulationTime?: undefined;
            timeStep?: undefined;
            model?: undefined;
            strengthNeighborRepulsion?: undefined;
            rangeNeighborRepulsion?: undefined;
            bodyForce?: undefined;
            friction?: undefined;
            fromFloor?: undefined;
            toFloor?: undefined;
            entryX?: undefined;
            entryY?: undefined;
            exitX?: undefined;
            exitY?: undefined;
            width?: undefined;
            capacity?: undefined;
            travelSpeed?: undefined;
            level?: undefined;
            room?: undefined;
            count?: undefined;
            positions?: undefined;
            agentRadius?: undefined;
            desiredSpeed?: undefined;
            maxSpeed?: undefined;
            minSpacing?: undefined;
            multiLevel?: undefined;
            evacPath?: undefined;
            outputPath?: undefined;
            language?: undefined;
            includeAgentDetails?: undefined;
            filename?: undefined;
            mode?: undefined;
            balanceThreshold?: undefined;
            customAssignments?: undefined;
            detectionTime?: undefined;
            reactionTimeMean?: undefined;
            reactionTimeStdDev?: undefined;
            distribution?: undefined;
            minReactionTime?: undefined;
            maxReactionTime?: undefined;
            applyPerRoom?: undefined;
            roomSettings?: undefined;
            enabled?: undefined;
            visibilityThreshold?: undefined;
            temperatureThreshold?: undefined;
            coThreshold?: undefined;
            speedReductionFactor?: undefined;
            updateInterval?: undefined;
            fdsResultPath?: undefined;
            includeTrajectories?: undefined;
            includeFlowRates?: undefined;
            includeBottlenecks?: undefined;
            timeRange?: undefined;
            agentIds?: undefined;
            objPath?: undefined;
            autoPlay?: undefined;
            playbackSpeed?: undefined;
            agentScale?: undefined;
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
            simulationTime?: undefined;
            timeStep?: undefined;
            model?: undefined;
            strengthNeighborRepulsion?: undefined;
            rangeNeighborRepulsion?: undefined;
            bodyForce?: undefined;
            friction?: undefined;
            furnitureId?: undefined;
            fromFloor?: undefined;
            toFloor?: undefined;
            entryX?: undefined;
            entryY?: undefined;
            exitX?: undefined;
            exitY?: undefined;
            width?: undefined;
            capacity?: undefined;
            travelSpeed?: undefined;
            count?: undefined;
            positions?: undefined;
            agentRadius?: undefined;
            desiredSpeed?: undefined;
            maxSpeed?: undefined;
            minSpacing?: undefined;
            multiLevel?: undefined;
            evacPath?: undefined;
            outputPath?: undefined;
            language?: undefined;
            includeAgentDetails?: undefined;
            filename?: undefined;
            mode?: undefined;
            balanceThreshold?: undefined;
            customAssignments?: undefined;
            detectionTime?: undefined;
            reactionTimeMean?: undefined;
            reactionTimeStdDev?: undefined;
            distribution?: undefined;
            minReactionTime?: undefined;
            maxReactionTime?: undefined;
            applyPerRoom?: undefined;
            roomSettings?: undefined;
            enabled?: undefined;
            visibilityThreshold?: undefined;
            temperatureThreshold?: undefined;
            coThreshold?: undefined;
            speedReductionFactor?: undefined;
            updateInterval?: undefined;
            fdsResultPath?: undefined;
            includeTrajectories?: undefined;
            includeFlowRates?: undefined;
            includeBottlenecks?: undefined;
            timeRange?: undefined;
            agentIds?: undefined;
            objPath?: undefined;
            autoPlay?: undefined;
            playbackSpeed?: undefined;
            agentScale?: undefined;
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
            room: {
                type: string;
                description: string;
            };
            level: {
                type: string;
                description: string;
            };
            count: {
                type: string;
                description: string;
            };
            positions: {
                type: string;
                description: string;
                items: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
            };
            agentRadius: {
                type: string;
                description: string;
            };
            desiredSpeed: {
                type: string;
                description: string;
            };
            maxSpeed: {
                type: string;
                description: string;
            };
            minSpacing: {
                type: string;
                description: string;
            };
            simulationTime?: undefined;
            timeStep?: undefined;
            model?: undefined;
            strengthNeighborRepulsion?: undefined;
            rangeNeighborRepulsion?: undefined;
            bodyForce?: undefined;
            friction?: undefined;
            furnitureId?: undefined;
            fromFloor?: undefined;
            toFloor?: undefined;
            entryX?: undefined;
            entryY?: undefined;
            exitX?: undefined;
            exitY?: undefined;
            width?: undefined;
            capacity?: undefined;
            travelSpeed?: undefined;
            multiLevel?: undefined;
            evacPath?: undefined;
            outputPath?: undefined;
            language?: undefined;
            includeAgentDetails?: undefined;
            filename?: undefined;
            mode?: undefined;
            balanceThreshold?: undefined;
            customAssignments?: undefined;
            detectionTime?: undefined;
            reactionTimeMean?: undefined;
            reactionTimeStdDev?: undefined;
            distribution?: undefined;
            minReactionTime?: undefined;
            maxReactionTime?: undefined;
            applyPerRoom?: undefined;
            roomSettings?: undefined;
            enabled?: undefined;
            visibilityThreshold?: undefined;
            temperatureThreshold?: undefined;
            coThreshold?: undefined;
            speedReductionFactor?: undefined;
            updateInterval?: undefined;
            fdsResultPath?: undefined;
            includeTrajectories?: undefined;
            includeFlowRates?: undefined;
            includeBottlenecks?: undefined;
            timeRange?: undefined;
            agentIds?: undefined;
            objPath?: undefined;
            autoPlay?: undefined;
            playbackSpeed?: undefined;
            agentScale?: undefined;
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
            agentRadius: {
                type: string;
                description: string;
            };
            desiredSpeed: {
                type: string;
                description: string;
            };
            maxSpeed: {
                type: string;
                description: string;
            };
            minSpacing: {
                type: string;
                description: string;
            };
            simulationTime?: undefined;
            timeStep?: undefined;
            model?: undefined;
            strengthNeighborRepulsion?: undefined;
            rangeNeighborRepulsion?: undefined;
            bodyForce?: undefined;
            friction?: undefined;
            furnitureId?: undefined;
            fromFloor?: undefined;
            toFloor?: undefined;
            entryX?: undefined;
            entryY?: undefined;
            exitX?: undefined;
            exitY?: undefined;
            width?: undefined;
            capacity?: undefined;
            travelSpeed?: undefined;
            level?: undefined;
            room?: undefined;
            count?: undefined;
            positions?: undefined;
            multiLevel?: undefined;
            evacPath?: undefined;
            outputPath?: undefined;
            language?: undefined;
            includeAgentDetails?: undefined;
            filename?: undefined;
            mode?: undefined;
            balanceThreshold?: undefined;
            customAssignments?: undefined;
            detectionTime?: undefined;
            reactionTimeMean?: undefined;
            reactionTimeStdDev?: undefined;
            distribution?: undefined;
            minReactionTime?: undefined;
            maxReactionTime?: undefined;
            applyPerRoom?: undefined;
            roomSettings?: undefined;
            enabled?: undefined;
            visibilityThreshold?: undefined;
            temperatureThreshold?: undefined;
            coThreshold?: undefined;
            speedReductionFactor?: undefined;
            updateInterval?: undefined;
            fdsResultPath?: undefined;
            includeTrajectories?: undefined;
            includeFlowRates?: undefined;
            includeBottlenecks?: undefined;
            timeRange?: undefined;
            agentIds?: undefined;
            objPath?: undefined;
            autoPlay?: undefined;
            playbackSpeed?: undefined;
            agentScale?: undefined;
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
            level: {
                type: string;
                description: string;
            };
            simulationTime?: undefined;
            timeStep?: undefined;
            model?: undefined;
            strengthNeighborRepulsion?: undefined;
            rangeNeighborRepulsion?: undefined;
            bodyForce?: undefined;
            friction?: undefined;
            furnitureId?: undefined;
            fromFloor?: undefined;
            toFloor?: undefined;
            entryX?: undefined;
            entryY?: undefined;
            exitX?: undefined;
            exitY?: undefined;
            width?: undefined;
            capacity?: undefined;
            travelSpeed?: undefined;
            room?: undefined;
            count?: undefined;
            positions?: undefined;
            agentRadius?: undefined;
            desiredSpeed?: undefined;
            maxSpeed?: undefined;
            minSpacing?: undefined;
            multiLevel?: undefined;
            evacPath?: undefined;
            outputPath?: undefined;
            language?: undefined;
            includeAgentDetails?: undefined;
            filename?: undefined;
            mode?: undefined;
            balanceThreshold?: undefined;
            customAssignments?: undefined;
            detectionTime?: undefined;
            reactionTimeMean?: undefined;
            reactionTimeStdDev?: undefined;
            distribution?: undefined;
            minReactionTime?: undefined;
            maxReactionTime?: undefined;
            applyPerRoom?: undefined;
            roomSettings?: undefined;
            enabled?: undefined;
            visibilityThreshold?: undefined;
            temperatureThreshold?: undefined;
            coThreshold?: undefined;
            speedReductionFactor?: undefined;
            updateInterval?: undefined;
            fdsResultPath?: undefined;
            includeTrajectories?: undefined;
            includeFlowRates?: undefined;
            includeBottlenecks?: undefined;
            timeRange?: undefined;
            agentIds?: undefined;
            objPath?: undefined;
            autoPlay?: undefined;
            playbackSpeed?: undefined;
            agentScale?: undefined;
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
            multiLevel: {
                type: string;
                description: string;
            };
            simulationTime?: undefined;
            timeStep?: undefined;
            model?: undefined;
            strengthNeighborRepulsion?: undefined;
            rangeNeighborRepulsion?: undefined;
            bodyForce?: undefined;
            friction?: undefined;
            furnitureId?: undefined;
            fromFloor?: undefined;
            toFloor?: undefined;
            entryX?: undefined;
            entryY?: undefined;
            exitX?: undefined;
            exitY?: undefined;
            width?: undefined;
            capacity?: undefined;
            travelSpeed?: undefined;
            level?: undefined;
            room?: undefined;
            count?: undefined;
            positions?: undefined;
            agentRadius?: undefined;
            desiredSpeed?: undefined;
            maxSpeed?: undefined;
            minSpacing?: undefined;
            evacPath?: undefined;
            outputPath?: undefined;
            language?: undefined;
            includeAgentDetails?: undefined;
            filename?: undefined;
            mode?: undefined;
            balanceThreshold?: undefined;
            customAssignments?: undefined;
            detectionTime?: undefined;
            reactionTimeMean?: undefined;
            reactionTimeStdDev?: undefined;
            distribution?: undefined;
            minReactionTime?: undefined;
            maxReactionTime?: undefined;
            applyPerRoom?: undefined;
            roomSettings?: undefined;
            enabled?: undefined;
            visibilityThreshold?: undefined;
            temperatureThreshold?: undefined;
            coThreshold?: undefined;
            speedReductionFactor?: undefined;
            updateInterval?: undefined;
            fdsResultPath?: undefined;
            includeTrajectories?: undefined;
            includeFlowRates?: undefined;
            includeBottlenecks?: undefined;
            timeRange?: undefined;
            agentIds?: undefined;
            objPath?: undefined;
            autoPlay?: undefined;
            playbackSpeed?: undefined;
            agentScale?: undefined;
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
            evacPath: {
                type: string;
                description: string;
            };
            simulationTime?: undefined;
            timeStep?: undefined;
            model?: undefined;
            strengthNeighborRepulsion?: undefined;
            rangeNeighborRepulsion?: undefined;
            bodyForce?: undefined;
            friction?: undefined;
            furnitureId?: undefined;
            fromFloor?: undefined;
            toFloor?: undefined;
            entryX?: undefined;
            entryY?: undefined;
            exitX?: undefined;
            exitY?: undefined;
            width?: undefined;
            capacity?: undefined;
            travelSpeed?: undefined;
            level?: undefined;
            room?: undefined;
            count?: undefined;
            positions?: undefined;
            agentRadius?: undefined;
            desiredSpeed?: undefined;
            maxSpeed?: undefined;
            minSpacing?: undefined;
            multiLevel?: undefined;
            outputPath?: undefined;
            language?: undefined;
            includeAgentDetails?: undefined;
            filename?: undefined;
            mode?: undefined;
            balanceThreshold?: undefined;
            customAssignments?: undefined;
            detectionTime?: undefined;
            reactionTimeMean?: undefined;
            reactionTimeStdDev?: undefined;
            distribution?: undefined;
            minReactionTime?: undefined;
            maxReactionTime?: undefined;
            applyPerRoom?: undefined;
            roomSettings?: undefined;
            enabled?: undefined;
            visibilityThreshold?: undefined;
            temperatureThreshold?: undefined;
            coThreshold?: undefined;
            speedReductionFactor?: undefined;
            updateInterval?: undefined;
            fdsResultPath?: undefined;
            includeTrajectories?: undefined;
            includeFlowRates?: undefined;
            includeBottlenecks?: undefined;
            timeRange?: undefined;
            agentIds?: undefined;
            objPath?: undefined;
            autoPlay?: undefined;
            playbackSpeed?: undefined;
            agentScale?: undefined;
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
            outputPath: {
                type: string;
                description: string;
            };
            language: {
                type: string;
                description: string;
                enum: string[];
            };
            includeAgentDetails: {
                type: string;
                description: string;
            };
            simulationTime?: undefined;
            timeStep?: undefined;
            model?: undefined;
            strengthNeighborRepulsion?: undefined;
            rangeNeighborRepulsion?: undefined;
            bodyForce?: undefined;
            friction?: undefined;
            furnitureId?: undefined;
            fromFloor?: undefined;
            toFloor?: undefined;
            entryX?: undefined;
            entryY?: undefined;
            exitX?: undefined;
            exitY?: undefined;
            width?: undefined;
            capacity?: undefined;
            travelSpeed?: undefined;
            level?: undefined;
            room?: undefined;
            count?: undefined;
            positions?: undefined;
            agentRadius?: undefined;
            desiredSpeed?: undefined;
            maxSpeed?: undefined;
            minSpacing?: undefined;
            multiLevel?: undefined;
            evacPath?: undefined;
            filename?: undefined;
            mode?: undefined;
            balanceThreshold?: undefined;
            customAssignments?: undefined;
            detectionTime?: undefined;
            reactionTimeMean?: undefined;
            reactionTimeStdDev?: undefined;
            distribution?: undefined;
            minReactionTime?: undefined;
            maxReactionTime?: undefined;
            applyPerRoom?: undefined;
            roomSettings?: undefined;
            enabled?: undefined;
            visibilityThreshold?: undefined;
            temperatureThreshold?: undefined;
            coThreshold?: undefined;
            speedReductionFactor?: undefined;
            updateInterval?: undefined;
            fdsResultPath?: undefined;
            includeTrajectories?: undefined;
            includeFlowRates?: undefined;
            includeBottlenecks?: undefined;
            timeRange?: undefined;
            agentIds?: undefined;
            objPath?: undefined;
            autoPlay?: undefined;
            playbackSpeed?: undefined;
            agentScale?: undefined;
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
            outputPath: {
                type: string;
                description: string;
            };
            filename: {
                type: string;
                description: string;
            };
            simulationTime?: undefined;
            timeStep?: undefined;
            model?: undefined;
            strengthNeighborRepulsion?: undefined;
            rangeNeighborRepulsion?: undefined;
            bodyForce?: undefined;
            friction?: undefined;
            furnitureId?: undefined;
            fromFloor?: undefined;
            toFloor?: undefined;
            entryX?: undefined;
            entryY?: undefined;
            exitX?: undefined;
            exitY?: undefined;
            width?: undefined;
            capacity?: undefined;
            travelSpeed?: undefined;
            level?: undefined;
            room?: undefined;
            count?: undefined;
            positions?: undefined;
            agentRadius?: undefined;
            desiredSpeed?: undefined;
            maxSpeed?: undefined;
            minSpacing?: undefined;
            multiLevel?: undefined;
            evacPath?: undefined;
            language?: undefined;
            includeAgentDetails?: undefined;
            mode?: undefined;
            balanceThreshold?: undefined;
            customAssignments?: undefined;
            detectionTime?: undefined;
            reactionTimeMean?: undefined;
            reactionTimeStdDev?: undefined;
            distribution?: undefined;
            minReactionTime?: undefined;
            maxReactionTime?: undefined;
            applyPerRoom?: undefined;
            roomSettings?: undefined;
            enabled?: undefined;
            visibilityThreshold?: undefined;
            temperatureThreshold?: undefined;
            coThreshold?: undefined;
            speedReductionFactor?: undefined;
            updateInterval?: undefined;
            fdsResultPath?: undefined;
            includeTrajectories?: undefined;
            includeFlowRates?: undefined;
            includeBottlenecks?: undefined;
            timeRange?: undefined;
            agentIds?: undefined;
            objPath?: undefined;
            autoPlay?: undefined;
            playbackSpeed?: undefined;
            agentScale?: undefined;
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
            furnitureId: {
                type: string;
                description: string;
            };
            entryX: {
                type: string;
                description: string;
            };
            entryY: {
                type: string;
                description: string;
            };
            exitX: {
                type: string;
                description: string;
            };
            exitY: {
                type: string;
                description: string;
            };
            width: {
                type: string;
                description: string;
            };
            capacity: {
                type: string;
                description: string;
            };
            travelSpeed: {
                type: string;
                description: string;
            };
            simulationTime?: undefined;
            timeStep?: undefined;
            model?: undefined;
            strengthNeighborRepulsion?: undefined;
            rangeNeighborRepulsion?: undefined;
            bodyForce?: undefined;
            friction?: undefined;
            fromFloor?: undefined;
            toFloor?: undefined;
            level?: undefined;
            room?: undefined;
            count?: undefined;
            positions?: undefined;
            agentRadius?: undefined;
            desiredSpeed?: undefined;
            maxSpeed?: undefined;
            minSpacing?: undefined;
            multiLevel?: undefined;
            evacPath?: undefined;
            outputPath?: undefined;
            language?: undefined;
            includeAgentDetails?: undefined;
            filename?: undefined;
            mode?: undefined;
            balanceThreshold?: undefined;
            customAssignments?: undefined;
            detectionTime?: undefined;
            reactionTimeMean?: undefined;
            reactionTimeStdDev?: undefined;
            distribution?: undefined;
            minReactionTime?: undefined;
            maxReactionTime?: undefined;
            applyPerRoom?: undefined;
            roomSettings?: undefined;
            enabled?: undefined;
            visibilityThreshold?: undefined;
            temperatureThreshold?: undefined;
            coThreshold?: undefined;
            speedReductionFactor?: undefined;
            updateInterval?: undefined;
            fdsResultPath?: undefined;
            includeTrajectories?: undefined;
            includeFlowRates?: undefined;
            includeBottlenecks?: undefined;
            timeRange?: undefined;
            agentIds?: undefined;
            objPath?: undefined;
            autoPlay?: undefined;
            playbackSpeed?: undefined;
            agentScale?: undefined;
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
            mode: {
                type: string;
                description: string;
                enum: string[];
            };
            balanceThreshold: {
                type: string;
                description: string;
            };
            customAssignments: {
                type: string;
                description: string;
                items: {
                    type: string;
                    properties: {
                        agentIds: {
                            type: string;
                            items: {
                                type: string;
                            };
                        };
                        exitId: {
                            type: string;
                        };
                    };
                };
            };
            simulationTime?: undefined;
            timeStep?: undefined;
            model?: undefined;
            strengthNeighborRepulsion?: undefined;
            rangeNeighborRepulsion?: undefined;
            bodyForce?: undefined;
            friction?: undefined;
            furnitureId?: undefined;
            fromFloor?: undefined;
            toFloor?: undefined;
            entryX?: undefined;
            entryY?: undefined;
            exitX?: undefined;
            exitY?: undefined;
            width?: undefined;
            capacity?: undefined;
            travelSpeed?: undefined;
            level?: undefined;
            room?: undefined;
            count?: undefined;
            positions?: undefined;
            agentRadius?: undefined;
            desiredSpeed?: undefined;
            maxSpeed?: undefined;
            minSpacing?: undefined;
            multiLevel?: undefined;
            evacPath?: undefined;
            outputPath?: undefined;
            language?: undefined;
            includeAgentDetails?: undefined;
            filename?: undefined;
            detectionTime?: undefined;
            reactionTimeMean?: undefined;
            reactionTimeStdDev?: undefined;
            distribution?: undefined;
            minReactionTime?: undefined;
            maxReactionTime?: undefined;
            applyPerRoom?: undefined;
            roomSettings?: undefined;
            enabled?: undefined;
            visibilityThreshold?: undefined;
            temperatureThreshold?: undefined;
            coThreshold?: undefined;
            speedReductionFactor?: undefined;
            updateInterval?: undefined;
            fdsResultPath?: undefined;
            includeTrajectories?: undefined;
            includeFlowRates?: undefined;
            includeBottlenecks?: undefined;
            timeRange?: undefined;
            agentIds?: undefined;
            objPath?: undefined;
            autoPlay?: undefined;
            playbackSpeed?: undefined;
            agentScale?: undefined;
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
            detectionTime: {
                type: string;
                description: string;
            };
            reactionTimeMean: {
                type: string;
                description: string;
            };
            reactionTimeStdDev: {
                type: string;
                description: string;
            };
            distribution: {
                type: string;
                description: string;
                enum: string[];
            };
            minReactionTime: {
                type: string;
                description: string;
            };
            maxReactionTime: {
                type: string;
                description: string;
            };
            applyPerRoom: {
                type: string;
                description: string;
            };
            roomSettings: {
                type: string;
                description: string;
                items: {
                    type: string;
                    properties: {
                        room: {
                            type: string;
                        };
                        reactionTimeMean: {
                            type: string;
                        };
                        reactionTimeStdDev: {
                            type: string;
                        };
                    };
                };
            };
            simulationTime?: undefined;
            timeStep?: undefined;
            model?: undefined;
            strengthNeighborRepulsion?: undefined;
            rangeNeighborRepulsion?: undefined;
            bodyForce?: undefined;
            friction?: undefined;
            furnitureId?: undefined;
            fromFloor?: undefined;
            toFloor?: undefined;
            entryX?: undefined;
            entryY?: undefined;
            exitX?: undefined;
            exitY?: undefined;
            width?: undefined;
            capacity?: undefined;
            travelSpeed?: undefined;
            level?: undefined;
            room?: undefined;
            count?: undefined;
            positions?: undefined;
            agentRadius?: undefined;
            desiredSpeed?: undefined;
            maxSpeed?: undefined;
            minSpacing?: undefined;
            multiLevel?: undefined;
            evacPath?: undefined;
            outputPath?: undefined;
            language?: undefined;
            includeAgentDetails?: undefined;
            filename?: undefined;
            mode?: undefined;
            balanceThreshold?: undefined;
            customAssignments?: undefined;
            enabled?: undefined;
            visibilityThreshold?: undefined;
            temperatureThreshold?: undefined;
            coThreshold?: undefined;
            speedReductionFactor?: undefined;
            updateInterval?: undefined;
            fdsResultPath?: undefined;
            includeTrajectories?: undefined;
            includeFlowRates?: undefined;
            includeBottlenecks?: undefined;
            timeRange?: undefined;
            agentIds?: undefined;
            objPath?: undefined;
            autoPlay?: undefined;
            playbackSpeed?: undefined;
            agentScale?: undefined;
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
            enabled: {
                type: string;
                description: string;
            };
            visibilityThreshold: {
                type: string;
                description: string;
            };
            temperatureThreshold: {
                type: string;
                description: string;
            };
            coThreshold: {
                type: string;
                description: string;
            };
            speedReductionFactor: {
                type: string;
                description: string;
            };
            updateInterval: {
                type: string;
                description: string;
            };
            fdsResultPath: {
                type: string;
                description: string;
            };
            simulationTime?: undefined;
            timeStep?: undefined;
            model?: undefined;
            strengthNeighborRepulsion?: undefined;
            rangeNeighborRepulsion?: undefined;
            bodyForce?: undefined;
            friction?: undefined;
            furnitureId?: undefined;
            fromFloor?: undefined;
            toFloor?: undefined;
            entryX?: undefined;
            entryY?: undefined;
            exitX?: undefined;
            exitY?: undefined;
            width?: undefined;
            capacity?: undefined;
            travelSpeed?: undefined;
            level?: undefined;
            room?: undefined;
            count?: undefined;
            positions?: undefined;
            agentRadius?: undefined;
            desiredSpeed?: undefined;
            maxSpeed?: undefined;
            minSpacing?: undefined;
            multiLevel?: undefined;
            evacPath?: undefined;
            outputPath?: undefined;
            language?: undefined;
            includeAgentDetails?: undefined;
            filename?: undefined;
            mode?: undefined;
            balanceThreshold?: undefined;
            customAssignments?: undefined;
            detectionTime?: undefined;
            reactionTimeMean?: undefined;
            reactionTimeStdDev?: undefined;
            distribution?: undefined;
            minReactionTime?: undefined;
            maxReactionTime?: undefined;
            applyPerRoom?: undefined;
            roomSettings?: undefined;
            includeTrajectories?: undefined;
            includeFlowRates?: undefined;
            includeBottlenecks?: undefined;
            timeRange?: undefined;
            agentIds?: undefined;
            objPath?: undefined;
            autoPlay?: undefined;
            playbackSpeed?: undefined;
            agentScale?: undefined;
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
            includeTrajectories: {
                type: string;
                description: string;
            };
            includeFlowRates: {
                type: string;
                description: string;
            };
            includeBottlenecks: {
                type: string;
                description: string;
            };
            timeRange: {
                type: string;
                description: string;
                items: {
                    type: string;
                };
            };
            agentIds: {
                type: string;
                description: string;
                items: {
                    type: string;
                };
            };
            simulationTime?: undefined;
            timeStep?: undefined;
            model?: undefined;
            strengthNeighborRepulsion?: undefined;
            rangeNeighborRepulsion?: undefined;
            bodyForce?: undefined;
            friction?: undefined;
            furnitureId?: undefined;
            fromFloor?: undefined;
            toFloor?: undefined;
            entryX?: undefined;
            entryY?: undefined;
            exitX?: undefined;
            exitY?: undefined;
            width?: undefined;
            capacity?: undefined;
            travelSpeed?: undefined;
            level?: undefined;
            room?: undefined;
            count?: undefined;
            positions?: undefined;
            agentRadius?: undefined;
            desiredSpeed?: undefined;
            maxSpeed?: undefined;
            minSpacing?: undefined;
            multiLevel?: undefined;
            evacPath?: undefined;
            outputPath?: undefined;
            language?: undefined;
            includeAgentDetails?: undefined;
            filename?: undefined;
            mode?: undefined;
            balanceThreshold?: undefined;
            customAssignments?: undefined;
            detectionTime?: undefined;
            reactionTimeMean?: undefined;
            reactionTimeStdDev?: undefined;
            distribution?: undefined;
            minReactionTime?: undefined;
            maxReactionTime?: undefined;
            applyPerRoom?: undefined;
            roomSettings?: undefined;
            enabled?: undefined;
            visibilityThreshold?: undefined;
            temperatureThreshold?: undefined;
            coThreshold?: undefined;
            speedReductionFactor?: undefined;
            updateInterval?: undefined;
            fdsResultPath?: undefined;
            objPath?: undefined;
            autoPlay?: undefined;
            playbackSpeed?: undefined;
            agentScale?: undefined;
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
            evacPath: {
                type: string;
                description: string;
            };
            objPath: {
                type: string;
                description: string;
            };
            autoPlay: {
                type: string;
                description: string;
            };
            playbackSpeed: {
                type: string;
                description: string;
            };
            agentScale: {
                type: string;
                description: string;
            };
            simulationTime?: undefined;
            timeStep?: undefined;
            model?: undefined;
            strengthNeighborRepulsion?: undefined;
            rangeNeighborRepulsion?: undefined;
            bodyForce?: undefined;
            friction?: undefined;
            furnitureId?: undefined;
            fromFloor?: undefined;
            toFloor?: undefined;
            entryX?: undefined;
            entryY?: undefined;
            exitX?: undefined;
            exitY?: undefined;
            width?: undefined;
            capacity?: undefined;
            travelSpeed?: undefined;
            level?: undefined;
            room?: undefined;
            count?: undefined;
            positions?: undefined;
            agentRadius?: undefined;
            desiredSpeed?: undefined;
            maxSpeed?: undefined;
            minSpacing?: undefined;
            multiLevel?: undefined;
            outputPath?: undefined;
            language?: undefined;
            includeAgentDetails?: undefined;
            filename?: undefined;
            mode?: undefined;
            balanceThreshold?: undefined;
            customAssignments?: undefined;
            detectionTime?: undefined;
            reactionTimeMean?: undefined;
            reactionTimeStdDev?: undefined;
            distribution?: undefined;
            minReactionTime?: undefined;
            maxReactionTime?: undefined;
            applyPerRoom?: undefined;
            roomSettings?: undefined;
            enabled?: undefined;
            visibilityThreshold?: undefined;
            temperatureThreshold?: undefined;
            coThreshold?: undefined;
            speedReductionFactor?: undefined;
            updateInterval?: undefined;
            fdsResultPath?: undefined;
            includeTrajectories?: undefined;
            includeFlowRates?: undefined;
            includeBottlenecks?: undefined;
            timeRange?: undefined;
            agentIds?: undefined;
        };
        required?: undefined;
    };
    annotations: {
        readOnlyHint: boolean;
        destructiveHint: boolean;
    };
})[];
export declare function handleEvacTool(name: string, args: Record<string, unknown>): Promise<{
    content: Array<{
        type: string;
        text: string;
    }>;
    isError?: boolean;
}>;
