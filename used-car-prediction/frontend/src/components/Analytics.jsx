import React from 'react';
import Header from './Header';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
  // Price Distribution Chart Data
  const priceDistributionData = {
    labels: ['0-5L', '5-10L', '10-15L', '15-20L', '20L+'],
    datasets: [{
      label: 'Number of Cars',
      data: [120, 250, 180, 90, 40],
      backgroundColor: 'rgba(0, 102, 204, 0.8)',
      borderColor: 'rgba(0, 102, 204, 1)',
      borderWidth: 1,
    }],
  };

  // Model Accuracy Chart Data
  const modelAccuracyData = {
    labels: ['Linear Regression', 'Random Forest', 'XGBoost'],
    datasets: [{
      label: 'Accuracy (%)',
      data: [72, 85, 88],
      backgroundColor: [
        'rgba(255, 107, 53, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(0, 102, 204, 0.8)',
      ],
      borderColor: [
        'rgba(255, 107, 53, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(0, 102, 204, 1)',
      ],
      borderWidth: 1,
    }],
  };

  // Price Trends Chart Data
  const priceTrendsData = {
    labels: ['0-2Y', '2-4Y', '4-6Y', '6-8Y', '8-10Y', '10Y+'],
    datasets: [{
      label: 'Average Price (Lakhs)',
      data: [25, 22, 18, 15, 12, 8],
      borderColor: 'rgba(0, 102, 204, 1)',
      backgroundColor: 'rgba(0, 102, 204, 0.1)',
      tension: 0.4,
      fill: true,
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="page-container">
      <Header />

      <main className="analytics-main">
        <div className="container">
          <h1>Analytics Dashboard</h1>
          <p className="subtitle">Insights and trends from car price predictions</p>

          {/* Charts Section */}
          <section className="charts-grid">
            <div className="chart-card">
              <h3>Price Distribution</h3>
              <Bar data={priceDistributionData} options={chartOptions} />
            </div>

            <div className="chart-card">
              <h3>Model Accuracy Comparison</h3>
              <Bar data={modelAccuracyData} options={chartOptions} />
            </div>

            <div className="chart-card full-width">
              <h3>Price Trends by Age</h3>
              <Line data={priceTrendsData} options={chartOptions} />
            </div>
          </section>

          {/* Insights Cards */}
          <section className="insights-grid">
            <div className="insight-card">
              <div className="insight-icon">📉</div>
              <div className="insight-content">
                <h4>Price Depreciation</h4>
                <p>Cars depreciate 15-20% annually on average</p>
              </div>
            </div>

            <div className="insight-card">
              <div className="insight-icon">⚙️</div>
              <div className="insight-content">
                <h4>Engine Size Impact</h4>
                <p>Engine &gt;2000cc increases price by 30-40%</p>
              </div>
            </div>

            <div className="insight-card">
              <div className="insight-icon">⛽</div>
              <div className="insight-content">
                <h4>Fuel Type Premium</h4>
                <p>Diesel cars have 20% premium over petrol</p>
              </div>
            </div>

            <div className="insight-card">
              <div className="insight-icon">🏆</div>
              <div className="insight-content">
                <h4>Best Model</h4>
                <p>XGBoost achieves 88% prediction accuracy</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
