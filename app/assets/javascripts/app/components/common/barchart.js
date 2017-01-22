import React, {Component} from 'react';
import Chart from 'chart.js';

class BarChart extends Component {

  componentWillReceiveProps() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      this._drawBar()
    }, 700)
  }

  _drawBar = () => {
    const {categories, xAxis} = this.props;
    const {palette} = this.context.muiTheme;

    if (this.barChart) this.barChart.destroy();
    this.barChart = new Chart('barContainer', {
      type: 'bar',
      data: {
        labels: xAxis,
        datasets: categories.map(item => {
          return {
            label: item.label,
            borderWidth: 2,
            pointRadius: 1,
            backgroundColor: item.color,
            data: item.data
          }
        })
      },
      options: {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    });
  };

  render() {
    return (
      <canvas id="barContainer"/>
    );
  }

}

BarChart.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default BarChart;
