import React from 'react';
import BaseComponent from '~web/layout/base';
import { Card, Table, Input, Form, Row, Col, Button } from 'antd';
import { gerUrlQuery } from '~web/utils';
import { observer, inject } from 'mobx-react';
import { ROW_CONFIG, COL_CONFIG } from '~web/utils/constant';
const FormItem = Form.Item;

@Form.create()
@inject(('store'))
@observer
export default class UserList extends BaseComponent {
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

  handleSearch = (e) => {
    e && e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, val) => {
      if (err) return;
      this.pushUrlQuery({
        ...val,
        current: 1,
      });
    })


  }

  render() {
    const { store: { userStore }, form } = this.props;
    const { getFieldDecorator } = form;
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
      <Card bordered={false}>
        <Form className="body-form df-form" onSubmit={this.handleSearch}>
          <Row gutter={ROW_CONFIG}>
            <Col {...COL_CONFIG}>
              <FormItem label="用户名">
                {getFieldDecorator('q_username', {
                  initialValue: queryForm.username,
                })(
                  <Input placeholder='请输入用户名' />
                )}
              </FormItem>
            </Col>
            <Col {...COL_CONFIG}>
              <FormItem label="昵称">
                {getFieldDecorator('q_nickname', {
                  initialValue: queryForm.nickname,
                })(
                  <Input placeholder='请输入昵称' />
                )}
              </FormItem>
            </Col>
            <Col {...COL_CONFIG}>
              <FormItem label="权限">
                {getFieldDecorator('q_role', {
                  initialValue: queryForm.role,
                })(
                  <Input placeholder='请选择' />
                )}
              </FormItem>
            </Col>
            <Col {...COL_CONFIG}>
              <FormItem label="状态">
                {getFieldDecorator('q_status', {
                  initialValue: queryForm.status,
                })(
                  <Input placeholder='请选择' />
                )}
              </FormItem>
            </Col>
            <Col {...COL_CONFIG} offset={18}>
              <FormItem className="df ai-c jc-fe">
                <Button htmltype="submit" type="primary">搜索</Button>
                <Button style={{marginLeft:'12px'}} onClick={this.reset}>重置</Button>
              </FormItem>
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