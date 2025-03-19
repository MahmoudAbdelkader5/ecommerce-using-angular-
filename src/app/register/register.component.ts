import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import AuthService

@Component({
  selector: 'app-register',
  imports:[ReactiveFormsModule,NgClass,NgIf],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup|any;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.pattern(/^\S+$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^01[1025]\d{8}$/)])
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      
          this.router.navigate(['/login']);
        
    }
  }
}
