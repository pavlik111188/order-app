import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { EventService } from '../../shared/services/event.service';
import { ToastComponent } from '../../shared/toats/toast.component';
import { Event } from '../../shared/models/event.model';

@Component({
  selector: 'app-dashboard-client',
  templateUrl: 'dashboard-client.component.html',
  styleUrls: ['dashboard-client.component.scss']
})
export class DashboardClientComponent implements OnInit {

  event = new Event();
  events: Event[] = [];
  isLoading = true;
  isEditing = false;

  addEventForm: FormGroup;
  editEventForm: FormGroup;
  title = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  date_start = new FormControl('', Validators.required);
  date_end = new FormControl('', Validators.required);

  constructor(private eventService: EventService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getEvents();
    this.addEventForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      date_start: this.date_start,
      date_end: this.date_end
    });
    this.editEventForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      date_start: this.date_start,
      date_end: this.date_end
    });
  }

  getEvents() {
    this.eventService.getEvents().subscribe(
        data => this.events = data,
        error => console.log(error),
        () => this.isLoading = false
    );
  }

  addEvent() {
    this.eventService.addEvent(this.addEventForm.value).subscribe(
        res => {
          this.events.push(res);
          this.addEventForm.reset();
          this.toast.setMessage('item added successfully.', 'success');
        },
        error => console.log(error)
    );
  }

  editEvent(event: Event) {
    this.eventService.editEvent(event).subscribe(
        () => {
          this.isEditing = false;
          this.event = event;
          this.toast.setMessage('item edited successfully.', 'success');
        },
        error => console.log(error)
    );
  }

  deleteEvent(event: Event) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.eventService.deleteEvent(event).subscribe(
          () => {
            const pos = this.events.map(elem => elem._id).indexOf(event._id);
            this.events.splice(pos, 1);
            this.toast.setMessage('item deleted successfully.', 'success');
          },
          error => console.log(error)
      );
    }
  }

}
