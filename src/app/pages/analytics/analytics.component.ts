import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule, CardComponent],
  template: `
    <div class="analytics">
      <div class="analytics-header">
        <h1>Analytics Dashboard</h1>
        <p class="subtitle">Deep dive into your portfolio performance</p>
      </div>

      <!-- Performance Comparison -->
      <app-card>
        <h2>Portfolio vs Benchmarks</h2>
        <div echarts [options]="performanceComparisonOptions" style="height: 350px;"></div>
      </app-card>

      <div class="analytics-grid">
        <!-- Allocation Analysis -->
        <app-card>
          <h2>Sector Allocation</h2>
          <div echarts [options]="allocationOptions" style="height: 300px;"></div>
        </app-card>

        <!-- Risk Metrics -->
        <app-card>
          <h2>Risk Metrics</h2>
          <div class="metrics-list">
            <div class="metric-row">
              <span class="metric-label">Volatility (Annualized)</span>
              <span class="metric-value">12.5%</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">Sharpe Ratio</span>
              <span class="metric-value">1.85</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">Max Drawdown</span>
              <span class="metric-value">-8.2%</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">Beta</span>
              <span class="metric-value">0.95</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">Alpha</span>
              <span class="metric-value">4.2%</span>
            </div>
          </div>
        </app-card>
      </div>

      <!-- Profit Sources -->
      <app-card>
        <h2>Profit Sources</h2>
        <div echarts [options]="profitSourcesOptions" style="height: 300px;"></div>
      </app-card>

      <!-- Monthly Returns Heatmap -->
      <app-card class="heatmap-card">
        <h2>Monthly Returns Heatmap</h2>
        <div class="heatmap-table">
          <div class="heatmap-row" *ngFor="let year of years">
            <div class="year-label">{{ year }}</div>
            <div class="month-cells">
              <div class="month-cell" 
                *ngFor="let value of monthlyReturns[year]; let i = index"
                [style.background-color]="getHeatmapColor(value)"
                [title]="getMonthName(i) + ': ' + value + '%'"
                class="cell">
                {{ value }}%
              </div>
            </div>
          </div>
        </div>
      </app-card>
    </div>
  `,
  styles: [`
    .analytics {
      padding: var(--spacing-xl);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl);
    }

    .analytics-header {
      padding-bottom: var(--spacing-lg);
      border-bottom: 1px solid var(--border-color);
    }

    .analytics-header h1 {
      font-size: var(--font-size-h2);
      color: var(--text-primary);
      margin-bottom: var(--spacing-md);
    }

    .subtitle {
      color: var(--text-secondary);
    }

    app-card h2 {
      font-size: var(--font-size-h3);
      color: var(--text-primary);
      margin-bottom: var(--spacing-lg);
    }

    .analytics-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-xl);
    }

    .metrics-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .metric-row {
      display: flex;
      justify-content: space-between;
      padding: var(--spacing-lg);
      background-color: var(--bg-primary);
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
    }

    .metric-label {
      color: var(--text-secondary);
      font-size: var(--font-size-body);
    }

    .metric-value {
      font-weight: var(--font-weight-bold);
      color: var(--text-primary);
      font-family: 'Courier New', monospace;
    }

    .heatmap-card {
      width: 100%;
    }

    .heatmap-table {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .heatmap-row {
      display: flex;
      gap: var(--spacing-lg);
      align-items: center;
    }

    .year-label {
      width: 60px;
      font-weight: var(--font-weight-semibold);
      color: var(--text-primary);
      text-align: right;
    }

    .month-cells {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: var(--spacing-sm);
      flex: 1;
    }

    .month-cell {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-size: var(--font-size-caption);
      font-weight: var(--font-weight-semibold);
      color: white;
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .month-cell:hover {
      transform: scale(1.1);
      box-shadow: var(--shadow-md);
    }

    @media (max-width: 1024px) {
      .analytics-grid {
        grid-template-columns: 1fr;
      }

      .month-cells {
        grid-template-columns: repeat(6, 1fr);
      }
    }

    @media (max-width: 768px) {
      .analytics {
        padding: var(--spacing-lg);
      }

      .month-cells {
        grid-template-columns: repeat(4, 1fr);
      }

      .heatmap-row {
        gap: var(--spacing-md);
      }

      .year-label {
        width: 40px;
        font-size: var(--font-size-caption);
      }

      .month-cell {
        font-size: 10px;
      }
    }
  `]
})
export class AnalyticsComponent implements OnInit {
  years = [2023, 2024, 2025];
  
  monthlyReturns: { [key: number]: number[] } = {
    2023: [2.5, 3.2, -1.5, 4.8, 2.1, 3.5, -0.8, 5.2, 3.1, 2.9, 4.1, 2.8],
    2024: [3.1, 2.4, 5.2, -2.1, 3.8, 4.2, 2.5, 3.6, -1.2, 4.5, 3.2, 5.1],
    2025: [2.2, 4.1, 3.5, 2.8, 1.9, -0.5, 3.4, 2.6, 4.3, -1.8, 3.7, 4.2]
  };

