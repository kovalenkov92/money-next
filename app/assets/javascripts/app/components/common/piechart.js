import React, { Component } from 'react';
import Highcharts from 'highcharts';

class PieChart extends Component {
  state = this.props;

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps, this._drawPie)
  }

  _drawPie = () => {
    const { data, name, title } = this.state;
    Highcharts.chart('container', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: title
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            },
            connectorColor: 'silver'
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
      <div id="container"></div>
    );
  }

}

export default PieChart;
