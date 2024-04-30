export const HOME_WORLD = Object.values(Game.spawns)[0].room.name;

export interface roomMemory {
  activeSourceIds: string[];
  creepSourceIds: string[];
}
