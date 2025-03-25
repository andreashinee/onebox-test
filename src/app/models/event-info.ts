import { type Session } from './session';

export interface Event {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    place?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
}

export interface EventInfo {
  event: Event;
  sessions: Session[];
}

export type { Session };