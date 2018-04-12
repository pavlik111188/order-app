import { UserRoles } from '../interfaces/user-roles';

/**
 * User class
 */
export class User {
    _id?: string;
    email?: string;
    role?: UserRoles;
}