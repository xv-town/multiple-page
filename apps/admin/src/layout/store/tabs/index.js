import pathToRegExp from 'path-to-regexp';
import routes from '../../../routes';
import * as tab from './utils';

function findRoute (routes, pathname) {
  let result = null;

  for (let i = 0; i < routes.length; i++) {
    if (pathToRegExp(routes[i].path).test(pathname)) {
      result = routes[i];
      break;
    }
  }
  return result;
}

const serializeRoutes = (routes) => {
  let result = [];
  routes.forEach(item => {
    result.push(Object.assign({}, item, { path: `${item.path}` }));
    if (item.routes && item.routes.length) {
      result.push(...serializeRoutes(item.routes));
    }
  });
  return result;
}

const defaultState = {
  active: '',
  layout: false,
  panes: tab.get()
};

const mutations = {
  'tab.to': (state, { payload }) => {
    const { panes } = state;
    const { location } = payload;
    const { pathname } = location;
    const index = panes.findIndex(item => item.pathname === pathname)
    const _routes = serializeRoutes(routes);
    const route = findRoute(_routes, pathname);
    state.active = pathname;
    state.layout = route ? route.layout : false;
    
    if (!~index && route && route.history) {
      panes.push(Object.assign({}, location, {
        name: route.name
      }));
    }
    tab.set(JSON.stringify(panes));
    return state;
  },
  'tab.save': (state, { payload }) => {
    const { active, panes } = payload;
    state.active = active;
    state.panes = panes;
    tab.set(JSON.stringify(panes));
    return state;
  }
}

export const tabs = (state = defaultState, params) => {
  if (mutations[params.type]) {
      state = mutations[params.type](state, params);
  }
  return Object.assign({}, state);
}