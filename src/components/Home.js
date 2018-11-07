import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

import withAuthorization from './withAuthorization';
import { db } from '../firebase';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );
  }

  render() {
    /*const { users } = this.state;*/
    return (
      <div style={{padding: 30}}>
        <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
          <Grid item style={{paddingBottom: 40}}>
            <h1> My Groups </h1>
          </Grid>
          < Grid item xs={6} style={{paddingBottom: 20}}>
            <Button variant="contained" color="primary" size="large"><Link to={routes.CREATE_GROUP}>Create a Group</Link></Button>
          </Grid>
          < Grid item xs={6} style={{paddingBottom: 20}}>
            <Button variant="contained" color="primary" size="large"><Link to={routes.JOIN_GROUP}>Join a Group</Link></Button>
          </Grid>
          <Grid item style={{paddingTop: 50}}>
            <img src={process.env.PUBLIC_URL + '/hushhush.png'} alt="logo" style={{width: 200, height: 200}}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

/*
const UserList = ({ users }) =>
  <div>
    <h2>Groups</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>
*/

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
