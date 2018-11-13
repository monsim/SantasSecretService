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
    theGroupName.on('value', snapshot => {
        alert(snapshot.key);
    })
    return theGroupName;
}

export const onceGetUsers = () =>
    db.ref('users').once('value');

// Other Entity APIs ...
