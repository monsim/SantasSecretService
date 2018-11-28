import React, { Component } from 'react';

import { auth } from '../firebase';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
      <form onSubmit={this.onSubmit} style={{ padding: 30 }}>
      <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
        <h3> Change Password </h3>
        <TextField
          id={passwordOne}
          label="New Password"
          type="password"
          autoComplete="new password"
          margin="normal"
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
        />
        <TextField
          id={passwordTwo}
          label="Confirm Password"
          type="password"
          autoComplete="Confirm Password"
          margin="normal"
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
        />
        <Button
          disabled={isInvalid}
          variant="contained"
          color="primary"
          size="medium"
          type='submit'> 
          Reset My Password
        </Button>

        { error && <p>{error.message}</p> }
      </Grid>
      </form>
    );
  }
}

export default PasswordChangeForm;