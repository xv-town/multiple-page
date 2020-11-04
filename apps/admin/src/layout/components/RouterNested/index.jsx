import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Nested = Component => {
  return props => {
    return props.children && props.children.length ?
      <Switch>
        {
          props.children.map((route, i) => {
            return <Component
              key={i}
              {...props}
            >
              <Route
                {...Object.assign({}, props, { children: null })}
                path={`${props.root}${route.path}`}
                render={() => <route.component {...props} />}
              />
            </Component>
          })
        }
      </Switch> :
      <Component {...props} />
  }
}

export default Nested;
