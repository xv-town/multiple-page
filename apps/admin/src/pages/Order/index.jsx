import React from 'react';
import RouterNested from '../../layout/components/RouterNested'


const PageOrder = (props) => {
  return props.children;
};

export default RouterNested(PageOrder);
