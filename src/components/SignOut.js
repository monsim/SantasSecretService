import React from 'react';

import { auth } from '../firebase';
import Button from '@material-ui/core/Button';

const SignOutButton = () =>
  <Button
    variant="contained"
    size="small"
    color="primary"
    type="button"
    onClick={auth.doSignOut} >
      Sign Out
  </Button>

export default SignOutButton;