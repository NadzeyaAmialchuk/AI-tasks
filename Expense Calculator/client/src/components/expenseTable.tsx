import React from 'react';
import { Expense } from '../types/expense';

interface ExpenseTableProps {
  expenses: Expense[];
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({ expenses }) => {
  if (expenses.length === 0) {
    return <p>No expenses added yet</p>;
  }

  return (
    <table className="expenses-table">
      <thead>
        <tr>
          <th>Category</th>
          <th>Amount ($)</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => (
          <tr key={index}>
            <td>{expense.category}</td>
            <td>{expense.amount.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTable;