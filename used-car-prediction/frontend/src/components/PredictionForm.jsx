import React, { useState } from 'react';
import Header from './Header';

export default function PredictPage() {
  const [formData, setFormData] = useState({
    carName: '',
    year: 2020,
    mileage: 15,
    engine: 1200,
    power: 80,
    fuelType: 'Petrol',
    transmission: 'Manual',
    kilometers: 50000,
    city: 'Mumbai',
    owners: 1
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: isNaN(value) ? value : parseFloat(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // API call will be added in Phase 4
      const response = await fetch('http://localhost:8000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Prediction failed');

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Header />

      <main className="predict-main">
        <div className="container">
          <h1>Predict Car Price</h1>
          <p className="subtitle">Enter your car details to get an instant price prediction</p>

          <div className="predict-grid">
            {/* Form Section */}
            <section className="form-section">
              <div className="card">
                <h2>Car Details</h2>
                <form onSubmit={handleSubmit} className="prediction-form">

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Car Model</label>
                      <input
                        type="text"
                        name="carName"
                        className="form-input"
                        placeholder="e.g., Toyota Fortuner"
                        value={formData.carName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Manufacturing Year</label>
                      <input
                        type="number"
                        name="year"
                        className="form-input"
                        min="2000"
                        max="2024"
                        value={formData.year}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Mileage (km/l)</label>
                      <input
                        type="number"
                        name="mileage"
                        className="form-input"
                        min="5"
                        max="30"
                        value={formData.mileage}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Engine (cc)</label>
                      <input
                        type="number"
                        name="engine"
                        className="form-input"
                        min="500"
                        max="5000"
                        value={formData.engine}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Power (BHP)</label>
                      <input
                        type="number"
                        name="power"
                        className="form-input"
                        min="50"
                        max="500"
                        value={formData.power}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Fuel Type</label>
                      <select
                        name="fuelType"
                        className="form-input"
                        value={formData.fuelType}
                        onChange={handleInputChange}
                      >
                        <option>Petrol</option>
                        <option>Diesel</option>
                        <option>CNG</option>
                        <option>Electric</option>
                        <option>Hybrid</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Transmission</label>
                      <select
                        name="transmission"
                        className="form-input"
                        value={formData.transmission}
                        onChange={handleInputChange}
                      >
                        <option>Manual</option>
                        <option>Automatic</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Kilometers Driven</label>
                      <input
                        type="number"
                        name="kilometers"
                        className="form-input"
                        min="0"
                        max="500000"
                        value={formData.kilometers}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">City</label>
                      <select
                        name="city"
                        className="form-input"
                        value={formData.city}
                        onChange={handleInputChange}
                      >
                        <option>Mumbai</option>
                        <option>Delhi</option>
                        <option>Bangalore</option>
                        <option>Pune</option>
                        <option>Hyderabad</option>
                        <option>Chennai</option>
                        <option>Kolkata</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Number of Owners</label>
                      <input
                        type="number"
                        name="owners"
                        className="form-input"
                        min="1"
                        max="5"
                        value={formData.owners}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {error && <div className="alert alert-danger">{error}</div>}

                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Predicting...' : 'Get Price Prediction'}
                  </button>
                </form>
              </div>
            </section>

            {/* Results Section */}
            {prediction && (
              <section className="results-section">
                <div className="card results-card">
                  <h2>Prediction Results</h2>

                  <div className="result-item">
                    <label>Predicted Price</label>
                    <div className="price-display">
                      ₹{prediction.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="result-item">
                    <label>Price Range</label>
                    <div className="price-range">
                      <span>₹{prediction.minPrice.toLocaleString('en-IN')}</span>
                      <span> - </span>
                      <span>₹{prediction.maxPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="result-item">
                    <label>Risk Assessment</label>
                    <div className={`risk-badge risk-${prediction.risk.toLowerCase()}`}>
                      {prediction.risk}
                    </div>
                  </div>

                  <div className="result-item">
                    <label>Annual Maintenance</label>
                    <div className="maintenance-cost">
                      ₹{prediction.maintenance.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="recommendations">
                    <h3>Recommendations</h3>
                    <ul>
                      {prediction.recommendations && prediction.recommendations.map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>

                  <button className="btn btn-secondary">Save to History</button>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
