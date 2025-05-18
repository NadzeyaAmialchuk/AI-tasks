import { useState, useEffect, useCallback } from 'react';
import { 
  fetchExpenses, 
  addExpense, 
  calculateExpenses, 
  clearExpenses,
  updateExpense
} from '../api';
import { Expense, Calculations } from '../types/expense';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [calculations, setCalculations] = useState<Calculations | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadExpenses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchExpenses();
      setExpenses(data);
    } catch (err) {
      setError('Не удалось загрузить расходы');
      console.error('Error loading expenses:', err);
    } finally {
      setLoading(false);
    }
  }, []);

 
  const handleAddExpense = useCallback(async (newExpense: Omit<Expense, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      
      const existingExpense = expenses.find(
        e => e.category.toLowerCase() === newExpense.category.toLowerCase()
      );

      if (existingExpense) {
         const updatedExpense = {
          ...existingExpense,
          amount: existingExpense.amount + newExpense.amount
        };
        
        await updateExpense(existingExpense.id, updatedExpense.amount);
        setExpenses(prev => prev.map(e => 
          e.id === existingExpense.id ? updatedExpense : e
        ));
      } else {
        
        const createdExpense = await addExpense(newExpense);
        setExpenses(prev => [...prev, createdExpense]);
      }
    } catch (err) {
      setError('Error adding expense');
      console.error('Error adding expense:', err);
    } finally {
      setLoading(false);
    }
  }, [expenses]);

 
  const handleCalculate = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await calculateExpenses();
      setCalculations(data);
    } catch (err) {
      setError('Error calculating expenses');
      console.error('Error calculating expenses:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  
  const handleClearAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await clearExpenses();
      setExpenses([]);
      setCalculations(null);
    } catch (err) {
      setError('Error clearing expenses');
      console.error('Error clearing expenses:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  return {
    expenses,
    calculations,
    loading,
    error,
    addExpense: handleAddExpense,
    calculate: handleCalculate,
    clearAll: handleClearAll,
    refresh: loadExpenses
  };
};