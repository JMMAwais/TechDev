import { Component } from '@angular/core';
import { TopbarComponent } from '../../topbar/topbar.component';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '../../../components/sidemenu/sidemenu.component';
import { DashboardComponent } from '../../../components/dashboard/dashboard.component';

@Component({
  selector: 'app-staff-layout',
  standalone: true,
  imports: [RouterOutlet,TopbarComponent,SideMenuComponent,DashboardComponent],
  templateUrl: './staff-layout.component.html',
  styleUrls: ['./staff-layout.component.css']
})
export class StaffLayoutComponent {}