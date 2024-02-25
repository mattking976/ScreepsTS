// Upgrader AI code

import { States } from 'Helpers/CreepData';

const roleUpgrader = {
  /** @param creep **/
  run(creep: Creep): void {
    if (creep.memory.state === States.Upgrading && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.state = States.Harvesting;
    }
    if (!(creep.memory.state === States.Upgrading) && creep.store.getFreeCapacity() === 0) {
      creep.memory.state = States.Upgrading;
    }

    if (creep.memory.state === States.Upgrading && creep.room.controller) {
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    } else {
      const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
        filter: Resource => Resource.resourceType === RESOURCE_ENERGY
      });

      const closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy);
      if (closestDroppedEnergy) {
        if (creep.pickup(closestDroppedEnergy) === ERR_NOT_IN_RANGE) {
          creep.moveTo(closestDroppedEnergy);
        }
      }
    }
  }
};

export default roleUpgrader;
