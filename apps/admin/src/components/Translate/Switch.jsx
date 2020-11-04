import React, { useState } from 'react';
import { Button, Radio, Menu, Dropdown } from 'antd';
import Translate from './index';
import { onChange, lang } from '../../i18n';

const lng = lang.get();

const langs = [
  {
    name: '简体中文',
    lang: 'zh_CN'
  },
  {
    name: '繁体中文',
    lang: 'zh_TW'
  },
  {
    name: 'English',
    lang: 'en_US'
  },
];

const menu = () => {
  return (
    <Menu
      onClick={({ key }) => onChange(key)}
    >
      {
        langs.map(item => {
          return <Menu.Item key={item.lang}>
            { item.name }
          </Menu.Item>
        })
      }
    </Menu>
  )
}

function TranslateSwitch() {
  return <div>
    <Dropdown overlay={menu}>
      <Button type="primary">
        <Translate text="root.lang" />
      </Button>
    </Dropdown>
  </div>
}

export default TranslateSwitch;