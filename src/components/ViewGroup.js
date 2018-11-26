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
        groupID: '-LRigxxDM_X2fjEoNFr6',
        groupName: '',
        members: {},
        memberIDs: [],
        memberNamesHTML: [],
        maxPrice: '',
        pickDate: '',
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

      alert("id: " + event.target.id);
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

      // console.log('before componentDidMount')
      db.doGetGroupMember(this.state.groupID).then(function(ids) {
        // console.log('within then')
        // console.log("ids: " + ids)
        // cachedThis.state.memberIDs = ids;
        cachedThis.setState({memberIDs: ids})
        // console.log("state ids: " + cachedThis.state.memberIDs)

        // console.log('before helper')
        cachedThis.helper1(cachedThis.state.memberIDs).then(function(nameList) {
          // console.log('after helper call')
          // console.log(nameList)

          var divs = cachedThis.state.memberNamesHTML
          for (var i = 0; i < cachedThis.state.memberIDs.length; i++) {
            // console.log('I am in the member names for loop')
            // var sth = nameList[i] + ' of ' + ids[i]
            divs.push(
              <Grid key={'child'+ i} container alignItems={'center'} 
                justify={'center'} direction={'column'} item style={{ padding: 30 }}>
                <Button id={ids[i]} name='1' type='button' variant='contained' color="primary"
                  size="large" onClick={cachedThis.handleSubmit}>
                  <span id={ids[i]}>{nameList[i]}</span>
                </Button>
              </Grid>
            )
          }
          cachedThis.setState({memberNamesHTML: divs})
        })
      })

      db.doGetMaxPrice(cachedThis.state.groupID).then(function(price) {
        console.log(price)
        cachedThis.setState({maxPrice: price})
      })
      db.doGetPickDate(cachedThis.state.groupID).then(function(date) {
        console.log(date)
        cachedThis.setState({pickDate: date})
      })
      // console.log("state ids outside didmount: " + cachedThis.state.names)
      // console.log('after componentDidMount')
    }

    helper1(memberIDs) {
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
        <Grid key='main' container alignItems={'center'} justify={'center'} direction={'column'} item style={{ padding: 30 }}>
          <h4>Group ID</h4>
          <h2>{this.state.groupID}</h2>
          <h4>Group Name</h4>
          <h1>{this.state.groupName}</h1>
          <Grid key='price' container alignItems={'center'} justify={'space-evenly'} direction={'row'}>
            <h4>Price Limit</h4><h1>${this.state.maxPrice}</h1>
          </Grid>
          <Grid key='date' container alignItems={'center'} justify={'space-evenly'} direction={'row'}>
            <h4>Pick Date</h4><h1>{this.state.pickDate}</h1>
          </Grid>
          <h1>{this.state.groupName}</h1>
          <h4>Member list</h4>
          <div>{this.state.memberNamesHTML}</div>
        </Grid>
      );
    }
  }
  
  // return ViewGroupPage
// }
export default withRouter(ViewGroupPage);