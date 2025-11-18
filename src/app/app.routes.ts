import { Routes , RouterModule} from '@angular/router';
import { PricingComponent } from './components/pricing/pricing.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component'
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { StaffLayoutComponent } from './layouts/Staff/staff-layout/staff-layout.component';
import { TopbarComponent } from './layouts/topbar/topbar.component';

export const routes: Routes = [

  { path: 'payment/success', component: PaymentSuccessComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'dashboard', component: DashboardComponent },
  {
          path: 'dashboard-staff',
          component: StaffLayoutComponent,
          // children: [
          //   { path: 'dashboard-staff',component: TopbarComponent  }
          // ]
        },
  // Wildcard route
  { path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      // { path: 'students', component: StudentsComponent },
      // { path: 'employees', component: EmployeesComponent },
     
    ],
  },
   
        { path: '**', redirectTo: '' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: false, 
  onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
