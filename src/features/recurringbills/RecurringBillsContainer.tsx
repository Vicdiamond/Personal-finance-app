import { useState } from "react";
import { TransactionTypes } from "../../types/types";
import Loader from "../../ui/Loader";
import useTransactions from "../transactions/useTransactions";
import Bills from "./Bills";
import RecurringBillsHeaderSummary from "./RecurringBillsHeaderSummary";
import { sortOptions } from "../../data/data";
import { useSearchParams } from "react-router-dom";

function RecurringBillsContainer() {
  const [searchParams] = useSearchParams();

  const [recurringSearchValue, setRecurringSearchValue] = useState("");
  const [recurringSortValue, setRecurringSortValue] = useState(
    searchParams.get("sort") || sortOptions[0].value
  );
  const { filteredTransactions, isLoading } = useTransactions(
    recurringSearchValue,
    recurringSortValue
  );

  if (isLoading) return <Loader />;

  const recurringInput = {
    recurringSearchValue,
    setRecurringSearchValue,
    setRecurringSortValue,
  };

  //   Rearrange the array arrocrding to the dates in a month
  const recurringBills = filteredTransactions.filter(
    (transaction: TransactionTypes) => transaction.recurring === true
  );

  const sortHighestLowestArr =
    recurringSortValue === "highest" || recurringSortValue === "lowest"
      ? recurringBills.slice().reverse()
      : recurringBills;

  return (
    <div className="xl:flex gap-6">
      <RecurringBillsHeaderSummary recurringBills={recurringBills} />

      <Bills
        recurringBills={sortHighestLowestArr}
        recurringInput={recurringInput}
      />
    </div>
  );
}

export default RecurringBillsContainer;
