import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import firebase from 'firebase/app';
import { auth, db } from '../firebase';


class JoinGroupPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groupID: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var grpID = this.state.groupID;
    // Backend  here
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        var userID = firebase.auth().currentUser.uid;
        db.doJoinGroup(grpID, userID)
        console.log(userID + ' added to ' + grpID)
      }
    })
  }


  render() {
    return (
      <div style={{ padding: 30 }}>
        <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
          <Grid item style={{ paddingBottom: 40 }}>
            <h1>Join A Group</h1>
          </Grid>

          <TextField
            name="groupID"
            label="Group ID Number"
            onChange={this.handleChange}
            required
            margin="normal"
          />

          <Button variant="contained" color="primary" size="large" type='submit' onClick={this.handleSubmit} ><Link to={routes.HOME}>Join Group</Link></Button>

        </Grid>
      </div>


    );
  }

}

export default JoinGroupPage;