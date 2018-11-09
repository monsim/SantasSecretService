import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AuthUserContext from './AuthUserContext';
import withAuthorization from './withAuthorization';
import { firebase } from '../firebase';
import {
    Link,
    withRouter,
} from 'react-router-dom';

import firebase from 'firebase/app';
import { auth, db } from '../firebase';
import * as routes from '../constants/routes';
//import Account from './Account'; 

const CreateGroupPage = ({ history }) =>
    <div>
        <h1>SignUp</h1>
        <CreateGroupForm history={history} />
    </div>

var test = RANDOM;

const RANDOM = () =>

    firebase.auth.onAuthStateChanged(authUser => {
        authUser
            ? test = authUser.uid
            : test = 'blahblahblah';
    });

const INITIAL_STATE = {
    //username: '', can we get this from current session??
    //email: '',
    groupName: '',
    leader: test,
    maxPrice: '',
    pickDate: '',
    archiveDate: '',
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class CreateGroupForm extends Component {

    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const {
            groupName,
            leader,
            maxPrice,
            pickDate,
            archiveDate,
        } = this.state;

        const {
            history,
        } = this.props;

        //authUser is the result of the promise from doCreateUserWithEmailAndPassword
        // Create a user in your own accessible Firebase Database too
        db.doCreateGroup(groupName, leader, maxPrice, pickDate, archiveDate)
            .then(() => {
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                      // User is signed in.
                      var userID = firebase.auth().currentUser.uid;
                      alert(userID);
                    }
                  });
                console.log("hello!");
                // this.setState({ ...INITIAL_STATE });
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });



        event.preventDefault();
    }



    render() {

        const {
            groupName,
            leader,
            maxPrice,
            pickDate,
            archiveDate,
            error,
        } = this.state;

        return (
            // <form onSubmit={this.onSubmit}>
            //     <div style={{ padding: 30 }}>
            //         <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
            //             <Grid item style={{ paddingBottom: 40 }}>
            //                 <h1>Create A Group</h1>
            //             </Grid>

            //             <TextField
            //                 // id="standard-search"
            //                 label="Group Name"
            //                 //   type="search"
            //                 //   className={classes.textField}
            //                 margin="normal"
            //             />
            //             <TextField
            //                 id="standard-search"
            //                 label="Price Limit"
            //                 //   type="search"
            //                 //   className={classes.textField}
            //                 margin="normal"
            //             />
            //             <TextField
            //                 id="standard-search"
            //                 label="Pick Date"
            //                 //   type="search"
            //                 //   className={classes.textField}
            //                 margin="normal"
            //             />

            //             <TextField
            //                 id="standard-search"
            //                 label="Archive Date"
            //                 //   type="search"
            //                 //   className={classes.textField}
            //                 margin="normal"
            //             />

            //             <Grid item xs={6} style={{ paddingBottom: 20 }}>
            //                 <Button variant="contained" color="primary" size="large"><Link to={routes.HOME}>Create</Link></Button>
            //             </Grid>
            //             <Grid item style={{ paddingTop: 50 }}>
            //                 <img src={process.env.PUBLIC_URL + '/hushhush.png'} alt="logo" style={{ width: 200, height: 200 }} />
            //             </Grid>
            //         </Grid>
            //     </div>
            // </form>



            <form onSubmit={this.onSubmit}>
                <Grid container alignItems={'center'} justify={'center'} direction={'column'}></Grid>
                <TextField
                    value={groupName}
                    onChange={event => this.setState(byPropKey('groupName', event.target.value))}
                    type="text"
                    placeholder="Group Name"
                />
                <TextField
                    value={maxPrice}
                    onChange={event => this.setState(byPropKey('maxPrice', event.target.value))}
                    type="number"
                    placeholder="Price limit"
                />
                <TextField
                    value={pickDate}
                    onChange={event => this.setState(byPropKey('pickDate', event.target.value))}
                    type="date"
                    placeholder="End of Pick date"
                />
                <TextField
                    value={archiveDate}
                    onChange={event => this.setState(byPropKey('archiveDate', event.target.value))}
                    type="date"
                    placeholder="Date to archive"
                />
                <button type="submit">
                    Create Group
                </button>
                {error && <p>{error.message}</p>}
            </form >
        )
    }
}


export default withRouter(CreateGroupPage);

export {
    CreateGroupForm,
};