import { Component, OnInit } from '@angular/core';

import {EventService} from "../../shared/services/event.service";
import { Event } from '../../shared/models/event.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  events: Event[] = [];
  isLoading = true;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.eventService.getEvents().subscribe(
        data => this.events = data,
        error => console.log(error),
        () => this.isLoading = false
    );
  }
}
