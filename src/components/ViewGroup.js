import React from 'react';
//import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
//import TextField from '@material-ui/core/TextField';

//import firebase from 'firebase/app';
import { db } from '../firebase';
import {
    Link,
} from 'react-router-dom';
import * as routes from '../constants/routes';


var members = [];

// Front end
//const ViewGroupPage = (groupID) => (Component) =>
  class ViewGroupPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: 'LR3ZjmCUc9SBXAvDqEy',
      };
      
      console.log('here');
      db.getGroupMembers(this.state.id).on("value", function(snapshot) {
        snapshot.forEach(function(data) {
          let x = db.getUserName(data.val());
          x.on("value", function(snap) {
//            members.push(snap.val());
            if (!members.includes(snap.val())) members.push(snap.val());
            console.log(members);
          });
        });
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
  
    render() {
      const {
        id,
      } = this.state;
      return (
        <div style={{ padding: 30 }}>
          <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
            <Grid item style={{ paddingTop: 100 }}>
              <h1>Group: {id}</h1>
              <h2>Group Member 1 </h2>
              <h2>Group Member 2 (Giftee Symbol)</h2>
            </Grid>
          </Grid>
        </div>
      );
    }
  }

export default ViewGroupPage;