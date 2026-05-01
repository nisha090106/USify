# Frontend Development Guide

## Technology Stack

- **Framework**: Next.js 13
- **Language**: JavaScript/JSX
- **Styling**: CSS with CSS Modules
- **HTTP Client**: Axios
- **Package Manager**: npm

## Project Structure

```
frontend/
├── public/               # Static files
├── src/
│   ├── components/       # React components
│   ├── pages/           # Next.js pages
│   ├── styles/          # CSS files
│   ├── api/             # API client setup
│   └── utils/           # Utility functions
└── package.json
```

## Getting Started

### Installation

```bash
cd frontend
npm install
```

### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## Components

### Dashboard Component

Main dashboard component displaying overall application information.

**File**: `src/components/Dashboard.jsx`

### PredictionForm Component

Form for users to input car details for price prediction.

**File**: `src/components/PredictionForm.jsx`

### ResultsPanel Component

Displays prediction results from the API.

**File**: `src/components/ResultsPanel.jsx`

### Analytics Component

Shows analytics and insights about predictions.

**File**: `src/components/Analytics.jsx`

### Header Component

Application header with title.

**File**: `src/components/Header.jsx`

### Navigation Component

Navigation bar with links to different pages.

**File**: `src/components/Navigation.jsx`

## Pages

### Home Page (`/`)

Main landing page with dashboard.

### Prediction Page (`/predict`)

Page for making car price predictions.

### Analytics Page (`/analytics`)

Page displaying analytics and trends.

### History Page (`/history`)

Page showing prediction history.

## API Integration

The API client is configured in `src/api/client.js`:

```javascript
import client from '../api/client';

// Example usage
const response = await client.post('/predict/', carData);
```

## Environment Variables

Create a `.env.local` file in the frontend directory:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

## Styling

Global styles are in `src/styles/globals.css`
Component-specific styles are in `src/styles/`

## Best Practices

1. Use functional components
2. Keep components small and focused
3. Use meaningful variable names
4. Add comments for complex logic
5. Handle loading and error states
6. Use environment variables for configuration

## Testing

Run tests with:

```bash
npm test
```

## Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for deployment instructions.
