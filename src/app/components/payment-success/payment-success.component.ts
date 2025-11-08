import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent implements OnInit{
  sessionId: string | null = null;
    message = 'Processing your payment confirmation...';

    constructor(private route: ActivatedRoute) {}
    
 ngOnInit(): void {
    // Stripe redirect karega: /payment/success?session_id=cs_test_123
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id');

    if (this.sessionId) {
      this.message = '✅ Payment Successful! Your transaction has been completed.';
    } else {
      this.message = '⚠️ No payment session found. Please contact support if this seems wrong.';
    }
  }
}
