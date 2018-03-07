import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'normalize.css';
import 'sass/main.scss';

import App from 'components/App';

require('babel-core/register');
require('babel-polyfill');

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
