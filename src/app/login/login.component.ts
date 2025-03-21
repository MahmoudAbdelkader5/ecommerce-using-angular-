import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router'; // Ensure correct import

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf, RouterLink], // Ensure RouterLink is correctly imported
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formValues = {
    Email: '',
    Password: ''
  };

  constructor(private _Router: Router, private auth: AuthService) {}

 
onSubmit(form: any) {
    if (form.valid) {
      this._Router.navigate(['/products']);
    }

  }
}
