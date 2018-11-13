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
import AuthUserContext from './AuthUserContext';


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

  componentWillMount() {

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
    //const { users } = this.state;
    let user = firebase.auth().currentUser;
    var group_list = [];  // this is printed out later in the return statement
    var group_names = [];

    // getting the group IDs of groupList
    group_list = db.doGetUserGroupList(user.uid);
    console.log('group_list: ' , group_list)

    // for each groupID in group_list, call db.doGetGroupName to get their group names
    // and add them to another array, group_names
    for (var i = 0; i < group_list.length; i++) {
      console.log('i am in home.js: ', group_list[i]);
      group_names.push(db.doGetGroupName(group_list[i]));
    }

    console.log("before")
    console.log(db.groups)
    for (var i = 0; i < db.groups.length; i++){
      console.log('within')
      console.log(db.groups[i]);
    }
    console.log("after")

    // "Create Group" and "Join Group" button redirecting
    if (this.state.redirectCreateGroup) {
      return <Redirect push to="/create-group" />;
    }
    else if (this.state.redirectJoinGroup) {
      return <Redirect push to="/join-group" />;
    }

    console.log('group names: ', group_names)

    return (

      <form onSubmit={this.onSubmit}>
        <div style={{ padding: 30 }}>
          <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
            <Grid item style={{ paddingBottom: 20 }}>
            <AuthUserContext.Consumer>
              {authUser =>
                <h1>{authUser.email}'s Group</h1>
              }
            </AuthUserContext.Consumer>
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

              {/* { !!users && <UserList users={users} /> } */}

            </Grid>
            < Grid item xs={6} style={{ paddingTop: 20 }}>
              <Button variant="contained" color="primary" size="medium" type="submit" onClick={this.handleCreateGroup} style={{ float: 'left' }}>Create Group</Button>
              &nbsp;&nbsp;
              <Button variant="contained" color="primary" size="medium" type="submit" onClick={this.handleJoinGroup} style={{ float: 'right' }}>Join Group</Button>
            </Grid>
            <Grid item style={{ paddingTop: 50 }}>
              <img src={process.env.PUBLIC_URL + '/hushhush.png'} alt="logo" style={{ width: 200, height: 200 }} />
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
