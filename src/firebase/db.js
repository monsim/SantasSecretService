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
//        console.log(snapshot.key)
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
}

export const doGetGroupMember = (groupID) => {
    var promise = new Promise(function (resolve, reject) {
        var members = db.ref(`/groups/${groupID}/members`);
        doGetGroupMemberHelper(members).then(function (result) {
            resolve(result)
        })
    });
    return promise;
}

export function doGetGroupMemberHelper(members) {
    console.log(members + " in db")
    var promise = new Promise(function (resolve, reject) {
        // console.log("within dbbb")
        var list = [];
        members.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                var memberID = childSnapshot.val();
                // console.log('memberID ' + memberID)
                list.push(JSON.parse(JSON.stringify(memberID)))
            })
            resolve(list)
            // console.log(list)
        })
    });
    return promise;
}

export const doGetUserName = (memberID) => {
    var promise = new Promise(function (resolve, reject) {
        var memberName = db.ref(`/users/${memberID}/username`);
        doGetUserNameHelper(memberName).then(function (result) {
            resolve(result)
        })
    });
    return promise;
}

export function doGetUserNameHelper(memberName) {
    var promise = new Promise(function (resolve, reject) {
        var name = '';
        memberName.on('value', snapshot => {
            name = snapshot.val();
            resolve(name)
            // console.log("helper name " + name)
        })
    });
    return promise;
}

export const doGetMaxPrice= (groupID) => {
    var promise = new Promise(function (resolve, reject) {
        var maxPrice = db.ref(`/groups/${groupID}/maxPrice`);
        doGetMaxPriceHelper(maxPrice).then(function (result) {
            resolve(result)
        })
    });
    return promise;
}

export function doGetMaxPriceHelper(maxPrice) {
    var promise = new Promise(function (resolve, reject) {
        var price = '';
        maxPrice.on('value', snapshot => {
            price = snapshot.val();
            resolve(price)
        })
    });
    return promise;
}

export const doGetPickDate= (groupID) => {
    var promise = new Promise(function (resolve, reject) {
        var pickDate = db.ref(`/groups/${groupID}/pickDate`);
        doGetPickDateHelper(pickDate).then(function (result) {
            resolve(result)
        })
    });
    return promise;
}

export function doGetPickDateHelper(pickDate) {
    var promise = new Promise(function (resolve, reject) {
        var date = '';
        pickDate.on('value', snapshot => {
            date = snapshot.val();
            resolve(date)
        })
    });
    return promise;
}

export const onceGetUsers = () =>
    db.ref('users').once('value');

// Other Entity APIs ...
