# API Documentation

## Base URL

```
http://localhost:8000/api
```

## Endpoints

### Prediction Endpoints

#### POST `/predict/`

Predict the price of a used car.

**Request Body:**
```json
{
  "brand": "Toyota",
  "model": "Camry",
  "year": 2020,
  "mileage": 50000,
  "fuel_type": "Petrol",
  "transmission": "Automatic",
  "engine_cc": 2000,
  "seats": 5
}
```

**Response:**
```json
{
  "predicted_price": 15000.50,
  "confidence": 0.95,
  "model_version": "1.0.0"
}
```

#### GET `/predict/models`

Get list of available prediction models.

**Response:**
```json
{
  "models": ["price_model", "risk_model"]
}
```

### Analytics Endpoints

#### GET `/analytics/summary`

Get analytics summary of all predictions.

**Response:**
```json
{
  "total_predictions": 100,
  "average_price": 12000,
  "price_range": {
    "min": 5000,
    "max": 25000
  }
}
```

#### GET `/analytics/trends`

Get price trends over time.

#### GET `/analytics/models-accuracy`

Get accuracy metrics for all models.

### History Endpoints

#### GET `/history/`

Get all prediction history.

#### GET `/history/{prediction_id}`

Get details of a specific prediction.

#### DELETE `/history/{prediction_id}`

Delete a prediction from history.

## Error Responses

All errors return appropriate HTTP status codes with error messages:

```json
{
  "detail": "Error description"
}
```

## Authentication

Currently, the API does not require authentication. This can be added in future versions.

## Rate Limiting

Rate limiting is not currently implemented. This can be added in future versions.
