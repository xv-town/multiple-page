import './index.less';
import React from 'react';

import {
  Row,
  Col,
  Skeleton,
  Card,
  message
} from 'antd';
import { GetOrderBase } from '../../services/order';
import { GetStoreList } from '../../services/store';
import Pie from './Pie';

function StoreCard (props) {
  const { name, addr, addressee, phone, postcode, loading } = props;
  return <div style={{ paddingRight: '10px' }}>
    <Card
      title={name}
      loading={loading}
      bordered={false}
    >
      <div className="m-store-item">
        <span className="m-store-label">地址</span>
        { addr }
      </div>
      <div className="m-store-item">
        <span className="m-store-label">收件人</span>
        { addressee }
      </div>
      <div className="m-store-item">
        <span className="m-store-label">手机号</span>
        { phone }
      </div>
      <div className="m-store-item">
        <span className="m-store-label">邮编</span>
        { postcode }
      </div>
    </Card>
  </div>;
}

function fixed (n) {
  return Math.floor(n * 10000) / 10000;
}

class ViewHome extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loaded: false,
      orderInfo: {
        all: 0,
        finish: 0,
        not_finish: 0
      },
      cardList: [
        {
          key: 'all',
          name: '全部订单',
          count: 0
        },
        {
          key: 'finish',
          name: '已完成订单',
          count: 0
        },
        {
          key: 'not_finish',
          name: '未完成订单',
          count: 0
        },
      ],
      storeList: [
        {
          loading: true
        }
      ]
    };
  }
  componentDidMount () {
    setTimeout(() => {
      this.getOrderBase();
      this.getStoreList();
    }, 1000)
  }
  getOrderBase () {
    const errMsg = '读取数据失败';
    GetOrderBase().then(res => {
      const { code, msg, data } = res.data;
      if (code === 200) {
        const cardList = this.state.cardList.map(item => {
          item.count = data[item.key] || 0;
          return item;
        });
        this.setState({
          loaded: true,
          cardList
        });
      } else {
        message.error(msg || errMsg);
      }
    }).catch(err => {
      console.log(err);
      message.error(errMsg);
    });
  }
  getStoreList () {
    const errMsg = '读取数据失败';
    GetStoreList().then(res => {
      const { code, msg, data } = res.data;
      if (code === 200) {
        this.setState({
          storeList: data.store_list || []
        });
      } else {
        message.error(msg || errMsg);
      }
    }).catch(err => {
      console.log(err);
      message.error(errMsg);
    });
  }
  render () {
    const { loaded, cardList, storeList } = this.state;
    const total = cardList.reduce((prev, cur) => {
      return prev + cur.count;
    }, 0);

    const datasource = cardList.map(item => {
      return {
        item: item.name,
        count: item.count,
        percent: total <= 0 ? 0 : fixed(item.count / total)
      }
    });

    return <div className="p-home">
      <Row>
        <Col span={14}>
          <Row>
            {
              cardList.map((item, i) => (
                <Col
                  key={i}
                  span={12}
                >
                  <div style={{ paddingRight: '10px' }}>
                    <div className="m-card">
                      <h3 className="m-card-title">{ item.name }</h3>
                      <div className="m-card-count">
                        {
                          !loaded ? <Skeleton.Button size="large" active /> : item.count
                        }
                      </div>
                    </div>
                  </div>
                </Col>
              ))
            }
          </Row>
        </Col>
        <Col span={10}>
          {
            loaded ? <Pie data={datasource} /> : null
          }
        </Col>
      </Row>
      <h2 style={{ marginTop: '0.5em', lineHeight: '40px' }}>仓库</h2>
      <Row>
        {
          storeList.map((item, i) => {
            return <Col
              key={ i }
              xxl={{ span: 6 }}
              md={{ span: 8 }}
              xs={{ span: 12 }}
            >
              <StoreCard {...item} />
            </Col>
          })
        }
      </Row>
    </div>
  }
}

export default ViewHome;
