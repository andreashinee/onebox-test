import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Session } from '../../../models/session';

@Component({
  selector: 'app-session-list',
  standalone: true,
  templateUrl: './session-list.component.html',
  styleUrl: './session-list.component.scss',
})
export class SessionListComponent {
  @Input() sessions: Session[] = [];
  @Output() sessionChange = new EventEmitter<Session>();

  increment(session: Session) {
    if (session.selected < session.availability) {
      session.selected += 1;
      this.sessionChange.emit(session);
    }
  }

  decrement(session: Session) {
    if (session.selected > 0) {
      session.selected -= 1;
      this.sessionChange.emit(session);
    }
  }
}
