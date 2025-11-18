import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit, OnDestroy {

  isVerifying = true;
  paymentVerified = false;
  sub!: Subscription;

  sessionId!: string; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.sessionId = new URLSearchParams(window.location.search).get('session_id')!;

    this.sub = interval(2000).pipe(
      switchMap(() => this.http.get(`/api/payment/status/${this.sessionId}`))
    )
    .subscribe((res: any) => {
      if (res.status === 'Verified') {
        this.isVerifying = false;
        this.paymentVerified = true;
        this.sub.unsubscribe();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
