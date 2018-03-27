import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';

import { User } from '../shared/user.model';
import {DataStorageService} from "../shared/data-storage.service";


@Injectable()
export class AuthService {
    /** Logger */
    private log = Log.create('AuthService');
    /** Firebase user */
    public user: Observable<User>;

    /** roles of currently logged in uer */
    private userRoles: Array<string>;

    constructor(
        private dataStorageService: DataStorageService,
        private router: Router
    ) {
        this.log.color = 'green';
        this.log.d('Service injected');
    }

    /**
     * Register user with credentials
     * @param  {string} email
     * @param  {string} password
     * @returns {Promise<any>}
     */
    public register(email: string, password: string): Promise<any> {
        return this.afAuth.auth
            .createUserWithEmailAndPassword(email, password)
            .then(credential => {
                this.dataStorageService.updateUserData(credential);
            });
    }

}
