import { useQuery } from "@tanstack/react-query";
import { getData, getSortedArray } from "../../utils/helpers";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { TransactionTypes } from "../../types/types";

function getCategoriesArray(array: TransactionTypes[], categoryValue: string) {
  if (categoryValue === "all") return array;
  return array.filter((arr) => arr.category.toLowerCase() === categoryValue);
}

function useTransactions(
  serchedValue?: string,
  sortValue?: string,
  categoryValue?: string
) {
  const [searchParams] = useSearchParams();
  const {
    isLoading,
    error,
    data: totalTransactions,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getData("transactions"),
  });

  if (error) throw new Error("Could not get transactions");

  let filteredTransactions: TransactionTypes[] = [];

  // SEARCH
  filteredTransactions = serchedValue
    ? totalTransactions?.filter((transaction: TransactionTypes) =>
        transaction.name.toLowerCase().includes(serchedValue.toLowerCase())
      )
    : totalTransactions;

  // SORT
  filteredTransactions =
    sortValue && filteredTransactions
      ? getSortedArray(filteredTransactions, sortValue)
      : filteredTransactions;

  // CATEGORY
  filteredTransactions =
    categoryValue && filteredTransactions
      ? getCategoriesArray(filteredTransactions, categoryValue)
      : filteredTransactions;

  // PAGIATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const from = (page - 1) * PAGE_SIZE;
  const to = page * PAGE_SIZE;

  const transactions =
    filteredTransactions?.length > 10
      ? filteredTransactions?.slice(from, to)
      : filteredTransactions;

  // const recurringBills = filteredTransactions?.filter(
  //   (transaction: TransactionTypes) => transaction.recurring === true
  // );

  // console.log(recurringBills);

  return {
    isLoading,
    error,
    transactions,
    totalTransactions,
    filteredTransactions,
  };
}

export default useTransactions;
