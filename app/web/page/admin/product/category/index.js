import React from 'react';
import BaseComponent from '~web/layout/base';
import { Card, Table, Form, Row, Col, Button, Popconfirm, message } from 'antd';
import Input from '~web/component/Input';
import Select from '~web/component/Select';
import { gerUrlQuery, mapValue, getTime } from '~web/utils';
import Item from './item';
import { observer, inject } from 'mobx-react';
import { ROW_CONFIG, COL_CONFIG, PRODUCT_STATUS } from '~web/utils/constant';
import { categoryService } from '~web/service/product';
import { Link } from 'react-router-dom';
import { pvImage } from '~web/component/pv';

@inject(('store'))
@observer
export default class CategoryList extends BaseComponent {

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
    const { location, store: { productStore } } = this.props;
    const query = gerUrlQuery(location);
    this.loadData(query);
  }

  loadData(params) {
    // 获取基本信息
    const { store: { productStore } } = this.props;
    this.setState({
      queryForm: params,
      formLoad: true,
    })
    productStore.getCategoryList(params);

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

  // 删除用户
  // deleteUser = item => {
  //   categoryService.deleteUser(item.id).then(res => {
  //     if (res) {
  //       message[res.type](res.msg);
  //       this.reload();
  //     }
  //   })
  // }

  // 更改用户状态
  changeStatus = item => {
    console.log(item);
    categoryService.changeCategoryStatus(item.id).then(res => {
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


  // 添加用户
  add = () => {
    this.setState({
      visible: true,
      currentData: {
        id: null,
        name: '',
        image: '',
        desc: undefined
      }
    })
  }

  // 重新加载
  reload() {
    const { location } = this.props;
    const query = gerUrlQuery(location);
    this.loadData(query);
  }

  render() {
    const { store: { productStore } } = this.props;
    const { queryForm, formLoad, visible, currentData } = this.state;
    const { categoryList = [], pagination = {} } = productStore.state;
    const columns = [
      {
        title: '分类ID',
        dataIndex: 'id',
        align: 'center',
      },
      {
        title: '分类名称',
        dataIndex: 'name',
        align: 'center',
      },
      {
        title: '分类图片',
        dataIndex: 'image',
        align: 'center',
        render: (val) => (
          <img className="table-item-image" src={val} onClick={() => pvImage(val)} />
        )
      },
      {
        title: '分类状态',
        dataIndex: 'status',
        align: 'center',
        render: (val) => mapValue(PRODUCT_STATUS, val)
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        align: 'center',
        render: (val) => getTime(val)
      },
      {
        title: '操作',
        align: 'center',
        width: 160,
        render: (item) => {
          return <>
            <Button type="link" onClick={() => this.setState({ visible: true, currentData: item })}>编辑</Button>
            <Popconfirm title={`是否要${item.status === 1 ? '下架' : '上架'}该分类？`} onConfirm={() => this.changeStatus(item)}>
              <Button type="link" >{item.status === 1 ? '下架' : '上架'}</Button>
            </Popconfirm>
            {/* <Popconfirm title="是否要删除？删除后不可恢复。" onConfirm={() => this.deleteUser(item)}>
              <Button type="link" danger>删除</Button>
            </Popconfirm> */}
          </>
        }
      }
    ];


    return (
      <Card bordered={false} title="商品列表">
        {formLoad && <Form className="body-form df-form"
          ref={this.formRef}
          onFinish={this.onFinish}
          initialValues={queryForm}
        >
          <Row gutter={ROW_CONFIG}>
            <Col {...COL_CONFIG}>
              <Form.Item name="q_id" label="商品ID" >
                <Input text='请输入商品ID' />
              </Form.Item>
            </Col>
            <Col {...COL_CONFIG}>
              <Form.Item name="q_title" label="商品标题" >
                <Input text='请输入商品标题' />
              </Form.Item>
            </Col>
            <Col {...COL_CONFIG}>
              <Form.Item name="q_status" label="状态" >
                <Select data={PRODUCT_STATUS} />
              </Form.Item>
            </Col>
            <div className="search-btns">
              <Button className="add-btn" type="primary" onClick={this.add}>添加</Button>
              <Button htmlType="submit" type="primary">搜索</Button>
              <Button style={{ marginLeft: '12px' }} onClick={this.onReset}>重置</Button>
            </div>
          </Row>
        </Form>}
        {formLoad && <Item
          visible={visible}
          onClose={this.modalClose}
          itemData={currentData}
        />}
        <Table
          className="body-table"
          bordered
          columns={columns}
          dataSource={categoryList}
          rowKey={record => record.id}
          pagination={this.showPagination(pagination)}
          onChange={this.changeTable}
        >
        </Table>
      </Card>
    )
  }

}