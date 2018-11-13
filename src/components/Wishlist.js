
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';
import Icon from '@material-ui/core/Icon';
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
  wishlistDivs: [], //array of divs
  item: '', //most recently added items
  wishlist: [],   //array of names of items
  boolee: false,
  oldWishlistDivs: [], //array of divs from wishlist in firebase
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
    this.handleItemSubmit = this.handleItemSubmit.bind(this);
  }

  componentWillMount() {
    console.log('in componentWillMount')
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var memberID = firebase.auth().currentUser.uid;
        console.log('before')
        db.getWishlist(memberID).then(function(result) {
          console.log("its done!");
          console.log(result)
        });
        console.log('end')

        // console.log(existingWishlist);
        // for (var i = 0; i < existingWishlist.length; i++) { //add each wishlist item into oldWishlistDivs
        //   this.state.oldWishlistDivs.push(
        //     <div>
        //       <div>
        //         <Input
        //           name='item'
        //           onChange={this.handleChange}
        //           placeholder="Wishlist Item"
        //           inputProps={{
        //             'aria-label': 'Description',
        //           }}
        //           defaultValue={existingWishlist[i]}
        //         />
        //         {/* <Button variant="contained" color="primary" onClick={this.handleItemSubmit} >
        //           Delete Item 
        //         </Button> */}
        //       </div>
        //     </div>
        //   )
        // }

      }
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    // this.addItem(event.target.value)
  }

  //only saves the last one you type, make sure you hit save item before you hit the +
  handleItemSubmit(event) {
    console.log('item submit')
    console.log(this.state.item)
    const wishlistS = this.state.wishlist;

    wishlistS.push(
      this.state.item
    );

    console.log(wishlistS.length)
    for (var i = 0; i < wishlistS.length; i++) {
      console.log(wishlistS[i]);
    }
    console.log('wishlistS: ' + wishlistS);
    this.setState({
      wishlist: wishlistS
    });
    console.log("wishlist: " + this.state.wishlist);
  }

  handleSubmit(event) {
    console.log('handle submit');
    console.log("wishlist in final submit: " + this.state.wishlist)

    var finalWishlist = this.state.wishlist;

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        var userID = firebase.auth().currentUser.uid;
        for (var i = 0; i < finalWishlist.length; i++) {
          db.addWishlistItem(userID, finalWishlist[i]);
        }

        console.log('wishlist: ' + finalWishlist + ' added to userID ' + userID);
      }
    })

  }

  handleSubmitAdd() {
    const wishlistS = this.state.wishlistDivs;

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
        <Button variant="contained" color="primary" onClick={this.handleItemSubmit} >
          Save Item
        </Button>
      </div>
    </div>
    );

    this.setState({
      wishlistDivs: wishlistS
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
            {this.state.oldWishlistDivs}
          </div>
          <div>
            {this.state.wishlistDivs}
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