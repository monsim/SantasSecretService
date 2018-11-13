import React from 'react';
//import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
//import TextField from '@material-ui/core/TextField';

//import firebase from 'firebase/app';
import { db } from '../firebase';
import {
  Link,
} from 'react-router-dom';
import * as routes from '../constants/routes';


var members = [];
var groupName = '';
// Front end
//const ViewGroupPage = (groupID) => (Component) =>
class ViewGroupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '-LR9m8U9ghz-2F4ZR2SR',
    };

    console.log('here');
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
  }

  render() {
    const {
      id,
    } = this.state;

    return (
      <div style={{ padding: 30 }}>
        <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
          <Grid item style={{ paddingTop: 100 }}>
            <h1>Group: {id}</h1>
            <h2>Group Member 1 </h2>
            <h2>Group Member 2 (Giftee Symbol)</h2>
          </Grid>
        </Grid>
      </div>
    );
  }
}



export default ViewGroupPage;