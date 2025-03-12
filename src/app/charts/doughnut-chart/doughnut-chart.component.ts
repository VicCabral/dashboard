import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  template: `
    <div class="chart-container">
      <canvas baseChart
        [data]="doughnutChartData"
        [options]="doughnutChartOptions"
        [type]="'doughnut'">
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
export class DoughnutChartComponent implements OnInit, OnChanges {
  @Input() data!: any;
  @Input() title: string = '';

  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
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
  };

  public doughnutChartData!: ChartData;

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
      if (this.doughnutChartOptions && this.doughnutChartOptions.plugins && this.doughnutChartOptions.plugins.title) {
        this.doughnutChartOptions.plugins.title.text = this.title;
        this.doughnutChartOptions.plugins.title.display = this.title !== '';
      }
    }
  }

  private updateChart(): void {
    this.doughnutChartData = {
      labels: this.data.labels,
      datasets: this.data.datasets
    };
  }
}
