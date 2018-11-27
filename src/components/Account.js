import React from 'react';

import AuthUserContext from './AuthUserContext';
// import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

import Grid from '@material-ui/core/Grid';

const AccountPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div>
        <br />
        <h1><center>Account: {authUser.email}</center></h1>
        <Grid container alignItems={'center'} justify={'space-evenly'} direction={'row'}>
          {/*<PasswordForgetForm />*/}
          <PasswordChangeForm />
        </Grid>
      </div>
    }
  </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;



export default withAuthorization(authCondition)(AccountPage);