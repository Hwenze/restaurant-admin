/*
 * ECharts 组件基础部分
 * */

import React, { PureComponent } from "react";
import * as echarts from "echarts";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/grid";
import "echarts/lib/chart/heatmap";
import "echarts/lib/component/visualMap";
import "zrender/lib/svg/svg";
import { throttle } from "~web/utils";

export default class Chart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      width: "100%",
      height: "100%",
    };
    this.chart = null;
  }
  /*
    注意：
        虽然在 componentDidMount 中组件已经被装配，
        但是如果设置容器宽高为百分比的值，那么容器的 clientWidth 和 clientHeight 有可能还处于计算中
        这个时候如果在容器中实例化 echarts，echarts 获得的 clientWidth 和 clientHeight 不一定是我们预期的，
        因此这里使用了定时器延迟实例化，也可以提前计算出像素之后 赋值给 width、height，这样不是百分比就没有问题
  */
  async componentDidMount() {
    console.log("did mount");
    // 初始化图表
    await this.initChart(this.el);
    // 将传入的配置(包含数据)注入
    this.setOption(this.props.option);
    // 监听屏幕缩放，重新绘制 echart 图表
    window.addEventListener("resize", throttle(this.resize, 100));
  }
  
  componentDidUpdate() {
    // 每次更新组件都重置
    this.setOption(this.props.option);
  }

  componentWillUnmount() {
    // 组件卸载前卸载图表
    this.dispose();
  }

  render() {
    const { width, height } = this.state;

    return (
      <div
        className="default-chart"
        ref={(el) => (this.el = el)}
        style={{ width, height }}
      />
    );
  }

  initChart = (el) => {
    // renderer 用于配置渲染方式 可以是 svg 或者 canvas
    const renderer = this.props.renderer || "canvas";
    console.log(renderer);

    return new Promise((resolve) => {
      setTimeout(() => {
        this.chart = echarts.init(el, null, {
          renderer,
          width: "auto",
          height: "auto",
        });
        resolve();
      }, 0);
    });
  };

  setOption = (option) => {
    if (!this.chart) {
      return;
    }

    const notMerge = this.props.notMerge;
    const lazyUpdate = this.props.lazyUpdate;

    this.chart.setOption(option, notMerge, lazyUpdate);
  };

  dispose = () => {
    if (!this.chart) {
      return;
    }

    this.chart.dispose();
    this.chart = null;
  };

  resize = () => {
    this.chart && this.chart.resize();
  };

  getInstance = () => {
    return this.chart;
  };
}
