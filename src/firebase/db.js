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
    console.log('before promise line 41')
    var promise = new Promise(function (resolve, reject) {
        console.log('within promise line 43')
        console.log(userID)
        var groups = db.ref(`/users/${userID}/wishlist`);

        console.log('before snapshot line 47')
        //call
        var outer = [];
        helper(groups).then(function (result) {
            console.log('within inner promise line 51')
            console.log('line 52: ' + result)
            outer = result;
            console.log('end inner promise line 54')
            console.log('outer line 58 db ' + outer)
            resolve(outer);
            console.log('last line of promise line 59')
        })
        // console.log(list)
        // resolve(outer);
        // return promise;
    });
    console.log('after promise line 61')
    return promise;
}

export function helper(groups) {
    var promise = new Promise(function (resolve, reject) {
        console.log('within helper')
        var list = [];
        groups.once('value')
        .then(function(snapshot) {
            console.log('here0')
            snapshot.forEach(childSnapshot => {
                console.log('here')
                var item = childSnapshot.val();
                console.log('here1')
                console.log(JSON.parse(JSON.stringify(item)))
                console.log('here2')
                list.push(JSON.parse(JSON.stringify(item)));
                console.log('here3')
                return true
            })
            console.log('before resolve')
            console.log(list)
            resolve(list)
            console.log('after resolve')
        })
        console.log('after foreach line 75')
        console.log('line 76 list ' + list)
        
    });
    return promise;
}

/*
WITH .ON INSTEAD OF .ONCE
export function helper(groups) {
    var promise = new Promise(function (resolve, reject) {
        console.log('within helper')
        var list = [];
        groups.on('value', snapshot => {
            console.log('here0')
            snapshot.forEach(childSnapshot => {
                console.log('here')
                var item = childSnapshot.val();
                console.log('here1')
                console.log(JSON.parse(JSON.stringify(item)))
                console.log('here2')
                list.push(JSON.parse(JSON.stringify(item)));
                console.log('here3')
                return true
            })
            console.log('before resolve')
            console.log(list)
            resolve(list)
            console.log('after resolve')
        })
        console.log('after foreach line 75')
        console.log('line 76 list ' + list)
        
    });
    return promise;
}
*/

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
