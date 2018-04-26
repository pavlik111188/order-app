import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Event } from '../models/event.model';

const token = localStorage.getItem('token');
const httpOptions = {
  headers: new HttpHeaders({ 'token': token})
};

@Injectable()
export class EventService {

    constructor(private http: HttpClient) {
    }

    getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>('/api/events');
    }

    countEvents(): Observable<number> {
        return this.http.get<number>('/api/events/count');
    }

    addEvent(event: Event): Observable<Event> {
        // this.http.options(httpOptions);
        return this.http.post<Event>('/api/event', event, httpOptions);
    }

    getEvent(event: Event): Observable<Event> {
        return this.http.get<Event>(`/api/event/${event._id}`);
    }

    editEvent(event: Event): Observable<string> {
        return this.http.put(`/api/event/${event._id}`, event, { responseType: 'text' });
    }

    deleteEvent(event: Event): Observable<string> {
        return this.http.delete(`/api/event/${event._id}`, { responseType: 'text' });
    }

}
