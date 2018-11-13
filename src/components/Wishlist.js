import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import WishListItems from "./WishListItems";

class ViewWishlistPage extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      items: []
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

  }

  addItem(e) {
    if (this._inputElement.value !== "") {
      var newItem = {
        text: this._inputElement.value,
        key: Date.now()
      };
   
      this.setState((prevState) => {
        return { 
          items: prevState.items.concat(newItem) 
        };
      });
     
      this._inputElement.value = "";
    }
     
    console.log(this.state.items);
       
    e.preventDefault();
  }

  deleteItem(key) {
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });
   
    this.setState({
      items: filteredItems
    });
  }

  render() {
    return (
      <div style={{ padding: 30 }}>
        <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
          <Grid item style={{ paddingBottom: 40 }}>
            <h1>My Wishlist</h1>
            <h3>(Click to Remove)</h3>
            <form onSubmit={this.addItem}>
                <input ref={(a) => this._inputElement = a} placeholder="Enter WishList Item"></input>
                <button type="Submit">add</button>
            </form>
            </Grid>
            <WishListItems entries={this.state.items}
                 delete={this.deleteItem}/>        
          </Grid>
        </div>
    );
  }
}
export default ViewWishlistPage;