import { ProductDataService } from './../product-data.service';  
import { Component, OnInit, Input } from '@angular/core';  
import { CommonModule } from '@angular/common';  
import { iproduct } from '../Types/iproduct';  
import { Router } from '@angular/router';  
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({  
  selector: 'app-product',  
  standalone: true,   
  imports: [CommonModule, FormsModule], // Remove FilterPipe
  templateUrl: './product.component.html',  
  styleUrls: ['./product.component.css'],  
})  
export class ProductComponent implements OnInit {  
  product: Array<iproduct> = [];  
  filteredProducts: Array<iproduct> = []; 
  @Input() id: string = '';
  message: string = '';
  category: string = '';
  currentPage: number = 1; 
  itemsPerPage: number = 6; 
  totalProducts: number = 0; 
  searchTerm: string = ''; // Declare searchTerm property

  constructor(private productDataService: ProductDataService, private router: Router) { }

  ngOnInit() {
    this.loadProducts();
    this.productDataService.getcatecory().subscribe((response: any) => {
      this.category = response.categories;
    });
  }

  private loadProducts() {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    this.productDataService.fetchProduct(offset, this.itemsPerPage).subscribe((response: any) => {
      this.product = response.products;
      this.filteredProducts = [...this.product]; 
      this.totalProducts = response.total || 0;
    });
  }

  // Method to handle search term from header
  onSearchTermChange(term: string) {
    this.searchTerm = term;
    this.filterProducts(term);
  }

  filterProducts(query: string) {
    this.filteredProducts = this.product.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase()) // Filter by product title
    );
  }

  get totalPages(): number {
    return Math.ceil(this.totalProducts / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  getPaginationRange(totalProducts: number, itemsPerPage: number): number[] {
    return Array.from({ length: Math.ceil(totalProducts / itemsPerPage) }, (_, i) => i + 1);
  }

  navigateToDetails(productId: number) {  
    this.router.navigateByUrl('/product-details/' + productId);  
  }  

  addToCart(productId: number) {
    const product = this.product.find(p => p.id === productId);
    if (product) {
      this.productDataService.addToCart(product);
      this.message = `${product.title} has been added to the cart.`;
      setTimeout(() => this.message = '', 3000);
    }
  }
}