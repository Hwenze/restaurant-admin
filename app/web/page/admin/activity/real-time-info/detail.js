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
// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
import moment from 'moment';
import 'moment/locale/zh-cn';
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
      formLoad: false,
      editorState: '', // 设置编辑器初始内容
    };
    this.roleId = this.getQueryVariable("id");
  }

  componentDidMount() {
    if (this.roleId) {
      getRealTimeDateils({ id: this.roleId }).then(res => {
        if (res.code === 200) {
          let picker = [moment(res.data.star_time), moment(res.data.end_time)];
          this.setState({
            formLoad: true,
            roleInfo: {
              picker,
              ...res.data
            },
            editorState: BraftEditor.createEditorState(res.data.content)
          })
        }
      }).catch(err => {
        message.error(err.msg);
      })
    } else {
      this.setState({
        formLoad: true,
        editorState: BraftEditor.createEditorState("")
      })
    }
  }

  // 截取路由参数
  getQueryVariable(variable) {
    if (window.location.href.split('?').length < 2) {
      return false
    }
    const url = window.location.href.split('?')[1].split("&");
    for (let i of url) {
      let pair = i.split('=');
      if (pair[0] == variable) {
        return pair[1]
      }
    }
    return false
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
      introduce: value.introduce,
      star_time: value.picker[0].format('YYYY-MM-DD'),
      end_time: value.picker[1].format('YYYY-MM-DD'),
      content: this.state.editorState.toHTML()
    }
    if (this.roleId) {
      // 编辑
      updateRealTimeInfo({ id: this.roleId, ...data }).then(res => {
        message.success(res.data);
        setTimeout(() => {
          window.location.href = "/activity/real-time-info";
        }, 1500)
      }).catch(err => {
        message.error(err.msg);
      })
    } else {
      // 新增
      addRealTimeInfo(data).then(res => {
        message.success(res.data);
        setTimeout(() => {
          window.location.href = "/activity/real-time-info";
        }, 1500)
      }).catch(err => {
        message.error(err.msg);
      })
    }
  };

  render() {
    const { editorState, roleInfo, formLoad } = this.state;
    return (
      <Card bordered={false} title={this.roleId ? '编辑' : '新增' + "活动资讯"}>
        {formLoad && <Form
          className="body-form df-form"
          ref={this.formRef}
          onFinish={this.onFinish}
          initialValues={{ ...roleInfo }}
        >
          <Form.Item name="title" label="活动标题" rules={[{ required: true, message: '活动标题不能为空', max: 25 }]}>
            <Input text="请输入活动标题" />
          </Form.Item>
          <Form.Item name="introduce" label="活动介绍" rules={[{ required: true, message: '活动介绍不能为空', max: 100 }]}>
            <Input text="请输入活动介绍" />
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
        </Form>}
      </Card>
    );
  }
}
