import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { withRouter } from 'react-router-dom';
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
        groupID: '-LRfZ80uQWlJA9IlaHm_',
        groupName: '',
        members: {},
        memberIDs: [],
        memberNamesHTML: [],
        pickDate: ''
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

      history.push({
        pathname: routes.VIEW_WISHLIST,
        // search: '?query=abc',
        state: { memberID: event.target.id }
      })
    }

    componentDidMount() {
      var cachedThis = this;

      db.doGetGroupName(cachedThis.state.groupID).then(function(gName) {
        cachedThis.setState({groupName: gName})
      })

      db.doGetPickDate(cachedThis.state.pickDate).then(function(pDate) {
        cachedThis.setState({pickDate: pDate})
      })

      console.log('before componentDidMount')
      db.doGetGroupMember(this.state.groupID).then(function(ids) {
        console.log('within then')
        console.log("ids: " + ids)
        // cachedThis.state.memberIDs = ids;
        cachedThis.setState({memberIDs: ids})
        console.log("state ids: " + cachedThis.state.memberIDs)

        console.log('before helper')
        cachedThis.helper(cachedThis.state.memberIDs).then(function(nameList) {
          console.log('after helper call')
          console.log(nameList)
          var divs = cachedThis.state.memberNamesHTML
          for (var i = 0; i < cachedThis.state.memberIDs.length; i++) {
            console.log('I am in the member names for loop')
            var sth = nameList[i] + ' of ' + ids[i]
            divs.push(
              <Grid key={'child'+ i} container alignItems={'center'} 
                justify={'center'} direction={'column'} item style={{ padding: 30 }}>
                <Button id={ids[i]} type='button' variant='contained' color="primary"
                  size="large" onClick={cachedThis.handleSubmit}>
                  <span id={ids[i]} >{nameList[i]}</span>
                </Button>
              </Grid>
            )
          }
          cachedThis.setState({memberNamesHTML: divs})

          //Shuffle 
          var shuffle = require('shuffle-array'), collection = nameList;
          shuffle(collection);
          console.log('Shuffled = ' + collection);         
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
          <h4>PickDate</h4>
          <h1>{this.state.pickDate}</h1>
          <h4>Member list</h4>
          <div>{this.state.memberNamesHTML}</div>
        </Grid>
      );
    }
  }
  
  // return ViewGroupPage
// }
export default withRouter(ViewGroupPage);