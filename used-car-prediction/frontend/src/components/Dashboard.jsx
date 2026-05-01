import React, { useEffect, useState } from 'react';
import Header from './Header';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPredictions: 1234,
    avgAccuracy: 87.5,
    activeModels: 3,
    uptime: 99.9
  });

  const [recentPredictions, setRecentPredictions] = useState([
    {
      id: 1,
      carModel: 'Toyota Fortuner',
      year: 2020,
      predictedPrice: 850000,
      actualPrice: 875000,
      accuracy: 97,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      carModel: 'Maruti Swift',
      year: 2018,
      predictedPrice: 350000,
      actualPrice: 365000,
      accuracy: 95,
      timestamp: '5 hours ago'
    }
  ]);

  return (
    <div className="page-container">
      <Header />

      <main className="dashboard-main">
        <div className="container">
          {/* Welcome Section */}
          <section className="welcome-section">
            <h1>Welcome to CarPrice AI</h1>
            <p>Get accurate price predictions for used cars instantly</p>
          </section>

          {/* KPI Cards */}
          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-value">{stats.totalPredictions}</div>
                <div className="stat-label">Total Predictions</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <div className="stat-value">{stats.avgAccuracy}%</div>
                <div className="stat-label">Average Accuracy</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⚙️</div>
              <div className="stat-content">
                <div className="stat-value">{stats.activeModels}</div>
                <div className="stat-label">Active Models</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <div className="stat-value">{stats.uptime}%</div>
                <div className="stat-label">System Uptime</div>
              </div>
            </div>
          </section>

          {/* Quick Start Section */}
          <section className="quick-start">
            <h2>Quick Start</h2>
            <div className="quick-action-buttons">
              <a href="/predict" className="action-btn">
                <span className="btn-icon">🚗</span>
                <span>Predict Car Price</span>
              </a>
              <a href="/analytics" className="action-btn">
                <span className="btn-icon">📈</span>
                <span>View Analytics</span>
              </a>
              <a href="/history" className="action-btn">
                <span className="btn-icon">📜</span>
                <span>Prediction History</span>
              </a>
            </div>
          </section>

          {/* Recent Predictions */}
          <section className="recent-predictions">
            <h2>Recent Predictions</h2>
            <div className="table-container">
              <table className="predictions-table">
                <thead>
                  <tr>
                    <th>Car Model</th>
                    <th>Year</th>
                    <th>Pred Price</th>
                    <th>Actual Price</th>
                    <th>Accuracy</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPredictions.map(pred => (
                    <tr key={pred.id}>
                      <td>{pred.carModel}</td>
                      <td>{pred.year}</td>
                      <td>₹{pred.predictedPrice.toLocaleString()}</td>
                      <td>₹{pred.actualPrice.toLocaleString()}</td>
                      <td>
                        <span className="accuracy-badge">{pred.accuracy}%</span>
                      </td>
                      <td>{pred.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
