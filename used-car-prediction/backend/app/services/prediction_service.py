from app.models.schemas import CarInput, PredictionResponse
from app.ml.model_loader import ModelLoader
import numpy as np

class PredictionService:
    def __init__(self):
        self.model_loader = ModelLoader()
        self.model = self.model_loader.load_model()
        self.scaler = self.model_loader.load_scaler()
        self.encoder = self.model_loader.load_encoder()
    
    def predict(self, car_input: CarInput) -> PredictionResponse:
        """
        Make a prediction based on car input features.
        """
        # Preprocess input
        features = self._preprocess_input(car_input)
        
        # Make prediction
        predicted_price = self.model.predict([features])[0]
        
        return PredictionResponse(
            predicted_price=float(predicted_price),
            confidence=0.95,
            model_version="1.0.0"
        )
    
    def _preprocess_input(self, car_input: CarInput) -> np.ndarray:
        """
        Preprocess input features for the model.
        """
        # Implement preprocessing logic
        features = np.array([
            car_input.year,
            car_input.mileage,
            car_input.engine_cc,
            car_input.seats
        ])
        return features
