import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, groupList) =>
    db.ref(`users/${id}`).set({
        username,
        email,
        groupList,
    });


export const doCreateGroup = (groupName, leader, maxPrice, pickDate, archiveDate, members = '') => {
    const groupRef = db.ref(`groups`);
    groupRef.push().set({
        groupName,
        leader,
        maxPrice,
        pickDate,
        archiveDate,
        members,
    });
    var grpID = '';
    groupRef.endAt().limitToLast(1).on('child_added', (snapshot) => {
        console.log(snapshot.key)
        grpID = snapshot.key;
    });
    return grpID;
}
//`groups/${ groupID }/members`
export const doJoinGroup = (groupID, memberID) => {
    db.ref(`/groups/${groupID}/members`).push(memberID);
    db.ref(`/users/${memberID}/groupList`).push(groupID);
}


export const addWishlistItem = (memberID, wishlistItem) => {
    db.ref(`/users/${memberID}/wishlist`).push(wishlistItem);
}

export const onceGetWishlistItems = (memberID) => {
    db.ref.once(`/users/${memberID}/wishlist`, function (data) {
        console.log('HELLLLOOOOOOOOOO IN DB')
    });
}
// Get groups
export const getGroups = (memberID) => {
  return db.ref(`/users/${memberID}/groupList`);
}

// Get group name
export const getGroupName = (groupID) => {
  return db.ref(`/groups/${groupID}/groupName`);
}

// Get group members
export const getGroupMembers = (groupID) => {
  return db.ref(`/groups/${groupID}/members`);
}

export const getUserName = (userID) => {
  return db.ref(`/users/${userID}/username`);
}

export const onceGetUsers = () =>
    db.ref('users').once('value');

// Other Entity APIs ...
