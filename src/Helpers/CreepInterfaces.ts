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

export interface CreepRoles {
  ColdHarvester: string;
  Harvester: string;
  Upgrader: string;
  Hauler: string;
  Builder: string;
}

export interface CreepStates {
  Idle: string;
  Harvesting: string;
  Upgrading: string;
  Depositing: string;
  Building: string;
}
