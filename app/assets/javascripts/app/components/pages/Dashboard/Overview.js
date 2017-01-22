import React, {Component} from 'react';
import {
  DatePicker,
  TextField,
  Tabs,
  Tab,
  CircularProgress,
  FlatButton
} from 'material-ui';
import {connect} from 'react-redux';
import {Col, Clearfix} from 'react-bootstrap';
import moment from 'moment';
import PieChart from '../../common/piechart';
import BarChart from '../../common/barchart';
import {getPieChart, getBarChart} from '../../../services/charts';
import {PieChartIcon, BarChartIcon} from '../../common/icons';

class Dashboard extends Component {
  state = {
    pieFilters: {
      from_date: new Date(moment().startOf('month')),
      to_date: new Date(moment().endOf('month'))
    },
    barFilters: {
      from_date: new Date(moment().startOf('month')),
      to_date: new Date(moment().endOf('month')),
      step: 1
    },
    pieChart: {},
    barChart: {xAxis: [], data: []}
  };

  componentDidMount() {
    this.pieData();
    this.barData();
  }

  pieData = () => {
    const {pieFilters} = this.state;
    if (this.pieTimer) {
      clearTimeout(this.pieTimer);
    }
    this.pieTimer = setTimeout(() => {
      getPieChart(pieFilters).success(res => {
        this.setState({pieChart: res})
      })
    }, 500)
  };

  barData = () => {
    const {barFilters} = this.state;
    if (this.barTimer) {
      clearTimeout(this.barTimer);
    }
    this.barTimer = setTimeout(() => {
      getBarChart(barFilters).success(res => {
        this.setState({barChart: res})
      })
    }, 500)
  };

  updateFilters = (key, value, scope) => {
    this.setState({
      ...this.state,
      [`${scope}Filters`]: {
        ...this.state[`${scope}Filters`],
        [key]: value
      }
    }, this[`${scope}Data`])
  };

  render() {
    const {pieFilters, barFilters, pieChart, barChart} = this.state;
    const {isLoading} = this.props.app.main;
    return (
      <div>
        <Tabs>
          <Tab icon={<PieChartIcon />} label='Pie Chart'>
            <div style={{background: '#fff', minHeight: 450}}>
              <Col md={6}>
                <DatePicker hintText='From' container="inline"
                            value={pieFilters.from_date} fullWidth={true}
                            onChange={(_, val) => this.updateFilters('from_date', val, 'pie')}/>
              </Col>
              <Col md={6}>
                <DatePicker hintText='To' container="inline"
                            value={pieFilters.to_date} fullWidth={true}
                            onChange={(_, val) => this.updateFilters('to_date', val, 'pie')}/>

              </Col>
              <Col md={12}>
                <PieChart data={pieChart.data} labels={pieChart.labels} colors={pieChart.colors}/>
              </Col>
              <Clearfix />
            </div>
          </Tab>
          <Tab label="Bar Chart" icon={<BarChartIcon />}>
            <div style={{background: '#fff'}}>
              <Col md={6}>
                <DatePicker hintText='From' container="inline"
                            value={barFilters.from_date} fullWidth={true}
                            onChange={(_, val) => this.updateFilters('from_date', val, 'bar')}/>
              </Col>
              <Col md={6}>
                <DatePicker hintText='To' container="inline"
                            value={barFilters.to_date} fullWidth={true}
                            onChange={(_, val) => this.updateFilters('to_date', val, 'bar')}/>

              </Col>
              <Col md={6}>
                <TextField hintText='Category' value={barFilters.category} fullWidth={true}
                           onChange={(_, val) => this.updateFilters('category', val, 'bar')}/>
              </Col>
              <Col md={6}>
                Step:
                <FlatButton label="Day" secondary={barFilters.step == 1}
                            onTouchTap={() => this.updateFilters('step', 1, 'bar')}/>
                <FlatButton label="Week" secondary={barFilters.step == 7}
                            onTouchTap={() => this.updateFilters('step', 7, 'bar')}/>
                <FlatButton label="Month" secondary={barFilters.step == 30}
                            onTouchTap={() => this.updateFilters('step', 30, 'bar')}/>
                <CircularProgress className={isLoading ? 'loading-spinner pull-right' : 'hidden'} size={36}/>
                <h4 className="text-right">Total: { barChart.data.reduce((curr, next) => curr + next, 0) }</h4>
              </Col>
              <Col md={12}>
                <BarChart data={barChart.data} name="Expenses" title="Bar Chart" xAxis={barChart.xAxis}/>
              </Col>
              <Clearfix />
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default connect(state => state)(Dashboard)
