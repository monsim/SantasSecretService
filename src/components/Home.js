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
import firebase from 'firebase/app';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group_ids: [],
      group_names: [],
      group_name_divs: [],
    };
    // we need to manually bind 'this' to the constructor to access this class's functions in a promise in componentDidMount
    this.helper = this.helper.bind(this);
    this.handleGroupClick = this.handleGroupClick.bind(this);
  }

  // For handling the submit route redirection when clicking a specific group on the homepage
  handleGroupClick(event) {
    const {
      history,
    } = this.props;
    // pass the groupID props of View Group component to get redirected to a specific group
    const clickedGroupID = event.currentTarget.id; 
    history.push({
      pathname: routes.VIEW_GROUP,
      state: {
        groupID : clickedGroupID,
        homeRedirect : true,
      }
    })
    console.log("All the group IDs : " + this.state.group_ids);
    console.log("The ID we just clicked on : " + clickedGroupID);
  }

  /** For the CREATE GROUP and JOIN GROUP button routing **/
  toCreateGroup = (event) => {
    const {
      history,
    } = this.props;
    history.push(routes.CREATE_GROUP);
  }

  toJoinGroup = (event) => {
    const {
      history,
    } = this.props;
    history.push(routes.JOIN_GROUP);
  }

  componentDidMount() {
    let user = firebase.auth().currentUser;   // get the current user
    var cachedThis = this;                    // to get reference to 'this'

    // get all of the groups that the current user is in (groupList)
    db.doGetUserGroupList(user.uid).then(function (group_list) {
      var oldGroupNames = cachedThis.state.group_names;
      // for each groupID in group_list, call db.doGetGroupName to get their group names
      // and add them to another array, group_names
      cachedThis.setState({group_ids : group_list});
      cachedThis.helper(group_list, oldGroupNames, cachedThis).then(function (result) {
        //console.log(cachedThis.state.group_names)   // test for printing out the group names
        var oldDivs = cachedThis.state.group_name_divs;
        for (var i = 0; i < cachedThis.state.group_names.length; i++) {
          //console.log("id in the loop: " + cachedThis.state.group_ids[i]);
          oldDivs.push(
            <div style={{width: "100%"}} >
              {/* <h2>Group {i + 1}</h2> */}
              <h3>Group {i + 1}</h3>
              <Divider />
              <ListItem button name="groupButton" onClick={cachedThis.handleGroupClick} id={cachedThis.state.group_ids[i]}>
                <ListItemText primary={cachedThis.state.group_names[i]} style={{ float : "left" }}/>
                <ListItemIcon style={{ float : "right" }}><PlayArrowIcon /></ListItemIcon>
              </ListItem>
              <Divider />
              &nbsp;
            </div>
          )
        }
        cachedThis.setState({group_ids : group_list});
        cachedThis.setState({
          group_name_divs: oldDivs
        })
      })

    });
  }

  // gets each group name from the list of group IDs and returns an array of group names
  helper(group_list, oldGroupNames, cachedThis) {
    var promise = new Promise(function (resolve, reject) {
      var promises = [];
      for (var i = 0; i < group_list.length; i++) {
        promises.push(db.doGetGroupName(group_list[i]));
      }
      Promise.all(promises).then(function (values) {
        //console.log(values)   // prints the names of the groups the user is in
        resolve(values)
        cachedThis.setState({
          group_names: values
        })
      });
    });
    return promise;
  }

  render() {

    return (
      <form>
        <div style={{ padding: 30 }}>
          <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
            <Grid item style={{ paddingBottom: 20 }}>
              <h1> My Groups </h1>
            </Grid>
            < Grid item xs={6}>
              <div>{this.state.group_name_divs}</div>
            </Grid>
            < Grid item style={{ paddingTop: 20 }}>
              <Button variant="contained" color="primary" size="medium" type="submit" onClick={this.toCreateGroup} style={{ float: "left" }}>Create Group</Button>
              &nbsp;&nbsp;
              <Button variant="contained" color="primary" size="medium" type="submit" onClick={this.toJoinGroup} style={{ float: "right" }}>Join Group</Button>
            </Grid>
            <Grid item style={{ paddingTop: 50 }}>
              <img src={process.env.PUBLIC_URL + '/hushhush.png'} alt="logo" style={{ width: 200, height: 200 }} />
            </Grid>
          </Grid>
        </div>
      </form>
    );
  } // end of render()
} // end of class HomePage

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);