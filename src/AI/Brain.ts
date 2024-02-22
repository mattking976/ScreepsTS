export class Brain {
  private name: string;
  public constructor() {
    this.name = 'brain';
  }

  public setSourceAtBirth(): Id<Source> {
    const sources: Source[] = this.getSources();
    return sources[0].id;
  }

  private getSources(): Source[] {
    return Game.rooms.creep.find(FIND_SOURCES);
  }
}
