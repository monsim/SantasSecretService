import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import * as routes from '../constants/routes';


const INITIAL_STATE = {
    //username: '', can we get this from current session??
    //email: '',
    groups: '',
};


class CreateGroupPage extends Component {
    onSubmit = (event) => {
        const {
            username,
            email,
            passwordOne,
        } = this.state;

        const {
            history,
        } = this.props;


        //authUser is the result of the promise from doCreateUserWithEmailAndPassword
        // Create a user in your own accessible Firebase Database too
        db.doCreateGroup("groupName", "leader")
            .then(() => {
                // console.log("hello!");
                this.setState({ ...INITIAL_STATE });
                history.push(routes.HOME);
            })
            .catch(error => {
                // this.setState(byPropKey('error', error));
            });



        event.preventDefault();
    }



    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div style={{ padding: 30 }}>
                    <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
                        <Grid item style={{ paddingBottom: 40 }}>
                            <h1>Create A Group</h1>
                        </Grid>
                     
                        <TextField
                            // id="standard-search"
                            label="Group Name"
                            //   type="search"
                            //   className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-search"
                            label="Price Limit"
                            //   type="search"
                            //   className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-search"
                            label="Pick Date"
                            //   type="search"
                            //   className={classes.textField}
                            margin="normal"
                        />

                        <TextField
                            id="standard-search"
                            label="Archive Date"
                            //   type="search"
                            //   className={classes.textField}
                            margin="normal"
                        />

                        <Grid item xs={6} style={{ paddingBottom: 20 }}>
                            <Button variant="contained" color="primary" size="large"><Link to={routes.HOME}>Create</Link></Button>
                        </Grid>
                        <Grid item style={{ paddingTop: 50 }}>
                            <img src={process.env.PUBLIC_URL + '/hushhush.png'} alt="logo" style={{ width: 200, height: 200 }} />
                        </Grid>
                    </Grid>
                </div>
            </form>
        )
    }
}

export default CreateGroupPage;