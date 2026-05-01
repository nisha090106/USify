import pandas as pd
import numpy as np
import joblib
from pathlib import Path
from sklearn.preprocessing import StandardScaler
from typing import Tuple, Dict

class DataPreprocessor:
    """Handle data preprocessing and feature engineering"""
    
    def __init__(self, scaler_path: str = None):
        self.scaler = None
        self.feature_names = None
        
        if scaler_path and Path(scaler_path).exists():
            self.scaler = joblib.load(scaler_path)
    
    def preprocess_input(self, input_data: Dict) -> pd.DataFrame:
        """
        Preprocess user input for prediction
        
        Args:
            input_data: Dictionary with car details
            
        Returns:
            Preprocessed pandas DataFrame ready for model prediction
        """
        
        # Create DataFrame from input
        df = pd.DataFrame([input_data])
        
        # Handle missing values
        df = self._handle_missing_values(df)
        
        # Encode categorical variables
        df = self._encode_categorical(df)
        
        # Engineer features
        df = self._engineer_features(df)
        
        # Scale numerical features
        if self.scaler:
            numerical_cols = df.select_dtypes(include=[np.number]).columns
            df[numerical_cols] = self.scaler.transform(df[numerical_cols])
        
        return df
    
    def _handle_missing_values(self, df: pd.DataFrame) -> pd.DataFrame:
        """Handle missing values"""
        # Fill numerical with 0 or median
        numerical_cols = df.select_dtypes(include=[np.number]).columns
        for col in numerical_cols:
            if df[col].isnull().any():
                df[col].fillna(0, inplace=True)
        
        # Fill categorical with mode/default
        categorical_cols = df.select_dtypes(include=['object']).columns
        for col in categorical_cols:
            if df[col].isnull().any():
                df[col].fillna('Unknown', inplace=True)
        
        return df
    
    def _encode_categorical(self, df: pd.DataFrame) -> pd.DataFrame:
        """Encode categorical variables"""
        
        # One-hot encoding for fuel type
        if 'Fuel_Type' in df.columns:
            fuel_dummies = pd.get_dummies(df['Fuel_Type'], prefix='Fuel')
            df = pd.concat([df, fuel_dummies], axis=1)
            df = df.drop('Fuel_Type', axis=1)
        
        # One-hot encoding for transmission
        if 'Transmission' in df.columns:
            trans_dummies = pd.get_dummies(df['Transmission'], prefix='Transmission')
            df = pd.concat([df, trans_dummies], axis=1)
            df = df.drop('Transmission', axis=1)
        
        # Ordinal encoding for owners
        if 'Owners' in df.columns:
            owner_mapping = {'First': 1, 'Second': 2, 'Third': 3, 'Fourth': 4, 'Fourth+': 5}
            df['Owners'] = df['Owners'].map(owner_mapping).fillna(1)
        
        return df
    
    def _engineer_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Engineer new features"""
        
        current_year = 2024
        
        # Age feature
        if 'Year' in df.columns:
            df['Age'] = current_year - df['Year']
        
        # Price per km (if price is known)
        if 'Price' in df.columns and 'Kilometers_Driven' in df.columns:
            df['Price_per_Km'] = df['Price'] / (df['Kilometers_Driven'] + 1)
        
        # Power to mileage ratio
        if 'Power' in df.columns and 'Mileage' in df.columns:
            df['Power_Mileage_Ratio'] = df['Power'] / (df['Mileage'] + 1)
        
        # Interaction features
        if 'Age' in df.columns and 'Mileage' in df.columns:
            df['Age_Mileage_Interaction'] = df['Age'] * df['Mileage']
        
        # Engine squared
        if 'Engine' in df.columns:
            df['Engine_Squared'] = df['Engine'] ** 2
        
        return df
    
    @staticmethod
    def validate_input(input_data: Dict) -> Tuple[bool, str]:
        """
        Validate user input
        
        Returns:
            (is_valid, error_message)
        """
        
        required_fields = ['Year', 'Mileage', 'Engine', 'Power', 'Kilometers_Driven']
        
        for field in required_fields:
            if field not in input_data:
                return False, f"Missing required field: {field}"
            
            if not isinstance(input_data[field], (int, float)):
                return False, f"{field} must be a number"
        
        # Validate ranges
        if not (2000 <= input_data['Year'] <= 2024):
            return False, "Year must be between 2000 and 2024"
        
        if not (5 <= input_data['Mileage'] <= 30):
            return False, "Mileage must be between 5 and 30 km/l"
        
        if not (500 <= input_data['Engine'] <= 5000):
            return False, "Engine must be between 500 and 5000 cc"
        
        return True, ""


class FeatureEngineer:
    """Advanced feature engineering"""
    
    @staticmethod
    def create_polynomial_features(df: pd.DataFrame, columns: list, degree: int = 2):
        """Create polynomial features"""
        for col in columns:
            if col in df.columns:
                for d in range(2, degree + 1):
                    df[f'{col}_pow{d}'] = df[col] ** d
        return df
    
    @staticmethod
    def create_interaction_features(df: pd.DataFrame, col_pairs: list):
        """Create interaction features"""
        for col1, col2 in col_pairs:
            if col1 in df.columns and col2 in df.columns:
                df[f'{col1}_{col2}_interaction'] = df[col1] * df[col2]
        return df
    
    @staticmethod
    def create_binned_features(df: pd.DataFrame, column: str, bins: int = 5):
        """Create binned/categorical features from continuous"""
        if column in df.columns:
            df[f'{column}_binned'] = pd.cut(df[column], bins=bins, labels=False)
        return df
