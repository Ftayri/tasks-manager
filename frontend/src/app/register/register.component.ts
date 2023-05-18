import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    if (this.registrationForm.valid) {
      const { email, username, password } = this.registrationForm.value;
      this.authService.register(email, username, password).then((result: any) => {
          // Registration successful, handle success
          console.log('Registration successful:', result);
          // Redirect to login page or perform any other actions
        })
        .catch((error: any) => {
          // Registration failed, handle error
          console.error('Registration error:', error);
          // Display error message or perform any other error handling
        });
    }
  }

}
