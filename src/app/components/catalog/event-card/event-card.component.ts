import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../../../models/event-info';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
})
export class EventCardComponent {
  @Input() event!: Event;

  constructor(private router: Router) {}

  goToSessionPage() {
    if (this.event.id) {
      console.log(`Navigating to session page with id: ${this.event.id}`);
      this.router.navigate(['/sessions', this.event.id]);
    } else {
      console.error('eventId is undefined or null');
    }
  }
}
