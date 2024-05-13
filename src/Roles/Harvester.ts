import { CreepData } from 'Helpers/CreepData';
// Harvester code
const roleHarvester = {
  /** @param {Creep} creep **/
  run(creep: Creep, creepData: CreepData): void {
    const sources: Source[] = creep.room.find(FIND_SOURCES);
    if (creep.memory.sourceID === undefined) {
      creepData.setRoomSourceIds(Game.rooms[creep.room.name].memory.activeSourceIds);
      for (const source of sources) {
        if (creepData.getSourceIds(creep).includes(source.id) === false) {
          creep.memory.sourceID = source.id;
          creepData.addIdToSourceIds(source.id);
        }
      }
    }
    if (creep.memory.sourceID) {
      const source = Game.getObjectById(creep.memory.sourceID);
      if (source) {
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          creep.moveTo(source);
        }
      }
    }
  }
};

export default roleHarvester;
