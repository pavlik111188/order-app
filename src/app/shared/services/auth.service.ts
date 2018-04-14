import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Log } from 'ng2-logger';
import { JwtHelperService } from '@auth0/angular-jwt';

import { UserService } from './user.service';
import { User } from '../models/user.model';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    /** Logger */
    private log = Log.create('AuthService');

    loggedIn = false;
    isAdmin = false;

    currentUser: User = new User();

    constructor(private userService: UserService,
                private router: Router,
                private jwtHelper: JwtHelperService) {
        this.log.color = 'green';
        this.log.d('Service injected');

        const token = localStorage.getItem('token');
        if (token) {
            const decodedUser = this.decodeUserFromToken(token);
            this.setCurrentUser(decodedUser);
        }
    }

    login(emailAndPassword) {
        return this.userService.login(emailAndPassword).map(
            res => {
                localStorage.setItem('token', res.token);
                const decodedUser = this.decodeUserFromToken(res.token);
                this.setCurrentUser(decodedUser);
                return this.loggedIn;
            }
        );
    }

    logout() {
        localStorage.removeItem('token');
        this.loggedIn = false;
        this.isAdmin = false;
        this.currentUser = new User();
        this.router.navigate(['/']);
    }

    decodeUserFromToken(token) {
        return this.jwtHelper.decodeToken(token).user;
    }

    setCurrentUser(decodedUser) {
        this.loggedIn = true;
        this.currentUser._id = decodedUser._id;
        // this.currentUser.username = decodedUser.username;
        this.currentUser.role = decodedUser.role;
        decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
        delete decodedUser.role;
    }

}
