# Used Car Price Prediction

A full-stack application for predicting used car prices using machine learning.

## Project Structure

```
used-car-prediction/
├── frontend/                 # React/Next.js frontend
├── backend/                  # FastAPI backend
├── docs/                     # Documentation
├── docker-compose.yml        # Docker composition
└── README.md                 # This file
```

## Features

- 🚗 Used car price prediction using ML models
- 📊 Analytics dashboard for insights
- 📈 Price trends analysis
- 🔍 Prediction history tracking
- 💻 Modern web interface with Next.js
- ⚡ Fast API backend with FastAPI

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- Docker and Docker Compose

### Installation

#### Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

#### Frontend Setup

```bash
cd frontend
npm install
```

### Running Locally

#### Backend

```bash
cd backend
python -m uvicorn app.main:app --reload
```

The backend will be available at `http://localhost:8000`

#### Frontend

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Running with Docker Compose

```bash
docker-compose up --build
```

## API Documentation

See [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) for detailed API endpoints.

## Frontend Guide

See [FRONTEND_GUIDE.md](docs/FRONTEND_GUIDE.md) for frontend development details.

## Deployment

See [DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md) for deployment instructions.

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT License
