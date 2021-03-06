import { UserRoles } from '../interfaces/user-roles';

/**
 * User class
 */
export class User {
    _id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    role?: any;
    phone?: string;
    birthday?: string;
}
