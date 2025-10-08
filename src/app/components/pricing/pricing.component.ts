import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterLink } from '@angular/router'; 


@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule,FooterComponent,RouterLink],
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
