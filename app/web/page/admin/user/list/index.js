import React from 'react';
import BaseComponent from '~web/layout/base';
import { Card, Table } from 'antd';

export default class UserList extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  loadData() {
    // 获取基本信息
  }

  render() {
    const list= [
      {
        uid:'123',
        nickname:'joker',

      }
    ]
    const columns = [
      {
        title: 'ID',
        dataIndex: 'uid',
        align: 'center',
      },
      {
        title: '用户名称',
        dataIndex: 'nickname',
        align: 'center',
      },
      {
        title: '操作',
        align: 'center',
      }
    ]
    return (
      <Card bordered={false}>
        <Table
          bordered
          columns={columns}
          dataSource={list}
          rowKey={record => record.uid}
          pagination={false}
        >
        </Table>
      </Card>
    )
  }

}