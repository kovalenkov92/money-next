import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  Clearfix
} from 'react-bootstrap';
import {
  Paper,
  RaisedButton,
  TextField,
  SelectField,
  MenuItem,
  CircularProgress,
  DatePicker
} from 'material-ui';
import Select from 'react-select';
import { paperStyle } from '../common/styles';
import ImageComponent from '../common/imageComponent';
import ImagesComponent from '../common/imagesComponent';
import { show, upsert } from '../../services/purse';
import { all as getCurrencies } from '../../services/currency';

class PurseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purse: {}
    };
  }

  componentWillMount() {
    this._retrievePurse();
    this._retrieveCurrencies();
  }

  _retrievePurse = () => {
    const { id } = this.props.params;
    if (!id) { return false }
    show(id).success(res => {
      this.setState({
        purse: res.purse
      })
    })
  };

  _retrieveCurrencies = (q = '') => {
    if (this.currenciesTimer) {
      clearTimeout(this.currenciesTimer);
    }
    this.currenciesTimer = setTimeout(() => {
      getCurrencies({title:q,page:1}).success(res => {
        this.setState({currencies:res.currencies})
      })
    }, 500)
  };


  handleChange = (key,value) => {
    this.setState({
      purse: {
        ...this.state.purse,
        [key]: value
      }
    })
  };

  handleSubmit = event => {
    event.preventDefault();
    const { purse } = this.state;
    upsert(purse)
      .success(res => {
        location.hash = '#/purses';
      })
      .progress(value => {
        this.setState({ progress: value })
      })
  };


  render() {
    const { isLoading } = this.props.app.main;
    const { purse, progress, currencies } = this.state;

    return (
        <Paper style={paperStyle} zDepth={1}>
          <h2>&nbsp;Purse Form</h2>
          <br/>
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Title:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                  <TextField hintText='Title' fullWidth={true} value={purse.title} onChange={(_,val) => this.handleChange('title', val)} />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Currency:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                  <Select
                    valueKey="id"
                    labelKey="title"
                    value={purse.currency}
                    options={currencies}
                    placeholder='Select Currency'
                    onChange={val => this.handleChange('currency',val)}
                    onInputChange={this._retrieveCurrencies}
                  />
                </Col>
              </Row>
            </FormGroup>
            <Col sm={4} smOffset={8} className="text-right">
              <br/>
              <CircularProgress className={isLoading && progress > 0 ? 'loading-spinner' : 'hidden'} mode="determinate" value={progress} size={36} />
              <RaisedButton type='submit' primary={true} className='pull-right' label="Save Purse" disabled={isLoading} />
            </Col>
            <Clearfix />
          </form>
        </Paper>
    )
  }
}

export default connect(state => state)(PurseForm)
