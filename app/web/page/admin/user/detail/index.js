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
    return (
      <Card bordered={false}>
        <div>
          我是详情页
        </div>
      </Card>
    )
  }

}