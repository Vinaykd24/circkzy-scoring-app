import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MatchProvider from './providers/match/match.provider';

import './index.css';
import 'semantic-ui-css/semantic.min.css';

import App from './App';

ReactDOM.render(
  <MatchProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MatchProvider>,
  document.getElementById('root')
);
