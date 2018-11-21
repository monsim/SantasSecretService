import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import * as routes from '../constants/routes';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.toLogin = this.toLogin.bind(this);
    this.toSignUp = this.toSignUp.bind(this);
  }

  /** For the LOGIN and SIGN UP button routing **/

  sum(a, b) {
    return a + b;
  }

  toLogin = (event) => {
    const {
      history,
    } = this.props;
    history.push(routes.SIGN_IN);
  }

  toSignUp = (event) => {
    const {
      history,
    } = this.props;
    history.push(routes.SIGN_UP);
  }

  render() {
    return (
      <form>
        <div style={{ padding: 30 }}>
          <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
            <Grid item style={{ paddingBottom: 40 }}>
              <h1>Santa's Secret Service</h1>
            </Grid>
            <Grid item xs={6} style={{ paddingBottom: 20 }}>
              <Button name="loginButton" variant="contained" color="primary" size="large" type="submit" onClick={this.toLogin}>Login</Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="primary" size="large" type="submit" onClick={this.toSignUp}>Sign Up</Button>
            </Grid>
            <Grid item style={{ paddingTop: 50 }}>
              <img src={process.env.PUBLIC_URL + '/hushhush.png'} alt="logo" style={{ width: 200, height: 200 }} />
            </Grid>
          </Grid>
        </div>
      </form >
    );
  }

}

export default LandingPage;