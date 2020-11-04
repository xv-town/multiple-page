import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import routers from '../../routers';

const RouterWatcher = connect()((props) => {
  useEffect(() => {
    props.onChange({
      ...props,
      next: () => {
        props.dispatch({
          type: 'tab.to',
          payload: props
        });
      }
    });
  });
  return null
})

export default withRouter(RouterWatcher);
