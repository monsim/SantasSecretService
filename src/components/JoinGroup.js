import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';


class JoinGroupPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groupID: ''
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

    // Backend  here
    console.log(this.state.groupID);
  }


  render() {
    return (
      <div style={{ padding: 30 }}>
        <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
          <Grid item style={{ paddingBottom: 40 }}>
            <h1>Join A Group</h1>
          </Grid>

          <TextField
            name="groupID"
            label="Group ID Number"
            onChange={this.handleChange}
            required
            margin="normal"
          />

          <Button variant="contained" color="primary" size="large" type='submit' onClick={this.handleSubmit} ><Link to={routes.HOME}>Join Group</Link></Button>

        </Grid>
      </div>


    );
  }

}

export default JoinGroupPage;