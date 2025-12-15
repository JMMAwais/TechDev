import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent {
    selectedPlan: 'starter' | 'professional' | 'enterprise' = 'professional';
    
      selectPlan(plan: 'starter' | 'professional' | 'enterprise') {
    this.selectedPlan = plan;
  }
}

