import React from 'react';
import BaseComponent from '~web/layout/base';
import { Card, Form, Popconfirm, Tag, Button, message } from 'antd';
import Input from '~web/component/Input';
import Select from '~web/component/Select';
import Upload from '~web/component/Upload';
import { observer, inject } from 'mobx-react';
import { productService, categoryService } from '~web/service/product';
import './index.less';

@inject(('store'))
@observer
export default class UserList extends BaseComponent {

  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      productInfo: {
        banner: '',
        category_ids: [],
        desc: null,
        price: '',
        sub_title: "",
        title: "",
      },
      formLoad: false,
      categoryList: [],
    }
    const { params = {} } = this.props.match;
    this.productId = params.id || null;
  }

  componentDidMount() {
    const { location } = this.props;
    categoryService.getCategoryList({ current: 0, pageSize: 999 }).then(res => {
      if (res.code === 200) {
        this.setState({
          categoryList: res.data
        })
      } else {
        message.error(res.msg);
      }
    })
    if (this.productId) {
      productService.getProductInfo(this.productId).then(res => {
        if (res.code === 200) {
          this.setState({
            productInfo: res.data,
            formLoad: true,
          })
        } else {
          message.error(res.msg);
        }
      })
    }else{
      this.setState({
        formLoad: true,
      })
    }

  }

  // 确认
  onFinish = (value) => {
    const { history } = this.props;
    const productInfo = {
      ...this.state.productInfo,
      ...value,
    }
    productService.saveProduct(productInfo).then(res => {
      if(res){
        message[res.type](res.msg);
        if(res.data){
          const { insertId } = res.data;
          history.push(`/product/detail/${insertId}`);
          this.setState({
            productInfo:productInfo,
            id:insertId
          })
          this.productId = insertId;
        }
      }
    })
  }

  render() {

    const { productInfo, categoryList, formLoad } = this.state;
    return (
      <Card bordered={false} title="商品详情" className="product-detail-root">
        {formLoad && <Form className="body-form"
          labelCol={{ span: 3 }}
          labelAlign="right"
          ref={this.formRef}
          initialValues={productInfo}
          onFinish={this.onFinish}>
          <Form.Item label="商品图片" name="banner" rules={[{ required: true, message: '商品图片不能为空' }]}>
            <Upload multiple={true} />
          </Form.Item>
          <Form.Item label="商品标题" name="title" rules={[{ required: true, message: '商品标题不能为空' }]}>
            <Input text="请输入商品标题" />
          </Form.Item>
          <Form.Item label="副标题" name="sub_title">
            <Input text="请输入商品副标题" />
          </Form.Item>
          <Form.Item label="商品价格" name="price" rules={[{ required: true, message: '商品价格不能为空' }]}>
            <Input text="请输入商品价格" />
          </Form.Item>
          <Form.Item label="商品分类" name="category_ids" rules={[{ required: true, message: '商品分类不能为空' }]}>
            <Select
              mode="multiple"
              labelValue={{ label: 'name', value: 'id' }}
              data={categoryList}
            ></Select>
          </Form.Item>
          {productInfo.create_time && <Form.Item label="创建时间">
            <Tag>{productInfo.create_time}</Tag>
          </Form.Item>}
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