from fastapi import APIRouter, Depends, HTTPException
from app.models.schemas import CarInput, PredictionResponse
from app.services.prediction_service import PredictionService
from sqlalchemy.orm import Session
from app.models.database import get_db

router = APIRouter()
prediction_service = PredictionService()

@router.post("/", response_model=PredictionResponse)
async def predict_price(car_input: CarInput, db: Session = Depends(get_db)):
    """
    Predict the price of a used car based on input features.
    """
    try:
        prediction = prediction_service.predict(car_input)
        return prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/models")
async def get_available_models():
    """
    Get list of available prediction models.
    """
    return {"models": ["price_model", "risk_model"]}
