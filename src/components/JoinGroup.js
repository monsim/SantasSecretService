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
      userID: '',
      grpToJoin: '',
      userGroupList: [],
      allGroups: [],
      error: false,
      errorMessage: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Get all the groups to state before render
    var cachedThis = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        cachedThis.setState({
          userID: auth.getCurUser().uid
        })

        db.getAllGroups().then(function (groups) {

          var grpsToSave = [];
          for (var i = 0; i < groups.length; i++) {
            grpsToSave.push(groups[i]);
          }
          cachedThis.setState({
            allGroups: grpsToSave
          })
        });

        db.doGetUserGroupList(cachedThis.state.userID).then(function (groups) {
          var grpListToSave = [];
          for (var i = 0; i < groups.length; i++) {
            grpListToSave.push(groups[i]);
          }
          cachedThis.setState({
            userGroupList: grpListToSave
          })
        });
      }
    })


  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const {
      history,
    } = this.props;

    event.preventDefault();
    var grpID = this.state.grpToJoin;
    var groupArray = this.state.allGroups;
    var groupListArray = this.state.userGroupList;

    // If the group does exist
    if (groupArray.includes(grpID)) {
      // If user is not already in the group
      if (!groupListArray.includes(grpID)){
        db.doJoinGroup(grpID, this.state.userID)
        history.push(routes.HOME);
      }
      else {
        this.setState({
          error: true,
          errorMessage: "You are in this group already",
        })
      }
    }
    else{
      this.setState({
        error: true,
        errorMessage: "The group does not exist",
      })
    }
  }



  render() {

    const {
      userID,
      grpToJoin,
      userGroupList,
      allGroups,
      error,
      errorMessage,
    } = this.state

    const isInvalid =
    grpToJoin === '';

    return (
      <div style={{ paddingBottom: 20 }}>
        <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
          <Grid item style={{ paddingTop: 100 }}>
            <h1>Join A Group</h1>
          </Grid>

          <TextField
            name="grpToJoin"
            label="Group ID Number"
            onChange={this.handleChange}
            required
            margin="normal"
          />

          <Button
            disabled={isInvalid}
            variant="contained"
            color="primary"
            size="large"
            type='submit'
            onClick={this.handleSubmit}>
            Join Group
          </Button>
          {error && <p>{errorMessage}</p>}
        </Grid>
       
      </div>


    );
  }

}

export default JoinGroupPage;