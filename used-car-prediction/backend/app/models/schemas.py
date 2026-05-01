from pydantic import BaseModel
from typing import Optional

class CarInput(BaseModel):
    brand: str
    model: str
    year: int
    mileage: float
    fuel_type: str
    transmission: str
    engine_cc: float
    seats: int
    
class PredictionResponse(BaseModel):
    predicted_price: float
    confidence: float
    model_version: str

class CarHistory(BaseModel):
    id: int
    car_details: CarInput
    predicted_price: float
    timestamp: str
