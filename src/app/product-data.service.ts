import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { iproduct } from './Types/iproduct';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService {
  products: any[] = [];
  private cartItems = new BehaviorSubject<iproduct[]>([]);
  private counter =new BehaviorSubject<number>(0);
  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<any> {
    return this.http.get('https://dummyjson.com/products');
  }
  getCounter(): Observable<number> {
    return this.counter.asObservable();
  }
  setCounter(count: number): void {
    this.counter.next(count);
  }
  

  getproductbyid(id: string): Observable<iproduct> {
    return this.http.get<iproduct>('https://dummyjson.com/products/' + id);
  }
 
  getCartItems(): Observable<iproduct[]> {
    return this.cartItems.asObservable();
  }

  getcartitemsbyid(id: string): Observable<iproduct> {
    
    return this.http.get<iproduct>('https://dummyjson.com/products/' + id);
  }
  addToCart(product: iproduct) {
    const currentItems = this.cartItems.value;
    const itemExists = currentItems.find(item => item.id === product.id);
    if (!itemExists) {
      this.cartItems.next([...currentItems, { ...product, stock: 1 }]);
    } else {
      itemExists.stock += 1;
      this.cartItems.next([...currentItems]);
    }
  }

  removeFromCart(productId: string) {
    const currentItems = this.cartItems.value.filter(item => item.id !== +productId);
    this.cartItems.next(currentItems);
  }
  

getcatecory(): Observable<any> {
  return this.http.get('https://dummyjson.com/products/categories');
}
  

  
  
  fetchProduct(offset: number, limit: number): Observable<any> {
    return this.http.get('https://dummyjson.com/products', {
      params: {
        limit: limit.toString(),
        skip: offset.toString(),
      },
    });
  }

}
