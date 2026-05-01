from fastapi import APIRouter
from typing import List

router = APIRouter()

@router.get("/")
async def get_prediction_history():
    """
    Get all prediction history.
    """
    return {"predictions": []}

@router.get("/{prediction_id}")
async def get_prediction_detail(prediction_id: int):
    """
    Get details of a specific prediction.
    """
    return {"prediction_id": prediction_id, "details": {}}

@router.delete("/{prediction_id}")
async def delete_prediction(prediction_id: int):
    """
    Delete a prediction from history.
    """
    return {"message": "Prediction deleted"}
