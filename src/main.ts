import { Roles, States } from 'Helpers/CreepData';
import { ErrorMapper } from 'utils/ErrorMapper';
import roleBuilder from 'Roles/Builder';
import roleHarvester from 'Roles/Harvester';
import roleHauler from 'Roles/Hauler';
import roleUpgrader from 'Roles/Upgrader';

declare global {
  interface memory {
    memory: CreepMemory;
  }

  // creep base memory
  interface CreepMemory {
    role: string;
    sourceID?: Id<Source>;
    state: string;
  }
}

const maxHarvesters = 4;
const maxHaulers = 4;
const maxUpgraders = 2;
const maxBuilders = 2;

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
  // number of harvesters in play
  const harvesters = _.filter(Game.creeps, creep => creep.memory.role === Roles.Harvester);

  // number of haulers in play
  const haulers = _.filter(Game.creeps, creep => creep.memory.role === Roles.Hauler);

  // number of upgraders in play
  const upgraders = _.filter(Game.creeps, creep => creep.memory.role === Roles.Upgrader);

  // number of builders in play
  const builders = _.filter(Game.creeps, creep => creep.memory.role === Roles.Builder);

  if (harvesters.length < maxHarvesters) {
    const newName = 'Harvester' + Game.time.toString();
    console.log('Spawning harvester');
    Game.spawns.Spawn1.spawnCreep([WORK, WORK, MOVE], newName, {
      memory: { role: Roles.Harvester, sourceID: undefined, state: States.Idle }
    });
  } else if (haulers.length < maxHaulers) {
    const newName = 'Hauler' + Game.time.toString();
    Game.spawns.Spawn1.spawnCreep([CARRY, CARRY, MOVE, MOVE], newName, {
      memory: { role: Roles.Hauler, sourceID: undefined, state: States.Idle }
    });
  } else if (upgraders.length < maxUpgraders) {
    const newName = 'Upgrader' + Game.time.toString();
    Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], newName, {
      memory: { role: Roles.Upgrader, sourceID: undefined, state: States.Idle }
    });
  } else if (builders.length < maxBuilders) {
    const newName = 'Builder' + Game.time.toString();
    Game.spawns.Spawn1.spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
      memory: { role: Roles.Builder, sourceID: undefined, state: States.Idle }
    });
  }

  // assigning role ai to creeps.
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    if (creep.memory.role === Roles.Harvester) {
      roleHarvester.run(creep);
      continue;
    }
    if (creep.memory.role === Roles.Upgrader) {
      roleUpgrader.run(creep);
      continue;
    }
    if (creep.memory.role === Roles.Builder) {
      roleBuilder.run(creep);
      continue;
    }
    if (creep.memory.role === Roles.Hauler) {
      roleHauler.run(creep);
      continue;
    }
  }
});
