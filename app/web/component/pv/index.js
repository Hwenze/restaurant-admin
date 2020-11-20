import React from 'react';
import * as ReactDOM from 'react-dom';
import { Modal } from 'antd';

// 图片
export function pvImage(imageUrl) {
  if (!imageUrl) return;
  const div = document.createElement('div');

  const destroy = () => {
    ReactDOM.unmountComponentAtNode(div);
  }

  const cancel = () => {
    destroy();
  }
  const dom = (
    <Modal
      visible={true}
      footer={null}
      onCancel={cancel}
    >{
        Array.isArray(imageUrl) ?
          imageUrl.map(item => {
            return (
              <a href={item} target="_blank" style={{ display: 'block', textAlign: 'center' }}>
                <img style={{ maxWidth: '100%' }} src={item}></img>
              </a>
            )
          }) :
          <a href={imageUrl} target="_blank" style={{ display: 'block', textAlign: 'center' }}>
            <img style={{ maxWidth: '100%' }} src={imageUrl}></img>
          </a>
      }</Modal>
  )
  ReactDOM.render(dom, div);
}

// 视频
export function pvVideo(videoUrl) {
  if (!videoUrl) return;
  const div = document.createElement('div');

  const destroy = () => {
    ReactDOM.unmountComponentAtNode(div);
  }

  const cancel = () => {
    destroy();
  }
  const dom = (
    <Modal
      visible={true}
      footer={null}
      onCancel={cancel}
    >{
        Array.isArray(videoUrl) ?
          videoUrl.map(item => {
            return (
              <a href={item} target="_blank" style={{ display: 'block', textAlign: 'center' }}>
                <img style={{ maxWidth: '100%' }} src={item}></img>
              </a>
            )
          }) :
          <a href={videoUrl} target="_blank" style={{ display: 'block', textAlign: 'center' }}>
            <img style={{ maxWidth: '100%' }} src={videoUrl}></img>
          </a>
      }</Modal>
  )
  ReactDOM.render(dom, div);
}