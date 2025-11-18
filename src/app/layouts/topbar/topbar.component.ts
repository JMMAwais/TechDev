import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit {
dropdownOpen = false;

toggleDropdown(event: Event) {
  this.dropdownOpen = !this.dropdownOpen;
  event.stopPropagation();
}

ngOnInit() {
  document.addEventListener('click', () => {
    this.dropdownOpen = false;
  });


}
}
