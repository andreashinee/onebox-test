import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventInfo, Session } from '../../models/event-info';
import { SessionListComponent } from '../../components/sessions/session-list/session-list.component';
import { ShoppingCartComponent } from '../../components/sessions/shopping-cart/shopping-cart.component';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../../services/event-service';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-sessions-page',
  standalone: true,
  imports: [SessionListComponent, ShoppingCartComponent, RouterModule],
  templateUrl: './sessions-page.component.html',
  styleUrl: './sessions-page.component.scss',
  providers: [DatePipe],
})
export class SessionsPageComponent implements OnInit {
  eventData?: EventInfo;
  sessions: Session[] = [];
  eventId?: string;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private cartService: CartService,
    private datePipe: DatePipe
  ) {}

  get cart() {
    return this.cartService.getCart();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.eventId = params.get('eventId') || undefined;
      if (this.eventId) {
        this.loadEventData(this.eventId);
      }
    });
  }

  loadEventData(eventId: string) {
    this.eventService.getEventData(eventId).subscribe({
      next: (data) => {
        this.eventData = data;
        this.sessions = data.sessions.map((s) => ({
          eventId: data.event.id,
          date: this.datePipe.transform(Number(s.date), 'dd/MM/yyyy') || '',
          availability: Number(s.availability),
          selected: 0,
        }));

        this.sessions.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      },
      error: (error) => {
        console.error('Error loading event data:', error);
        this.eventData = undefined;
      },
      complete: () => {
        console.log('Event data loaded successfully');
      },
    });
  }

  onSessionChange(session: Session) {
    if (this.eventData) {
      this.cartService.addToCart(
        session.eventId,
        session,
        this.eventData.event.title
      );
    }
  }

  onRemoveFromCart(event: { eventId: string; date: string }) {
    const { eventId, date } = event;
    this.cartService.removeFromCart(eventId, date);

    const session = this.sessions.find(
      (s) => s.eventId === eventId && s.date === date
    );

    if (session) {
      session.selected = 0;
    }
  }
}
