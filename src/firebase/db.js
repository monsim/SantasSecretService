import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username: username,
    email: email,
  });


  export const doCreateGroup = (id, name, leader) =>
  db.ref(`groups/${id}`).set({
    name,
    leader,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other Entity APIs ...

export const changeUsername = (id, newUsername) =>
  db.ref(`users/${id}`).set({
    
  })
