import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Inspector } from 'react-dev-inspector';
import App from './App';
import { IS_DEV } from './consts';

const DevInspector = IS_DEV ? Inspector : React.Fragment;

ReactDOM.render(
  <BrowserRouter>
    <DevInspector>
      <App />
    </DevInspector>
  </BrowserRouter>,
  document.getElementById('root'),
);
