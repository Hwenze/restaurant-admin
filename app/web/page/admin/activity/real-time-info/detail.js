import React from "react";
import BaseComponent from "~web/layout/base";
import { Card, Form, Button, DatePicker, message } from "antd";
import Input from "~web/component/Input";
import { observer, inject } from "mobx-react";
// 引入编辑器组件
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
const { RangePicker } = DatePicker;
import { getRealTimeDateils, addRealTimeInfo, updateRealTimeInfo } from "./service";
import "./index.less";

@inject("store")
@observer
export default class InfoDetails extends BaseComponent {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      roleInfo: {},
      editorState: BraftEditor.createEditorState(""), // 设置编辑器初始内容
    };
    this.roleId = this.getQueryVariable("id");
  }

  componentDidMount() {
    if (this.roleId) {
      getRealTimeDateils({ id: this.roleId }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.setState({
            roleInfo: res.data
          })
        }
      }).catch(err => {
        message.error(err.msg);
      })
    }
  }

  // 截取路由参数
  getQueryVariable(variable) {
    const url = window.location.href.split('?')[1].split("&");
    for (const i of url) {
      const pair = i.split('=');
      if (pair[0] == variable) {
        return pair[1]
      }
    }
    return ''
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
    });
  };

  // 确认保存
  onFinish = (value) => {
    let data = {
      title: value.title,
      star_time: value.picker[0].format('YYYY-MM-DD'),
      end_time: value.picker[1].format('YYYY-MM-DD'),
      content: this.state.editorState.toHTML()
    }
    addRealTimeInfo(data).then(res => {
      message.success(res.data);
      setTimeout(() => {
        window.location.href = "/activity/real-time-info";
      }, 1500)
    }).catch(err => {
      message.error(err.msg);
    })
  };

  render() {
    const { editorState, roleInfo } = this.state;
    return (
      <Card bordered={false} title="活动资讯详情">
        <Form
          className="body-form df-form"
          ref={this.formRef}
          onFinish={this.onFinish}
          initialValues={{ ...roleInfo }}
        >
          <Form.Item name="title" label="活动标题" rules={[{ required: true, message: '活动标题不能为空', max: 30, }]}>
            <Input text="请输入活动标题" />
          </Form.Item>
          <Form.Item name="picker" label="活动时间" rules={[{ type: 'array', required: true, message: '活动时间不能为空' }]}>
            <RangePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item label="活动内容">
            <div className="editor-box">
              <BraftEditor
                value={editorState}
                onChange={this.handleChange}
              />
            </div>
          </Form.Item>
          <Button htmlType="submit" type="primary">保存</Button>
        </Form>
      </Card>
    );
  }
}
