import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Translate from '../../../components/Translate';
import './index.less';

import { Tabs } from 'antd';

const { TabPane } = Tabs;

const RouterTabs = withRouter((props) => {
  const { tabs, history, dispatch } = props;
  const { panes, active } = tabs;

  return <div className={ `${panes.length > 1 ? '' : 's-hide-remove '}m-layout-tabs` }>
    <Tabs
      type="editable-card"
      hideAdd
      activeKey={active}
      onChange={pathname => history.push(pathname)}
      onEdit={(pathname, action) => {
        if (action === 'remove') {
          let index = panes.findIndex(item => item.pathname === pathname);
          panes.splice(index, 1);
          let activeTab = {};
          if (panes.length) {
            activeTab = panes[panes.length - 1];
          }
          dispatch({
            type: 'tab.save',
            payload: {
              active: activeTab.pathname,
              panes
            }
          });
          if (active === pathname) {
            history.replace(activeTab.pathname);
          }
        }
      }}
    >
      {
        panes.map(pane => (
          <TabPane
            tab={<Translate text={pane.name} />}
            key={pane.pathname}
          >
            { pane.content }
          </TabPane>
        ))
      }
    </Tabs>
  </div>
});

export default connect(({ tabs }) => ({
  tabs
}))(RouterTabs);
