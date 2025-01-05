import BudgetList from "./BudgetList";
import SpendingSummary from "./SpendingSummary";

function BudgetContainer() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 ">
      <SpendingSummary />

      <BudgetList />
    </div>
  );
}

export default BudgetContainer;
