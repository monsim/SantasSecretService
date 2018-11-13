import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
//import AuthUserContext from './AuthUserContext';
import {
//    Link,
    withRouter,
} from 'react-router-dom';

import firebase from 'firebase/app';
import { auth, db } from '../firebase';
import * as routes from '../constants/routes';
//import Account from './Account'; 

const CreateGroupPage = ({ history }) =>
  <div>
    <CreateGroupForm history={history} />
  </div>

// Since leader and members will be added 
// in the doCreateGroup and doJoinGroup
// We don't need to initialize them
const INITIAL_STATE = {
  groupID: '',
  groupName: '',
//    leader: '',
  maxPrice: '',
  pickDate: '',
  archiveDate: '',
//    members: '',
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class CreateGroupForm extends Component {

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      groupName,
//            leader,
      maxPrice,
      pickDate,
      archiveDate,
//            members,
    } = this.state;

  const {
    history,
  } = this.props;

        //authUser is the result of the promise from doCreateUserWithEmailAndPassword
        // Create a user in your own accessible Firebase Database too
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var userID = auth.getCurUser().uid;
      var memberID = userID
      //alert(userID);
      var grpID = db.doCreateGroup(groupName, userID, maxPrice, pickDate, archiveDate, '');
//                console.log('here we ARE')
      console.log(grpID)
      db.doJoinGroup(grpID, memberID)
//                console.log('here we goooooo')
                //Display Unique Group ID
                //In db.js createUser has params(id,name,email), do we need params(groupId, groupName, ...) for createGroup?
    }
  })
    this.setState({ ...INITIAL_STATE });
    
    history.push(routes.HOME);
    event.preventDefault();
  }

  render() {
    
    const {
      groupName,
//            leader,
      maxPrice,
      pickDate,
      archiveDate,
//            members,
      error,
    } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
      <div style={{ padding: 30 }}>
      <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
        <Grid item style={{ paddingBottom: 40 }}>
          <h1>Create A Group</h1>
        </Grid>
        <TextField
          value={groupName}
          label="Group Name"
          onChange={event => this.setState(byPropKey('groupName', event.target.value))}
          type="text"
          margin="normal"
        />
        <br />
        <TextField
          value={maxPrice}
          label="Price Limit"
          onChange={event => this.setState(byPropKey('maxPrice', event.target.value))}
          type="number"
          margin="normal"
        />
        <br />
        <TextField
          value={pickDate}
          onChange={event => this.setState(byPropKey('pickDate', event.target.value))}
          type="date"
          placeholder="End of Pick date"
          />
        <br />
        <TextField
          value={archiveDate}
          onChange={event => this.setState(byPropKey('archiveDate', event.target.value))}
          type="date"
          placeholder="Date to archive"
          />
        <br />
        <Button 
          variant="contained"
          color="primary"
          size="large"
          type='submit'>
            Create Group
        </Button>

        {error && <p>{error.message}</p>}
      </Grid>
      </div>
      </form >
         )
  }
}


export default withRouter(CreateGroupPage);

export {
    CreateGroupForm,
};