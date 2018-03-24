import AnatomicalFeature from 'constants/AnatomicalFeature';
import ColorService from './ColorService';
import DefaultHairColors from 'constants/palettes/DefaultHairColors';
import DefaultSkinColors from 'constants/palettes/DefaultSkinColors';
import Phenotype from 'models/Phenotype';

export default class PhenotypeService {
  public static getRandomPhenotype(): Phenotype {
    return {
      [AnatomicalFeature.HAIR]: {
        color: ColorService.getRandomColor(DefaultHairColors),
      },
      [AnatomicalFeature.SKIN]: {
        color: ColorService.getRandomColor(DefaultSkinColors),
      },
    }
  }
}
