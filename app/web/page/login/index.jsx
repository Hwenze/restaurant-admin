import React from 'react';
import BaseComponent from '~web/layout/base';
import { Provider } from 'mobx-react';
import { Form, Layout, Input, Button, message } from 'antd';
import { selfService } from '~web/service/self';
import Storage from '~web/utils/storage';
import { TOKEN_KEY } from '~web/utils/constant';
import {
  UserOutlined,
  LockOutlined
} from '@ant-design/icons';


import './index.less';
export default class Login extends BaseComponent {
  formRef = React.createRef();
  constructor(props) {
    super(props);
  }

  // 登陆成功
  onFinish = (values) => {
    const { username, password } = values;
    const result = selfService.login({ username, password });
    result.then(res => {
      if (res.code === 200) {
        Storage && Storage.setItem(TOKEN_KEY, res.data);
        message.success(res.msg);
        setTimeout(() => {
          window.location.href = "/";
        }, 200);
      } else {
        message.error(res.msg);
      }
    }).catch(err => {
      console.log('err', err);
    })
  }

  render() {
    return (
      <Provider>
        <Layout className="login-root" >
          <Form className="login-container" ref={this.formRef} onFinish={this.onFinish}>
            <div className="title">系统登录</div>
            <Form.Item name="username" rules={[{ required: true, message: '用户名不能为空', max: 30, }]}>
              <Input size="large" text='请输入用户名' prefix={<UserOutlined style={{ fontSize: 16, color: '#fff' }} />} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '密码不能为空', max: 30, }]}>
              <Input size="large" text='请输入密码' prefix={<LockOutlined style={{ fontSize: 16, color: '#fff' }} />} />
            </Form.Item>
            <Form.Item>
              <Button size="large" type="primary" htmlType="submit" className="button">登录</Button>
            </Form.Item>
          </Form>
        </Layout>
      </Provider>
    );
  }
}
