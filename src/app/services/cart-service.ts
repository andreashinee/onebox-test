import { Injectable } from '@angular/core';
import { Session } from '../models/event-info';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: {
    [eventId: string]: { date: string; quantity: number; title: string }[];
  } = {};

  getCart() {
    return this.cart;
  }

  addToCart(eventId: string, session: Session, title: string) {
    if (!this.cart[eventId]) {
      this.cart[eventId] = [];
    }

    const index = this.cart[eventId].findIndex(
      (item) => item.date === session.date
    );

    if (session.selected > 0) {
      if (index === -1) {
        this.cart[eventId].push({
          date: session.date,
          quantity: session.selected,
          title,
        });
      } else {
        this.cart[eventId][index].quantity = session.selected;
      }
    } else if (index !== -1) {
      this.cart[eventId].splice(index, 1);
      if (this.cart[eventId].length === 0) {
        delete this.cart[eventId];
      }
    }
  }

  removeFromCart(eventId: string, date: string) {
    if (!this.cart[eventId]) return;
  
    const index = this.cart[eventId].findIndex((item) => item.date === date);
    if (index !== -1) {
      this.cart[eventId].splice(index, 1);
      if (this.cart[eventId].length === 0) {
        delete this.cart[eventId];
      }
    }
  }
  
  
}
