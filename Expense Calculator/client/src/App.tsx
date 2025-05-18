import React from 'react';
import './App.css';
import { useExpenses } from './hooks/useExpenses';
import ExpenseForm from './components/expenseForm';
import ExpenseTable from './components/expenseTable';
import ResultsPanel from './components/resultsPanel';

const App: React.FC = () => {
  const {
    expenses,
    calculations,
    loading,
    error,
    addExpense,
    calculate,
    clearAll
  } = useExpenses();

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app">
      <h1>Expense Calculator</h1>
      
      <ExpenseForm onSubmit={addExpense} />
      
      <div className="actions">
        <button onClick={calculate} disabled={loading}>
          Calculate
        </button>
        <button onClick={clearAll} disabled={loading} className="clear-btn">
          Clear All
        </button>
      </div>

      <ResultsPanel calculations={calculations} />
      <ExpenseTable expenses={expenses} />
    </div>
  );
};

export default App;