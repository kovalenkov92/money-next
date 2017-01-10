import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { RaisedButton, TextField } from 'material-ui';
import { connect } from 'react-redux';
import * as SessionsService from '../../services/sessions';

class LoginPage extends Component {
  state = {};

  handleChange(key,value) {
    this.setState({ [key]: value })
  }

  handleLogin() {
    const { email, password } = this.state;
    SessionsService.login({email,password})
      .success(res => {
        location.href = '#/';
      })
  }

  render(){
    return(
      <div className="login-page">
        <div>
          <img src="/images/keys.png" className="login-image" />
          <h1>Moneytrackernext</h1>
          <form onSubmit={e => {e.preventDefault(); this.handleLogin() }} className="login-form">
            <TextField hintText="Email address" fullWidth={true}
                       onChange={(_,val) => this.handleChange('email', val)} />
            <TextField hintText="Password" fullWidth={true} type="password"
                       onChange={(_,val) => this.handleChange('password', val)} />
            <br/><br/>
            <RaisedButton type="submit" label="login" primary={true} fullWidth={true} />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(LoginPage)
