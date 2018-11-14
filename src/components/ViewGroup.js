import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
//import TextField from '@material-ui/core/TextField';

import firebase from 'firebase/app';
import { db } from '../firebase';
import {
  Link,
} from 'react-router-dom';
import * as routes from '../constants/routes';

var groupName = '';
var members = {};
var cachedThis = this;
// Front end
// const ViewGroupPage = (groupID) =>
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
      alert(this.state.id)
    }

    helper(memberList, oldGroupNames, cachedThis) {
      var promise = new Promise(function (resolve, reject) {
        var promises = [];
          for (var i = 0; i < memberList.length; i++) {
            console.log('i am in ViewGroup.js: ', memberList[i]);
            promises.push(db.doGetGroupMember(memberList[i]));
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

    componentDidMount() {
      console.log('before componentDidMount')
      db.doGetGroupMember(this.state.id).then(function(result){
        console.log('within then')
        console.log(result)
        // members = result;
      })
      console.log('after componentDidMount')
    }
    
    render() {
      const showMembers = Object.keys(members).map((key) => 
        <Grid 
          key={'child'+key}
          container alignItems={'center'} 
          justify={'center'} 
          direction={'column'} 
          item style={{ padding: 30 }}>
          <Button
            type='button'
            variant='contained'
            color="primary"
            size="medium"
            component={Link} to={routes.VIEW_WISHLIST}>
              {members[key]}
          </Button>
        </Grid>
      );
      
//      if (groupName === '' && members === null) return <div>Loading...</div>
      // console.log(groupName);
      // console.log(members);
      
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