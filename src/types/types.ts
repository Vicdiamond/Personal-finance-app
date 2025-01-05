export interface TransactionTypes {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
  avatar: string;
  recurring: boolean;
}

export interface BudgetTypes {
  id: string;
  category: string;
  maximum: number;
  theme: string;
}

export interface PotTypes {
  id: string;
  name: string;
  target: number;
  total: number;
  theme: string;
}

export interface BalanceTypes {
  current: number;
  income: number;
  expenses: number;
}
