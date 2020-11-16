import React from 'react';
import BaseComponent from '~web/layout/base';
import { Card, Table, Form, Row, Col, Button } from 'antd';
import Input from '~web/component/Input';
import Select from '~web/component/Select';
import { gerUrlQuery } from '~web/utils';
import { observer, inject } from 'mobx-react';
import { ROW_CONFIG, COL_CONFIG } from '~web/utils/constant';

@inject(('store'))
@observer
export default class UserList extends BaseComponent {

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
    const { store: { userStore } } = this.props;
    this.setState({
      queryForm: params
    })
    userStore.getUserList(params).then(res => {
      console.log('res', res);
    })

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
    const { store: { userStore }, form } = this.props;
    const { queryForm } = this.state;
    const { userList = [], pagination = {} } = userStore.state;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'uid',
        align: 'center',
      },
      {
        title: '用户名称',
        dataIndex: 'nickname',
        align: 'center',
      },
      {
        title: '操作',
        align: 'center',
      }
    ];


    return (
      <Card bordered={false} title="会员详情">
        <Form className="body-form df-form"
          ref={this.formRef}
          onFinish={this.onFinish}
          initialValues={{
            q_username: queryForm.q_username || "",
            q_nickname: queryForm.q_nickname || "",
            q_status: queryForm.q_status || "",
            q_role: queryForm.q_role || ""
          }}
        >
          <Row gutter={ROW_CONFIG}>
            <Col {...COL_CONFIG}>
              <Form.Item name="q_username" label="用户名" >
                <Input text='请输入用户名' />
              </Form.Item>
            </Col>
            <Col {...COL_CONFIG}>
              <Form.Item name="q_nickname" label="昵称" >
                <Input text='请输入昵称' />
              </Form.Item>
            </Col>
            <Col {...COL_CONFIG}>
              <Form.Item name="q_role" label="权限" >
                <Select data={[
                  { label: '店长', value: 1 },
                  { label: '游客', value: 2 }
                ]} />
              </Form.Item>
            </Col>
            <Col {...COL_CONFIG}>
              <Form.Item name="q_status" label="状态" >
                <Select data={[
                  { label: '正常', value: 1 },
                  { label: '冻结', value: 0 }
                ]} />
              </Form.Item>
            </Col>
            <Col {...COL_CONFIG} offset={18}>
              <Form.Item className="df ai-c jc-fe">
                <Button htmlType="submit" type="primary">搜索</Button>
                <Button style={{ marginLeft: '12px' }} onClick={this.onReset}>重置</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table
          className="body-table"
          bordered
          columns={columns}
          dataSource={userList}
          rowKey={record => record.uid}
          pagination={this.showPagination(pagination)}
          onChange={this.changeTable}
        >
        </Table>
      </Card>
    )
  }

}