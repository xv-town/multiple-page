import './index.less';
import React, { Suspense, useState } from 'react';
import { Link } from "react-router-dom";

import { Layout, Menu, ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale/zh_CN';
import zh_TW from 'antd/lib/locale/zh_TW';
import en_US from 'antd/lib/locale/en_US';
import { lang } from '../../../i18n';

import Tabs from '../Tabs';
import ChunkLoader from '../ChunkLoader';
import { connect } from 'react-redux';
import Translate from '../../../components/Translate';
import TranslateSwitch from '../../../components/Translate/Switch';

const langs = {
  zh_CN: zh_CN,
  zh_TW: zh_TW,
  en_US: en_US,
};

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

function LoaderChunk (children) {
  return <Suspense fallback={<ChunkLoader />}>
    { children }
  </Suspense>
}

const MenuLink = (option) => {
  return !option.link ?
    <Translate text={option.name} /> :
    <Link to={ `${option.path}` }>
      <Translate text={option.name} />
    </Link>
}
const isMenu = ({ menu }) => menu;

const CreateMenu = (routes) => {
  return routes.filter(isMenu).map(item => {
    if (item.routes && item.routes.length) {
      return <SubMenu
        key={item.path}
        title={MenuLink(item)}
        icon={item.icon}
      >
        {
          item.routes.filter(isMenu).map(child => {
            return <Menu.Item
              key={`${child.path}`}
              icon={child.icon}
            >
              { MenuLink(child) }
            </Menu.Item>
          })
        }
      </SubMenu>
    } else {
      return <Menu.Item
        key={item.path}
        icon={item.icon}
      >
        { MenuLink(item) }
      </Menu.Item>
    }
  })
}
const GetOpenKey = (key, root) => {
  for (let i = 0; i < root.length; i++) {
    if (`${root[i].path}` === key) {
      return root[i].path
    }
    if (root[i].routes && root[i].routes.length && GetOpenKey(key, root[i].routes)) {
      return root[i].path
    }
  }
}

const sessionName = 'collapse';
const collapse = () => {};
collapse.get = () => sessionStorage.getItem(sessionName);
collapse.set = val => sessionStorage.setItem(sessionName, val);

function RouterWrapper (props) {
  const [collapsed, onCollapse] = useState(collapse.get());
  const { routes, children } = props;
  const isCollapsed = collapsed === '1';
  const { active, layout } = props.tabs;
  const openKey = GetOpenKey(active, routes)

  return (
    <ConfigProvider locale={langs[lang.get()]}>
      <div style={{ height: '100%' }}>
        {
          !layout ? LoaderChunk(children) : <Layout
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              paddingLeft: isCollapsed ? '80px' : '200px'
            }}
          >
            <Sider
              collapsible
              collapsed={isCollapsed}
              onCollapse={res => {
                let val = res ? '1' : '0';
                onCollapse(val);
                collapse.set(val);
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: isCollapsed ? '80px' : '200px',
                backgroundColor: '#FFFFFF'
              }}
            >
              <div className="m-sider-logo">
                Hi
              </div>
              <Menu
                selectedKeys={[active]}
                defaultOpenKeys={[openKey]}
                mode="inline"
              >
                { CreateMenu(routes) }
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }}>
                <div style={{ float: 'right', paddingRight: '10px' }}>
                  <TranslateSwitch />
                </div>
              </Header>
              <Tabs />
              <Content style={{ margin: '10px' }}>
                { LoaderChunk(children) }
              </Content>
              {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Layout>
          </Layout>
        }
      </div>
    </ConfigProvider>
  );
}

export default connect(({ tabs }) => ({ tabs }))(RouterWrapper);
