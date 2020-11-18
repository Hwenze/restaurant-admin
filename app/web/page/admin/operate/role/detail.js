import React from 'react';
import BaseComponent from '~web/layout/base';
import { Card, Form, Button, Popconfirm, message, Tag, Tree } from 'antd';
import Input from '~web/component/Input';
import { observer, inject } from 'mobx-react';
import { roleService } from '~web/service/operate';

@inject(('store'))
@observer
export default class RoleDetailPage extends BaseComponent {

  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      formLoad: false,
      roleInfo: {}
    }
    const { params = {} } = this.props.match;
    this.roleId = params.id || null;
  }

  componentDidMount() {
    if (this.roleId) {
      roleService.getRoleInfo(this.roleId).then(res => {
        if (res.code === 200) {
          this.setState({
            formLoad: true,
            roleInfo: res.data
          })
        }
      })
    }
  }

  // 确认
  onFinish = value => {
    this.pushUrlQuery({
      ...value,
      current: 1,
    });
  }

  render() {
    const { store: { operateStore } } = this.props;
    const { roleInfo, formLoad } = this.state;
    return (
      <Card bordered={false} title="权限详情">
        {formLoad && <Form className="body-form df-form"
          ref={this.formRef}
          onFinish={this.onFinish}
          initialValues={{ ...roleInfo }}
        >
          <Form.Item name="name" label="权限名称">
            <Input />
          </Form.Item>
          <Form.Item name="router_ids" label="权限路由">
            <Input />
          </Form.Item>
          <Form.Item label="创建时间">
            <Tag type="info">{roleInfo.create_time}</Tag>
          </Form.Item>
          <Form.Item label="菜单列表">
            <Tree
              defaultExpandAll={true}
              showLine={true}
              defaultCheckedKeys={roleInfo.router_ids}
              defaultSelectedKeys={roleInfo.router_ids}
              checkable
              treeData={roleInfo.routerList}
            />
          </Form.Item>
        </Form>}
      </Card>
    )
  }

}