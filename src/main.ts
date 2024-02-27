import { Brain } from 'AI/Brain';
import { ErrorMapper } from 'utils/ErrorMapper';

const brain = new Brain(false);

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  const totalSpawnEnergy = Game.spawns.Spawn1.room.energyCapacityAvailable;

  brain.spawnLogic(totalSpawnEnergy);
  brain.roleLogic();
  brain.coldStart();

  // brain functions for automated room building
  for (const room in Game.rooms) {
    const roomLevel = Game.rooms[room].controller?.level;
    const currentRoom = Game.rooms[room];
    if (roomLevel) {
      brain.buildingswitcher(roomLevel, currentRoom);
    }
  }
});
