import pickle
import os
from pathlib import Path

class ModelService:
    def __init__(self):
        self.model_dir = Path(__file__).parent.parent.parent / "models"
    
    def save_model(self, model, filename: str):
        """
        Save a trained model to disk.
        """
        filepath = self.model_dir / filename
        with open(filepath, 'wb') as f:
            pickle.dump(model, f)
    
    def load_model(self, filename: str):
        """
        Load a trained model from disk.
        """
        filepath = self.model_dir / filename
        if not filepath.exists():
            raise FileNotFoundError(f"Model file not found: {filename}")
        
        with open(filepath, 'rb') as f:
            model = pickle.load(f)
        return model
    
    def get_model_info(self, model) -> dict:
        """
        Get information about a model.
        """
        return {
            "model_type": type(model).__name__,
            "parameters": str(model.get_params() if hasattr(model, 'get_params') else {})
        }
