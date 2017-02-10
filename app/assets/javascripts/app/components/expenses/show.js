import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { FormGroup, ControlLabel, Row, Col } from 'react-bootstrap';
import {
  Paper
} from 'material-ui';
import { paperStyle } from '../common/styles';
import { show } from '../../services/expense';

class Expense extends Component {
  state = {
    expense: { category: {} },
  };

  componentWillMount() {
    this._retrieveExpense();
  }

  _retrieveExpense = () => {
    const { id } = this.props.params;
    show(id).success(res => {
      this.setState({
        expense: res.expense
      })
    })
  };

  render() {
    const { expense } = this.state;

    return (
        <Paper style={paperStyle} zDepth={1}>
          <h2>&nbsp;Expense</h2>
          <br/>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Amount</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { expense.amount }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Comment</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { expense.comment }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Date</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { expense.date }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Category</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { expense.category_title }
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
                  { expense.created_at }
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
                  { expense.updated_at }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
        </Paper>
    )
  }
}

export default connect(state => state)(Expense)
