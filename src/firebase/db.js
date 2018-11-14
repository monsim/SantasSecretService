
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
<<<<<<< HEAD
}

// Get groups
export const getGroups = (memberID) => {
  return db.ref(`/users/${memberID}/groupList`);
=======
>>>>>>> 6c1e709ca25d50690144cd65643698d9ca5e2a41
}

// Get group name
export const getGroupName = (groupID) => {
  return db.ref(`/groups/${groupID}/groupName`);
}

<<<<<<< HEAD
// Get group members
export const getGroupMembers = (groupID) => {
  return db.ref(`/groups/${groupID}/members`);
}

export const getUserName = (userID) => {
  return db.ref(`/users/${userID}/username`);
=======
export const doGetUserGroupList = (userID) => {
    var promise = new Promise(function (resolve, reject) {
        var groups = db.ref(`/users/${userID}/groupList`);
        doGetUserGroupListHelper(groups).then(function (result) {
            resolve(result)
        })
    });
    return promise;
}

export function doGetUserGroupListHelper(groups) {
    var promise = new Promise(function (resolve, reject) {
        var list = [];
        groups.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                var aGroup = childSnapshot.val();
                list.push(JSON.parse(JSON.stringify(aGroup)));
            })
            resolve(list);
        })
    });
    return promise;
}

export const doGetGroupName = (groupID) => {
    var promise = new Promise(function (resolve, reject) {
        var theGroupName = db.ref(`/groups/${groupID}/groupName`);
        doGetGroupNameHelper(theGroupName).then(function (result) {
            resolve(result)
        })
    });
    return promise;
}

export function doGetGroupNameHelper(theGroupName) {
    var promise = new Promise(function (resolve, reject) {
        var theGroup = '';
        theGroupName.on('value', snapshot => {
            theGroup = snapshot.val();
            resolve(theGroup)
        })
    });
    return promise;
>>>>>>> 6c1e709ca25d50690144cd65643698d9ca5e2a41
}

export const doGetUserGroupList = (userID) => {
    var groups = db.ref(`/users/${userID}/groupList`);
    var list = [];
    groups.on('value', snapshot => {
        snapshot.forEach(childSnapshot => {
            var aGroup = childSnapshot.val();
            list.push(JSON.parse(JSON.stringify(aGroup)));
        })
    })
    return list;
 }
 
 export const doGetGroupName = (groupID) => {
     var theGroupName = db.ref(`/groups/${groupID}/groupName`);
     var theGroup = '';
     theGroupName.on('value', snapshot => {
         theGroup = snapshot.val();
         console.log('the group: ', theGroup)
         groups.push(theGroup);
         console.log('groups: ' + groups)
     })
     console.log('i am in db.js: ', theGroup)
     return theGroup;
     //return theGroup;
    }
     
     export const onceGetUsers = () =>
    db.ref('users').once('value');

// Other Entity APIs ...
