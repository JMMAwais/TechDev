import { Routes , RouterModule} from '@angular/router';
import { PricingComponent } from './components/pricing/pricing.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component'
import { NgModule } from '@angular/core';

export const routes: Routes = [

  { path: 'pricing', component: PricingComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' } // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
