/**
 * User class
 */
export class User {
    public name: string;
    public email: string;
    public role: string;
    public subscription: string;

    constructor(name: string, email:string, role:string, subscription:string){
        this.name = name;
        this.email = email;
        this.role = role;
        this.subscription = subscription;
    }
}
