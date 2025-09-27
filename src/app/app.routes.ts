import { Routes } from '@angular/router';
import { PricingComponent } from './components/pricing/pricing.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [

  { path: 'pricing', component: PricingComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '' } // Wildcard route
];