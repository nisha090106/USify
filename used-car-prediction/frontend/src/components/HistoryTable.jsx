import React, { useState } from 'react';
import Header from './Header';

export default function HistoryPage() {
  const [sortBy, setSortBy] = useState('latest');
  const [filterCity, setFilterCity] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Sample data - in real app this would come from API
  const [predictions] = useState([
    {
      id: 1,
      carModel: 'Toyota Fortuner',
      year: 2020,
      predictedPrice: 850000,
      actualPrice: 875000,
      accuracy: 97,
      city: 'Mumbai',
      timestamp: '2024-01-15 14:30:00'
    },
    {
      id: 2,
      carModel: 'Maruti Swift',
      year: 2018,
      predictedPrice: 350000,
      actualPrice: 365000,
      accuracy: 95,
      city: 'Delhi',
      timestamp: '2024-01-15 11:15:00'
    },
    {
      id: 3,
      carModel: 'Honda City',
      year: 2019,
      predictedPrice: 650000,
      actualPrice: 620000,
      accuracy: 92,
      city: 'Bangalore',
      timestamp: '2024-01-14 16:45:00'
    },
    {
      id: 4,
      carModel: 'Hyundai Creta',
      year: 2021,
      predictedPrice: 950000,
      actualPrice: 980000,
      accuracy: 96,
      city: 'Pune',
      timestamp: '2024-01-14 09:20:00'
    },
    {
      id: 5,
      carModel: 'Mahindra Scorpio',
      year: 2017,
      predictedPrice: 450000,
      actualPrice: 420000,
      accuracy: 91,
      city: 'Mumbai',
      timestamp: '2024-01-13 13:10:00'
    }
  ]);

  const handleSort = (criteria) => {
    setSortBy(criteria);
    // In real app, this would trigger API call with sort parameter
  };

  const handleFilter = (city) => {
    setFilterCity(city);
    setCurrentPage(1);
    // In real app, this would trigger API call with filter parameter
  };

  const handleDelete = (id) => {
    // In real app, this would call delete API
    console.log('Delete prediction:', id);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <div className="page-container">
      <Header />

      <main className="history-main">
        <div className="container">
          <h1>Prediction History</h1>
          <p className="subtitle">View and manage your car price predictions</p>

          {/* Filters and Sort */}
          <section className="filters-section">
            <div className="filter-group">
              <label>Sort By:</label>
              <select value={sortBy} onChange={(e) => handleSort(e.target.value)}>
                <option value="latest">Latest First</option>
                <option value="accuracy">Highest Accuracy</option>
                <option value="price-high">Price High to Low</option>
                <option value="price-low">Price Low to High</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Filter City:</label>
              <select value={filterCity} onChange={(e) => handleFilter(e.target.value)}>
                <option value="all">All Cities</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
                <option value="bangalore">Bangalore</option>
                <option value="pune">Pune</option>
              </select>
            </div>
          </section>

          {/* History Table */}
          <section className="history-table-section">
            <div className="table-container">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Car Model</th>
                    <th>Year</th>
                    <th>Pred Price</th>
                    <th>Actual Price</th>
                    <th>Accuracy</th>
                    <th>City</th>
                    <th>Date & Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {predictions.map(pred => (
                    <tr key={pred.id}>
                      <td>{pred.carModel}</td>
                      <td>{pred.year}</td>
                      <td>₹{pred.predictedPrice.toLocaleString()}</td>
                      <td>₹{pred.actualPrice.toLocaleString()}</td>
                      <td>
                        <span className="accuracy-badge">{pred.accuracy}%</span>
                      </td>
                      <td>{pred.city}</td>
                      <td>{formatDate(pred.timestamp)}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn view-btn" title="View Details">
                            👁️
                          </button>
                          <button
                            className="action-btn delete-btn"
                            title="Delete"
                            onClick={() => handleDelete(pred.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Pagination */}
          <section className="pagination-section">
            <button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>

            <span className="pagination-info">
              Page {currentPage} of {Math.ceil(predictions.length / 10)}
            </span>

            <button
              className="pagination-btn"
              disabled={currentPage === Math.ceil(predictions.length / 10)}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}