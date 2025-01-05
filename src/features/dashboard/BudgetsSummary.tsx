import { BudgetTypes } from "../../types/types";
import PieChartComponent from "../../ui/PieChartComponent";
import SummariesContainer from "../../ui/SummariesContainer";
import SummariesHeader from "../../ui/SummariesHeader";
import SummaryHighlight from "../../ui/SummaryHighlight";
import useGroupedBudgets from "../budgets/useGroupedBudgets";

function BudgetsSummary() {
  const { budgets, isLoading, budgetCategoryTransactions } =
    useGroupedBudgets();

  if (isLoading) return null;

  const budgetsBrief = budgets.slice(0, 4);
  return (
    <SummariesContainer className="col-start-2 col-end-3 row-start-1 row-end-6 ">
      <SummariesHeader title="Budgets" buttonText="See details" to="/budgets" />

      <div className="md:flex md:items-center md:justify-between md:gap-4 xl:mt-[51px]">
        <PieChartComponent
          budgets={budgets}
          budgetTransactions={budgetCategoryTransactions}
        />

        <div className="mt-5">
          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-1 items-center md:mt-0 e">
            {budgetsBrief.map((budget: BudgetTypes) => (
              <SummaryHighlight
                key={budget.id}
                header={budget.category}
                price={`${budget.maximum}`}
                color={budget.theme}
              />
            ))}
          </div>
        </div>
      </div>
    </SummariesContainer>
  );
}

export default BudgetsSummary;
