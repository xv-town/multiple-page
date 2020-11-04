import './index.less';

import React from 'react';
import { Tabs } from 'antd';

import Account from './Account';

const { TabPane } = Tabs;


function PageLogin ({ history }) {
  function loginSuccess () {
    history.replace('/');
  }
  return <div className="p-login">
    <div className="p-login-lang"></div>
    <div className="p-login-container">
      <div className="p-login-header">
      有你云仓
      </div>
      <div className="p-login-desc">
      </div>
      <div className="p-login-main">
        <Tabs defaultActiveKey="1">
          <TabPane
            tab="账号登录"
            key="1"
          >
            <Account success={ loginSuccess } />
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
}

export default PageLogin;
