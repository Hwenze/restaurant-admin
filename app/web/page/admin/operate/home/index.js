import React, { Component } from "react";
import Chart from "../../../../component/Chart";
import './index.less';

export default class HeatmapChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderer: "canvas",
    };
  }

  // getOption 这个函数主要用于配置 option，包括将数据配置进去
  // 也可以将其放在 state 中，然后通过 setState 更新
  getOption1 = () => {
    // 组装数据，返回配置 option
    const currentData = [820, 932, 901, 934, 1290, 1330, 1320];

    return {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: currentData,
        type: 'line',
        areaStyle: {}
      }]
    };
  };

  getOption2 = () => {
    // 组装数据，返回配置 option
    const currentData = [120, 200, 150, 80, 70, 110, 130]

    return {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: currentData,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(220, 220, 220, 0.8)'
        }
      }]
    };
  };

  getOption3 = () => {
    // 组装数据，返回配置 option
    const currentData = [
      { value: 335, name: '直接访问' },
      { value: 310, name: '邮件营销' },
      { value: 234, name: '联盟广告' },
      { value: 135, name: '视频广告' },
      { value: 1548, name: '搜索引擎' }
    ];

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 10,
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: currentData
        }
      ]
    };
  };

  getOption4 = () => {
    // 组装数据，返回配置 option
    const currentData = [
      { value: 60, name: '访问' },
      { value: 40, name: '咨询' },
      { value: 20, name: '订单' },
      { value: 80, name: '点击' },
      { value: 100, name: '展现' }
    ];

    return {
      title: {
        text: '漏斗图',
        subtext: '纯属虚构'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
      },
      toolbox: {
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      legend: {
        data: ['展现', '点击', '访问', '咨询', '订单']
      },

      series: [
        {
          name: '漏斗图',
          type: 'funnel',
          left: '10%',
          top: 60,
          //x2: 80,
          bottom: 60,
          width: '80%',
          // height: {totalHeight} - y - y2,
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
            show: true,
            position: 'inside'
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid'
            }
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          },
          emphasis: {
            label: {
              fontSize: 20
            }
          },
          data: currentData
        }
      ]
    };

  };

  componentWillMount() {

  }

  render() {
    const renderer = this.state.renderer;
    const option1 = this.getOption1();
    const option2 = this.getOption2();
    const option3 = this.getOption3();
    const option4 = this.getOption4();

    return (
      <div className="home-box">
        <div className="chart-box">
          <Chart renderer={renderer} option={option1} />
        </div>
        <div className="chart-box">
          <Chart renderer={renderer} option={option2} />
        </div>
        <div className="chart-box">
          <Chart renderer={renderer} option={option3} />
        </div>
        <div className="chart-box">
          <Chart renderer={renderer} option={option4} />
        </div>
      </div>
    )
  }
}
