import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
    providedIn: 'root'
})
export class ClaimsService {

    constructor(private angularFireFunctions: AngularFireFunctions) { }

    initAdminAccount() {
        const initAdminAccount = this.angularFireFunctions.httpsCallable('initAdminAccount');

        return initAdminAccount('.');
    }

    setDefaultUserPermission(userUid) {
        const setDefaultUserPermission = this.angularFireFunctions.httpsCallable('setDefaultUserPermission');

        return setDefaultUserPermission(userUid);
    }
}
