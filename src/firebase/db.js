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
    // var updates = {};
    // var id = '' + memberID;
    // console.log("memberID in dojoingroup: " + id);
    // updates['groups/' + groupID + '/members'] = id;
    // console.log(updates);
    // db.ref().update(updates);
    // console.log("done");

    

}
  
    

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other Entity APIs ...
