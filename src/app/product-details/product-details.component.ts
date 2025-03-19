import { iproduct } from './../Types/iproduct';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe, NgIf } from '@angular/common'; // Import CurrencyPipe
import { ProductDataService } from '../product-data.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  providers: [CurrencyPipe] // Add CurrencyPipe to providers
})
export class ProductDetailsComponent implements OnInit {
  product: iproduct|any;
  @Input() id:string='';
  message: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private productid: ProductDataService) {}

  ngOnInit() {
    this.productid.getproductbyid(this.id).subscribe((data: any) => {
      this.product = data;
      this.productid.getCounter().subscribe((items: any) => {
        if(this.product.id === items.id)
        this.product.count = items.length;
      });
    });
    
  }

  addToCart(productId: number) {
    if (this.product && this.product.id === productId) {
      this.productid.addToCart(this.product);
      this.message = 'Product added to cart!';
      setTimeout(() => this.message = '', 3000);
    } 
  }

  removeFromCart() {
    this.productid.removeFromCart(this.product.id);
  }
}
