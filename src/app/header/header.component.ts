import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';  
import { ProductDataService } from '../product-data.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor, NgIf, FormsModule], // Use FormsModule instead of NgModel
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>(); // Emit search query
  category: any[] = [];
  countval = 0;
  searchQuery = '';
  searchTerm: string = ''; // Declare searchTerm property

  constructor(private readonly productService: ProductDataService) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.loadCategories();
  }

  searchProducts() {
    this.searchEvent.emit(this.searchQuery.trim()); // Emit trimmed search query
  }

  onSearch() {
    this.searchEvent.emit(this.searchTerm); // Emit the search term
  }

  private loadCartItems(): void {
    this.productService.getCartItems().subscribe({
      next: (items: any[]) => {
        this.countval = items.length;
      },
      error: (err) => {
        console.error('Failed to load cart items:', err);
      }
    });
  }

  private loadCategories(): void {
    this.productService.getcatecory().subscribe({
      next: (response: any[]) => {
        this.category = response.map((item: any) => ({
          slug: item.slug,
          name: item.name,
          limit: 5
        }));
        this.logCategories();
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
      }
    });
  }

  private logCategories(): void {
    console.log('Categories:', this.category);
  }
}