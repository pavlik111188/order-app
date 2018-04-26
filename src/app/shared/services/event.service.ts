import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Event } from '../models/event.model';

@Injectable()
export class EventService {

    constructor(private http: HttpClient) { }

    getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>('/api/events');
    }

    countEvents(): Observable<number> {
        return this.http.get<number>('/api/events/count');
    }

    addEvent(event: Event): Observable<Event> {
        return this.http.post<Event>('/api/event', event);
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