  performanceComparisonOptions: any;
  allocationOptions: any;
  profitSourcesOptions: any;

  constructor() {}

  ngOnInit(): void {
    this.initializeCharts();
  }

  private initializeCharts(): void {
    // Performance Comparison Chart
    this.performanceComparisonOptions = {
      backgroundColor: 'transparent',
      color: ['#22C55E', '#3B82F6', '#F59E0B'],
      legend: {
        data: ['Portfolio', 'VNINDEX', 'VN30'],
        textStyle: { color: '#D1D5DB' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.generateMonths(12),
        axisLabel: { color: '#9CA3AF', fontSize: 11 },
        axisLine: { lineStyle: { color: '#374151' } },
        splitLine: { lineStyle: { color: '#1F2937' } }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#9CA3AF', fontSize: 11 },
        axisLine: { lineStyle: { color: '#374151' } },
        splitLine: { lineStyle: { color: '#1F2937' } }
      },
      series: [
        {
          name: 'Portfolio',
          type: 'line',
          data: [100, 102.5, 105.7, 104.2, 109, 112.1, 111.3, 116.5, 119.6, 122.5, 126.6, 129.4],
          smooth: true,
          lineStyle: { color: '#22C55E', width: 2 },
          symbolSize: 0
        },
        {
          name: 'VNINDEX',
          type: 'line',
          data: [100, 101.8, 103.2, 102.1, 105.5, 108.2, 107.5, 111.2, 113.8, 115.2, 118.5, 120.1],
          smooth: true,
          lineStyle: { color: '#3B82F6', width: 2 },
          symbolSize: 0
        },
        {
          name: 'VN30',
          type: 'line',
          data: [100, 102.1, 104.5, 103.2, 107.1, 110.2, 109.1, 113.5, 116.2, 118.5, 122.1, 123.8],
          smooth: true,
          lineStyle: { color: '#F59E0B', width: 2 },
          symbolSize: 0
        }
      ]
    };

    // Allocation Chart
    this.allocationOptions = {
      backgroundColor: 'transparent',
      color: ['#3B82F6', '#F59E0B', '#8B5CF6', '#10B981', '#06B6D4', '#6B7280'],
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        borderColor: '#374151',
        textStyle: { color: '#F9FAFB' }
      },
      series: [
        {
          type: 'pie',
          radius: ['30%', '60%'],
          data: [
            { value: 35, name: 'Banking' },
            { value: 12, name: 'Technology' },
            { value: 18, name: 'Steel' },
            { value: 13, name: 'Agriculture' },
            { value: 15, name: 'Securities' },
            { value: 7, name: 'Cash' }
          ],
          label: { color: '#D1D5DB', fontSize: 11 },
          itemStyle: { borderColor: 'var(--bg-tertiary)', borderWidth: 2 }
        }
      ]
    };

    // Profit Sources Chart
    this.profitSourcesOptions = {
      backgroundColor: 'transparent',
      color: ['#22C55E', '#3B82F6', '#F59E0B'],
      legend: {
        data: ['Capital Gain', 'Dividend', 'Interest'],
        textStyle: { color: '#D1D5DB' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisLabel: { color: '#9CA3AF', fontSize: 11 },
        axisLine: { lineStyle: { color: '#374151' } },
        splitLine: { lineStyle: { color: '#1F2937' } }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#9CA3AF', fontSize: 11 },
        axisLine: { lineStyle: { color: '#374151' } },
        splitLine: { lineStyle: { color: '#1F2937' } }
      },
      series: [
        {
          name: 'Capital Gain',
          type: 'bar',
          data: [2500000, 3200000, 1500000, 4800000, 2100000, 3500000, 800000, 5200000, 3100000, 2900000, 4100000, 2800000],
          itemStyle: { color: '#22C55E' }
        },
        {
          name: 'Dividend',
          type: 'bar',
          data: [500000, 600000, 450000, 750000, 550000, 650000, 400000, 800000, 600000, 500000, 700000, 500000],
          itemStyle: { color: '#3B82F6' }
        },
        {
          name: 'Interest',
          type: 'bar',
          data: [100000, 120000, 80000, 150000, 110000, 130000, 60000, 160000, 120000, 100000, 140000, 100000],
          itemStyle: { color: '#F59E0B' }
        }
      ]
    };
  }

  private generateMonths(count: number): string[] {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.slice(0, count);
  }

  getMonthName(index: number): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[index];
  }

  getHeatmapColor(value: number): string {
    if (value > 3) return 'rgba(34, 197, 94, 0.8)';
    if (value > 1) return 'rgba(34, 197, 94, 0.5)';
    if (value > -1) return 'rgba(148, 163, 184, 0.3)';
    if (value > -3) return 'rgba(239, 68, 68, 0.5)';
    return 'rgba(239, 68, 68, 0.8)';
  }
}
