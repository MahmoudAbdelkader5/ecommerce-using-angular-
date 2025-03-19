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
  coutval: number = 1;
  message: string = '';

  constructor(private productService: ProductDataService) {}

  ngOnInit() {
    this.loadCartItems();
  }

  private loadCartItems(): void {
    this.productService.getCartItems().subscribe((items: iproduct[]) => {
      this.cartItems = items;
    });
  }

  removeItem(product: iproduct): void {
    this.productService.removeFromCart(product.id.toString());
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    this.showTemporaryMessage('Item removed from cart');
  }

  increaseItemCount(product: iproduct): void {
    const item = this.cartItems.find(item => item.id === product.id);
    if (item) {
      this.coutval += 1;
      this.productService.setCounter(this.coutval);
      this.showTemporaryMessage('Item count increased');
    }
  }

  decreaseItemCount(product: iproduct): void {
    const item = this.cartItems.find(item => item.id === product.id);
    if (item) {
      if (this.coutval > 1) {
        this.coutval -= 1;
        this.productService.setCounter(this.coutval);
        this.showTemporaryMessage('Item count decreased');
      } else {
        this.removeItem(product);
      }
    }
  }

  private showTemporaryMessage(msg: string): void {
    this.message = msg;
    setTimeout(() => (this.message = ''), 3000);
  }
}
