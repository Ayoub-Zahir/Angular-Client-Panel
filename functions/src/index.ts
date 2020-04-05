import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Init admin SDK
admin.initializeApp();

export const initAdminAccount = functions.https.onCall(() => {
    return admin.auth().getUserByEmail('admin@gmail.com')
        .then(() => 'Admin already exist !!')
        .catch(err => {
            if (err.code === 'auth/user-not-found') {
                // Create admin account
                return admin.auth().createUser({
                    email: 'admin@gmail.com',
                    password: '123456'
                })
                    .then(adminRecord => {
                        // Set custum claims
                        return admin.auth().setCustomUserClaims(adminRecord.uid, {
                            admin: true,
                            permissions: {
                                canAddClient: true,
                                canEditClient: true,
                                canDeleteClient: true
                            }
                        })
                            .then(() => 'Admin has been added seccessfully')
                            .catch(err => err);
                    })
                    .catch(err => err);
            }
            return err;
        });
});

export const setDefaultUserPermission = functions.https.onCall((userUid) => {
    return admin.auth().setCustomUserClaims(userUid, {
        permissions: {
            canAddClient: false,
            canEditClient: false,
            canDeleteClient: false
        }
    })
        .then(() => `${userUid} permissions's have been added seccessfully`)
        .catch(err => err);
});