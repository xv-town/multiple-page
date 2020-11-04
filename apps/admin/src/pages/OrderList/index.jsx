import React from 'react';
import dayjs from 'dayjs';
import { Table, Button } from 'antd';
import RouterNested from '../../layout/components/RouterNested'

import SearchForm from './SearchForm';

const columns = [
  {
    title: '编号',
    width: 60,
    dataIndex: 'code',
    key: 'code',
    fixed: 'left',
  },
  {
    title: '订单号',
    width: 100,
    dataIndex: 'shop_id',
    key: 'shop_id',
  },
  {
    title: '仓库',
    dataIndex: 'shop_name',
    key: 'shop_name',
    width: 150,
  },
  {
    title: '主图',
    dataIndex: 'shop_site',
    key: 'shop_site',
    width: 80,
  },
  {
    title: '面单',
    dataIndex: 'shop_status',
    key: 'shop_status',
    width: 80,
  },
  {
    title: '快递单号',
    dataIndex: 'auth_time',
    key: 'auth_time',
    width: 150,
    render (data) {
      return dayjs(data).format('YYYY-MM-DD hh:mm:ss');
    }
  },
  {
    title: '备注',
    dataIndex: 'opts',
    key: 'opts',
    width: 150
  },
  {
    title: '状态',
    dataIndex: 'opts',
    key: 'opts',
    width: 100
  },
  {
    title: '创建时间',
    dataIndex: 'opts',
    key: 'opts',
    width: 100
  },
  {
    title: '操作',
    dataIndex: 'opts',
    key: 'opts',
    width: 100
  },
];

const data = [];

class PageShop extends React.Component {
  render () {
    return <div>
      <SearchForm />
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ y: 600 }}
      />
    </div>;
  }
};

export default RouterNested(PageShop);
