import Loader from "../../ui/Loader";
import usePots from "../pots/usePots";
import AccountSummary from "./AccountSummary";
import BudgetsSummary from "./BudgetsSummary";
import PotsSummary from "./PotsSummary";
import RecurringBillsSummary from "./RecurringBillsSummary";
import TransactionsSummary from "./TransactionsSummary";

function DashboardLayout() {
  const { pots, isLoading } = usePots();

  if (isLoading) return <Loader />;

  return (
    <div className="grid md:grid-rows-[auto_auto] gap-8">
      <AccountSummary />

      <div className="space-y-4 xl:grid xl:grid-cols-[59%_41%] grid-rows-9  xl:gap-4 xl:space-y-0 ">
        <PotsSummary pots={pots} />
        <TransactionsSummary />
        <BudgetsSummary />
        <RecurringBillsSummary />
      </div>
    </div>
  );
}

export default DashboardLayout;
