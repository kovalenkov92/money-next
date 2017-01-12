import React, { Component } from "react";
import { Grid, Row, Col } from 'react-bootstrap';
import {AppBar, Drawer, MenuItem, IconButton} from 'material-ui';
import { logout } from '../../../services/sessions';
import { LogoutIcon, WalletIcon, ExpenseIcon, CategoriesIcon, DashboardIcon } from '../../common/icons';
import { ActionOpenInNew, EditorAttachMoney } from 'material-ui/svg-icons';

class HomePage extends Component {
  state = { open: false };

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
        <div className="dashboard-page">
          <AppBar title="Money next"
                  onLeftIconButtonTouchTap={ this.handleToggle }
                  iconElementRight={<IconButton onTouchTap={logout}><LogoutIcon /></IconButton>}

          />
          <Drawer
            docked={false}
            width={300}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
            {/*generated routes:*/}
            <MenuItem onTouchTap={this.handleToggle} href='#/' leftIcon={<DashboardIcon />}>
              Dashboard
            </MenuItem>
            <MenuItem onTouchTap={this.handleToggle} href='#/currencies' leftIcon={<EditorAttachMoney />}>
              Currencies
            </MenuItem>
            <MenuItem onTouchTap={this.handleToggle} href='#/purses' className="active" leftIcon={<WalletIcon />}>
              Purses
            </MenuItem>
            <MenuItem onTouchTap={this.handleToggle} href='#/expenses' leftIcon={<ExpenseIcon />}>
              Expenses
            </MenuItem>
            <MenuItem onTouchTap={this.handleToggle} href='#/categories' leftIcon={<CategoriesIcon />}>
              Categories
            </MenuItem>
          </Drawer>
          <Grid>
            <Row>
              <Col md={12}>
                <br/>
                <br/>
                {this.props.children}
              </Col>
            </Row>
          </Grid>
        </div>
    );
  }

}

export default HomePage;
