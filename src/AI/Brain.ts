import { Roles, States } from 'Helpers/CreepData';
import { RCL2Buildings } from './AutomatedBuilding/RoomControllerLevelPresets';

export class Brain {
  private name: string;
  private isColdStarting: boolean;
  private maxColdHarvesters: number;
  public constructor(coldStart: boolean) {
    this.name = 'brain';
    this.isColdStarting = coldStart;
    this.maxColdHarvesters = 1;
  }

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

  public coldStart(): void {
    // number of cold start harvesters in play
    const coldHarvesters = _.filter(
      Game.creeps,
      creep => creep.memory.role === Roles.ColdHarvester
    );

    // number of harvesters in play
    const harvesters = _.filter(Game.creeps, creep => creep.memory.role === Roles.Harvester);

    // number of haulers in play
    const haulers = _.filter(Game.creeps, creep => creep.memory.role === Roles.Hauler);

    if (harvesters.length >= 1 && haulers.length >= 1) {
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
        memory: { role: Roles.ColdHarvester, sourceID: undefined, state: States.Idle }
      });
    } else if (harvesters.length < 1) {
      const newName = 'Harvester' + Game.time.toString();
      Game.spawns.Spawn1.spawnCreep([WORK, WORK, MOVE], newName, {
        memory: {
          role: Roles.Harvester,
          sourceID: undefined,
          state: States.Idle
        }
      });
    } else if (haulers.length < 1) {
      const newName = 'Hauler' + Game.time.toString();
      Game.spawns.Spawn1.spawnCreep([CARRY, CARRY, MOVE, MOVE], newName, {
        memory: { role: Roles.Hauler, sourceID: undefined, state: States.Idle }
      });
    }
  }

  public setSourceAtBirth(name: string): Id<Source> {
    const sources: Source[] = this.getSources(name);
    return sources[0].id;
  }

  private getSources(name: string): Source[] {
    return Game.creeps[name].room.find(FIND_SOURCES_ACTIVE);
  }

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
}
