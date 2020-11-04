import './index.less';
import React, { Suspense, useState } from 'react';
import { Link } from "react-router-dom";

import { Layout, Menu } from 'antd';
import Tabs from '../Tabs';
import ChunkLoader from '../ChunkLoader';
import { connect } from 'react-redux';
import Translate from '../../../components/Translate';
import TranslateSwitch from '../../../components/Translate/Switch';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

function LoaderChunk (children) {
  return <Suspense fallback={<ChunkLoader />}>
    { children }
  </Suspense>
}

const MenuLink = (option, root = '') => {
  return !option.link ?
    <Translate text={option.name} /> :
    <Link to={ `${root}${option.path}` }>
      <Translate text={option.name} />
    </Link>
}
const CreateMenu = (routes) => {
  return routes.filter(item => item.menu).map(item => {
    if (item.children && item.children.length) {
      return <SubMenu
        key={item.path}
        title={MenuLink(item)}
        icon={item.icon}
      >
        {
          item.children.map(child => {
            return <Menu.Item
              key={`${item.path}${child.path}`}
              icon={child.icon}
            >
              { MenuLink(child, item.path) }
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
const GetOpenKey = (key, root, prefix = '') => {
  for (let i = 0; i < root.length; i++) {
    if (`${prefix}${root[i].path}` === key) {
      return root[i].path
    }
    if (root[i].children && root[i].children.length && GetOpenKey(key, root[i].children, root[i].path)) {
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
  );
}

export default connect(({ tabs }) => ({ tabs }))(RouterWrapper);
