from fastapi import APIRouter
from typing import List

router = APIRouter()

@router.get("/summary")
async def get_analytics_summary():
    """
    Get analytics summary of all predictions.
    """
    return {
        "total_predictions": 0,
        "average_price": 0,
        "price_range": {"min": 0, "max": 0}
    }

@router.get("/trends")
async def get_price_trends():
    """
    Get price trends over time.
    """
    return {"trends": []}

@router.get("/models-accuracy")
async def get_models_accuracy():
    """
    Get accuracy metrics for all models.
    """
    return {"accuracy": {}}
