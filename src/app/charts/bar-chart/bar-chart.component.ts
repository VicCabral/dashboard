import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  template: `
    <div class="chart-container">
      <canvas baseChart
        [data]="barChartData"
        [options]="barChartOptions"
        [type]="'bar'">
      </canvas>
    </div>
  `,
  styles: [`
    .chart-container {
      display: block;
      height: 300px;
      width: 100%;
    }
  `]
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input() data!: any;
  @Input() title: string = '';

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: {
            size: 12
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12
          }
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 12
          }
        }
      },
      title: {
        display: this.title !== '',
        text: this.title,
        font: {
          size: 16
        }
      }
    }
  };

  public barChartData!: ChartData;

  ngOnInit(): void {
    if (this.data) {
      this.updateChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.updateChart();
    }
    if (changes['title']) {
      if (this.barChartOptions && this.barChartOptions.plugins && this.barChartOptions.plugins.title) {
        this.barChartOptions.plugins.title.text = this.title;
        this.barChartOptions.plugins.title.display = this.title !== '';
      }
    }
  }

  private updateChart(): void {
    this.barChartData = {
      labels: this.data.labels,
      datasets: this.data.datasets
    };
  }
}
