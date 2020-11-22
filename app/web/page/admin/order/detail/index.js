import React from 'react';
import BaseComponent from '~web/layout/base';
import { Card, Form, Typography, Tag, Badge, Avatar, Button, message, Table } from 'antd';
const { Text } = Typography;
import Input from '~web/component/Input';
import Select from '~web/component/Select';
import Upload from '~web/component/Upload';
import { observer, inject } from 'mobx-react';
import { gerUrlQuery, getTime, mapValue } from '~web/utils';
import { ROW_CONFIG, ORDER_STATUS_TAG, ORDER_STATUS } from '~web/utils/constant';
import { orderService, categoryService } from '~web/service/order';
import { pvImage } from '~web/component/pv';
import './index.less';
import { get } from 'mobx';


@inject(('store'))
@observer
export default class OrderDetail extends BaseComponent {

  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      orderInfo: {
        memberInfo: {},
        orderInfo: {},
        productList: []
      },
      categoryList: [],
    }
    const { params = {} } = this.props.match;
    this.orderId = params.id || null;
  }

  componentDidMount() {
    const { location } = this.props;
    if (this.orderId) {
      orderService.getOrderInfo(this.orderId).then(res => {
        if (res.code === 200) {
          this.setState({
            orderInfo: res.data,
          })
        } else {
          message.error(res.msg);
        }
      })
    }
  }

  // 确认
  onFinish = (value) => {
    const { history } = this.props;
    const orderInfo = {
      ...this.state.orderInfo,
      ...value,
    }
  }


  render() {
    const { memberInfo, productList, orderInfo } = this.state.orderInfo;
    const columns = [
      {
        title: '商品ID',
        dataIndex: 'id',
        align: 'center',
      },
      {
        title: '商品标题',
        dataIndex: 'title',
        align: 'center',
      },
      {
        title: '商品图片',
        dataIndex: 'banner',
        align: 'center',
        render: (val) => (
          <img className="table-item-image" src={val} onClick={() => pvImage(val)} />
        )
      },
      {
        title: '单价',
        dataIndex: 'price',
        align: 'center',
      },
      {
        title: '数量',
        dataIndex: 'count',
        align: 'center',
      },
      {
        title: '总额',
        dataIndex: 'total_price',
        align: 'center',
      },
    ]

    return (
      <Card bordered={false} title="订单详情" className="order-detail-root">
        <Form className="body-form"
          labelCol={{ span: 2 }}
          ref={this.formRef}>
          <Card bordered={false} title={`${orderInfo.order_id}`} className="order-detail-base">
            <Form.Item label="订单ID">
              {orderInfo.order_id}
            </Form.Item>
            <Form.Item label="订单状态">
              <Tag color={ORDER_STATUS_TAG[orderInfo.status]}>{mapValue(ORDER_STATUS, orderInfo.status)}</Tag>
            </Form.Item>
            <Form.Item label="创建时间">
              {getTime(orderInfo.create_time)}
            </Form.Item>
            <Form.Item label="餐桌号">
              <Badge count={orderInfo.table_num} style={{ backgroundColor: '#108ee9' }} />
            </Form.Item>
            <Form.Item label="用餐人数">
              {orderInfo.people_num}人
            </Form.Item>
            <Form.Item label="会员信息">
              <Card
                style={{ width: 400 }}
              >
                <Card.Meta
                  avatar={
                    <Avatar src={memberInfo.avatar} />
                  }
                  title={`${memberInfo.nickname} [ ${memberInfo.id} ] `}
                  description={`注册时间:${getTime(memberInfo.create_time)}`}
                />
              </Card>
            </Form.Item>
            <Form.Item label="消费菜单">
              <Table
                className="body-table"
                bordered
                columns={columns}
                dataSource={productList}
                pagination={() => null}
                rowKey={record => record.id}
                summary={pageData => {
                  let totalPrice = 0;
                  pageData.forEach(({ total_price }) => {
                    totalPrice += total_price;
                  });

                  return (
                    <>
                      <Table.Summary.Row className="table-total">
                        <Table.Summary.Cell />
                        <Table.Summary.Cell />
                        <Table.Summary.Cell />
                        <Table.Summary.Cell />
                        <Table.Summary.Cell>
                          <Text type="danger">合计</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell>
                          <Text type="danger">¥ {totalPrice}</Text>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </>
                  )
                }}
              ></Table>
            </Form.Item>

            <Form.Item>

              <div className="result-order">
                <div className="title">合计：</div>
                <div className="result-list">
                  <div className="result-item">
                    <span className="result-item-label">菜品消费：</span>
                    <span className="result-item-content">{orderInfo.total_price - orderInfo.tea_price}</span>
                  </div>
                  <div className="result-item">
                    <span className="result-item-label">茶位费：</span>
                    <span className="result-item-content">¥ {orderInfo.tea_price}</span>
                  </div>
                  <div className="result-item">
                    <span className="result-item-label">消费金额：</span>
                    <span className="result-item-content">¥ {orderInfo.total_price}</span>
                  </div>
                  <div className="result-item">
                    <span className="result-item-label">优惠金额：</span>
                    <span className="result-item-content"> - ¥{orderInfo.total_price - orderInfo.real_price}</span>
                  </div>
                  <div className="result-item" style={{ color: '#820014' }}>
                    <span className="result-item-label">实付款：</span>
                    <span className="result-item-content" >¥ {orderInfo.real_price}</span>
                  </div>
                </div>
              </div>
            </Form.Item>
          </Card>
          <div style={{ textAlign: 'center',marginTop:'24px' }}>
            <Button type="primary" >返回</Button>
          </div>
        </Form>
      </Card>
    )
  }

}