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

const FormItem = Form.Item;

import './index.less';
@Form.create()
export default class Login extends BaseComponent {

  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e && e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (err) return;
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
    })
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Provider>
        <Layout className="login-root">
          <Form className="login-container" onSubmit={this.handleSubmit}>
            <div className="title">系统登录</div>
            <FormItem>
              {
                getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空',
                      max: 30,
                    }
                  ]
                })(
                  <Input size="large" placeholder='请输入用户名'
                    prefix={<UserOutlined style={{ fontSize: 16, color: '#fff' }} />}></Input>
                )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '密码不能为空',
                      max: 30,
                    }
                  ]
                })(
                  <Input size="large" type="password" placeholder='请输入密码'
                    prefix={<LockOutlined style={{ fontSize: 16, color: '#fff' }} />}></Input>
                )
              }
            </FormItem>
            <FormItem>
              <Button size="large" type="primary" htmlType="submit" className="button">登录</Button>
            </FormItem>
          </Form>
        </Layout>
      </Provider>
    );
  }
}