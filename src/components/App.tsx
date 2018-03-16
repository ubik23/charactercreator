import * as React from 'react';

import PhenotypeService from 'services/PhenotypeService';

export interface IState {
  hairColor: string;
  skinColor: string;
}

export default class App extends React.Component<any, IState> {

  constructor(props: any) {
    super(props);

    const phenotype = PhenotypeService.getRandomPhenotype();
    this.state = {
      hairColor: phenotype.hair.color,
      skinColor: phenotype.skin.color,
    };

    this.getRandomPhenotype = this.getRandomPhenotype.bind(this);
  }

  private getRandomPhenotype() {
    const phenotype = PhenotypeService.getRandomPhenotype();
    this.setState({
      hairColor: phenotype.hair.color,
      skinColor: phenotype.skin.color,
    });
  }

  public render() {
    const { hairColor, skinColor } = this.state;
    return (
      <>
        <div style={{ width: 100, height: 100, backgroundColor: hairColor }}>
          Hair
        </div>
        <div style={{ width: 100, height: 100, backgroundColor: skinColor }}>
          Skin
        </div>
        <button onClick={this.getRandomPhenotype}>
          Randomize
        </button>
      </>
    );
  }
}
