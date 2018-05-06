import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  eventForm: FormGroup;

  constructor(private eventService: EventService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getEvents();
    // Init forms
    this.buildEventForm();
  }

  //edit event builder
  buildEventForm(): void {
    this.eventForm = this.formBuilder.group({
        'title' : [null, [
            Validators.required,
            Validators.minLength(6)
        ]
        ],
        'description' : [null, [
            Validators.required,
            Validators.minLength(6)
        ]
        ],
        'date_start' : [null, [
            Validators.required
        ]
        ],
        'date_end' : [null, [
            Validators.required
        ]
        ]
    });

    this.eventForm.valueChanges
        .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.eventForm) { return; }
    const form = this.eventForm;

    for (const field in this.formErrors) {
        // clear previous error message (if any)
        this.formErrors[field] = [];
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
                this.formErrors[field].push(messages[key]);
            }
        }
    }
  }

  formErrors = {
    'title': [],
    'description': [],
    'date_start': [],
    'date_end': []
  };

  validationMessages = {
    'title': {
        'required': 'TEXTS.REQ_TITLE',
        'minlength': 'TEXTS.REQ_MINLENGTH_TITLE'
    },
    'description': {
        'required': 'TEXTS.REQ_DESCRIPTION',
        'minlength': 'TEXTS.REQ_MINLENGTH_DESCRIPTION'
    },
    'date_start': {
      'required': 'TEXTS.REQ_START_CAMPAIGN'
    },
    'date_end': {
      'required': 'TEXTS.REQ_END_CAMPAIGN'
    },
  };

  getEvents() {
    this.eventService.getEvents().subscribe(
        data => this.events = data,
        error => console.log(error),
        () => this.isLoading = false
    );
  }

  addEvent() {
    this.eventService.addEvent(this.eventForm.value).subscribe(
        res => {
          this.events.push(res);
          this.eventForm.reset();
          this.getEvents();
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
