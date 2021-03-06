import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
// import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
  <AppBar color="default" position={'static'}>
    <Tabs>
      <TabContainer><Link to={routes.HOME}><Tab label="Home" /></Link></TabContainer>
      <TabContainer><Link to={routes.ACCOUNT}><Tab label="Account" /></Link></TabContainer>
      <TabContainer><Link to={routes.CREATE_GROUP}><Tab label="Create Group" /></Link></TabContainer>
      <TabContainer><Link to={routes.JOIN_GROUP}><Tab label="Join Group" /></Link></TabContainer>
      <TabContainer><Link to={routes.VIEW_WISHLIST}><Tab label="View Wishlist" /></Link></TabContainer>
    </Tabs>
  </AppBar>

const NavigationNonAuth = () =>
  <AppBar color="default" position={'relative'}>
    <Tabs>
      <TabContainer><Link to={routes.LANDING}><Tab label="Landing" /></Link></TabContainer>
      <TabContainer><Link to={routes.SIGN_IN}><Tab label="Sign In" /></Link></TabContainer>
      <TabContainer><Link to={routes.SIGN_UP}><Tab label="Sign Up" /></Link></TabContainer>
    </Tabs>
  </AppBar>

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 4 }}>
      {props.children}
    </Typography>
  );
}

export default Navigation;