import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import dva from 'dva';

// import tabsModel from './models/tabs';

// const app = dva();
// app.model(tabsModel);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
// app.router(() => <App />);
// app.start('#root');
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
