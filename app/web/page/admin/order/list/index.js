import React from 'react';
import BaseComponent from '~web/layout/base';
import { Card, Table, Form, Row, Col, Button } from 'antd';
import Input from '~web/component/Input';
import Select from '~web/component/Select';
import { gerUrlQuery, getTime, mapValue } from '~web/utils';
import { observer, inject } from 'mobx-react';
import { ROW_CONFIG, COL_CONFIG, ORDER_STATUS } from '~web/utils/constant';
import { Link } from 'react-router-dom';

@inject(('store'))
@observer
export default class OrderList extends BaseComponent {

  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      queryForm: {}
    }
  }

  componentDidMount() {
    const { location } = this.props;
    const query = gerUrlQuery(location);
    this.loadData(query);
  }

  loadData(params) {
    // 获取基本信息
    const { store: { orderStore } } = this.props;
    this.setState({
      queryForm: params,
      formLoad:true,
    })
    orderStore.getOrderList(params);

  }
  // 确认
  onFinish = (value) => {
    this.pushUrlQuery({
      ...value,
      current: 1,
    });
  }
  // 重置
  onReset = () => {
    this.formRef.current.resetFields();
  }

  render() {
    const { store: { orderStore }, form } = this.props;
    const { queryForm, formLoad } = this.state;
    const { orderList = [], pagination = {} } = orderStore.state;
    const columns = [
      {
        title: '订单ID',
        dataIndex: 'order_id',
        align: 'center',
      },
      {
        title: '就餐会员',
        dataIndex: 'member_id',
        align: 'center',
        render: (v, item) => <span>
          [{v}] {item.nickname}
        </span>
      },
      {
        title: '就餐人数',
        dataIndex: 'people_num',
        align: 'center',
      },
      {
        title: '餐桌号',
        dataIndex: 'table_num',
        align: 'center',
      },
      {
        title: '下单时间',
        dataIndex: 'create_time',
        align: 'center',
        render: (val) => getTime(val)
      },
      {
        title: '订单状态',
        dataIndex: 'status',
        align: 'center',
        render: (val) => mapValue(ORDER_STATUS, val)
      },
      {
        title: '消费金额',
        dataIndex: 'total_price',
        align: 'center',
      },
      {
        title: '操作',
        align: 'center',
        render: (item) => {
          return <>
            <Button type="link" >
              <Link to={`/order/detail/${item.order_id}`}>查看</Link>
            </Button>
          </>
        }
      }
    ];


    return (
      <Card bordered={false}>
        {formLoad && <Form className="body-form df-form" ref={this.formRef} initialValues={queryForm} onFinish={this.onFinish}>
          <Row gutter={ROW_CONFIG}>
            <Col {...COL_CONFIG}>
              <Form.Item name="q_orderId" label="订单ID" >
                <Input text='请输入订单ID' />
              </Form.Item>
            </Col>
            <Col {...COL_CONFIG}>
              <Form.Item name="q_memberId" label="用户ID" >
                <Input text='请输入用户ID' />
              </Form.Item>
            </Col>
            <Col {...COL_CONFIG}>
              <Form.Item name="q_status" label="状态" >
                <Select data={ORDER_STATUS} />
              </Form.Item>
            </Col>
          </Row>
          <div className="search-btns">
            <Button className="add-btn" type="primary">
              <Link to='/product/detail/add'>添加</Link>
            </Button>
            <Button htmlType="submit" type="primary">搜索</Button>
            <Button style={{ marginLeft: '12px' }} onClick={this.onReset}>重置</Button>
          </div>
        </Form>}
        <Table
          className="body-table"
          bordered
          columns={columns}
          dataSource={orderList}
          rowKey={record => record.id}
          pagination={this.showPagination(pagination)}
          onChange={this.changeTable}
        >
        </Table>
      </Card>
    )
  }

}