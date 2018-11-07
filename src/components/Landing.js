import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

const LandingPage = () =>
  <div style={{padding: 30}}>
    <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
      <Grid item style={{paddingBottom: 40}}>
        <h1>Santa's Secret Service</h1>
      </Grid>
      <Grid item xs={6} style={{paddingBottom: 20}}>
        <Button variant="contained" color="primary" size="large"><Link to={routes.SIGN_IN}>Login</Link></Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" color="primary" size="large"><Link to={routes.SIGN_UP}>Sign Up</Link></Button>
      </Grid>
      <Grid item style={{paddingTop: 50}}>
        <img src={process.env.PUBLIC_URL + '/hushhush.png'} alt="logo" style={{width: 200, height: 200}}/>
      </Grid>
    </Grid>
  </div>

export default LandingPage;