import React, { PureComponent } from 'react';
import { Form, Button, message } from 'antd';
import Input from '~web/component/Input';
import Select from '~web/component/Select';
import ModalForm from '~web/component/ModalForm';
import { operateService } from '~web/service/operate';

export default class UserItem extends PureComponent {
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

  // modal回调
  onOk = (data) => {
    const { onClose } = this.props;
    if (data) {
      // 保存 or 新增 
      operateService.addUser(data).then(res => {
        if (res) {
          message[res.type](res.msg);
          onClose && onClose(true);
        }
      })

    } else {
      onClose && onClose(false);
    }
  }

  render() {
    const { isPasswod } = this.state;
    const { roleList = [], itemData = {}, visible, onClose } = this.props;
    return (
      <ModalForm
        visible={visible}
        onOk={this.onOk}
        title={itemData.id ? '编辑用户' : '创建用户'}
        init={{
          username: itemData.username,
          nickname: itemData.nickname,
          status: itemData.status,
          role: itemData.role,
        }}
      >
        <>
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: '用户名不能为空', max: 30, }]}>
            <Input text="请输入用户名" disabled={itemData.id} />
          </Form.Item>
          <Form.Item label="用户昵称" name="nickname" rules={[{ required: true, message: '用户昵称不能为空', max: 30, }]}>
            <Input text="请输入用户昵称" />
          </Form.Item>
          <Form.Item label="权限" name="role">
            <Select labelValue={{ label: 'name', value: 'id' }} data={roleList.toJS()} />
          </Form.Item>
          {isPasswod && <Form.Item label="账号密码" name="password">
            <Input rules={[{ required: true, message: '密码不能为空', max: 30, }]} />
          </Form.Item>}
          <Form.Item label="账号密码">
            <span>密码默认是【 123456 】</span>
            <Button type="link" onClick={() => this.setState({ isPasswod: !isPasswod })}>
              {isPasswod ? '取消修改' : '修改密码'}
            </Button>
          </Form.Item>
        </>
      </ModalForm>
    )
  }

}