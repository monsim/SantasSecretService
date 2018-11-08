import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';

import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';


const WishlistPage = () =>
  <div style={{padding: 30}}>
    <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
      <Grid item style={{paddingBottom: 40}}>
        <h1>My Wishlist</h1>
      </Grid>
      <Grid item xs={6}>
      <TextField
          id="standard-search"
          label="Item"
          margin="normal"
        />
      </Grid>
      <Button variant="fab" color="primary" aria-label="Add">
        <AddIcon />
      </Button>
    </Grid>
  </div>

export default WishlistPage;