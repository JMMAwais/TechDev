import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PricingComponent } from './components/pricing/pricing.component';

@Component({
  selector: 'app-root',
   standalone: true,
  imports: [RouterOutlet],
  // templateUrl: './app.component.html',
  // styleUrl: './app.component.css'
  template:`
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'Techdev';
}
