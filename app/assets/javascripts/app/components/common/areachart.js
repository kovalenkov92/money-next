import React, { Component } from 'react';
import Chart from 'chart.js';

class AreaChart extends Component {

  componentWillReceiveProps() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      this._drawArea()
    }, 700)
  }

  _drawArea = () => {
    const { data, xAxis } = this.props;

    if (this.areaChart) this.areaChart.destroy();
    this.areaChart = new Chart('areaContainer', {
      type: 'line',
      data: {
        labels: xAxis,
        datasets: [{
          label: 'Expenses during time',
          backgroundColor: "rgba(226, 130, 52, .4)",
          borderColor: "rgba(226, 130, 52, 1)",
          data: data
        }]
      }
    });
  };

  render() {
    return (
      <canvas id="areaContainer"></canvas>
    );
  }

}

export default AreaChart;
