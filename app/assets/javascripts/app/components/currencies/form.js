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
import { paperStyle } from '../common/styles';
import ImageComponent from '../common/imageComponent';
import ImagesComponent from '../common/imagesComponent';
import { show, upsert } from '../../services/currency';

class CurrencyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: {}
    };
  }

  componentWillMount() {
    this._retrieveCurrency();
  }

  _retrieveCurrency = () => {
    const { id } = this.props.params;
    if (!id) { return false }
    show(id).success(res => {
      this.setState({
        currency: res.currency
      })
    })
  };

  handleChange = (key,value) => {
    this.setState({
      currency: {
        ...this.state.currency,
        [key]: value
      }
    })
  };

  handleSubmit = event => {
    event.preventDefault();
    const { currency } = this.state;
    upsert(currency)
      .success(res => {
        location.hash = '#/currencies';
      })
      .progress(value => {
        this.setState({ progress: value })
      })
  };


  render() {
    const { isLoading } = this.props.app.main;
    const { currency, progress } = this.state;

    return (
        <Paper style={paperStyle} zDepth={1}>
          <h2>&nbsp;Currency Form</h2>
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
                  <TextField hintText='Title' fullWidth={true} value={currency.title} onChange={(_,val) => this.handleChange('title', val)} />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Symbol:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                  <TextField hintText='Symbol' fullWidth={true} value={currency.symbol} onChange={(_,val) => this.handleChange('symbol', val)} />
                </Col>
              </Row>
            </FormGroup>
            <Col sm={4} smOffset={8} className="text-right">
              <br/>
              <CircularProgress className={isLoading && progress > 0 ? 'loading-spinner' : 'hidden'} mode="determinate" value={progress} size={36} />
              <RaisedButton type='submit' primary={true} className='pull-right' label="Save Currency" disabled={isLoading} />
            </Col>
            <Clearfix />
          </form>
        </Paper>
    )
  }
}

export default connect(state => state)(CurrencyForm)
