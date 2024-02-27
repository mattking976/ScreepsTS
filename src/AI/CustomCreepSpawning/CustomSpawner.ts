import { BodyPartsCosts } from 'Helpers/CreepData';

export class CustomSpawner {
  public getScalableHarvesterBodyData = function (energy: number): BodyPartConstant[] {
    const bodyPartList: BodyPartConstant[] = [];
    const numberOfParts = Math.floor(energy / BodyPartsCosts.WORK) - 1;
    bodyPartList.push(MOVE);
    for (let i = 0; i < numberOfParts; i++) {
      bodyPartList.push(WORK);
    }
    return bodyPartList;
  };
}
