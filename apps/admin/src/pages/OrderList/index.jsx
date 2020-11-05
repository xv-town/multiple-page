import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'antd';
import RouterNested from '../../layout/components/RouterNested'
import { translator } from '../../i18n';

import SearchForm from './SearchForm';

const columns = [
  {
    title: translator('root.username'),
    width: 60,
    dataIndex: 'username',
    key: 'username',
    fixed: 'left',
  },
  {
    title: translator('root.userId'),
    width: 100,
    dataIndex: 'user_id',
    key: 'user_id',
  },
  {
    title: translator('root.userPhone'),
    dataIndex: 'user_phone',
    key: 'user_phone',
    width: 150,
  },
  {
    title: translator('root.userInfo'),
    dataIndex: 'user_info',
    key: 'user_info',
    width: 150,
    render (text, { user_id }) {
      return <Link to={`/order/info/${user_id}`}>{ text }</Link>
    }
  }
];

const data = [];

for (let i = 0; i < 100; i++) {
  data.push({
    username: 'username_' + i,
    user_id: 'user_id_' + i,
    user_phone: 'user_phone_' + i,
    user_info: 'user_info_' + i,
  })
}

class PageShop extends React.Component {
  render () {
    return <div>
      <SearchForm />
      <Table
        columns={columns}
        rowKey={({ user_id }) => user_id}
        dataSource={data}
        scroll={{ y: 600 }}
      />
    </div>;
  }
};

export default RouterNested(PageShop);
