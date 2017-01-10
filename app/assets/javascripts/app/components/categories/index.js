import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { Row, Col } from 'react-bootstrap';
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
  ActionOpenInNew,
  ImageEdit,
  ActionDelete
} from 'material-ui/svg-icons';
import SortingTh from '../common/SortingTh';
import Filters from '../common/filtersComponent';
import { paperStyle } from '../common/styles';
import { all, destroy } from '../../services/category';

class Categories extends Component {
  state = {
    filters: {
      page: 1,
      per_page: 10,
      pages_count: 0
    },
    categories: [],
    showConfirm: false
  };

  componentWillMount() {
    this._retrieveCategories();
  }

  _retrieveCategories = () => {
    const { filters } = this.state;
    all(filters).success(res => {
      this.setState({
        categories: res.categories,
        filters: {
          ...filters,
          pages_count: Math.ceil(res.count / filters.per_page)
        }
      })
    })
  };

  handlePageChange = (data) => {
    let selected = data.selected + 1;
    this.setState({filters:{ ...this.state.filters, page: selected }}, () => {
      this._retrieveCategories();
    });
  };

  selectRecord = record => {
    this.setState({
      selectedRecord: record,
      showConfirm: true
    })
  };

  updateFilters = (filters = []) => {
    let hash = {};
    filters.forEach(item => { Object.keys(item).forEach(key => hash[key] = item[key]) });
    this.setState({
      filters: {
        ...this.state.filters,
        ...hash
      }
    }, this._retrieveCategories)
  };

  closeConfirm = () => {
    this.setState({ showConfirm: false })
  };

  handleDelete = () => {
    const { selectedRecord } = this.state;
    destroy(selectedRecord.id).success(res => {
      this._retrieveCategories();
      this.closeConfirm();
    });
  };

  render() {
    const { isLoading } = this.props.app.main;
    const { categories, showConfirm } = this.state;
    const { pages_count } = this.state.filters;

    return (
      <Paper style={paperStyle} zDepth={1}>
        <h2>Categories</h2>
        <Row>
          <Col sm={4} smOffset={8} className="text-right" style={{minHeight:61}}>
            <CircularProgress className={isLoading ? 'loading-spinner' : 'hidden'} size={36} />
            <RaisedButton href='#/category/new' className='pull-right'
                          primary={true} label='New Category'
            />
          </Col>
        </Row>
        <Filters columns={[{ label: 'Title', key: 'title', type: 'string' },]} update={this.updateFilters} />
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
                <TableHeaderColumn><SortingTh update={this.updateFilters} column='title'>Title</SortingTh></TableHeaderColumn>
              <TableHeaderColumn><SortingTh update={this.updateFilters} column='created_at'>Created At</SortingTh></TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>

            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              categories.map(item => {
                return (
                  <TableRow key={item.id}>
                    <TableRowColumn>{ item.title  }</TableRowColumn>
                    <TableRowColumn>{ item.created_at  }</TableRowColumn>
                    <TableRowColumn className='text-right'>

                      <IconButton onTouchTap={() => location.hash = `#/category/${item.id}`}><ActionOpenInNew color="#3f51b5" /></IconButton>
                      <IconButton onTouchTap={() => location.hash = `#/category/${item.id}/edit`}><ImageEdit color="#ff8f00" /></IconButton>
                      <IconButton onTouchTap={() => { this.selectRecord(item) }}><ActionDelete color="#c62828" /></IconButton>
                    </TableRowColumn>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
        <Dialog
          title="Are you sure?"
          actions={[<FlatButton primary={true} onTouchTap={this.closeConfirm} label='Cancel'/>,<FlatButton primary={true} onTouchTap={this.handleDelete} label='Confirm' />]}
          modal={false}
          open={showConfirm}
          onRequestClose={this.closeConfirm}
        >
          You are going to remove category.
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

export default connect(state => state)(Categories)
