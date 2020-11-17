import React, { PureComponent } from 'react';
import BaseComponent from '~web/layout/base';
import { Card, Table, Form, Row, Col, Button, Modal } from 'antd';
import Input from '~web/component/Input';
import Select from '~web/component/Select';
import { gerUrlQuery, mapValue } from '~web/utils';
import { observer, inject } from 'mobx-react';
import { ROW_CONFIG, COL_CONFIG, COMMON_STATUS } from '~web/utils/constant';

export default class UserItem extends PureComponent {

  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      formLoad: false,
      isPasswod: false
    }
  }

  componentDidMount() {
    console.log('asdasd', this.props.roleList);
  }

  render() {
    const { isPasswod } = this.state;
    const { roleList = [], itemData = {}, visible, onClose } = this.props;
    return (
      <Modal title={itemData.id ? '编辑用户' : '创建用户'} visible={visible}
        onOk={() => onClose()}
        onCancel={() => onClose()}>
        {visible && <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          className="body-form df-form"
          ref={this.formRef}
          onFinish={this.onFinish}
          initialValues={{
            nickname: itemData.nickname,
            status: itemData.status,
            role: itemData.role,
          }}>
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: '用户名不能为空', max: 30, }]}>
            <Input text="请输入用户名" disabled={itemData.id} />
          </Form.Item>
          <Form.Item label="用户昵称" name="nickname" rules={[{ required: true, message: '用户昵称不能为空', max: 30, }]}>
            <Input text="请输入用户昵称" />
          </Form.Item>
          <Form.Item label="权限" name="role">
            <Select labelValue={{ label: 'name', value: 'id' }} data={roleList.toJS()} />
          </Form.Item>
          {isPasswod && <Form.Item label="用户密码" name="password">
            <Input rules={[{ required: true, message: '密码不能为空', max: 30, }]} />
          </Form.Item>}
          <div>
            <span>密码默认是【 123456 】</span>
            <Button type="link" onClick={() => this.setState({ isPasswod: !isPasswod })}>
              {isPasswod ? '取消修改' : '修改密码'}
            </Button>
          </div>
        </Form >}
      </Modal>
    )
  }

}