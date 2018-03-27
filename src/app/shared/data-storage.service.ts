import { Injectable } from '@angular/core';
import { Log } from 'ng2-logger';

import {AuthService} from "../auth/auth.service";

/**
 * Service to comunicate with the Node database
 */
@Injectable()
export class DataStorageService {
    /** Logger */
    private log = Log.create('DataStorageService');

    constructor(private authService: AuthService) {
        this.log.color = 'green';
        this.log.d('Service injected');
    }

    /************************************
     * Firestore: User
     ************************************/

    /**
     * Update user data
     * @param  {any} user User
     * @returns {Promise<void>}
     */
    updateUserData(user: any): Promise<void> {
        this.log.d('Update user in firestore', user);
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${user.uid}`
        );
        return userRef.set(JSON.parse(JSON.stringify(user)));
    }

}
