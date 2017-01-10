import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { FormGroup, ControlLabel, Row, Col } from 'react-bootstrap';
import {
  Paper
} from 'material-ui';
import { paperStyle } from '../common/styles';
import { show } from '../../services/currency';

class Currency extends Component {
  state = {
    currency: {
    },
  };

  componentWillMount() {
    this._retrieveCurrency();
  }

  _retrieveCurrency = () => {
    const { id } = this.props.params;
    show(id).success(res => {
      this.setState({
        currency: res.currency
      })
    })
  };

  render() {
    const { currency } = this.state;

    return (
        <Paper style={paperStyle} zDepth={1}>
          <h2>&nbsp;Currency</h2>
          <br/>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Title</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { currency.title }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Symbol</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { currency.symbol }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Created at</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { currency.created_at }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Updated at</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { currency.updated_at }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
        </Paper>
    )
  }
}

export default connect(state => state)(Currency)
