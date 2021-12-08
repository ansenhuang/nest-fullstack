import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import DevInspector from './components/DevInspector';
import App from './App';
import 'antd/dist/antd.less';

ReactDOM.render(
  <BrowserRouter>
    <DevInspector>
      <App />
    </DevInspector>
  </BrowserRouter>,
  document.getElementById('root'),
);
