import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';


class ViewGroupPage extends React.Component {
  render() {
    return (
      <div style={{ padding: 30 }}>
        <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
          <Grid item style={{ paddingBottom: 40 }}>
            <h1>Group: (GroupID Here)</h1>
            <h2>Group Member 1      (Giftee Symbol)</h2>
            <h2>Group Member 2      (Giftee Symbol)</h2>
          </Grid>
        </Grid>
      </div>


    );
  }

}

export default ViewGroupPage;