import React from 'react';
import BaseComponent from '~web/layout/base';
import { Card, Form, Popconfirm, Switch, Button, message } from 'antd';
import Input from '~web/component/Input';
import Upload from '~web/component/Upload';
import { observer, inject } from 'mobx-react';
import { getRotationDateils, updateRotationDateils } from './service';
import './index.less';

@inject(('store'))
@observer
export default class rotationDetails extends BaseComponent {

  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      productInfo: {
        picture: '',
        sort: '',
        status: 1,
      },
      formLoad: false,
    }
    const { params = {} } = this.props.match;
    this.rotaId = params.id || null;
  }

  componentDidMount() {
    if (this.rotaId) {
      getRotationDateils({ id: this.rotaId }).then(res => {
        if (res.code === 200) {
          this.setState({
            productInfo: res.data,
            formLoad: true,
          })
        } else {
          message.error(res.msg);
        }
      })
    } else {
      this.setState({
        formLoad: true,
      })
    }
  }

  // 确认
  onFinish = (value) => {
    value.status = value.status ? 1: 0;
    const productInfo = {
      ...this.state.productInfo,
      ...value,
    }
    updateRotationDateils(productInfo).then(res => {
      message.success(res.data);
      setTimeout(() => {
        window.location.href = "/other/home-rotation";
      }, 1500)
    }).catch(err => {
      message.error(err.msg);
    })
  }

  onChange = (checked) => {
    const { productInfo } = this.state;
    productInfo.status = checked ? 1: 0;
    this.setState({
      productInfo
    })
  }

  render() {

    const { productInfo, formLoad } = this.state;
    return (
      <Card bordered={false} title="轮播详情" className="product-detail-root">
        {formLoad && <Form className="body-form"
          labelCol={{ span: 3 }}
          labelAlign="right"
          ref={this.formRef}
          initialValues={productInfo}
          onFinish={this.onFinish}>
          <Form.Item label="轮播图片" name="picture" rules={[{ required: true, message: '商品图片不能为空' }]}>
            <Upload />
          </Form.Item>
          <Form.Item label="权重排序" name="sort" rules={[{ required: true, message: '权重排序不能为空' }]}>
            <Input text="请输入权重排序" type='number' />
          </Form.Item>
          <Form.Item label="是否启用" name="status">
            <Switch checked={productInfo.status} onChange={this.onChange} />
          </Form.Item>
          <Form.Item>
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