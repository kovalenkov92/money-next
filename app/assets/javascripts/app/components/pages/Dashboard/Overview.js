import React, { Component } from 'react';
import { DatePicker, TextField, Tabs, Tab } from 'material-ui';
import { Col, Clearfix } from 'react-bootstrap';
import moment from 'moment';
import PieChart from '../../common/piechart';
import AreaChart from '../../common/areachart';
import { getPieChart, getAreaChart } from '../../../services/charts';
import { PieChartIcon, AreaChartIcon } from '../../common/icons';

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
    if (this.pieTimer) {
      clearTimeout(this.pieTimer);
    }
    this.pieTimer = setTimeout(() => {
      getPieChart(pieFilters).success(res => {
        this.setState({pieChart:res.chart})
      })
    }, 500)
  };

  areaData = () => {
    const { areaFilters } = this.state;
    if (this.areaTimer) {
      clearTimeout(this.areaTimer);
    }
    this.areaTimer = setTimeout(() => {
      getAreaChart(areaFilters).success(res => {
        this.setState({areaChart:res})
      })
    }, 500)
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
    return (
      <div>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
          >
            <Tab icon={<PieChartIcon />} label='Pie Chart'>
              <div style={{background:'#fff'}}>
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
                <Clearfix />
              </div>
            </Tab>
            <Tab label="Area Chart" icon={<AreaChartIcon />}>
              <div style={{background:'#fff'}}>
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
                <Col md={6}>
                  <TextField hintText='Category' value={areaFilters.category} fullWidth={true}
                             onChange={(_,val) => this.updateFilters('category',val, 'area')} />

                </Col>
                <Col md={12}>
                  <AreaChart data={this.state.areaChart.data} name="Expenses" title="Area Chart" xAxis={this.state.areaChart.xAxis} />
                </Col>
                <Clearfix />
              </div>
            </Tab>
          </Tabs>
      </div>
    );
  }
}

export default Dashboard;
