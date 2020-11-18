import React from 'react';
import BaseComponent from '~web/layout/base';
import { Card, Table, Form, Row, Col, Button, Modal } from 'antd';
import Input from '~web/component/Input';
import Select from '~web/component/Select';
import { gerUrlQuery, mapValue } from '~web/utils';
import { observer, inject } from 'mobx-react';
import { ROW_CONFIG, COL_CONFIG, COMMON_STATUS } from '~web/utils/constant';
import UserItem from './item';

@inject(('store'))
@observer
export default class UserList extends BaseComponent {

  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      queryForm: {},
      formLoad: false,
      visible: false,
      currentData: {}, // 当前用户
    }
  }

  componentDidMount() {
    const { location } = this.props;
    const query = gerUrlQuery(location);
    this.loadData(query);
  }

  loadData(params) {
    // 获取基本信息
    const { store: { operateStore } } = this.props;
    this.setState({
      queryForm: params,
      formLoad: true,
    })
    operateStore.initRoleList();
    operateStore.getUserList(params);

  }
  // 确认
  onFinish = value => {
    this.pushUrlQuery({
      ...value,
      current: 1,
    });
  }
  // 重置
  onReset = () => {
    this.formRef.current.resetFields();
  }
  // 添加用户
  add = () => {
    this.setState({
      visible: true,
      currentData: {
        id: null,
        username: '',
        nickname: '',
        role: null
      }
    })
  }

  render() {
    const { store: { operateStore } } = this.props;
    const { queryForm, formLoad, visible, currentData } = this.state;
    const { userList = [], pagination = {}, roleList = [] } = operateStore.state;
    const columns = [
      {
        title: '运营账号',
        dataIndex: 'username',
        align: 'center',
      },
      {
        title: '用户名称',
        dataIndex: 'nickname',
        align: 'center',
      },
      {
        title: '账号状态',
        dataIndex: 'status',
        align: 'center',
        render: (val) => mapValue(COMMON_STATUS, val)
      },
      {
        title: '账号称号',
        dataIndex: 'role',
        align: 'center',
        render: (val) => mapValue(roleList.toJS(), val, { label: 'name', value: 'id' })
      },
      {
        title: '操作',
        align: 'center',
        width: 250,
        render: (item) => {
          return <>
            <Button type="link" onClick={() => this.setState({ visible: true, currentData: item })}>编辑</Button>
            <Button type="link" >{item.status === 1 ? '冻结' : '解冻'}</Button>
            <Button type="link" danger>删除</Button>
          </>
        }
      }
    ];


    return (
      <Card bordered={false} title="运营">
        {formLoad && <Form className="body-form df-form"
          ref={this.formRef}
          onFinish={this.onFinish}
          initialValues={{
            q_username: queryForm.q_username,
            q_nickname: queryForm.q_nickname,
            q_status: queryForm.q_status,
            q_role: queryForm.q_role
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
                <Select labelValue={{ label: 'name', value: 'id' }} data={roleList.toJS()} />
              </Form.Item>
            </Col>
            <Col {...COL_CONFIG}>
              <Form.Item name="q_status" label="状态" >
                <Select data={COMMON_STATUS} />
              </Form.Item>
            </Col>
            <div className="search-btns">
              <Button className="add-btn" type="primary" onClick={this.add}>添加</Button>
              <Button htmlType="submit" type="primary">搜索</Button>
              <Button style={{ marginLeft: '12px' }} onClick={this.onReset}>重置</Button>
            </div>
          </Row>
        </Form>}
        {formLoad && <UserItem
          visible={visible}
          onClose={() => this.setState({ visible: false })}
          itemData={currentData}
          roleList={roleList}
        />}
        <Table
          className="body-table"
          bordered
          columns={columns}
          dataSource={userList}
          rowKey={record => record.id}
          pagination={this.showPagination(pagination)}
          onChange={this.changeTable}
        >
        </Table>
      </Card>
    )
  }

}