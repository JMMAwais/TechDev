import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-success',
  imports:[CommonModule, HttpClientModule],
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
    if (!this.sessionId) {
  // Do NOT redirect, just show normal success page without polling
  this.isVerifying = false;
  this.paymentVerified = true;
  return;
}
    this.sub = interval(15000).pipe(
      switchMap(() => this.http.get(`https://localhost:7190/api/payment/status/${this.sessionId}`))
    )
    .subscribe((res: any) => {
      if (res.status === 'Paid') {
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
