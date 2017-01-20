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
  ActionVisibility,
  ImageEdit,
  ActionDelete
} from 'material-ui/svg-icons';
import SortingTh from '../common/SortingTh';
import Filters from '../common/filtersComponent';
import { paperStyle } from '../common/styles';
import { all, destroy } from '../../services/purse';

class Purses extends Component {
  state = {
    filters: {
      page: 1,
      per_page: 10,
      pages_count: 0
    },
    purses: [],
    showConfirm: false
  };

  componentWillMount() {
    this._retrievePurses();
  }

  _retrievePurses = () => {
    const { filters } = this.state;
    all(filters).success(res => {
      this.setState({
        purses: res.purses,
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
      this._retrievePurses();
    });
  };

  prepareToDestroy = record => {
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
    }, this._retrievePurses)
  };

  closeConfirm = () => {
    this.setState({ showConfirm: false })
  };

  handleDelete = () => {
    const { selectedRecord } = this.state;
    destroy(selectedRecord.id).success(res => {
      this._retrievePurses();
      this.closeConfirm();
    });
  };

  render() {
    const { isLoading } = this.props.app.main;
    const { purses, showConfirm } = this.state;
    const { pages_count } = this.state.filters;
    const { palette } = this.context.muiTheme;

    return (
      <Paper style={paperStyle} zDepth={1}>
        <h2>Purses</h2>
        <Row>
          <Col sm={4} smOffset={8} className="text-right" style={{minHeight:61}}>
            <CircularProgress className={isLoading ? 'loading-spinner' : 'hidden'} size={36} />
            <RaisedButton href='#/purse/new' className='pull-right'
                          primary={true} label='New Purse'
            />
          </Col>
        </Row>
        <Filters columns={[{ label: 'Title', key: 'title', type: 'string' },{ label: 'Currency', key: 'currency_id', type: 'integer' },]} update={this.updateFilters} />
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
                <TableHeaderColumn><SortingTh update={this.updateFilters} column='title'>Title</SortingTh></TableHeaderColumn>
                <TableHeaderColumn><SortingTh update={this.updateFilters} column='currency_id'>Currency</SortingTh></TableHeaderColumn>
              <TableHeaderColumn><SortingTh update={this.updateFilters} column='created_at'>Created At</SortingTh></TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>

            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              purses.map(item => {
                return (
                  <TableRow key={item.id}>
                    <TableRowColumn>{ item.title  }</TableRowColumn>
                    <TableRowColumn>{ item.currency  }</TableRowColumn>
                    <TableRowColumn>{ item.created_at  }</TableRowColumn>
                    <TableRowColumn className='text-right'>

                      <IconButton onTouchTap={() => location.hash = `#/purse/${item.id}`}><ActionVisibility color={palette.primary1Color} /></IconButton>
                      <IconButton onTouchTap={() => location.hash = `#/purse/${item.id}/edit`}><ImageEdit color={palette.accent1Color} /></IconButton>
                      <IconButton onTouchTap={this.prepareToDestroy.bind(this,item)}><ActionDelete color="#c62828" /></IconButton>
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
            <FlatButton secondary={true} onTouchTap={this.handleDelete} label='Confirm' />
          ]}
          modal={false}
          open={showConfirm}
          onRequestClose={this.closeConfirm}
        >
          You are going to remove purse.
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

Purses.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default connect(state => state)(Purses)
