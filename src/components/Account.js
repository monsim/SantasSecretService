import React from 'react';

import AuthUserContext from './AuthUserContext';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import UsernameChangeForm from './UsernameChange';
import withAuthorization from './withAuthorization';

const AccountPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div>
        <p>
          <br />
        </p>
        <h1>Account: {authUser.user} ({authUser.email})</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
//        <UsernameChangeForm />
      </div>
    }
  </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);