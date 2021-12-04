import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Inspector } from 'react-dev-inspector';
import App from './App';

const DevInspector = process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

ReactDOM.render(
  <BrowserRouter>
    <DevInspector>
      <App />
    </DevInspector>
  </BrowserRouter>,
  document.getElementById('root'),
);
