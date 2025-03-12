import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  template: `
    <div class="chart-container">
      <canvas baseChart
        [data]="pieChartData"
        [options]="pieChartOptions"
        [type]="'pie'">
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
export class PieChartComponent implements OnInit, OnChanges {
  @Input() data!: any;
  @Input() title: string = '';

  public pieChartOptions: ChartConfiguration['options'] = {
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
    }
  };

  public pieChartData!: ChartData;

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
      if (this.pieChartOptions && this.pieChartOptions.plugins && this.pieChartOptions.plugins.title) {
        this.pieChartOptions.plugins.title.text = this.title;
        this.pieChartOptions.plugins.title.display = this.title !== '';
      }
    }
  }

  private updateChart(): void {
    this.pieChartData = {
      labels: this.data.labels,
      datasets: this.data.datasets
    };
  }
}
