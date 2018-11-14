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


class WishlistItem extends React.Component {
    render() {
        return (
            <Input
                placeholder="Wishlist Item"
                inputProps={{
                    'aria-label': 'Description',
                }}
            />
        );
    }
}

export default WishlistItem;