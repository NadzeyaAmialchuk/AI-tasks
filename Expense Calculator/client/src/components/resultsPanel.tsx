import React from 'react';
import { Calculations } from '../types/expense';

interface ResultsPanelProps {
  calculations: Calculations | null;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ calculations }) => {
  if (!calculations) return null;

  return (
    <div className="results-panel">
      <h2>Results</h2>
      <p>Total amount of expenses: ${calculations.total.toLocaleString()}</p>
      <p>Average daily expense: ${calculations.averageDaily.toLocaleString(undefined, {
        maximumFractionDigits: 2
      })}</p>
      <h3>Top 3 Largest Expenses:</h3>
      <ul>
        {calculations.top3.map((expense, index) => (
          <li key={index}>
            {expense.category}: ${expense.amount.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsPanel;