import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { PricingComponent } from './components/pricing/pricing.component';
import { filter } from 'rxjs';

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
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
  }
}
