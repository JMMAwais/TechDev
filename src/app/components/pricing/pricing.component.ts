import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent {
  selectedCard: string = 'standard'; // Default selected card
  isAnnual: boolean = false;

 backgroundImage: string = 'assets/images/pricingBackgroundimage.png';

  selectCard(cardType: string): void {
    this.selectedCard = cardType;
  }

  toggleBilling(): void {
    this.isAnnual = !this.isAnnual;
  }
}
