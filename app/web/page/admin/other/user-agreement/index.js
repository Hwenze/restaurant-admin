import React from "react";
import BaseComponent from '~web/layout/base';
import { Card, Button, message } from 'antd';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import { observer, inject } from 'mobx-react';
import { getAgreement, setAgreement } from './service';
import './index.less';

@inject(('store'))
@observer
export default class userAgreement extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      editorState: '', // 设置编辑器初始内容
    };
  }

  componentDidMount() {
    const result = getAgreement();
    result.then(res => {
      this.setState({
        editorState: BraftEditor.createEditorState(res.data.agreement)
      })
    }).catch(err => {
      message.error(err.msg);
    })
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState
    })
  }

  save = () => {
    const agreement = this.state.editorState.toHTML();
    const result = setAgreement({agreement});
    result.then(res => {
      message.success(res.data);
    }).catch(err => {
      message.error(err.msg);
    })
  }

  render() {
    const { editorState } = this.state;

    return (
      <Card bordered={false} title="用户协议">
        <div className="editor-box">
          <BraftEditor
            value={editorState}
            onChange={this.handleChange}
          />
        </div>
        <div className="btn-box">
          <Button htmlType="submit" type="primary" onClick={this.save}>保存</Button>
        </div>
      </Card>
    )
  }
}
