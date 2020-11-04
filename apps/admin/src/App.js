import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './routes';

import ErrorBoundary from './layout/components/Error/ErrorBoundary';
import RouterWatcher from './layout/components/RouterWatcher';
import RouterLayout from './layout/components/RouterLayout';

import store from './store';
import './i18n';

import { isLogin } from './utils/auth';

const { BASE_URL } = process.env;

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => {
        return (
          <route.component
            {...props}
            root={route.path || ''}
            children={route.children}
          />
        )
      }}
    />
  );
}

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
            <Switch>
              {
                routes.map((route, i) => (
                  <RouteWithSubRoutes key={i} {...route} />
                ))
              }
            </Switch>
          </ErrorBoundary>
        </RouterLayout>
      </Router>
    </Provider>
  );
}

export default App;
