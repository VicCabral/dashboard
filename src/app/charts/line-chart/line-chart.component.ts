import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  template: `
    <div class="chart-container">
      <canvas baseChart
        [data]="lineChartData"
        [options]="lineChartOptions"
        [type]="'line'">
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
export class LineChartComponent implements OnInit, OnChanges {
  @Input() data!: any;
  @Input() title: string = '';

  public lineChartOptions: ChartConfiguration['options'] = {
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
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  public lineChartData!: ChartData;

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
      if (this.lineChartOptions && this.lineChartOptions.plugins && this.lineChartOptions.plugins.title) {
        this.lineChartOptions.plugins.title.text = this.title;
        this.lineChartOptions.plugins.title.display = this.title !== '';
      }
    }
  }

  private updateChart(): void {
    this.lineChartData = {
      labels: this.data.labels,
      datasets: this.data.datasets
    };
  }
}
