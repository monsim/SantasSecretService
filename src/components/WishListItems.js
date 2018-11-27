import React, { Component } from "react";
 
class WishListItems extends Component {
    constructor(props) {
        super(props);
     
        this.createItems = this.createItems.bind(this);
    }
     
      delete(key) {
        this.props.delete(key);
    }

    createItems(item) {
        return <li onClick={() => this.delete(item.key)} 
                    key={item.key}>{item.text}</li>
      }
 
  render() {
    var WishListEntries = this.props.entries;
    var listItems = WishListEntries.map(this.createItems);
 
    return (
      <ul className="theList">
          {listItems}
      </ul>
    );
  }
};
 
export default WishListItems;