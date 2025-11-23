import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from './auth-response.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onGoogleSignup() {  }
  onSubmit() {
    if (!this.loginForm.valid) {
      this.markFormGroupTouched();
      return;
    }

    const payload = this.loginForm.value;

    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('client_secret', 'tenant-osama-publis-schol')
      .set('username', payload.email)
      .set('password', payload.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    this.http.post<AuthResponse>(
      'https://localhost:7190/identity/Auth/token',
      body.toString(),
      { headers, withCredentials: true } // IMPORTANT for refresh token cookie
    ).subscribe({
      next: (res) => {
        console.log('Login successful!', res);


        // ✅ Only access token stored
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("expires_at", (Date.now() + res.expires_in * 1000).toString());

        alert('Login successful! Redirecting...');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed!', err);
        alert('Invalid credentials!');
      }
    });
  }

  markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
