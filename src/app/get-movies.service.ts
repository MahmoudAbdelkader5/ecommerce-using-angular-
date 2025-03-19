import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // Import Observable

@Injectable({
  providedIn: 'root', // Provided in the root injector
})
export class GetMoviesService {
  constructor(private http: HttpClient) {} // Use `private` to make `http` a class property

  getList(): Observable<any> {
    return this.http.get('https://dummyjson.com/products'); // Fetch data from the API
  }
}