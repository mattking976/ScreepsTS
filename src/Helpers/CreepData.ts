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

interface CreepRoles {
  ColdHarvester: string;
  Harvester: string;
  Upgrader: string;
  Hauler: string;
  Builder: string;
}

interface CreepStates {
  Idle: string;
  Harvesting: string;
  Upgrading: string;
  Depositing: string;
  Building: string;
}

export class CreepData {
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
}
