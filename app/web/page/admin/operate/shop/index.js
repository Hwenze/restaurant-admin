import React from 'react';
import BaseComponent from '~web/layout/base';
import { Card, Form, Button, Popconfirm, message, Tag, Switch } from 'antd';
import Upload from '~web/component/Upload';
import Input from '~web/component/Input';
import { observer, inject } from 'mobx-react';
import { shopService } from '~web/service/operate';
import { getTime } from '~web/utils';

@inject(('store'))
@observer
export default class ShopDetailPage extends BaseComponent {

  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      formLoad: false,
      shopInfo: {},
    }
  }


  // 确认
  onFinish = (value) => {
    const { history } = this.props;
    const shopInfo = {
      ...this.state.shopInfo,
      ...value,
      shop_status: value.shop_status ? 1 : 0,
    }
    shopService.updateShopInfo(shopInfo).then(res => {
      console.log(res);
    })
  }

  componentDidMount() {
    shopService.getShopInfo().then(res => {
      if (res.code === 200) {
        this.setState({
          shopInfo: res.data,
          formLoad: true,
        })
      } else {
        this.setState({ formLoad: true })
      }
    })
  }

  render() {
    const { store: { operateStore } } = this.props;
    const { shopInfo, formLoad } = this.state;
    return (
      <Card bordered={false} title="店铺信息">
        {formLoad && <Form className="body-form df-form"
          ref={this.formRef}
          onFinish={this.onFinish}
          labelCol={{ span: 3 }}
          labelAlign="right"
          initialValues={{ ...shopInfo }}
        >
          <Form.Item name="shop_avatar" label="店铺头像" rules={[{ required: true, message: '商品图片不能为空' }]}>
            <Upload />
          </Form.Item>
          <Form.Item name="shop_background" label="店铺背景图">
            <Upload />
          </Form.Item>
          <Form.Item name="shop_name" label="店铺名称" rules={[{ required: true, message: '商品名称不能为空' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="shop_user_id" label="店长ID" rules={[{ required: true, message: '店长ID不能为空' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="shop_desc" label="店铺说明">
            <Input />
          </Form.Item>
          <Form.Item valuePropName="checked" name="shop_status" label="店铺状态">
            <Switch />
          </Form.Item>
          <Form.Item label="创建时间">
            <Tag type="info">{getTime(shopInfo.create_time)}</Tag>
          </Form.Item>
          <Form.Item label="修改时间">
            <Tag type="danger">{getTime(shopInfo.update_time)}</Tag>
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit">保存</Button>
            <Popconfirm title='返回取消所有修改的操作，是否返回？' onConfirm={() => this.backUrl()}>
              <Button style={{ marginLeft: '12px' }} type="danger">返回</Button>
            </Popconfirm>
          </Form.Item>
        </Form>}
      </Card>
    )
  }

}