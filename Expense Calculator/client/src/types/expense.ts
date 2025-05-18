export interface Expense {
    category: string;
    amount: number;
    id: string;
  }
  
  export interface Calculations {
    total: number;
    averageDaily: number;
    top3: Expense[];
  }