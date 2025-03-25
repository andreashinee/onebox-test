import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventInfo, Event } from '../models/event-info';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  getEventData(eventId: string): Observable<EventInfo> {
    return this.http.get<EventInfo>(`/assets/data/event-info-${eventId}.json`);
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>('/assets/data/events.json');
  }
}
