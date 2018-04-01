import { Injectable } from '@angular/core';
import { Log } from 'ng2-logger';

import { Event } from './models/event.model';
import { User } from './models/user.model';

/**
 * Service to comunicate with the Node database
 */
@Injectable()
export class DataStorageService {
    /** Logger */
    private log = Log.create('DataStorageService');

    constructor() {
        this.log.color = 'green';
        this.log.d('Service injected');
    }

    /************************************
     * Store: User
     ************************************/

    /**
     * Update user data
     * @param  {any} user User
     */
    updateUserData() {

    }

    /**
     * Get user
     */
    getUser() {
    }

    /**
     * Get all user
     */
    getAllUser() {

    }

    /**
     * Delete user
     */
    deleteUser() {

    }

}
