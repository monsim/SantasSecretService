import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
//import TextField from '@material-ui/core/TextField';

// import firebase from 'firebase/app';
import { db } from '../firebase';
import {
  // Link,
} from 'react-router-dom';
import * as routes from '../constants/routes';

// Front end
// const ViewGroupPage = (groupID) => {
  class ViewGroupPage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        groupID: '-LR9m8U9ghz-2F4ZR2SR',
        groupName: '',
        members: {},
        memberIDs: [],
        memberNamesHTML: [],
      };

      // this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleChange(event) {
    //   this.setState({
    //     [event.target.name]: event.target.value
    //   });
    // }
  
    handleSubmit(event) {
      event.preventDefault();
      const {
        history,
      } = this.props;

      // alert(event.target.name)
      // history.push(routes.VIEW_WISHLIST)
      history.push({
        pathname: routes.VIEW_WISHLIST,
        // search: '?query=abc',
        state: { detail: event.target.name }
      })
    }

    componentDidMount() {
      var cachedThis = this;

      db.doGetGroupName(cachedThis.state.groupID).then(function(gName) {
        cachedThis.setState({groupName: gName})
      })

      console.log('before componentDidMount')
      db.doGetGroupMember(this.state.groupID).then(function(ids) {
        // console.log('within then')
        // console.log("ids: " + ids)
        // cachedThis.state.memberIDs = ids;
        cachedThis.setState({memberIDs: ids})
        // console.log("state ids: " + cachedThis.state.memberIDs)

        // console.log('before helper')
        cachedThis.helper(cachedThis.state.memberIDs).then(function(nameList) {
          // console.log('after helper call')
          // console.log(nameList)

          var divs = cachedThis.state.memberNamesHTML
          // var h = 'hi';
          for (var i = 0; i < cachedThis.state.memberIDs.length; i++) {
            // console.log('I am in the member names for loop')
            divs.push(
              <Grid key={'child'+ i} container alignItems={'center'} 
                justify={'center'} direction={'column'} item style={{ padding: 30 }}>
                <Button name={ids[i]} type='button' variant='contained' color="primary"
                  size="large" onClick={cachedThis.handleSubmit}>
                  {nameList[i]}
                </Button>
              </Grid>
            )
          }
          cachedThis.setState({memberNamesHTML: divs})
        })
      })
      // console.log("state ids outside didmount: " + cachedThis.state.names)
      // console.log('after componentDidMount')
    }

    helper(memberIDs) {
      var promise = new Promise(function (resolve, reject) {
        var promises = [];
          for (var i = 0; i < memberIDs.length; i++) {
            // console.log('i am in ViewGroup.js: ', memberIDs[i]);
            promises.push(db.doGetUserName(memberIDs[i]));
          }
          Promise.all(promises).then(function(values) {
            // console.log(values)
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
  
  // return ViewGroupPage
// }
export default ViewGroupPage;