import { Routes } from '@angular/router';
import { PricingComponent } from './components/pricing/pricing.component';

export const routes: Routes = [

  { path: 'pricing', component: PricingComponent },
  { path: '**', redirectTo: '' } // Wildcard route
];