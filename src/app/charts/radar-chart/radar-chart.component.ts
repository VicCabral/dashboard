import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-radar-chart',
  template: `
    <div class="chart-container">
      <canvas baseChart
        [data]="radarChartData"
        [options]="radarChartOptions"
        [type]="'radar'">
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
export class RadarChartComponent implements OnInit, OnChanges {
  @Input() data!: any;
  @Input() title: string = '';

  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          backdropColor: 'transparent',
          font: {
            size: 10
          }
        },
        pointLabels: {
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

  public radarChartData!: ChartData;

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
      if (this.radarChartOptions && this.radarChartOptions.plugins && this.radarChartOptions.plugins.title) {
        this.radarChartOptions.plugins.title.text = this.title;
        this.radarChartOptions.plugins.title.display = this.title !== '';
      }
    }
  }

  private updateChart(): void {
    this.radarChartData = {
      labels: this.data.labels,
      datasets: this.data.datasets
    };
  }
}
