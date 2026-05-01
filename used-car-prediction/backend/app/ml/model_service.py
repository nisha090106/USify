import joblib
import numpy as np
import pandas as pd
from pathlib import Path
from typing import Dict, Tuple, List
import xgboost as xgb

class ModelService:
    """Handle ML model loading and prediction"""
    
    def __init__(self, model_path: str, scaler_path: str):
        """
        Initialize model service
        
        Args:
            model_path: Path to trained XGBoost model
            scaler_path: Path to fitted scaler
        """
        self.model = self._load_model(model_path)
        self.scaler = joblib.load(scaler_path)
        self.feature_names = None
        
    @staticmethod
    def _load_model(model_path: str):
        """Load trained model"""
        if Path(model_path).exists():
            return joblib.load(model_path)
        else:
            raise FileNotFoundError(f"Model not found at {model_path}")
    
    def predict_price(self, features: pd.DataFrame) -> float:
        """
        Predict car price
        
        Args:
            features: Preprocessed feature DataFrame
            
        Returns:
            Predicted price
        """
        prediction = self.model.predict(features)[0]
        return max(0, prediction)  # Ensure non-negative price
    
    def predict_with_confidence(self, features: pd.DataFrame) -> Dict:
        """
        Predict price with confidence interval
        
        Args:
            features: Preprocessed feature DataFrame
            
        Returns:
            Dictionary with prediction and confidence bounds
        """
        prediction = self.predict_price(features)
        
        # Estimate confidence interval (±15%)
        confidence_margin = prediction * 0.15
        
        return {
            'predicted_price': round(prediction, 2),
            'lower_bound': round(prediction - confidence_margin, 2),
            'upper_bound': round(prediction + confidence_margin, 2),
            'confidence': 0.85
        }
    
    def get_feature_importance(self, top_n: int = 10) -> Dict:
        """
        Get top N important features
        
        Args:
            top_n: Number of features to return
            
        Returns:
            Dictionary of feature importances
        """
        importances = self.model.feature_importances_
        feature_names = self.feature_names or [f'Feature_{i}' for i in range(len(importances))]
        
        # Sort by importance
        importance_dict = dict(zip(feature_names, importances))
        top_features = sorted(importance_dict.items(), key=lambda x: x[1], reverse=True)[:top_n]
        
        return dict(top_features)


class RiskClassifier:
    """Classify car into risk category"""
    
    # Risk thresholds (adjust based on your market)
    LOW_RISK_THRESHOLD = 500000  # < 5 Lakhs = Low Risk
    MEDIUM_RISK_THRESHOLD = 1500000  # < 15 Lakhs = Medium Risk
    # > 15 Lakhs = High Risk
    
    @classmethod
    def classify_risk(cls, price: float, age: int = None) -> Tuple[str, Dict]:
        """
        Classify car risk category
        
        Args:
            price: Predicted price
            age: Car age (optional, for additional risk factors)
            
        Returns:
            (risk_category, risk_factors)
        """
        
        risk_factors = {
            'price_risk': cls._get_price_risk(price),
            'age_risk': cls._get_age_risk(age) if age else None,
            'combined_risk': None
        }
        
        if age:
            risk_factors['combined_risk'] = cls._combine_risks(
                risk_factors['price_risk'],
                risk_factors['age_risk']
            )
        
        # Determine overall risk
        if price < cls.LOW_RISK_THRESHOLD:
            risk_category = 'Low'
        elif price < cls.MEDIUM_RISK_THRESHOLD:
            risk_category = 'Medium'
        else:
            risk_category = 'High'
        
        return risk_category, risk_factors
    
    @staticmethod
    def _get_price_risk(price: float) -> str:
        """Assess price-based risk"""
        if price < 500000:
            return 'Low'
        elif price < 1500000:
            return 'Medium'
        else:
            return 'High'
    
    @staticmethod
    def _get_age_risk(age: int) -> str:
        """Assess age-based risk"""
        if age < 5:
            return 'Low'
        elif age < 10:
            return 'Medium'
        else:
            return 'High'
    
    @staticmethod
    def _combine_risks(price_risk: str, age_risk: str) -> str:
        """Combine multiple risk factors"""
        risk_order = {'Low': 0, 'Medium': 1, 'High': 2}
        combined = max(risk_order[price_risk], risk_order[age_risk])
        risk_levels = ['Low', 'Medium', 'High']
        return risk_levels[combined]


class MaintenanceCostCalculator:
    """Calculate estimated annual maintenance costs"""
    
    @staticmethod
    def calculate_maintenance(age: int, kilometers: int, power: int = None) -> Dict:
        """
        Calculate estimated annual maintenance cost
        
        Args:
            age: Car age in years
            kilometers: Total kilometers driven
            power: Engine power (BHP) - optional
            
        Returns:
            Dictionary with maintenance cost breakdown
        """
        
        # Base maintenance cost
        base_cost = 15000  # ₹15,000 base
        
        # Age factor: older cars cost more to maintain
        age_factor = age * 2000  # ₹2,000 per year
        
        # Mileage factor: high mileage increases maintenance
        mileage_factor = (kilometers / 100000) * 5000  # ₹5,000 per 1 lakh km
        
        # Power factor: high power engines cost more
        power_factor = 0
        if power:
            power_factor = max(0, (power - 80) * 50)  # ₹50 per BHP above 80
        
        total_cost = base_cost + age_factor + mileage_factor + power_factor
        
        return {
            'total_annual_maintenance': round(total_cost, 0),
            'breakdown': {
                'base_cost': round(base_cost, 0),
                'age_factor': round(age_factor, 0),
                'mileage_factor': round(mileage_factor, 0),
                'power_factor': round(power_factor, 0)
            },
            'estimated_monthly': round(total_cost / 12, 0)
        }
