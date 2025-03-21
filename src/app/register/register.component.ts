import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidationErrors, 
  AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service'; // Ensure correct path

@Component({
  selector: 'app-register',
  imports:[ReactiveFormsModule,NgClass,NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup|any;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
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
      repassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^01[1025]\d{8}$/)])
    }, { validators: this.passwordMismatch });
  }

  passwordMismatch = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const repassword = control.get('repassword')?.value;
    return password !== repassword ? { passwordMismatch: true } : null; // Ensure correct return type
  };

  onSubmit() {
    if (this.registerForm.valid) {
      this.router.navigate(['/login']);
    }
  }
}
