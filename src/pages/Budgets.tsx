import AddBudget from "../features/budgets/AddBudget";
import BudgetContainer from "../features/budgets/BudgetContainer";

function Budgets() {
  return (
    <div className="px-4 md:px-10 py-6 md:py-8">
      <div className="flex justify-between items-center mb-8">
        <p className="text-textPreset1 font-semibold text-primaryGrey-900">
          Budget
        </p>
        <AddBudget />
      </div>

      <BudgetContainer />
    </div>
  );
}

export default Budgets;
