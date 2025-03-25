import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../models/cart-item';
import { CartService } from '../../../services/cart-service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent {
  @Input() cart: Record<string, CartItem[]> = {};
  @Output() removeFromCart = new EventEmitter<{ eventId: string; date: string }>();

  constructor(private cartService: CartService) {}

  get eventIds(): string[] {
    return Object.keys(this.cart);
  }

  remove(eventId: string, date: string) {
    if (!this.cart[eventId]) return;

    this.cartService.removeFromCart(eventId, date);

    this.removeFromCart.emit({ eventId, date });
  }
}
