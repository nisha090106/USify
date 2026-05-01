import pickle
from pathlib import Path

class ModelLoader:
    def __init__(self):
        self.model_dir = Path(__file__).parent.parent.parent / "models"
    
    def load_model(self):
        """
        Load the trained price prediction model.
        """
        filepath = self.model_dir / "price_model.pkl"
        if filepath.exists():
            with open(filepath, 'rb') as f:
                return pickle.load(f)
        else:
            raise FileNotFoundError(f"Model not found at {filepath}")
    
    def load_scaler(self):
        """
        Load the feature scaler.
        """
        filepath = self.model_dir / "scaler.pkl"
        if filepath.exists():
            with open(filepath, 'rb') as f:
                return pickle.load(f)
        return None
    
    def load_encoder(self):
        """
        Load the categorical encoder.
        """
        filepath = self.model_dir / "encoder.pkl"
        if filepath.exists():
            with open(filepath, 'rb') as f:
                return pickle.load(f)
        return None
