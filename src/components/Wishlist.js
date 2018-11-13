
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';
import AuthUserContext from './AuthUserContext';
import {
  Link,
  withRouter,
} from 'react-router-dom';

import firebase from 'firebase/app';
import { auth, db } from '../firebase';
import * as routes from '../constants/routes';

const INITIAL_STATE = {
  //username: '', can we get this from current session??
  //email: '',
  groupID: '',
  groupName: '',
  leader: '',
  maxPrice: '',
  pickDate: '',
  archiveDate: '',
  members: '',
  wishlist: [],
  item: '',
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});


class ViewWishlistPage extends React.Component {


  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    // event.preventDefault();
    // var grpID = this.state.groupID;
    // // Backend  here
    // firebase.auth().onAuthStateChanged(function (user) {
    //   if (user) {
    //     // User is signed in.
    //     var userID = firebase.auth().currentUser.uid;
    //     db.addWishlistItem(userID, )
    //     console.log(userID + ' added to ' + grpID)
    //   }
    // })

    for (var i = 0; i < this.state.wishlist.size; i++) {
      console.log(this.state.wishlist[i].inputProps);
    }

  }

  handleSubmitAdd() {
    const wishlistS = this.state.wishlist;

    wishlistS.push(<div>
      <div>
        <Input
          name='item'
          onChange={this.handleChange}
          placeholder="Wishlist Item"
          inputProps={{
            'aria-label': 'Description',
          }}
        />
      </div>
    </div>
    );

    this.setState({
      wishlist: wishlistS
    });
    console.log(wishlistS);
  }


  render() {
    return (
      <div style={{ padding: 30 }}>
        <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
          <Grid item style={{ paddingBottom: 40 }}>
            <h1>Your Wishlist</h1>
          </Grid>
          <div>
            {this.state.wishlist}
          </div>
          <br />
          <Button variant="contained" color="primary" size="large" type='submit' onClick={this.handleSubmit} ><Link to={routes.HOME}>Save Wishlist</Link> </Button>
          <br />
          <Button variant="fab" color="primary" mini onClick={this.handleSubmitAdd} aria-label="Add" >
            <AddIcon />
          </Button>
        </Grid>
      </div>


    );
  }

}

export default ViewWishlistPage;



class WishlistItem extends React.Component {
  // render() {
  //   return (
  //     <Input
  //       placeholder="Wishlist Item"
  //       inputProps={{
  //         'aria-label': 'Description',
  //       }}
  //     />
  //   );
  // }
  render() {
    return <Input
      type="file"
      name={`wishlist-${this.props.index}-wishlist`}
    />;
  }
}

// 