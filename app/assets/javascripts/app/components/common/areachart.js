import React, { Component } from 'react';
import Highcharts from 'highcharts';

class AreaChart extends Component {
  state = this.props;

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps, this._drawArea)
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
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
