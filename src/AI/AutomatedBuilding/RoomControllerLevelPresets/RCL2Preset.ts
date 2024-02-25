export const RCL2Buildings = {
  run(room: Room): void {
    const spawnpos = room.find(FIND_MY_SPAWNS)[0].pos;
    room.createConstructionSite(spawnpos.x - 1, spawnpos.y, STRUCTURE_EXTENSION);
    room.createConstructionSite(spawnpos.x - 1, spawnpos.y + 1, STRUCTURE_EXTENSION);
    room.createConstructionSite(spawnpos.x, spawnpos.y + 1, STRUCTURE_EXTENSION);
    room.createConstructionSite(spawnpos.x + 1, spawnpos.y + 1, STRUCTURE_EXTENSION);
    room.createConstructionSite(spawnpos.x + 1, spawnpos.y, STRUCTURE_EXTENSION);
  }
};
