import { Calculations, Expense } from "./types/expense";

const API_URL = 'http://localhost:3001/api';

export const updateExpense = async (id: string, amount: number): Promise<Expense> => {
    const response = await fetch(`${API_URL}/expenses/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });
    return await response.json();
  };

export const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await fetch(`${API_URL}/expenses`);
  return await response.json();
};

export const addExpense = async (expense: Omit<Expense, 'id'>): Promise<Expense> => {
  const response = await fetch(`${API_URL}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expense),
  });
  return await response.json();
};

export const calculateExpenses = async (): Promise<Calculations> => {
  const response = await fetch(`${API_URL}/expenses/calculations`);
  return await response.json();
};

export const clearExpenses = async (): Promise<void> => {
  await fetch(`${API_URL}/expenses`, {
    method: 'DELETE',
  });
};