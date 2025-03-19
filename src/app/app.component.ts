import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { Router, NavigationEnd } from '@angular/router';
import { NgIf } from '@angular/common';
import { ProductComponent } from './product/product.component'; // Import ProductComponent

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [
    RouterOutlet, 
    FooterComponent, 
    HeaderComponent, 
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ecommerceApp';
  @ViewChild('productComponent') productComponent?: ProductComponent; // Type the reference variable

  constructor(private router: Router) {}

  isLoginOrRegisterPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }
}