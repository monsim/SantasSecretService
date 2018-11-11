import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import * as routes from '../constants/routes';
import { Redirect } from 'react-router-dom'

import firebase from 'firebase/app';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: null,
      users: null,
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );
  }
  
  /** Handles states based on button onclick **/
  handleCreateGroup = () => {
    this.setState({
      redirectCreateGroup: true
    });
  }

  handleJoinGroup = () => {
    this.setState({
      redirectJoinGroup: true
    });
  }

  render() {
    const { users } = this.state;
    let user = firebase.auth().currentUser;
    var currentUserEmail = null;
    // trying to save the groups into this variable to print all the current user's groups out later
    var mygroups = null;

    // prints all the auth user's information -- but doesn't print the group list
    user.providerData.forEach(function(profile) {
      currentUserEmail = profile.email;
      console.log('email: ', profile.email)
      console.log('uid: ', profile.uid)
      console.log('group list', profile.uid.groupList)
    });

    var groups = firebase.database().ref('users').on('value', snapshot => {
        snapshot.forEach(childSnapshot => {
          var childData = childSnapshot.val()
          if (childData.email == currentUserEmail) {
            // how do you loop through the nested group list??
            console.log('CURRENT USERS GROUPS: ', childData.groupList)
            console.log(JSON.stringify(childData.groupList));
            mygroups = childData.groupList;
          }
          // all of each user's groups
          //console.log('ChildData', childData)
        })
    })

    // button redirecting
    if (this.state.redirectCreateGroup) {
      return <Redirect push to="/create-group" />;
    }
    else if (this.state.redirectJoinGroup) {
      return <Redirect push to="/join-group" />;
    }

    
    return (
      
      <form onSubmit={this.onSubmit}>
        <div style={{padding: 30}}>
          <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
            <Grid item style={{paddingBottom: 20}}>
              <h1> My Groups </h1>
            </Grid>
            < Grid item xs={6} style={{paddingBottom: 20}}>
              <h2>Group 1</h2>
              mygroups here

              {/* { !!users && <UserList users={users} /> } */}

            </Grid>
            < Grid item xs={6}>
              <Button variant="contained" color="primary" size="medium" type="submit" onClick={this.handleCreateGroup} style={{ float : 'left' }}>Create Group</Button>
              &nbsp;&nbsp;&nbsp;
              <Button variant="contained" color="primary" size="medium" type="submit" onClick={this.handleJoinGroup} style={{ float : 'right' }}>Join Group</Button>
              </Grid>
            <Grid item style={{paddingTop: 50}}>
              <img src={process.env.PUBLIC_URL + '/hushhush.png'} alt="logo" style={{width: 200, height: 200}}/>
            </Grid>
          </Grid>
        </div>
      </form>
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
