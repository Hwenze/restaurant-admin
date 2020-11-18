import React from 'react';
import BaseComponent from '~web/layout/base';
import { Card, Table, Form, Row, Col, Button, Popconfirm, message } from 'antd';
import Input from '~web/component/Input';
import Select from '~web/component/Select';
import { gerUrlQuery, mapValue } from '~web/utils';
import { observer, inject } from 'mobx-react';
import { ROW_CONFIG, COL_CONFIG, ENABLE_STATUS } from '~web/utils/constant';
// import UserItem from './item';
import { roleService } from '~web/service/operate';
import { Link } from 'react-router-dom';

@inject(('store'))
@observer
export default class UserRolePage extends BaseComponent {

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
    operateStore.initRoleList(params);

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
  // 添加权限
  add = () => {
    this.setState({
      visible: true,
      currentData: {
        id: null,
        name: '',
      }
    })
  }
  // 删除权限
  deleteRole = item => {
    roleService.deleteRole(item.id).then(res => {
      if (res) {
        message[res.type](res.msg);
        this.reload();
      }
    })
  }

  // 更改用户状态
  changeStatus = item => {
    console.log(item);
    roleService.changeRoleStatus(item.id).then(res => {
      if (res) {
        message[res.type](res.msg);
        res.code === 200 && this.reload();
      }
    })
  }

  // modal回调
  modalClose = (isLoad) => {
    this.setState({ visible: false });
    if (isLoad) {
      this.reload();
    }
  }

  // 重新加载
  reload() {
    const { location } = this.props;
    const query = gerUrlQuery(location);
    this.loadData(query);
  }

  render() {
    const { store: { operateStore } } = this.props;
    const { queryForm, formLoad } = this.state;
    const { roleList = [] } = operateStore.state;
    const columns = [
      {
        title: '权限ID',
        dataIndex: 'id',
        align: 'center',
      },
      {
        title: '权限名称',
        dataIndex: 'name',
        align: 'center',
      },
      {
        title: '权限状态',
        dataIndex: 'status',
        align: 'center',
        render: (val) => mapValue(ENABLE_STATUS, val)
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        align: 'center',
      },
      {
        title: '操作',
        align: 'center',
        width: 250,
        render: (item) => {
          return <>
            <Link style={{padding:'4px 15px'}} to={`/operate/role/${item.id}`} type="link" onClick={() => this.setState({ visible: true, currentData: item })}>编辑</Link>
            <Popconfirm title={`是否要${item.status === 1 ? '禁用' : '启用'}该权限？`} onConfirm={() => this.changeStatus(item)}>
              <Button type="link" >{item.status === 1 ? '禁用' : '启用'}</Button>
            </Popconfirm>
            <Popconfirm title="删除后拥有该权限的人会变为游客状态，是否还要删除？" onConfirm={() => this.deleteRole(item)}>
              <Button type="link" danger>删除</Button>
            </Popconfirm>
          </>
        }
      }
    ];


    return (
      <Card bordered={false} title="权限列表">
        {formLoad && <Form className="body-form df-form"
          ref={this.formRef}
          onFinish={this.onFinish}
          initialValues={{
            q_name: queryForm.q_name,
            q_status:queryForm.q_status
          }}
        >
          <Row gutter={ROW_CONFIG}>
            <Col {...COL_CONFIG}>
              <Form.Item name="q_name" label="名称" >
                <Input text='请输入权限名称' />
              </Form.Item>
            </Col>
            <Col {...COL_CONFIG}>
              <Form.Item name="q_status" label="状态" >
                <Select data={ENABLE_STATUS} />
              </Form.Item>
            </Col>
            <div className="search-btns">
              <Button className="add-btn" type="primary" onClick={this.add}>添加</Button>
              <Button htmlType="submit" type="primary">搜索</Button>
              <Button style={{ marginLeft: '12px' }} onClick={this.onReset}>重置</Button>
            </div>
          </Row>
        </Form>}
        <Table
          className="body-table"
          bordered
          columns={columns}
          dataSource={roleList}
          rowKey={record => record.id}
          onChange={this.changeTable}
        >
        </Table>
      </Card>
    )
  }

}