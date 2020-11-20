import React, { PureComponent } from 'react';
import { Form, Button, message } from 'antd';
import Input from '~web/component/Input';
import Upload from '~web/component/Upload';
import ModalForm from '~web/component/ModalForm';
import { categoryService } from '~web/service/product';

export default class UserItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  // modal回调
  onOk = (data) => {
    const { onClose, itemData } = this.props;
    const params = {
      ...itemData,
      ...data
    }
    if (data) {
      // 保存 or 新增 
      categoryService.saveCategory(params).then(res => {
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
    const { itemData = {}, visible } = this.props;
    return (
      <ModalForm
        visible={visible}
        onOk={this.onOk}
        title={itemData.id ? '编辑分类' : '创建分类'}
        init={{
          name: itemData.name,
          image: itemData.image,
          desc: itemData.desc,
        }}
      >
        <>
          <Form.Item label="分类名称" name="name" rules={[{ required: true, message: '分类名称', max: 30, }]}>
            <Input text="请输入分类名称" />
          </Form.Item>
          <Form.Item label="商品图片" name="image" rules={[{ required: true, message: '图片不能为空' }]}>
            <Upload />
          </Form.Item>
          <Form.Item label="备注说明" name="desc">
            <Input />
          </Form.Item>
        </>
      </ModalForm>
    )
  }

}