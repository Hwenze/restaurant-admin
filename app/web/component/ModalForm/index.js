import React, { Children, Component } from 'react';
import { Modal, Form, Button } from 'antd';
import './index.less';

class ModalForm extends Component {
  formRef = React.createRef();
  state = {
    visible: this.props.visible
  }

  onCancel = () => {
    const { onOk } = this.props;
    onOk && onOk(false);
  }

  onFinish = (value) => {
    const { onOk } = this.props;
    onOk && onOk(value);
  }

  render() {
    const { labelCol = 4, className = 'df-form', title,
      children, visible, width = 600, maskClosable, modal = {}, init = {}
    } = this.props;
    return (
      <Modal
        {...modal}
        width={width}
        title={title}
        visible={visible}
        footer={null}
        className="x-form-modal"
        maskClosable={maskClosable || true}
      >
        {visible && <Form
          labelCol={{ span: labelCol }}
          wrapperCol={{ span: 24 - labelCol }}
          className={className}
          ref={this.formRef}
          initialValues={init}
          onFinish={this.onFinish}
        >
          {children && <div className="modal-form-body">
            {children}
          </div>}
          <div className="modal-form-footer">
            <Button htmlType="submit" type="primary">确认</Button>
            <Button onClick={this.onCancel}>取消</Button>
          </div>
        </Form>}
      </Modal>
    )
  }
}

export default ModalForm;