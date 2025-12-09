import { CreepData } from 'Helpers/CreepData';
import { CustomSpawner } from './CustomCreepSpawning/CustomSpawner';
import { RCL2Buildings } from './AutomatedBuilding/RoomControllerLevelPresets';
import roleBuilder from 'Roles/Builder';
import roleColdHarvester from 'Roles/ColdStartHavester';
import roleHarvester from 'Roles/Harvester';
import roleHauler from 'Roles/Hauler';
import roleUpgrader from 'Roles/Upgrader';

export class Brain {
  private isColdStarting: boolean;
  private maxColdHarvesters: number;
  public constructor(coldStart: boolean) {
    this.isColdStarting = coldStart;
    this.maxColdHarvesters = 1;
  }

  // #region Getters and Setters
  public getIsColdStarting(): boolean {
    return this.isColdStarting;
  }
  private setIsColdStarting(state: boolean): void {
    this.isColdStarting = state;
  }

  private getMaxColdHarvesters(): number {
    return this.maxColdHarvesters;
  }

  private setMaxColdHarvesters(max: number): void {
    this.maxColdHarvesters = max;
  }
  // #endregion

  // #region Cold Start Logic
  public coldStart(creepData: CreepData): void {
    // number of cold start harvesters in play
    const coldHarvesters = _.filter(
      Game.creeps,
      creep => creep.memory.role === creepData.Roles.ColdHarvester
    );

    if (
      creepData.getTotalCreepsByRole(creepData.Roles.Harvester).length >= 1 &&
      creepData.getTotalCreepsByRole(creepData.Roles.Hauler).length >= 1
    ) {
      this.setIsColdStarting(false);
      this.setMaxColdHarvesters(-1);
      coldHarvesters.forEach(coldHarvester => {
        coldHarvester.suicide();
      });
    } else {
      this.setIsColdStarting(true);
    }

    if (coldHarvesters.length < this.getMaxColdHarvesters()) {
      const newName = 'ColdHarvester' + Game.time.toString();
      Game.spawns.Spawn1.spawnCreep([CARRY, CARRY, WORK, MOVE], newName, {
        memory: {
          role: creepData.Roles.ColdHarvester,
          sourceID: undefined,
          state: creepData.States.Idle
        }
      });
    } else if (creepData.getTotalCreepsByRole(creepData.Roles.Harvester).length < 1) {
      const newName = 'Harvester' + Game.time.toString();
      Game.spawns.Spawn1.spawnCreep([WORK, WORK, MOVE], newName, {
        memory: {
          role: creepData.Roles.Harvester,
          sourceID: undefined,
          state: creepData.States.Idle
        }
      });
    } else if (creepData.getTotalCreepsByRole(creepData.Roles.Hauler).length < 1) {
      const newName = 'Hauler' + Game.time.toString();
      Game.spawns.Spawn1.spawnCreep([CARRY, CARRY, MOVE, MOVE], newName, {
        memory: { role: creepData.Roles.Hauler, sourceID: undefined, state: creepData.States.Idle }
      });
    }
  }
  // #endregion

  // #region Role Logic
  public roleLogic(creepData: CreepData): void {
    // assigning role ai to creeps.
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      if (creep.memory.role === creepData.Roles.ColdHarvester) {
        roleColdHarvester.run(creep, creepData);
        continue;
      }
      if (creep.memory.role === creepData.Roles.Harvester) {
        roleHarvester.run(creep, creepData);
        continue;
      }
      if (creep.memory.role === creepData.Roles.Upgrader) {
        roleUpgrader.run(creep, creepData);
        continue;
      }
      if (creep.memory.role === creepData.Roles.Builder) {
        roleBuilder.run(creep, creepData);
        continue;
      }
      if (creep.memory.role === creepData.Roles.Hauler) {
        roleHauler.run(creep);
        continue;
      }
    }
  }
  // #endregion

  // #region Spawn Logic
  public spawnLogic(roomEnergy: number, creepData: CreepData): void {
    const customSpawner: CustomSpawner = new CustomSpawner();
    if (
      creepData.getTotalCreepsByRole(creepData.Roles.Harvester).length < creepData.maxHarvesters
    ) {
      const newName = 'Harvester' + Game.time.toString();
      Game.spawns.Spawn1.spawnCreep(
        customSpawner.getScalableHarvesterBodyData(roomEnergy),
        newName,
        {
          memory: {
            role: creepData.Roles.Harvester,
            sourceID: undefined,
            state: creepData.States.Idle
          }
        }
      );
    } else if (
      creepData.getTotalCreepsByRole(creepData.Roles.Hauler).length < creepData.maxHaulers
    ) {
      const newName = 'Hauler' + Game.time.toString();
      Game.spawns.Spawn1.spawnCreep([CARRY, CARRY, MOVE, MOVE], newName, {
        memory: { role: creepData.Roles.Hauler, sourceID: undefined, state: creepData.States.Idle }
      });
    } else if (
      creepData.getTotalCreepsByRole(creepData.Roles.Upgrader).length < creepData.maxUpgraders
    ) {
      const newName = 'Upgrader' + Game.time.toString();
      Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], newName, {
        memory: {
          role: creepData.Roles.Upgrader,
          sourceID: undefined,
          state: creepData.States.Idle
        }
      });
    } else if (
      creepData.getTotalCreepsByRole(creepData.Roles.Builder).length < creepData.maxBuilders
    ) {
      const newName = 'Builder' + Game.time.toString();
      Game.spawns.Spawn1.spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
        memory: { role: creepData.Roles.Builder, sourceID: undefined, state: creepData.States.Idle }
      });
    }
  }
  // #endregion

  // #region Automated building Logic (function)
  public buildingswitcher(roomLevel: number, room: Room): void {
    // All controlled rooms start at RCL 1 (update code for reserved rooms when applicable)
    switch (roomLevel) {
      case 1:
        // build roads here steal code if possible
        break;

      case 2:
        RCL2Buildings.run(room);
        break;
    }
  }
  // #endregion
}
