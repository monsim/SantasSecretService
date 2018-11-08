import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import SignOutButton from './SignOut';
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
  <AppBar color="default">
    <Tabs>
      <TabContainer><Link to={routes.LANDING}><Tab label="Landing" /></Link></TabContainer>
      <TabContainer><Link to={routes.HOME}><Tab label="Home" /></Link></TabContainer>
      <TabContainer><Link to={routes.ACCOUNT}><Tab label="Account" /></Link></TabContainer>
      <TabContainer><Link to={routes.CREATE_GROUP}><Tab label="Create Group" /></Link></TabContainer>
      <TabContainer><Link to={routes.JOIN_GROUP}><Tab label="Join Group" /></Link></TabContainer>
      <TabContainer><Link to={routes.WISHLIST}><Tab label="My Wishlist" /></Link></TabContainer>
      <TabContainer><SignOutButton /></TabContainer>
    </Tabs>
  </AppBar>

const NavigationNonAuth = () =>
  <AppBar color="default" position={'relative'}>
    <Tabs>
      <TabContainer><Link to={routes.LANDING}><Tab label="Landing" /></Link></TabContainer>
      <TabContainer><Link to={routes.SIGN_IN}><Tab label="Sign In" /></Link></TabContainer>
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