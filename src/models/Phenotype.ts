import AnatomicalFeature from 'constants/AnatomicalFeature';
import PhenotypeTraits from './PhenotypeTraits';

type Phenotype = {
  [anatomicalFeature in AnatomicalFeature]: PhenotypeTraits;
};

export default Phenotype;
