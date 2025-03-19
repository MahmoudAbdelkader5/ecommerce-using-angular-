import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports:[FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formValues = {
    Email: '',
    Password: ''
  };

  constructor(private _Router:Router,private auth:AuthService) {}

 
onSubmit(form: any) {
    if (form.valid) {
      this._Router.navigate(['/products']);
    }

  }
}
