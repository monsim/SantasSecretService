import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import firebase from 'firebase/app';
import { auth, db } from '../firebase';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

// Front end
class ViewGroupPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      groupID: '',
    };
    
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
      groupID,
    } = this.state;
    
    return (
      <div style={{ padding: 30 }}>
        <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
          <Grid item style={{ paddingBottom: 40 }}>
            <h1>Group: {groupID}</h1>
            <h2>Group Member 1      </h2>
            <h2>Group Member 2      (Giftee Symbol)</h2>
          </Grid>
          <Button variant="contained" color="primary" size="large" type='submit' onClick={this.handleSubmit} ><Link to={routes.HOME}>View Group</Link></Button>
        </Grid>
      </div>


    );
  }

}

export default ViewGroupPage;