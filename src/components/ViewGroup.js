import React from 'react';
//import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
//import TextField from '@material-ui/core/TextField';

//import firebase from 'firebase/app';
import { db } from '../firebase';
import {
//    Link,
} from 'react-router-dom';
//import * as routes from '../constants/routes';


var members = [];
var groupName = '';
// Front end
//const ViewGroupPage = (groupID) => (Component) =>
  class ViewGroupPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: '-LR9m8U9ghz-2F4ZR2SR',
      };
      
      db.getGroupMembers(this.state.id).once("value", function(snapshot) {
        snapshot.forEach(function(data) {
          let x = db.getUserName(data.val());
          x.once("value", function(snap) {
            if (!members.includes(snap.val())) members.push(snap.val());
          });
        });
      });
      
      db.getGroupName(this.state.id).once("value", function(snap) {
        groupName = snap.val();
      });
      
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
    }
  
    componentDidMount() {
//      db.getGroupMembers(this.state.id).once("value", function(snapshot) {
//        snapshot.forEach(function(data) {
//          let x = db.getUserName(data.val());
//          x.once("value", function(snap) {
//            if (!members.includes(snap.val())) members.push(snap.val());
//          });
//        });
//      });
//      
//      db.getGroupName(this.state.id).once("value", function(snap) {
//        groupName = snap.val();
//      });
    }
    
    render() {
      
      const showMembers = members.map((name) => 
        <li key='text'>{name}</li>
      );
      
//      if (groupName === '' && members === null) return <div>Loading...</div>
      console.log(groupName)
      console.log(members)
      return (
        <div style={{ padding: 30 }}>
          <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
            <Grid item style={{ padding: 50 }}>
              <h4>Group Name</h4>
              <h1>{groupName}</h1>
              <h4>Member list</h4>
              {showMembers}
            </Grid>
          </Grid>
        </div>
      );
    }
  }



export default ViewGroupPage;