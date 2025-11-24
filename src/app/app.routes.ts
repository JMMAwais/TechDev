import { Routes } from '@angular/router';

import { PricingComponent } from './components/pricing/pricing.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { StaffLayoutComponent } from './layouts/Staff/staff-layout/staff-layout.component';
import {  authGuard } from './guards/auth.guard';

export const routes: Routes = [

  // Public Routes
  { path: 'pricing', component: PricingComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },

  // Payment Webhook Page
  { path: 'payment/success', component: PaymentSuccessComponent },

  // Staff Layout
  {
    path: 'dashboard-staff',
    component: StaffLayoutComponent,
    canActivate:[authGuard]
  },

  // Admin Layout – Fully Protected
  {
    path: 'app',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
    ]
  },

  // Default redirect
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Wildcard fallback
  { path: '**', redirectTo: 'login' }
];
