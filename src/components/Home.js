import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import * as routes from '../constants/routes';
import { Redirect } from 'react-router-dom'

import firebase from 'firebase/app';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';
import { EXITED } from 'react-transition-group/Transition';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
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
    var group_list = [];  // this is printed out later in the return statement
    var mygroups = null;
    var group_names = [];

    // gets the currently sign in user's email
    user.providerData.forEach(function(profile) {
      currentUserEmail = profile.email;
      console.log('email: ', profile.email)
      console.log('uid: ', profile.uid)
      // this is undefined, so that's why it's so hard to directly access groupList
      console.log('group list', profile.uid.groupList)
    });

    // getting the group IDs of groupList
    group_list = db.doGetUserGroupList(user.uid);

    // for each groupID in group_list, call db.doGetGroupName to get their group names
    // and add them to another array, group_names
    group_list.forEach(function(value) {
      group_names.push(db.doGetGroupName(value));
    })

    // "Create Group" and "Join Group" button redirecting
    if (this.state.redirectCreateGroup) {
      return <Redirect push to="/create-group" />;
    }
    else if (this.state.redirectJoinGroup) {
      return <Redirect push to="/join-group" />;
    }

    setTimeout(function(){
      console.log('group_names timeout: ', group_names);
    }, 1000)
    console.log('group_names : ' , group_names);
    console.log('group_list: ' , group_list);
    
    return (
      
      <form onSubmit={this.onSubmit}>
        <div style={{padding: 30}}>
          <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
            <Grid item style={{paddingBottom: 20}}>
              <h1> My Groups </h1>
            </Grid>
            < Grid item xs={6}>
              {group_list.map(function(groupName, index){
                    return <div>
                      <h2>Group {index + 1}</h2>
                    <ListItem button key={ index }>
                      <ListItemText primary={groupName} />
                      <ListItemIcon><PlayArrowIcon /></ListItemIcon>
                      </ListItem>
                    <Divider />
                  </div>;
              })}
              
              {/* 
              {group_names.map(function(groupName){
                    return <div>
                    <ListItem button>
                      <ListItemText primary={groupName} />
                      <ListItemIcon><PlayArrowIcon /></ListItemIcon>
                      </ListItem>
                    <Divider />
                  </div>;
              })}
              */}

              {/* { !!users && <UserList users={users} /> } */}

            </Grid>
            < Grid item xs={6} style={{paddingTop: 20}}>
              <Button variant="contained" color="primary" size="medium" type="submit" onClick={this.handleCreateGroup} style={{ float : 'left' }}>Create Group</Button>
              &nbsp;&nbsp;
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
