import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  message = 'Payment Successful 🎉';
  transactionRef?: string;
  amount?: number;
  date?: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');

   if (sessionId) {
      // Backend API ko call karke payment details confirm karo
      this.http.get<any>(`https://localhost:7190/api/payments/verify?sessionId=${sessionId}`)
        .subscribe({
          next: (res) => {
            this.transactionRef = res.transactionRef;
            this.amount = res.amount;
            this.date = res.date;
          },
          error: (err) => console.error('Payment verification failed:', err)
        });
    }
  }
}
