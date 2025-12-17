


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [RouterModule,CommonModule,ContactComponent],
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialsComponent {
  testimonials = [
    {
      name: 'Dr. Sarah Ahmed',
      role: 'Principal, Elite Academy',
      initials: 'SA',
      text: 'EduTechDev has revolutionized how we manage our institution. The automation has saved us countless hours.'
    },
    {
      name: 'Prof. Michael Chen',
      role: 'Director, Tech University',
      initials: 'MC',
      text: 'The analytics dashboard gives us insights we never had before. Decision making is now data-driven.'
    },
    {
      name: 'Mrs. Fatima Hassan',
      role: 'Administrator, City College',
      initials: 'FH',
      text: 'Best investment we\'ve made. The support team is incredibly responsive and helpful.'
    }
  ];
}



