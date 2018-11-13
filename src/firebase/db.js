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

export function getWishlist(userID) {
    var promise = new Promise(function (resolve, reject) {
        var groups = db.ref(`/users/${userID}/wishlist`);
        var list = [];
        groups.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                var item = childSnapshot.val();
                list.push(JSON.parse(JSON.stringify(item)));
            })
        })
        console.log(list)
        resolve(list);
    });
    return promise;
}

export const getUserWishlist = (userID) => {
    var groups = db.ref(`/users/${userID}/wishlist`);
    var list = [];
    groups.on('value', snapshot => {
        snapshot.forEach(childSnapshot => {
            var item = childSnapshot.val();
            list.push(JSON.parse(JSON.stringify(item)));
        })
    })
    console.log(list);
    return list;
}


export const onceGetUsers = () =>
    db.ref('users').once('value');

// Other Entity APIs ...
