import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  planId: string | null = null;

  institutionTypes = [
    { value: 'school', label: 'School' },
    { value: 'college', label: 'College/University' },
    { value: 'coaching', label: 'Coaching Institute' },
    { value: 'other', label: 'Other' }
  ];

  features = [
    'Multi-tenant SaaS Architecture',
    'AI-Powered Learning & Analytics',
    'Comprehensive Student & Staff Management',
    'Smart Attendance & Exam Systems',
    'Integrated Fee & Finance Management',
    'Parent-Teacher Communication Hub'
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient // ✅ HttpClient injected
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      institutionName: ['', [Validators.required, Validators.minLength(3)]],
      institutionType: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      phone: [''],
      terms: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onGoogleSignup() {
    console.log('Google signup initiated');
  }

onSubmit() {
  if (this.signupForm.valid) {
    const formValue = this.signupForm.value;

    const payload = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      institutionName: formValue.institutionName,
      email: formValue.email,
      password: formValue.password,
      planId: this.planId,
      initiatedBy: "SelfUser"
    };

    this.http.post('https://localhost:7190/identity/Auth/signup', payload)
      .subscribe({
        next: (res: any) => {
          console.log('Signup successful!', res);

          // ✅ After signup, get plan details using planId
          console.log('test planId',this.planId)
          if (this.planId) {
            console.log('test planId-1',this.planId)
            this.http.get(`https://localhost:7190/api/plans/${this.planId}`)
              .subscribe({
                next: (plan: any) => {
                  console.log('Plan details:', plan);

                  if (plan.name.toLowerCase() === 'free' || plan.price === 0) {
                    alert('Free plan activated! Redirecting to dashboard...');
                    window.location.href = '/dashboard';
                  } else {
                   // this.redirectToStripe(plan);
                    this.http.post('https://localhost:7190/api/payment/create-checkout-session', {
                    planId: plan.id}).subscribe({
                       next: (session: any) => {
                        if (session?.sessionUrl) {
                          window.location.href = session.sessionUrl; 
                          } else {
                            alert('Unable to start payment process — no checkout URL returned.');
                          }
                        }
                    });

                  }
                },
                error: (err) => {
                  console.error('Failed to fetch plan details', err);
                  alert('Could not verify plan details.');
                }
              });
          }
        },
        error: (err) => {
          console.error('Signup failed!', err);
          alert('Signup failed! Please try again.');
        }
      });
  } else {
    this.markFormGroupTouched();
  }
}

  markFormGroupTouched() {
    Object.keys(this.signupForm.controls).forEach(key => {
      const control = this.signupForm.get(key);
      control?.markAsTouched();
    });
  }

  get firstName() { return this.signupForm.get('firstName'); }
  get lastName() { return this.signupForm.get('lastName'); }
  get institutionName() { return this.signupForm.get('institutionName'); }
  get institutionType() { return this.signupForm.get('institutionType'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }
  get terms() { return this.signupForm.get('terms'); }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.planId = params.get('planId');
    });
  }
}
