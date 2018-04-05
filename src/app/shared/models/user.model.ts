import { UserRoles } from '../interfaces/user-roles';

/**
 * User class
 */
export class User {
    _id?: string;
    username?: string;
    email?: string;
    role?: UserRoles;
}