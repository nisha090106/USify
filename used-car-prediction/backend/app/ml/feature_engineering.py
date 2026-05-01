import pandas as pd
import numpy as np

class FeatureEngineer:
    def __init__(self):
        pass
    
    def create_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Create new features from existing data.
        """
        df = df.copy()
        
        # Example features
        if 'year' in df.columns:
            df['car_age'] = 2024 - df['year']
        
        if 'mileage' in df.columns and 'car_age' in df.columns:
            df['mileage_per_year'] = df['mileage'] / (df['car_age'] + 1)
        
        return df
    
    def select_features(self, df: pd.DataFrame, feature_list: list) -> pd.DataFrame:
        """
        Select specific features from the dataframe.
        """
        return df[feature_list]
