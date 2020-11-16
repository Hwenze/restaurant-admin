import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { filterIllegal } from '~web/utils';

export default class CInput extends Component {
  static defaultProps = {
    isTrim: false,
  }

  static propTypes = {
    isTrim: PropTypes.bool
  }

  onChange = () => {
    const { onChange, isTrim } = this.props;

    const value = filterIllegal(e.target.value, isTrim);
    onChange && onChange(value);
  }

  render() {
    const { text, style, value, onChange, ...restProps } = this.props;

    return (
      <Input style={style}
        placeholder={text}
        onChange={this.onChange}
        value={value}
        {...restProps}
      />
    )
  }
}