import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// import List from '@material-ui/core/List';
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
// import { EXITED } from 'react-transition-group/Transition';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      group_names: [],
      group_name_divs: [],
      users: null,
    };

    this.helper = this.helper.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleSubmit(event) {
    event.preventDefault();
    const {
      history,
    } = this.props;

    alert(event.target.name)
    history.push(routes.VIEW_GROUP)
  }


  componentDidMount() {
    /*
    db.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );
      */

    //const { users } = this.state;
    let user = firebase.auth().currentUser;
    var cachedThis = this;

    // getting the group IDs of groupList

    db.doGetUserGroupList(user.uid).then(function (group_list) {
      console.log('group_list: ', group_list)

      var oldGroupNames = cachedThis.state.group_names;
      // for each groupID in group_list, call db.doGetGroupName to get their group names
      // and add them to another array, group_names
      console.log('before helper')
      cachedThis.helper(group_list, oldGroupNames, cachedThis).then(function (result) {
        console.log('after helper call')
        // console.log(cachedThis.state.group_names)
        var oldDivs = cachedThis.state.group_name_divs;
        for (var i = 0; i < cachedThis.state.group_names.length; i++) {
          console.log('i am in the group names for loop')
          oldDivs.push(
            <div>
              <h2>Group {i + 1}</h2>
              <ListItem name={cachedThis.state.group_names[i]} button onClick={cachedThis.handleSubmit}>
                <ListItemText primary={cachedThis.state.group_names[i]} />
                <ListItemIcon><PlayArrowIcon /></ListItemIcon>
              </ListItem>
              <Divider />
            </div>
          )
        }
        cachedThis.setState({
          group_name_divs: oldDivs
        })
      })

      // "Create Group" and "Join Group" button redirecting
      if (cachedThis.state.redirectCreateGroup) {
        return <Redirect push to="/create-group" />;
      }
      else if (cachedThis.state.redirectJoinGroup) {
        return <Redirect push to="/join-group" />;
      }

    });
  }

  helper(group_list, oldGroupNames, cachedThis) {
    var promise = new Promise(function (resolve, reject) {
      var promises = [];
        for (var i = 0; i < group_list.length; i++) {
          console.log('i am in home.js: ', group_list[i]);
          promises.push(db.doGetGroupName(group_list[i]));
        }
        Promise.all(promises).then(function(values) {
          console.log(values)
          resolve(values)
          cachedThis.setState({
            group_names: values
          })
        });
    });
    return promise;
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
  return (
    <form onSubmit={this.onSubmit}>
      <div style={{ padding: 30 }}>
        <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
          <Grid item style={{ paddingBottom: 20 }}>
            <h1> My Groups </h1>
          </Grid>
          < Grid item xs={6}>
            <div>{this.state.group_name_divs}</div>
            {/*
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
 */}
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
} // end of render()
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


