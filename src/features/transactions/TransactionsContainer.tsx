import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TransactionTypes } from "../../types/types";

import { PAGE_SIZE } from "../../utils/constants";

import Loader from "../../ui/Loader";
import FilterTransactions from "./FilterTransactions";
import Pagination from "./Pagination";
import Transaction from "./Transaction";
import TransactionHeader from "./TransactionHeader";
import useTransactions from "./useTransactions";
import { categoryOptions, sortOptions } from "../../data/data";
import { motion } from "motion/react";

function TransactionsContainer() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchedTransaction, setSearchedTransaction] = useState("");
  const [sortValue, setSortValue] = useState(
    searchParams.get("sort") || sortOptions[0].value
  );
  const [categoryValue, setCategoryValue] = useState(
    searchParams.get("category") || categoryOptions[0].value
  );

  const { transactions, isLoading, filteredTransactions } = useTransactions(
    searchedTransaction,
    sortValue,
    categoryValue
  );

  const filteredInputs = {
    searchedValue: searchedTransaction,
    setSerchedValue: setSearchedTransaction,
    handleSortInput: handleSortInput,
    handleCategoryInput: handleCategoryInput,
  };

  if (isLoading) return <Loader />;

  function handleSortInput(value: string) {
    setSortValue(value);
    searchParams.set("sort", value);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  function handleCategoryInput(value: string) {
    setCategoryValue(value);
    searchParams.set("category", value);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  const isTransactionsEmpty = transactions.length === 0;

  const totalItems = filteredTransactions.length;
  const pageCount = Math.ceil(totalItems / PAGE_SIZE);

  // console.log(filteredTransactions);
  return (
    <div className=" bg-white p-5 rounded-lg">
      <FilterTransactions filteredInputs={filteredInputs} />

      <div className="mt-6 divide-y-2 divide-primaryGrey-200">
        {!isTransactionsEmpty && <TransactionHeader />}

        <div className="  overflow-hidden  h-[50vh] xl:h-[45vh] w-full ">
          <motion.div
            className="overflow-auto h-full divide-y-2 divide-primaryGrey-200 scrollbar-thin"
            initial="hidden"
            whileInView="visible"
            transition={{ staggerChildren: 0.1 }}
          >
            {!isTransactionsEmpty ? (
              transactions.map((transaction: TransactionTypes) => (
                <Transaction key={transaction.id} transaction={transaction} />
              ))
            ) : (
              <p className="text-center font-bold text-textPreset2 text-primaryGrey-900">
                No transactions found 😥
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {pageCount > 1 && filteredTransactions.length > 10 && (
        <Pagination pageCount={pageCount} />
      )}
    </div>
  );
}

export default TransactionsContainer;
