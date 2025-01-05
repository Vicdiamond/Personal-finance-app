import { BudgetTypes, TransactionTypes } from "../../types/types";
import useTransactions from "../transactions/useTransactions";
import useBudgets from "./useBudgets";

function useGroupedBudgets() {
  const { budgets, isLoading: isLoading1 } = useBudgets();
  const { totalTransactions, isLoading: isLoading2 } = useTransactions();

  const isLoading = isLoading1 || isLoading2;

  if (isLoading) {
    return { budgets: [], groupedTransactions: {}, isLoading };
  }

  const groupedTransactions = totalTransactions.reduce(
    (
      acc: Record<string, TransactionTypes[]>,
      transaction: TransactionTypes
    ) => {
      const category = transaction.category.toLowerCase();
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(transaction);
      return acc;
    },
    {}
  );

  const categoriesInBudgets = budgets.map((budget: BudgetTypes) =>
    budget.category.toLowerCase()
  );

  const budgetCategoryTransactions = Object.keys(groupedTransactions)
    .filter((category) => categoriesInBudgets.includes(category))
    .reduce((acc: Record<string, TransactionTypes[]>, category: string) => {
      acc[category] = groupedTransactions[category];
      return acc;
    }, {});

  return { budgets, groupedTransactions, budgetCategoryTransactions };
}

export default useGroupedBudgets;
