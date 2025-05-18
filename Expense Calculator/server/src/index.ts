import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import { Expense } from './interfaces';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let expenses: Expense[] = [];

const generateId = (): string => uuidv4();

app.get('/api/expenses', (req, res) => {
  res.json(expenses);
});

app.post('/api/expenses', (req, res) => {
  const { category, amount } = req.body;
  
  if (!category || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Invalid expense data' });
  }

  const existingExpenseIndex = expenses.findIndex(
    e => e.category.toLowerCase() === category.toLowerCase()
  );

  if (existingExpenseIndex >= 0) {
        expenses[existingExpenseIndex].amount += amount;
    res.json(expenses[existingExpenseIndex]);
  } else {
    
    const newExpense: Expense = {
      id: generateId(),
      category,
      amount
    };
    expenses.push(newExpense);
    res.status(201).json(newExpense);
  }
});


app.patch('/api/expenses/:id', (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  const expenseIndex = expenses.findIndex(e => e.id === id);

  if (expenseIndex === -1) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  if (typeof amount !== 'number') {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  expenses[expenseIndex].amount = amount;
  res.json(expenses[expenseIndex]);
});


app.delete('/api/expenses/:id', (req, res) => {
  const { id } = req.params;
  expenses = expenses.filter(e => e.id !== id);
  res.status(204).send();
});

app.get('/api/expenses/calculations', (req, res) => {
  if (expenses.length === 0) {
    return res.status(400).json({ error: 'No expenses provided' });
  }

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageDaily = total / 30;
  
  const sortedExpenses = [...expenses].sort((a, b) => b.amount - a.amount);
  const top3 = sortedExpenses.slice(0, 3);

  res.json({
    total,
    averageDaily,
    top3
  });
});


app.delete('/api/expenses', (req, res) => {
  expenses = [];
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});