
interface Expense {
    category: string;
    amount: number;
    id: string;
  }
  
  interface Calculations {
    total: number;
    averageDaily: number;
    top3: Expense[];
  }
  
  export { Expense, Calculations };