import React, { Component } from 'react';
import Chart from 'chart.js';

class PieChart extends Component {
  state = this.props;

  componentWillReceiveProps(nextProps) {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      this.setState(nextProps, this._drawPie)
    }, 500)
  }

  _drawPie = () => {
    const { labels, data, colors } = this.state;

    this.pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: colors
          }
        ]
      }
    })
  }

  render() {
    return (
      <div style={{maxWidth:500,margin:'auto',padding:20}}>
        <canvas id="pieChart" width="400" height="400"></canvas>
      </div>
    );
  }

}

export default PieChart;
