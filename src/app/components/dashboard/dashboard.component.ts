import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { config } from 'rxjs';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit { 
 @ViewChild('earningsChart') earningsChart!: ElementRef<HTMLCanvasElement>;
   chart!: Chart;

  ngAfterViewInit(): void {
    this.createStudentPerformanceChart();
     this.createChart();
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
            backgroundColor: '#f9a8d4', // blue
            borderRadius: 6,
            barThickness: 16
          },
          {
            label: 'Grade 8',
            data: [72, 85, 77, 83, 68, 80],
            backgroundColor: '#a78bfa', // pink
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


   createChart() {
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Earnings',
          data: [3500, 4200, 4000, 4600, 4800, 5200, 5785, 5100, 4700, 4900, 5300, 5500],
          borderColor: '#a78bfa',
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Expenses',
          data: [2800, 3000, 3200, 3400, 3700, 4000, 4020, 4100, 3900, 4100, 4200, 4400],
          borderColor: '#f9a8d4',
          backgroundColor: 'rgba(255, 64, 129, 0.2)',
          fill: true,
          tension: 0.4
        }
      ]
    };




   const config: ChartConfiguration = {
      type: 'line' as ChartType,
      data,
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: (items) => `July 2034`, // Example static tooltip title
              label: (context) => `${context.dataset.label}: $${context.formattedValue}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (val) => `$${val}`
            },
            grid: { color: 'rgba(200,200,200,0.2)' }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    };

    this.chart = new Chart(this.earningsChart.nativeElement, config);
  }
}
