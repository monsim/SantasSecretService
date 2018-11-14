import React from 'react';
//import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
//import TextField from '@material-ui/core/TextField';
<<<<<<< HEAD
//npm install shuffle-array

import firebase from 'firebase/app';
import {
   Link,
=======

//import firebase from 'firebase/app';
import { db } from '../firebase';
import {
  Link,
>>>>>>> 6c1e709ca25d50690144cd65643698d9ca5e2a41
} from 'react-router-dom';
import * as routes from '../constants/routes';

var groupName = '';
var members = [];
var clickedOn = '';

<<<<<<< HEAD
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
          let id = data.val()
          let x = firebase.database().ref(`/users/${data.val()}/username`);
          x.once("value", function(snap) {
            if (!(data.val() in members)) members[id] = snap.val();
          });
        });
      });
     
      firebase.database().ref(`/groups/${this.state.id}/groupName`).once("value", function(snap) {
        groupName = snap.val();
      });
    }
    
    render() {
      
      const showMembers = Object.keys(members).map((key) => 
        <Grid 
          key={'child'+key}
          container alignItems={'center'} 
          justify={'center'} 
          direction={'column'} 
          item style={{ padding: 30 }}>
          <Button key='submit' onClick={this.handleSubmit}><Link to={routes.VIEW_WISHLIST}>{members[key]}</Link></Button><img src={process.env.PUBLIC_URL + '/present.png'} alt="giftee" style={{ width: 30, height: 30 }} />
        </Grid>
      );
      
//      if (groupName === '' && members === null) return <div>Loading...</div>
      console.log(groupName);
      console.log(members);

      return (
        <Grid key='main' container alignItems={'center'} justify={'center'} direction={'column'} item style={{ padding: 50 }}>
          <h4>Group Name</h4>
          <h1>{groupName}</h1>
          <h4>Member list</h4>
          {showMembers}
          <Button><Link to={routes.VIEW_WISHLIST}>Edit Wishlist</Link></Button>
        </Grid>
      );
    }
  }

function setID(id) {
  clickedOn = id;
=======
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

    console.log('here');
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
>>>>>>> 6c1e709ca25d50690144cd65643698d9ca5e2a41
}



export default ViewGroupPage;