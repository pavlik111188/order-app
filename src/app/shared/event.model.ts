/**
 * Event class
 */
export class Event {
    public name: string;
    public date: string;
    public location: string;
    public ratings: string;

    constructor(name:string, date:string, location:string, ratings: string){
        this.name = name;
        this.date = date;
        this.location = location;
        this.ratings = ratings;
    }
}