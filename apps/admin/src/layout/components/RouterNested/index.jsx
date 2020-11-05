import React from 'react';
import { renderRoutes } from 'react-router-config';

const Nested = Component => {
  return props => {
    return <Component>
      { renderRoutes(props.route.routes) }
    </Component>;
  };
}

export default Nested;
