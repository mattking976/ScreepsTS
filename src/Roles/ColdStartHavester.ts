// Harvester code
import { CreepData } from 'Helpers/CreepData';

const roleColdHarvester = {
  /** @param {Creep} creep **/
  run(creep: Creep, creepData: CreepData): void {
    if (creep.memory.sourceID === undefined) {
      creep.memory.sourceID = creep.room.find(FIND_SOURCES_ACTIVE)[0].id;
    }
    const source = creep.room.find(FIND_SOURCES_ACTIVE)[0];
    if (source != null) {
      if (creep.harvest(source) === ERR_NOT_IN_RANGE && creep.store.getFreeCapacity() > 0) {
        creep.moveTo(source);
        creep.memory.state = creepData.States.Harvesting;
      } else if (!(creep.store.getFreeCapacity() > 0) || !(source.energy > 0)) {
        const targets = creep.room.find(FIND_STRUCTURES, {
          filter: Structure => {
            return (
              (Structure.structureType === STRUCTURE_SPAWN ||
                Structure.structureType === STRUCTURE_EXTENSION ||
                Structure.structureType === STRUCTURE_TOWER ||
                Structure.structureType === STRUCTURE_CONTAINER) &&
              Structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            );
          }
        });
        const closestTarget = creep.pos.findClosestByRange(targets);
        if (closestTarget != null) {
          if (creep.transfer(closestTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(closestTarget);
            creep.memory.state = creepData.States.Depositing;
          }
        }
      }
    } else {
      creep.say('This Source does not exist');
      creep.memory.state = creepData.States.Idle;
    }
  }
};

export default roleColdHarvester;
