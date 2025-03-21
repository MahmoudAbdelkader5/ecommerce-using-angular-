import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProductDataService } from '../product-data.service';
import { iproduct } from './../Types/iproduct';

@Component({
  selector: 'app-cart',
  imports: [NgFor, NgIf],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: iproduct[] = [];
  message: string = '';

  constructor(private productService: ProductDataService) {}

  ngOnInit() {
    this.loadCartItems();
  }

  private loadCartItems(): void {
    this.productService.getCartItems().subscribe((items: iproduct[]) => {
      this.cartItems = items.map(item => ({ ...item, count: 1 }));
    });
  }

  removeItem(product: iproduct): void {
    this.productService.removeFromCart(product.id.toString());
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
  }

  increaseItemCount(product: iproduct): void {
    const item = this.cartItems.find(item => item.id === product.id);
    if (item) {
      item.count = (item.count || 1) + 1;
      this.productService.setCounter(item.count);
    }
  }

  decreaseItemCount(product: iproduct): void {
    const item = this.cartItems.find(item => item.id === product.id);
    if (item) {
      if ((item.count || 1) > 1) {
        item.count = (item.count || 1) - 1;
        this.productService.setCounter(item.count);
      } else {
        this.removeItem(product);
      }
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price * (item.count || 1), 0);
  }
}
