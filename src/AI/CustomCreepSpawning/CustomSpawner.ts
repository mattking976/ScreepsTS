import { CreepData } from 'Helpers/CreepData';

export class CustomSpawner {
  public getScalableHarvesterBodyData = function (energy: number): BodyPartConstant[] {
    const bodyPartList: BodyPartConstant[] = [];
    const creepData: CreepData = new CreepData();
    const numberOfParts = Math.floor(energy / creepData.BodyPartsCosts.WORK) - 1;
    bodyPartList.push(MOVE);
    for (let i = 0; i < numberOfParts; i++) {
      bodyPartList.push(WORK);
    }
    return bodyPartList;
  };
}
