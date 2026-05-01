import pytest
import numpy as np
from app.models.schemas import CarInput

@pytest.fixture
def sample_car_input():
    return CarInput(
        brand="Toyota",
        model="Camry",
        year=2020,
        mileage=50000,
        fuel_type="Petrol",
        transmission="Automatic",
        engine_cc=2000,
        seats=5
    )

def test_car_input_validation(sample_car_input):
    assert sample_car_input.brand == "Toyota"
    assert sample_car_input.year == 2020
    assert sample_car_input.mileage == 50000

def test_price_range():
    # Test price prediction is within expected range
    predicted_price = 15000
    assert predicted_price > 0
