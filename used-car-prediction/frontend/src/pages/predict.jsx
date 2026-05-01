import React from 'react';
import PredictionForm from '../components/PredictionForm';
import ResultsPanel from '../components/ResultsPanel';

export default function Predict() {
  return (
    <div>
      <PredictionForm />
      <ResultsPanel />
    </div>
  );
}
