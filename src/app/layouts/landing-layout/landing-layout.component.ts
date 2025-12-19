import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../Landing/header/header.component'; 
import { FooterComponent } from '../../Landing/footer/footer.component';


@Component({
  selector: 'app-landing-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,FooterComponent],
  templateUrl: './landing-layout.component.html',
  styleUrls: ['./landing-layout.component.css']
})
export class LandingLayoutComponent {}
