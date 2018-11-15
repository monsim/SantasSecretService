import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
//import TextField from '@material-ui/core/TextField';
<<<<<<< HEAD
//npm install shuffle-array

import firebase from 'firebase/app';
import {
   Link,
=======

// import firebase from 'firebase/app';
import { db } from '../firebase';
import {
  Link,
>>>>>>> 6c1e709ca25d50690144cd65643698d9ca5e2a41
} from 'react-router-dom';
import * as routes from '../constants/routes';

<<<<<<< HEAD
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
=======
>>>>>>> 466fcc2400ac8fb03865d88dddecaccad10de0a4
// Front end
// const ViewGroupPage = (groupID) =>
  class ViewGroupPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: '-LR9m8U9ghz-2F4ZR2SR',
        groupName: '',
        members: {},
        memberIDs: [],
        memberNamesHTML: [],
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
      // event.preventDefault();
      alert(event.target)
    }

    componentDidMount() {
      var cachedThis = this;

<<<<<<< HEAD
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
=======
      db.doGetGroupName(cachedThis.state.id).then(function(gName) {
        cachedThis.setState({groupName: gName})
      })

      console.log('before componentDidMount')
      db.doGetGroupMember(this.state.id).then(function(ids) {
        console.log('within then')
        console.log("ids: " + ids)
        // cachedThis.state.memberIDs = ids;
        cachedThis.setState({memberIDs: ids})
        console.log("state ids: " + cachedThis.state.memberIDs)

        console.log('before helper')
        cachedThis.helper(cachedThis.state.memberIDs).then(function(nameList) {
          console.log('after helper call')
          console.log(nameList)
>>>>>>> 466fcc2400ac8fb03865d88dddecaccad10de0a4

          var divs = cachedThis.state.memberNamesHTML
          for (var i = 0; i < cachedThis.state.memberIDs.length; i++) {
            console.log('I am in the member names for loop')
            divs.push(
              <Grid key={'child'+ i} container alignItems={'center'} 
                justify={'center'} direction={'column'} item style={{ padding: 30 }}>
                <Button value='Ytan' type='button' variant='contained' color="primary"
                  size="medium" component={Link} to={routes.VIEW_WISHLIST}
                  onClick={cachedThis.handleSubmit}>
                  {nameList[i]}
                </Button>
              </Grid>
            )
          }
          cachedThis.setState({memberNamesHTML: divs})
        })
      })
      console.log("state ids outside didmount: " + cachedThis.state.names)
      console.log('after componentDidMount')
    }

    helper(memberIDs) {
      var promise = new Promise(function (resolve, reject) {
        var promises = [];
          for (var i = 0; i < memberIDs.length; i++) {
            // console.log('i am in ViewGroup.js: ', memberIDs[i]);
            promises.push(db.doGetUserName(memberIDs[i]));
          }
          Promise.all(promises).then(function(values) {
            console.log(values)
            resolve(values)
          });
      });
      return promise;
    }
    
    render() {
      
      return (
        <Grid key='main' container alignItems={'center'} justify={'center'} direction={'column'} item style={{ padding: 50 }}>
          <h4>Group Name</h4>
          <h1>{this.state.groupName}</h1>
          <h4>Member list</h4>
          <div>{this.state.memberNamesHTML}</div>
        </Grid>
      );
    }
  }

export default ViewGroupPage;