import * as React from 'react';

import PhenotypeService from 'services/PhenotypeService';

export default class App extends React.Component {
  public render() {
    const phenotype = PhenotypeService.getRandomPhenotype();
    return (
      <>
        <div style={{ width: 100, height: 100, backgroundColor: phenotype.hair.color }}>
          Hair
        </div>
        <div style={{ width: 100, height: 100, backgroundColor: phenotype.skin.color }}>
          Skin
        </div>
      </>
    );
  }
}
