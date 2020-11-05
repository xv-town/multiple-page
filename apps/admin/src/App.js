import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from "react-router-config";
import { Provider } from 'react-redux';
import routes from './routes';

import ErrorBoundary from './layout/components/Error/ErrorBoundary';
import RouterWatcher from './layout/components/RouterWatcher';
import RouterLayout from './layout/components/RouterLayout';

import store from './store';
import './i18n';

import { isLogin } from './utils/auth';

const { BASE_URL } = process.env;

function App() {
  return (
    <Provider store={store}>
      <Router basename={BASE_URL}>
        <RouterLayout routes={routes}>
          <RouterWatcher
            onChange={({ location, history, next }) => {
              if (!isLogin() && location.pathname !== `/login`) {
                history.push('/login');
              } else {
                next();
              }
            }}
          />
          <ErrorBoundary>
            { renderRoutes(routes) }
          </ErrorBoundary>
        </RouterLayout>
      </Router>
    </Provider>
  );
}

export default App;
