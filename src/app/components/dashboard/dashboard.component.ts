import { AfterViewInit, Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit { 
  ngAfterViewInit(): void {
    this.createStudentPerformanceChart();
  }
  createStudentPerformanceChart() {
    const ctx = document.getElementById('studentPerformanceChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Grade 7',
            data: [82, 74, 91, 86, 79, 88],
            backgroundColor: '#5de2dcd7', // blue
            borderRadius: 6,
            barThickness: 16
          },
          {
            label: 'Grade 8',
            data: [72, 85, 77, 83, 68, 80],
            backgroundColor: '#b979f5ff', // pink
            borderRadius: 6,
            barThickness: 16
          },
          {
            label: 'Grade 9',
            data: [90, 78, 88, 92, 84, 95],
            backgroundColor: '#0b365efb', // violet
            borderRadius: 6,
            barThickness: 16
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#6b7280'
            }
          },
          y: {
            grid: {
              color: '#f1f5f9'
            },
            ticks: {
              color: '#6b7280',
              callback: (val) => val + '%'
            },
            beginAtZero: true,
            max: 100
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#374151',
              usePointStyle: true,
              boxWidth: 8
            }
          },
          tooltip: {
            backgroundColor: '#111827',
            titleColor: '#fff',
            bodyColor: '#f9fafb'
          }
        }
      }
    });
  }
}