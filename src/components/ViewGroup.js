import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

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
      memberID: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      history,
    } = this.props;

    console.log(this.state.memberID)
    history.push(routes.VIEW_GROUP)
    return false;

  }

  componentDidMount() {
    var cachedThis = this;

    // Get the Group Names
    db.doGetGroupName(cachedThis.state.groupID).then(function (gName) {
      cachedThis.setState({ groupName: gName })
    })

    console.log('before componentDidMount')

    // Get Group MembersID
    db.doGetGroupMember(this.state.groupID).then(function (ids) {
      cachedThis.setState({ memberIDs: ids })
      cachedThis.helper(cachedThis.state.memberIDs).then(function (nameList) {
        // console.log('after helper call')
        // console.log(nameList)

        //Get Group Members Name
        var divs = cachedThis.state.memberNamesHTML
        for (var i = 0; i < cachedThis.state.memberIDs.length; i++) {
          // console.log('I am in the member names for loop')
          cachedThis.setState({ memberID: nameList[i] })
          divs.push(
            // <Grid key={'child'+ i} container alignItems={'center'} 
            //   justify={'center'} direction={'column'} item style={{ padding: 30 }}>
            //   <Button name={ids[i]} type='button' variant='contained' color="primary"
            //     size="large" onClick={cachedThis.handleSubmit}>
            //     {nameList[i]}
            //   </Button>
            // </Grid>

            <div>
              <ListItem name={ids[i]} button onClick={cachedThis.handleSubmit}>
                <ListItemText primary={nameList[i]} />
                <ListItemIcon><PlayArrowIcon /></ListItemIcon>
              </ListItem>
              <Divider />
            </div>


          )
        }
        cachedThis.setState({ memberNamesHTML: divs })
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
      Promise.all(promises).then(function (values) {
        // console.log(values)
        resolve(values)
      });
    });
    return promise;
  }

  render() {

    return (
      <Grid key='main' container alignItems={'center'} justify={'center'} direction={'column'}>
        <h6>Group Name</h6>
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