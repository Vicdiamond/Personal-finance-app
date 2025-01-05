import { AnimatePresence } from "motion/react";
import { BudgetTypes } from "../../types/types";
import OverscrollContainer from "../../ui/OverscrollContainer";
import SpinnerMini from "../../ui/SpinnerMini";
import Budget from "./Budget";
import useGroupedBudgets from "./useGroupedBudgets";

function BudgetList() {
  const { budgets, groupedTransactions, isLoading } = useGroupedBudgets();

  if (isLoading) return <SpinnerMini />;

  return (
    <OverscrollContainer height="76vh">
      <AnimatePresence>
        {budgets.map((budget: BudgetTypes) => (
          <Budget
            key={budget.id}
            budget={budget}
            transactions={groupedTransactions[budget.category.toLowerCase()]}
          />
        ))}
      </AnimatePresence>
    </OverscrollContainer>
  );
}

export default BudgetList;
