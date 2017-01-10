import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { FormGroup, ControlLabel, Row, Col } from 'react-bootstrap';
import {
  Paper
} from 'material-ui';
import { paperStyle } from '../common/styles';
import { show } from '../../services/purse';

class Purse extends Component {
  state = {
    purse: {
    },
  };

  componentWillMount() {
    this._retrievePurse();
  }

  _retrievePurse = () => {
    const { id } = this.props.params;
    show(id).success(res => {
      this.setState({
        purse: res.purse
      })
    })
  };

  render() {
    const { purse } = this.state;

    return (
        <Paper style={paperStyle} zDepth={1}>
          <h2>&nbsp;Purse</h2>
          <br/>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Title</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { purse.title }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Currency</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { purse.currency_id }
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
                  { purse.created_at }
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
                  { purse.updated_at }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
        </Paper>
    )
  }
}

export default connect(state => state)(Purse)
