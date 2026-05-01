import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder

class DataPreprocessor:
    def __init__(self):
        self.scaler = StandardScaler()
        self.encoders = {}
    
    def fit_transform(self, X: pd.DataFrame) -> np.ndarray:
        """
        Fit the preprocessor and transform the data.
        """
        X_scaled = self.scaler.fit_transform(X)
        return X_scaled
    
    def transform(self, X: pd.DataFrame) -> np.ndarray:
        """
        Transform the data using fitted preprocessor.
        """
        return self.scaler.transform(X)
    
    def encode_categorical(self, X: pd.DataFrame, columns: list) -> pd.DataFrame:
        """
        Encode categorical features.
        """
        X_encoded = X.copy()
        for col in columns:
            if col not in self.encoders:
                self.encoders[col] = LabelEncoder()
                X_encoded[col] = self.encoders[col].fit_transform(X[col])
            else:
                X_encoded[col] = self.encoders[col].transform(X[col])
        return X_encoded
