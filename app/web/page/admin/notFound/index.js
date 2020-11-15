import React from 'react';
import BaseComponent from '~web/layout/base';
import { Card } from 'antd';

export default class NotFound extends BaseComponent {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Card bordered={false}>
        <div>
          页面到火星去咯...
        </div>
      </Card>
    )
  }

}