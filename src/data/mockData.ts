export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  description: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-03-25',
    amount: 4500.00,
    category: 'Salary',
    type: 'income',
    description: 'Monthly Salary from Tech Corp',
  },
  {
    id: '2',
    date: '2024-03-24',
    amount: 120.50,
    category: 'Food',
    type: 'expense',
    description: 'Dinner with friends',
  },
  {
    id: '3',
    date: '2024-03-23',
    amount: 60.00,
    category: 'Transport',
    type: 'expense',
    description: 'Uber to airport',
  },
  {
    id: '4',
    date: '2024-03-22',
    amount: 1500.00,
    category: 'Rent',
    type: 'expense',
    description: 'Monthly apartment rent',
  },
  {
    id: '5',
    date: '2024-03-21',
    amount: 300.00,
    category: 'Investment',
    type: 'income',
    description: 'Stock dividends',
  },
  {
    id: '6',
    date: '2024-03-20',
    amount: 85.20,
    category: 'Shopping',
    type: 'expense',
    description: 'New shoes',
  },
  {
    id: '7',
    date: '2024-03-19',
    amount: 45.00,
    category: 'Utilities',
    type: 'expense',
    description: 'Electricity bill',
  },
  {
    id: '8',
    date: '2024-03-18',
    amount: 200.00,
    category: 'Entertainment',
    type: 'expense',
    description: 'Concert tickets',
  },
  {
    id: '9',
    date: '2024-03-17',
    amount: 1200.00,
    category: 'Freelance',
    type: 'income',
    description: 'Web design project',
  },
  {
    id: '10',
    date: '2024-03-16',
    amount: 35.50,
    category: 'Food',
    type: 'expense',
    description: 'Lunch at office',
  }
];

export const categories = [
  'Salary',
  'Food',
  'Transport',
  'Rent',
  'Investment',
  'Shopping',
  'Utilities',
  'Entertainment',
  'Freelance',
  'Other'
];
