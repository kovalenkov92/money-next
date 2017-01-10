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
import { show, upsert } from '../../services/category';

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {}
    };
  }

  componentWillMount() {
    this._retrieveCategory();
  }

  _retrieveCategory = () => {
    const { id } = this.props.params;
    if (!id) { return false }
    show(id).success(res => {
      this.setState({
        category: res.category
      })
    })
  };

  handleChange = (key,value) => {
    this.setState({
      category: {
        ...this.state.category,
        [key]: value
      }
    })
  };

  handleSubmit = event => {
    event.preventDefault();
    const { category } = this.state;
    upsert(category)
      .success(res => {
        location.hash = '#/categories';
      })
      .progress(value => {
        this.setState({ progress: value })
      })
  };


  render() {
    const { isLoading } = this.props.app.main;
    const { category, progress } = this.state;

    return (
        <Paper style={paperStyle} zDepth={1}>
          <h2>&nbsp;Category Form</h2>
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
                  <TextField hintText='Title' fullWidth={true} value={category.title} onChange={(_,val) => this.handleChange('title', val)} />
                </Col>
              </Row>
            </FormGroup>
            <Col sm={4} smOffset={8} className="text-right">
              <br/>
              <CircularProgress className={isLoading && progress > 0 ? 'loading-spinner' : 'hidden'} mode="determinate" value={progress} size={36} />
              <RaisedButton type='submit' primary={true} className='pull-right' label="Save Category" disabled={isLoading} />
            </Col>
            <Clearfix />
          </form>
        </Paper>
    )
  }
}

export default connect(state => state)(CategoryForm)
