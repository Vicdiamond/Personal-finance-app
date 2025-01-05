import { BudgetTypes } from "../../types/types";
import OverscrollContainer from "../../ui/OverscrollContainer";
import PieChart from "../../ui/PieChartComponent";
import SpinnerMini from "../../ui/SpinnerMini";
import SpentCategory from "./SpentCategory";
import useGroupedBudgets from "./useGroupedBudgets";
import { motion } from "motion/react";

function SpendingSummary() {
  const {
    budgets,
    groupedTransactions,
    isLoading,
    budgetCategoryTransactions,
  } = useGroupedBudgets();

  if (isLoading) return <SpinnerMini />;

  return (
    <motion.div
      className="bg-white p-8 max-h-full self-start rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      <PieChart
        budgets={budgets}
        budgetTransactions={budgetCategoryTransactions}
      />
      <p className="text-textPreset2  text-primaryGrey-900 font-bold ">
        Spending Summary
      </p>

      <OverscrollContainer height="25vh">
        <div className="mt-2 divide-y-2 divide-primaryGrey-100">
          {budgets.map((budget: BudgetTypes) => (
            <SpentCategory
              budgetCategory={
                groupedTransactions[budget.category.toLowerCase()]
              }
              budget={budget}
              key={budget.id}
            />
          ))}
        </div>
      </OverscrollContainer>
    </motion.div>
  );
}

export default SpendingSummary;
