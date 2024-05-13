import { CreepRoles, CreepStates } from './CreepInterfaces';
export class CreepData {
  private sourceIds: string[] = [];

  public readonly Roles: CreepRoles = {
    ColdHarvester: 'ColdHarvester',
    Harvester: 'Harvester',
    Upgrader: 'Upgrader',
    Hauler: 'Hauler',
    Builder: 'Builder'
  };

  public readonly States: CreepStates = {
    Idle: 'Idle',
    Harvesting: 'Harvesting',
    Upgrading: 'Upgrading',
    Depositing: 'Depositing',
    Building: 'Building'
  };

  public readonly BodyPartsCosts = {
    WORK: 100,
    MOVE: 50,
    CARRY: 50,
    ATTACK: 80,
    RANGED_ATTACK: 150,
    HEAL: 250,
    CLAIM: 600,
    TOUGH: 10
  };

  public readonly maxHarvesters = 4;
  public readonly maxHaulers = 4;
  public readonly maxUpgraders = 2;
  public readonly maxBuilders = 2;

  // gets the number of creeps of a given role
  public getTotalCreepsByRole(role: string): Creep[] {
    return _.filter(Game.creeps, creep => creep.memory.role === role);
  }

  public getSourceIds(creep: Creep): string[] {
    this.sourceIds = Game.rooms[creep.room.name].memory.creepSourceIds;
    return this.sourceIds;
  }

  public addIdToSourceIds(newId: string): void {
    this.sourceIds.push(newId);
  }

  public removeIdFromSourceIds(oldId: string): void {
    const index = this.sourceIds.indexOf(oldId);
    this.sourceIds.slice(index, 1);
  }
}
