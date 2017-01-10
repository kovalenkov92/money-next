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
import { show, upsert } from '../../services/expense';
import { all as getCategories } from '../../services/category';
import { all as getPurses } from '../../services/purse';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: { category: {} }
    };
  }

  componentWillMount() {
    this._retrieveExpense();
    this._retrieveCategories();
    this._retrievePurses();
  }

  _retrieveExpense = () => {
    const { id } = this.props.params;
    if (!id) { return false }
    show(id).success(res => {
      this.setState({
        expense: {
          ...res.expense,
          date: new Date(res.expense.date)
        }
      })
    })
  };

  _retrieveCategories = (q = '') => {
    if (this.categoriesTimer) {
      clearTimeout(this.categoriesTimer);
    }
    this.categoriesTimer = setTimeout(() => {
      getCategories({title:q,page:1}).success(res => {
        this.setState({categories:res.categories})
      })
    }, 500)
  };

  _retrievePurses = (q = '') => {
    if (this.pursesTimer) {
      clearTimeout(this.pursesTimer);
    }
    this.pursesTimer = setTimeout(() => {
      getPurses({title:q,page:1}).success(res => {
        this.setState({purses:res.purses})
      })
    }, 500)
  };

  handleChange = (key,value) => {
    this.setState({
      expense: {
        ...this.state.expense,
        [key]: value
      }
    })
  };

  handleSubmit = event => {
    event.preventDefault();
    const { expense } = this.state;
    upsert(expense)
      .success(res => {
        location.hash = '#/expenses';
      })
      .progress(value => {
        this.setState({ progress: value })
      })
  };


  render() {
    const { isLoading } = this.props.app.main;
    const { expense, progress, categories, purses } = this.state;

    return (
        <Paper style={paperStyle} zDepth={1}>
          <h2>&nbsp;Expense Form</h2>
          <br/>
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Amount:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                    <TextField type='number' hintText='Amount' fullWidth={true} value={expense.amount} onChange={(_,val) => this.handleChange('amount', val)} />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Comment:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                    <TextField hintText='Comment' fullWidth={true} multiLine={true} value={expense.comment} onChange={(_,val) => this.handleChange('comment', val)} />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Date:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                  <DatePicker hintText='Date' container="inline" mode="landscape" value={expense.date} onChange={(_,val) => this.handleChange('date', val)} />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Category:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                  <Select
                    valueKey="id"
                    labelKey="title"
                    value={expense.category}
                    options={categories}
                    placeholder='Select Category'
                    onChange={val => this.handleChange('category',val)}
                    onInputChange={this._retrieveCategories}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Purse:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                  <Select
                    valueKey="id"
                    labelKey="title"
                    value={expense.purse}
                    options={purses}
                    placeholder='Select Purse'
                    onChange={val => this.handleChange('purse',val)}
                    onInputChange={this._retrievePurses}
                  />
                </Col>
              </Row>
            </FormGroup>
            <Col sm={4} smOffset={8} className="text-right">
              <br/>
              <CircularProgress className={isLoading && progress > 0 ? 'loading-spinner' : 'hidden'} mode="determinate" value={progress} size={36} />
              <RaisedButton type='submit' primary={true} className='pull-right' label="Save Expense" disabled={isLoading} />
            </Col>
            <Clearfix />
          </form>
        </Paper>
    )
  }
}

export default connect(state => state)(ExpenseForm)
