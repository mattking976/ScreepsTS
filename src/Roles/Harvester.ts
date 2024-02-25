// Harvester code
const roleHarvester = {
  /** @param {Creep} creep **/
  run(creep: Creep): void {
    if (creep.memory.sourceID === undefined) {
      creep.memory.sourceID = creep.room.find(FIND_SOURCES_ACTIVE)[0].id;
    }
    const sources = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0]);
    }
  }
};

export default roleHarvester;
