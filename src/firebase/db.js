import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, groupList) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    groupList,
  });


export const doCreateGroup = (groupName, leader, maxPrice, pickDate, archiveDate, members = '') =>
  db.ref(`groups`).push().set({
    groupName,
    leader,
    maxPrice,
    pickDate,
    archiveDate,
    members,
  });
//`groups/${ groupID }/members`
export const doJoinGroup = (groupID, memberID) => {


    db.ref(`/groups/${ groupID }/members`).push(memberID);

}
  
    

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other Entity APIs ...
