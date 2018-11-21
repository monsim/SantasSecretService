import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const SignInPage = ({ history }) =>
    <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
    </Grid>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

  const {
    history,
  } = this.props;

  auth.doSignInWithEmailAndPassword(email, password)
    .then(() => {
    this.setState({ ...INITIAL_STATE });
    history.push(routes.HOME);
  }).catch(error => {
    this.setState(byPropKey('error', error));
  });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit} style={{ padding: 30 }}>
        <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
          <h1>Sign In</h1>
            <TextField
              id={email}
              label="Email Address"
              type="email"
              autoComplete="email"
              margin="normal"
              onChange={event => this.setState(byPropKey('email', event.target.value))}
            />
            <TextField
              id={password}
              label="Password"
              type="password"
              autoComplete="current-password"
              margin="normal"
              onChange={event => this.setState(byPropKey('password', event.target.value))}
            />
            <br />
            <Button disabled={isInvalid} variant="contained" color="primary" size="large" type='submit'>
              Sign In
            </Button>
        </Grid>
          {error && <p>{error.message}</p>}
      </form>
           );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};