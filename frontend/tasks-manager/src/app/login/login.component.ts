import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  login() {
    console.log('Login form value:', this.loginForm.value);
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.doEmailPasswordLogin(email, password)
        .then((result: any) => {
          // Login successful, handle success
          console.log('Login successful:', result);
          // Redirect to dashboard, clear form, etc.
        })
        .catch((error: any) => {
          // Login failed, handle error
          console.error('Login error:', error);
          // Display error message, clear password, etc.
        });
    }
  }

}
