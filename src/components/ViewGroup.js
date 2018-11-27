import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { withRouter } from 'react-router-dom';
import { db } from '../firebase';
import {
  // Link,
} from 'react-router-dom';
import * as routes from '../constants/routes';
import firebase, { /*database*/ } from 'firebase/app';
// import { deflateRawSync } from 'zlib';

// Front end
// const ViewGroupPage = (groupID) => {
class ViewGroupPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groupID: this.props.location.state.groupID,
      groupName: '',
      currentUserID: '',
      members: {},
      originalMemberList: [],
      memberIDs: [],
      memberNamesHTML: [],
      gifteeIDs: [],
      gifteeNamesHTML: [],
      pickDate: '',
      maxPrice: '',
      //currentDate: '',
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

  //Get CurrentDate
  currentDate() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var currentDate = year + '-' + month + '-' + date;
    return currentDate;
  }

  //Change View According to The PickDay
  changeView(pickDate) {
    if (pickDate === this.currentDate() || pickDate < this.currentDate()) {
      console.log('PickDate + ' + pickDate + ' , CurrentDate : ' + this.currentDate())
      return <div>{this.state.gifteeNamesHTML}</div>;
    }
    return <div>{this.state.memberNamesHTML}</div>;
  }

  componentDidMount() {
    var cachedThis = this;

    db.doGetGroupName(cachedThis.state.groupID).then(function (gName) {
      cachedThis.setState({ groupName: gName })
    })

    db.doGetPickDate(cachedThis.state.groupID).then(function (pDate) {
      cachedThis.setState({ pickDate: pDate })
    })

    console.log('before componentDidMount')
    db.doGetGroupMember(this.state.groupID).then(function (ids) {
      //console.log('within then')
      //console.log("ids: " + ids)
      cachedThis.setState({ memberIDs: ids })
      //cachedThis.setState({originalMemberList: ids})

      //console.log('before helper')
      cachedThis.helper(cachedThis.state.memberIDs).then(function (nameList) {
        //console.log('after helper call')
        console.log('Unshuffled Names - in Members : ' + nameList)
        var divs = cachedThis.state.memberNamesHTML
        for (var i = 0; i < cachedThis.state.memberIDs.length; i++) {
          //console.log('I am in the member names for loop')
          //var sth = nameList[i] + ' of ' + ids[i]
          divs.push(
            <Grid key={'child' + i} container alignItems={'center'}
              justify={'center'} direction={'column'} item style={{ padding: 30 }}>
              <Button id={ids[i]} type='button' variant='contained' color="primary"
                size="large" onClick={cachedThis.handleSubmit}>
                <span id={ids[i]} >{nameList[i]}</span>
              </Button>
            </Grid>
          )
        }
        cachedThis.setState({ memberNamesHTML: divs })

        //Shuffle 
        var shuffle = require('shuffle-array'), collection = cachedThis.state.memberIDs;
        var shuffledCollection = shuffle(collection);
        /*
        console.log('Shuffled = ' + shuffledCollection);
        console.log('Length of collection = ' + shuffledCollection.length);
        for(var w = 0; w < shuffledCollection.length; w++) {
          console.log('collection[' + w + '] = ' + shuffledCollection[w]);
        }
        */

        db.doGetGiftee(cachedThis.state.groupID).then(function (gids) {
          //console.log("Giftee ids: " + gids)
          cachedThis.setState({ gifteeIDs: gids })
          //console.log("Giftee state ids: " + cachedThis.state.gifteeIDs)
          cachedThis.helper(cachedThis.state.gifteeIDs).then(function (gnameList) {
            console.log('Shuffled Names - in Giftee : ' + gnameList)

            //Setting Giftee in Firebase According to the Shuffled Collection

            for (var k = 0; k < cachedThis.state.memberIDs.length; k++) {
              db.doSetGiftee(cachedThis.state.groupID, shuffledCollection[k]);
            }

            //Get Current User
            var currentUserID = firebase.auth().currentUser.uid;
            console.log('currentuserID : ' + currentUserID);
            console.log('IDs: ' + ids);

            //Assigning Current User to Giftee and displaying
            var gdivs = cachedThis.state.gifteeNamesHTML
            for (var j = 0; j < cachedThis.state.memberIDs.length; j++) {
              //IF Current User , Check the corresponding Shuffled Member
              if (currentUserID === ids[j]) {
                console.log(currentUserID + ' , ' + cachedThis.state.originalMemberList[j]);
                console.log('equal at ' + j);
                console.log('UnShuffled Index ' + j + ' Name: ' + nameList[j]);
                console.log('Shuffled Index ' + j + ' Name: ' + gnameList[j]);

                gdivs.push(
                  <Grid gkey={'child' + j} container alignItems={'center'}
                    justify={'center'} direction={'row'} item style={{ padding: 30 }}>
                    <Button id={gids[j]} type='button' variant='contained'
                      color="primary" size="large" onClick={cachedThis.handleSubmit}>
                      <span id={gids[j]} >{gnameList[j]}</span>
                      <img src={process.env.PUBLIC_URL + '/present.png'} alt="present" style={{ width: 20, height: 20 }} />
                    </Button>
                  </Grid>
                )
                j++
              } else {
                gdivs.push(
                  <Grid gkey={'child' + j} container alignItems={'center'}
                    justify={'center'} direction={'column'} item style={{ padding: 30 }}>
                    <Button id={gids[j]} type='button' variant='contained' color="primary"
                      size="large" onClick={cachedThis.handleSubmit}>
                      <span id={gids[j]} >{gnameList[j]}</span>
                    </Button>
                  </Grid>
                )
              }
            }
            cachedThis.setState({ gifteeNamesHTML: gdivs })
          }
          )
          //console.log("state gids outside didmount: " + cachedThis.state.names)
          //console.log('after componentDidMount')
        })
      })
    })

    db.doGetMaxPrice(cachedThis.state.groupID).then(function (price) {
      console.log(price)
      cachedThis.setState({ maxPrice: price })
    })
    db.doGetPickDate(cachedThis.state.groupID).then(function (date) {
      console.log(date)
      cachedThis.setState({ pickDate: date })
    })

    //console.log("state ids outside didmount: " + cachedThis.state.names)
    //console.log('after componentDidMount')
  }

  helper(memberIDs) {
    var promise = new Promise(function (resolve, reject) {
      var promises = [];
      for (var i = 0; i < memberIDs.length; i++) {
        // console.log('i am in ViewGroup.js: ', memberIDs[i]);
        promises.push(db.doGetUserName(memberIDs[i]));
      }
      Promise.all(promises).then(function (values) {
        // console.log(values)
        resolve(values)
      });
    });
    return promise;
  }

  render() {

    return (
      <Grid key='main' container alignItems={'center'} justify={'center'} direction={'column'} item style={{ padding: 50 }}>
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
        {/*<h4>CurrentDate</h4>
      <h1>{this.currentDate()}</h1>*/}
        <h4>Member list</h4>
        {this.changeView(this.state.pickDate)}
      </Grid>
    );
  }
}

// return ViewGroupPage
// }
export default withRouter(ViewGroupPage);