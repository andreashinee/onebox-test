import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event-info';
import { EventCardComponent } from '../../components/catalog/event-card/event-card.component';
import { EventService } from '../../services/event-service';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [EventCardComponent],
  templateUrl: './catalog-page.component.html',
  styleUrl: './catalog-page.component.scss',
})
export class CatalogPageComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: (data: Event[]) => {
        this.events = data.sort(
          (a: Event, b: Event) => a.endDate?.localeCompare(b.endDate || '') || 0
        );
      },
      error: (error: any) => console.error('Error loading events:', error),
    });
  }
}
