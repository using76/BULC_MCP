// BULC MCP Server Types

export interface BulcCommand {
  action: string;
  params: Record<string, unknown>;
}

export interface BulcResult {
  success: boolean;
  message?: string;
  data?: unknown;
  error?: string;
}

// Spatial Context Types
export interface Position {
  x: number;
  y: number;
}

export interface Bounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export interface RoomInfo {
  id: string;
  name: string;
  level: number;
  elevation: number;
  x: number;
  y: number;
  width: number;
  depth: number;
  bounds: Bounds;
  center: Position;
}

export interface WallInfo {
  id: string;
  xStart: number;
  yStart: number;
  xEnd: number;
  yEnd: number;
  thickness: number;
  height: number;
  level: number;
}

export interface LevelInfo {
  index: number;
  name: string;
  elevation: number;
  floorHeight: number;
}

export interface SpatialContext {
  bounds: Bounds & { width: number; height: number };
  levels: LevelInfo[];
  currentLevel: number;
  rooms: RoomInfo[];
  walls: WallInfo[];
}

export interface HomeInfo {
  projectPath: string | null;
  modified: boolean;
  levelCount: number;
  roomCount: number;
  wallCount: number;
  furnitureCount: number;
}
