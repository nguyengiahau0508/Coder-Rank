import { Component, signal } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { LeaderboardService } from '../../../core/services/leaderboard.service';
import { Leaderboard } from '../../../core/models/leader-board.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ranking-table',
  imports: [
    BaseChartDirective,
  ],
  providers: [DatePipe],
  templateUrl: './ranking-table.component.html',
  styleUrl: './ranking-table.component.css'
})
export class RankingTableComponent {

  leaderboards = signal<Leaderboard[]>([]);

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],

    datasets: [
      {
        data: [],
        label: 'Điểm số',
        fill: true,
        tension: 0,
        borderColor: '#19223C', // xanh đậm
        backgroundColor: 'rgba(103, 164, 172, 0.3)', // xanh nhạt mờ
        pointBackgroundColor: '#19223C', // điểm tròn
        pointBorderColor: '#FFFFFF', // viền điểm
        pointHoverBackgroundColor: '#FFFFFF',
        pointHoverBorderColor: '#19223C',
      }
    ]

  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
    plugins: {
      legend: {
        labels: {
          color: '#19223C', // chữ legend
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        backgroundColor: '#67A4AC',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#19223C',
        },
        grid: {
          color: '#E5E7EB' // màu lưới nhạt
        }
      },
      y: {
        ticks: {
          color: '#19223C'
        },
        grid: {
          color: '#E5E7EB'
        },
        min: 0,
        max: 2000
      }
    }
  };

  public lineChartLegend = true;

  constructor(
    private readonly leaderboardService: LeaderboardService,
    private readonly datePipe: DatePipe
  ) {
    this.loadLeaderboard();
  }

  ngOnInit() {
  }

  loadLeaderboard() {
    this.leaderboardService.getTableRanking().subscribe({
      next: (res) => {
        console.log(res);
        this.leaderboards.set(res.data);
        if (this.leaderboards().length > 0) {
          // setup max, min
          if (this.lineChartOptions.scales?.['y']) {
            const max = Math.max(...this.leaderboards().map((item) => item.newRating ?? 0));
            const min = Math.min(...this.leaderboards().map((item) => item.newRating ?? 0));
            this.lineChartOptions.scales['y'].min = min - 1000 < 0 ? 0 : min - 1000;
            this.lineChartOptions.scales['y'].max = max + 1000;
          }

          // setup data

          this.lineChartData.labels = this.leaderboards().map((item) =>
            this.datePipe.transform(item.updatedAt, 'dd/MM/yyyy') ?? ''
          );
          this.lineChartData.datasets[0].data = this.leaderboards().map((item) => item.newRating ?? null);
          this.lineChartData.labels.push(''); // thêm một nhãn trống vào cuối
          this.lineChartData.datasets[0].data.push(
            this.leaderboards().length > 0
              ? this.leaderboards()[this.leaderboards().length - 1].newRating ?? null
              : null
          );
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
