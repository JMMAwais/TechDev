import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PricingComponent } from '../pricing/pricing.component';
@Component({
  selector: 'app-features',
  imports:[RouterModule,CommonModule,PricingComponent],
  standalone: true,
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeaturesComponent {}

