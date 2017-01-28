import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactPaginate from 'react-paginate';
import {Row, Col} from 'react-bootstrap';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  RaisedButton,
  FlatButton,
  Dialog,
  IconButton,
  Paper,
  CircularProgress
} from 'material-ui';
import {
  ImageEdit,
  ActionDelete,
  ActionVisibility
} from 'material-ui/svg-icons';
import SortingTh from '../common/sorting_th';
import Filters from '../common/filtersComponent';
import {paperStyle} from '../common/styles';
import {all, destroy} from '../../services/expense';

class Expenses extends Component {
  state = {
    filters: {
      page: 1,
      per_page: 10,
      pages_count: 0
    },
    expenses: [],
    showConfirm: false
  };

  componentWillMount() {
    this._retrieveExpenses();
  }

  _retrieveExpenses = () => {
    const {filters} = this.state;
    all(filters).success(res => {
      this.setState({
        expenses: res.expenses,
        filters: {
          ...filters,
          pages_count: Math.ceil(res.count / filters.per_page)
        }
      })
    })
  };

  handlePageChange = (data) => {
    let selected = data.selected + 1;
    this.setState({filters: {...this.state.filters, page: selected}}, this._retrieveExpenses);
  };

  prepareToDestroy = record => {
    this.setState({
      selectedRecord: record,
      showConfirm: true
    })
  };

  updateFilters = (filters = []) => {
    let hash = {};
    filters.forEach(item => Object.keys(item).forEach(key => hash[key] = item[key]));
    this.setState({
      filters: {
        ...this.state.filters,
        ...hash
      }
    }, this._retrieveExpenses)
  };

  closeConfirm = () => {
    this.setState({showConfirm: false})
  };

  handleDelete = () => {
    const {selectedRecord} = this.state;
    destroy(selectedRecord.id).success(res => {
      this._retrieveExpenses();
      this.closeConfirm();
    });
  };

  render() {
    const {isLoading} = this.props.app.main;
    const {expenses, showConfirm} = this.state;
    const {pages_count} = this.state.filters;
    const {palette} = this.context.muiTheme;

    return (
      <Paper style={paperStyle} zDepth={1}>
        <h2>Expenses</h2>
        <Row>
          <Col sm={4} smOffset={8} className="text-right" style={{minHeight: 61}}>
            <CircularProgress className={isLoading ? 'loading-spinner' : 'hidden'} size={36}/>
            <RaisedButton href='#/expense/new' className='pull-right'
                          primary={true} label='New Expense'
            />
          </Col>
        </Row>
        <Filters columns={[
          {label: 'Amount', key: 'amount', type: 'float'},
          {label: 'Comment', key: 'comment', type: 'text'},
          {label: 'Date', key: 'date', type: 'datetime'},
          {label: 'Category', key: 'category', type: 'string'}
        ]} update={this.updateFilters}/>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn><SortingTh update={this.updateFilters}
                                            column='amount'>Amount</SortingTh></TableHeaderColumn>
              <TableHeaderColumn><SortingTh update={this.updateFilters}
                                            column='date'>Date</SortingTh></TableHeaderColumn>
              <TableHeaderColumn><SortingTh update={this.updateFilters}
                                            column='category'>Category</SortingTh></TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>

            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              expenses.map(item => {
                return (
                  <TableRow key={item.id}>
                    <TableRowColumn>{ item.amount  }</TableRowColumn>
                    <TableRowColumn>{ item.date  }</TableRowColumn>
                    <TableRowColumn>{ item.category  }</TableRowColumn>
                    <TableRowColumn className='text-right'>
                      <IconButton onTouchTap={() => location.hash = `#/expense/${item.id}`}><ActionVisibility
                        color={palette.primary1Color}/></IconButton>
                      <IconButton onTouchTap={() => location.hash = `#/expense/${item.id}/edit`}><ImageEdit
                        color={palette.accent1Color}/></IconButton>
                      <IconButton onTouchTap={this.prepareToDestroy.bind(this, item)}><ActionDelete
                        color="#c62828"/></IconButton>
                    </TableRowColumn>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
        <Dialog
          title="Are you sure?"
          actions={[
            <FlatButton onTouchTap={this.closeConfirm} label='Cancel'/>,
            <FlatButton secondary={true} onTouchTap={this.handleDelete} label='Confirm'/>
          ]}
          modal={false}
          open={showConfirm}
          onRequestClose={this.closeConfirm}
        >
          You are going to remove expense.
        </Dialog>
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a>•••</a>}
                       breakClassName={"break-me"}
                       pageCount={pages_count}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={3}
                       onPageChange={this.handlePageChange}
                       containerClassName={pages_count < 2 ? 'hidden' : 'pagination pull-right'}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"}
        />
        <div className="clearfix"></div>
      </Paper>
    )
  }
}

Expenses.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default connect(state => state)(Expenses)
