import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Example method
  login(username: string, password: string): boolean {
    // Implement authentication logic here
    return true;
  }
}
