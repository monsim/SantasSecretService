import React, { Component } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';
import { auth, db } from '../firebase';
import * as routes from '../constants/routes';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const SignUpPage = ({ history }) =>
  <div>
    <SignUpForm history={history} />
  </div>

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
          //authUser is the result of the promise from doCreateUserWithEmailAndPassword
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.user.uid, username, email, '')
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

    return (
      <form onSubmit={this.onSubmit} style={{ padding: 30 }}>
      <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
        <h1>Sign Up</h1>

           <TextField
            id={username}
            label="Name"
            type="text"
            margin="normal"
            onChange={event => this.setState(byPropKey('username', event.target.value))}
          />
           <TextField
            id={email}
            label="Email Address"
            type="email"
            autoComplete="email"
            margin="normal"
            onChange={event => this.setState(byPropKey('email', event.target.value))}
          />
         <TextField
            id={passwordOne}
            label="Password"
            type="password"
            autoComplete="current-password"
            margin="normal"
            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          />
         <TextField
            id={passwordTwo}
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            margin="normal"
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          />
       <br/>
          <Button disabled={isInvalid} variant="contained" color="primary" size="large" type='submit'>
          Get Started!
          </Button>

        { error && <p>{error.message}</p> }
        </Grid>
      </form>
    );
  }
}

const SignUpLink = () =>
    <p>
        Don't have an account?
        <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>

export default withRouter(SignUpPage);

export {
    SignUpForm,
    SignUpLink,
};