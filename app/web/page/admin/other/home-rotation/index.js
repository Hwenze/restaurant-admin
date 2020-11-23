import React from 'react';
import BaseComponent from '~web/layout/base';
import { Card, Table, Button, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';
import { mapValue } from '~web/utils';
import { getHomeRotation, changeStatus } from './service';
import { ENABLE_STATUS } from '~web/utils/constant';
import { pvImage } from '~web/component/pv';

export default class homeRotation extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      dataList: [],   //列表数据
    }
  }

  componentDidMount() {
    this.getListData();
  }

  // 获取列表数据
  getListData = () => {
    getHomeRotation({}).then(res => {
      this.setState({
        dataList: res.data
      })
    }).catch(err => {
      message.error(err.msg);
    })
  }

  // 更改状态
  changeStatusFnc = item => {
    changeStatus({id: item.id}).then(res => {
      if (res) {
        message[res.type](res.msg);
        res.code === 200 && this.getListData();
      }
    })
  }

  render() {
    const { dataList = [] } = this.state;
    const columns = [
      {
        title: '权重排序',
        dataIndex: 'sort',
        align: 'center',
      },
      {
        title: '图片',
        dataIndex: 'picture',
        align: 'center',
        render: (val) => (
          <img className="table-item-image" src={val} onClick={() => pvImage(val)} />
        )
      },
      {
        title: '状态',
        dataIndex: 'status',
        align: 'center',
        render: (val) => mapValue(ENABLE_STATUS, val)
      },
      {
        title: '操作',
        align: 'center',
        width: 250,
        render: (item) => {
          return <>
            <Link style={{ padding: '4px 15px' }} to={`/other/home-rotation/details/${item.id}`} type="link">编辑</Link>
            <Popconfirm title={`是否要${item.status === 1 ? '禁用' : '启用'}该权限？`} onConfirm={() => this.changeStatusFnc(item)}>
              <Button type="link" >{item.status === 1 ? '禁用' : '启用'}</Button>
            </Popconfirm>
          </>
        }
      }
    ];

    return (
      <Card bordered={false} title="首页轮播">
        <Table
          className="body-table"
          bordered
          columns={columns}
          dataSource={dataList}
          rowKey={record => record.id}
          onChange={this.changeTable}
        >
        </Table>

      </Card>
    )
  }
}