import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <div className="logo-icon">🚗</div>
          <div className="logo-text">
            <h1>CarPrice AI</h1>
            <p>Smart Used Car Valuation</p>
          </div>
        </div>

        <nav className="navbar">
          <Link href="/" className={`nav-link ${activeNav === 'dashboard' ? 'active' : ''}`}>
            Dashboard
          </Link>
          <Link href="/predict" className={`nav-link ${activeNav === 'predict' ? 'active' : ''}`}>
            Predict Price
          </Link>
          <Link href="/analytics" className={`nav-link ${activeNav === 'analytics' ? 'active' : ''}`}>
            Analytics
          </Link>
          <Link href="/history" className={`nav-link ${activeNav === 'history' ? 'active' : ''}`}>
            Prediction History
          </Link>
        </nav>

        <div className="header-actions">
          <button className="btn-icon">⚙️</button>
          <button className="btn-icon">👤</button>
        </div>
      </div>
    </header>
  );
}
