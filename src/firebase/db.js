import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });


export const doCreateGroup = (groupName, leader, maxPrice, pickDate, archiveDate, members) =>
  db.ref(`groups`).push().set({
    groupName,
    leader,
    maxPrice,
    pickDate,
    archiveDate,
    members,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other Entity APIs ...
