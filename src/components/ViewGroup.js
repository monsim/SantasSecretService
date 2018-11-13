import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
//import TextField from '@material-ui/core/TextField';

import firebase from 'firebase/app';
import {
   Link,
} from 'react-router-dom';
import * as routes from '../constants/routes';


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
      firebase.database().ref(`/groups/${this.state.id}/members`).once("value", function(snapshot) {
       snapshot.forEach(function(data) {
         let x = firebase.database().ref(`/users/${data.val()}/username`);
         x.once("value", function(snap) {
           if (!members.includes(snap.val())) members.push(snap.val());
         });
       });
     });
     
     firebase.database().ref(`/groups/${this.state.id}/groupName`).once("value", function(snap) {
       groupName = snap.val();
     });
    }
    
    render() {
      
      const showMembers = members.map((name) => 
        <Grid 
          key={'child'+members.indexOf(name)}
          container alignItems={'center'} 
          justify={'center'} 
          direction={'column'} 
          item style={{ padding: 30 }}>
          <Button key='text'><Link to={routes.JOIN_GROUP}>{name}</Link></Button>
        </Grid>
      );
      
//      if (groupName === '' && members === null) return <div>Loading...</div>
      console.log(groupName)
      console.log(members)
      return (
        <Grid key='main' container alignItems={'center'} justify={'center'} direction={'column'} item style={{ padding: 50 }}>
          <h4>Group Name</h4>
          <h1>{groupName}</h1>
          <h4>Member list</h4>
          {showMembers}
        </Grid>
      );
    }
  }



export default ViewGroupPage;