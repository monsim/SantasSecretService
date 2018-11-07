import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';


const JoinGroupPage = () =>
  <div style={{padding: 30}}>
    <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
      <Grid item style={{paddingBottom: 40}}>
        <h1>Join A Group</h1>
      </Grid>
      
      <Grid item xs={6}>
      <TextField
          id="standard-search"
          label="Group ID Number"
        //   type="search"
        //   className={classes.textField}
          margin="normal"
        />
      </Grid>
      <Grid item xs={6} style={{paddingBottom: 20}}>
        <Button variant="contained" color="primary" size="large"><Link to={routes.HOME}>Join Group</Link></Button>
      </Grid>
    </Grid>
  </div>

export default JoinGroupPage;