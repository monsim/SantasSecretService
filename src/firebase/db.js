import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });


  export const doCreateGroup = (id, name, leader) =>
  db.ref(`groups/${id}`).set({
    name,
    leader,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other Entity APIs ...
