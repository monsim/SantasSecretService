import React, { Component } from 'react';

//import { auth } from '../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  newUsername: '',
  error: null,
};

class UsernameChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { newUsername } = this.state;

//    auth.doPasswordUpdate(passwordOne)
//      .then(() => {
//        this.setState({ ...INITIAL_STATE });
//      })
//      .catch(error => {
//        this.setState(byPropKey('error', error));
//      });

    event.preventDefault();
  }

  render() {
    const {
      newUsername,
      error,
    } = this.state;

    const isInvalid =
      newUsername === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={newUsername}
          onChange={event => this.setState(byPropKey('newUsername', event.target.value))}
          type="text"
          placeholder="New Username"
        />
        <button disabled={isInvalid} type="submit">
          Renew My username
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default UsernameChangeForm;