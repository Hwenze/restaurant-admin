import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { message, Upload } from 'antd';
import { releaseSize } from '~web/utils';
import { FILE_TYPE } from '~web/utils/constant';
import { pvImage, pvVideo } from '~web/component/pv';
import { PlusOutlined } from '@ant-design/icons';

export default class UploadImage extends Component {

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      fileList: [],
    }
  }

  static defaultProps = {
    fileType: FILE_TYPE.IMAGE,
    // 上传最大限制
    maxCount: 10,
    // 默认接受图片的类型
    accept: 'image/jpg,image/jpeg,image/png',
    // 默认上传展示 卡片
    listType: 'picture-card',
    // 默认采取单文件上传
    multiple: false,
    // 上传文本
    text: '上传文件',
  }

  static propTypes = {
    fileType: PropTypes.string,
    maxCount: PropTypes.number,
    text: PropTypes.string,
    onComplete: PropTypes.func,
  }

  componentDidMount() {
    this._isMounted = true;
    const { multiple, onChange, value, fileType } = this.props;
    const fileList = [];
    let _fileList = value;
    // 全部当初数组处理
    if (!Array.isArray(_fileList)) {
      _fileList = [_fileList]
    }
    console.log('fi', _fileList);
    if (_fileList && _fileList.length) {
      _fileList.map(item => {
        if (!item) return;
        // 可能是只有图片
        if (typeof item === 'string') {
          fileList.push({
            uid: item,
            status: 'done',
            url: item,
          })
        } else {
          fileList.push({
            uid: item.url,
            status: 'done',
            url: item.url,
          })
        }
      })
    }

    this.setState({ fileList });

    if (!multiple) {
      const url = fileList.length && fileList[0].url || '';
      url && onChange && onChange(url);
    } else {
      const url = fileList;
      url && url.length > 0 && onChange && onChange(url);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onChange = async ({ file, fileList }) => {
    const { onChange, size, onComplete, multiple, maxCount, fileType, isReUpload } = this.props;
    // 限制图片大小
    const isPass = file.size ? file.size / 1024 < size : true;
    if (size && !isPass) {
      message.warn(`文件大小不能大于${releaseSize(size * 1024)}~`);
      return;
    }

    if (isReUpload && fileList.length > 0) {
      fileList.splice(0, fileList.length - 1);
    }
    if (fileList.length > maxCount) {
      message.warn(`上传数量超过${maxCount}`);
      return;
    }

    if (typeof file !== 'undefined' && file.percent === 100) {
      if (file.status === 'error') {
        message.error('上传失败');
      }
      else {
        if (!multiple) {
          if (file.response && file.response.code === 200) {
            onChange && onChange(file.response.data.url);
          } else {
            onChange && onChange(file.url);
          }
        } else {
          onChange && onChange(fileList);
        }
        onComplete && onComplete(file, fileList);
      }
    }


    this.setState({ fileList });
  }

  onRemove = file => {
    const { multiple, onRemove, onChange } = this.props;
    let { fileList } = this.state;

    fileList = fileList.filter(item => item.url !== file.url);

    if (!multiple) {
      onChange && onChange(fileList && fileList.length ? fileList[0].url : '');
    } else {
      onChange && onChange(fileList);
    }
    onRemove && onRemove(fileList);

    this.setState({ fileList });
  }

  onPreview = async file => {
    const { fileType, accept } = this.props;
    if (accept.indexOf('image/') !== -1) {
      pvImage(file.url);
    } else if (accept.indexOf('video/') !== -1) {
      // 待写
      pvVideo(file.url);
    } else {
      return;
    }
  }

  render() {
    const { multiple, maxCount, text, children, reserChildren, ...restProps } = this.props;
    const { fileList } = this.state;
    const canUpload = !fileList || (!multiple && fileList.length < 1) || (multiple && fileList.length < maxCount);
    const props = {
      multiple,
      fileList: fileList,
      action: 'http://127.0.0.1:8080/api/uploadImage',
      ...restProps,
      onChange: this.onChange,
      onRemove: this.onRemove,
      onPreview: this.onPreview,
      transformFile: this.transformFile
    }

    return (
      <Upload {...props}>
        {
          !!reserChildren ? children : (canUpload ? (
            <>
              <PlusOutlined />
            </>
          ) : null)
        }
      </Upload>
    )
  }

}