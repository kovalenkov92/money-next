import React, { Component } from 'react';
import { Paper, DatePicker } from 'material-ui';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { paperStyle } from '../../common/styles';
import PieChart from '../../common/piechart';
import AreaChart from '../../common/areachart';
import { getPieChart, getAreaChart } from '../../../services/charts';

class Dashboard extends Component {
  state = {
    pieFilters: {
      from_date: new Date(moment().subtract(1, 'months')),
      to_date: new Date()
    },
    areaFilters: {
      from_date: new Date(moment().subtract(1, 'months')),
      to_date: new Date()
    },
    pieChart: [],
    areaChart: {xAxis:[]}
  };

  componentDidMount() {
    this.pieData();
    this.areaData();
  }

  pieData = () => {
    const { pieFilters } = this.state;
    getPieChart(pieFilters).success(res => {
      this.setState({pieChart:res.chart})
    })
  };

  areaData = () => {
    const { areaFilters } = this.state;
    getAreaChart(areaFilters).success(res => {
      this.setState({areaChart:res})
    })
  };

  updateFilters = (key,value,scope) => {
    this.setState({
      ...this.state,
      [`${scope}Filters`]: {
        ...this.state[`${scope}Filters`],
        [key]: value
      }
    }, this[`${scope}Data`])
  };

  render() {
    const { pieFilters, areaFilters } = this.state;
    console.log(this.state.pieChart);
    return (
      <div>
        <Paper style={paperStyle} zDepth={1}>
          <Row>
            <Col md={6}>
              <DatePicker hintText='From' container="inline" mode='landscape'
                          value={pieFilters.from_date} fullWidth={true}
                          onChange={(_,val) => this.updateFilters('from_date', val, 'pie')} />
            </Col>
            <Col md={6}>
              <DatePicker hintText='To' container="inline" mode='landscape'
                          value={pieFilters.to_date} fullWidth={true}
                          onChange={(_,val) => this.updateFilters('to_date', val, 'pie')} />

            </Col>
            <Col md={12}>
              <PieChart data={this.state.pieChart} name="Expenses" title="Pie Chart" />
            </Col>
          </Row>
        </Paper>
        <Paper style={paperStyle} zDepth={1}>
          <Row>
            <Col md={6}>
              <DatePicker hintText='From' container="inline" mode='landscape'
                          value={areaFilters.from_date} fullWidth={true}
                          onChange={(_,val) => this.updateFilters('from_date', val, 'area')} />
            </Col>
            <Col md={6}>
              <DatePicker hintText='To' container="inline" mode='landscape'
                          value={areaFilters.to_date} fullWidth={true}
                          onChange={(_,val) => this.updateFilters('to_date', val, 'area')} />

            </Col>
            <Col md={12}>
              <AreaChart data={this.state.areaChart.data} name="Expenses" title="Area Chart" xAxis={this.state.areaChart.xAxis} />
            </Col>
          </Row>
        </Paper>
      </div>
    );
  }
}

export default Dashboard;
