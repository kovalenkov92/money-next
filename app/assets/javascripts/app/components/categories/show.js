import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { FormGroup, ControlLabel, Row, Col } from 'react-bootstrap';
import {
  Paper
} from 'material-ui';
import { paperStyle } from '../common/styles';
import { show } from '../../services/category';

class Category extends Component {
  state = {
    category: {
    },
  };

  componentWillMount() {
    this._retrieveCategory();
  }

  _retrieveCategory = () => {
    const { id } = this.props.params;
    show(id).success(res => {
      this.setState({
        category: res.category
      })
    })
  };

  render() {
    const { category } = this.state;

    return (
        <Paper style={paperStyle} zDepth={1}>
          <h2>&nbsp;Category</h2>
          <br/>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Title</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { category.title }
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
                  { category.created_at }
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
                  { category.updated_at }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
        </Paper>
    )
  }
}

export default connect(state => state)(Category)
