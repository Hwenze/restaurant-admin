import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { filterIllegal } from '~web/utils';

const { Option } = Select;

export default class CSelect extends Component {
  static defaultProps = {
    showTotal: false,//是否显示全部数据
    text: '请选择',//占位文本
    labelFormat: (item, label) => item[label],// 格式化label显示，默认label
    onChange: () => { }, // 选项更改事件
    // 内容配置
    labelValue: {
      label: 'label',
      value: 'value',
    }
  };

  static propTypes = {
    data: PropTypes.array,
    showTotal: PropTypes.bool,
    text: PropTypes.string,
    onChange: PropTypes.func
  }

  render() {
    const {
      mode = '', text,
      onSelect, onChange,
      showTotal, labelFormat,
      labelValue, value,
      allowClear, ...restProps
    } = this.props;

    let { data } = this.props;
    if (typeof data !== 'object') {
      data = [];
    }

    const selectConfig = {
      mode, value, onChange, onSelect,
      placeholder: text,
      showSearch: true,
      allowClear: typeof allowClear !== 'undefined' ? allowClear : true,
      optionFilterProp: 'children',
      filterOption: (input, option) => {
        return option.props.children.toLowerCase().indexOf(filterIllegal(input, true).toLowerCase()) >= 0
      }
    };

    return (
      <Select
        {...selectConfig}
        {...restProps}
      >
        {/* {showTotal && <Option value="">全部</Option>} */}
        {data.map(item => {
          return <Option key={item[labelValue.value]}>
            {labelFormat(item, labelValue.label)}
          </Option>
        })}

      </Select>
    )
  }
}