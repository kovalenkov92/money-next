import React, { Component } from 'react';
import Highcharts from 'highcharts';

class AreaChart extends Component {
  state = this.props;

  componentWillReceiveProps(nextProps) {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      this.setState(nextProps, this._drawArea)
    },500)
  }

  _drawArea = () => {
    const { data, name, title, xAxis } = this.state;
    Highcharts.chart('areaContainer', {
      chart: {
        type: 'area'
      },
      title: {
        text: title
      },
      xAxis: {
        categories: xAxis,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: '$'
        }
      },
      plotOptions: {
        area: {
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        }
      },
      series: [{
        name: name,
        data: data
      }]
    })
  };

  render() {
    return (
      <div id="areaContainer"></div>
    );
  }

}

export default AreaChart;
