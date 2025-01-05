// import Loader from "../../ui/Loader";
import { TransactionTypes } from "../../types/types";
import SummariesContainer from "../../ui/SummariesContainer";
import SummariesHeader from "../../ui/SummariesHeader";
import useTransactions from "../transactions/useTransactions";
import TransactionHighlight from "./TransactionHighlight";

function TransactionsSummary() {
  const { transactions, isLoading } = useTransactions();

  if (isLoading) return null;

  const transactionsBrief = transactions.slice(0, 5);
  return (
    <SummariesContainer
      className=" col-start-1 col-end-2 row-start-4 row-end-10"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <SummariesHeader
        title="Transactions"
        buttonText="View All"
        to="/transactions"
      />

      <ul className="divide-y-2 divide-primaryGrey-200">
        {transactionsBrief.map((transaction: TransactionTypes) => (
          <TransactionHighlight
            key={transaction.id}
            transaction={transaction}
          />
        ))}
      </ul>
    </SummariesContainer>
  );
}

export default TransactionsSummary;
