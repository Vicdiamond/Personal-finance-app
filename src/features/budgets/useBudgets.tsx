import { useQuery } from "@tanstack/react-query";
import { getData } from "../../utils/helpers";

function useBudgets() {
  const {
    isLoading,
    data: budgets,
    error,
  } = useQuery({
    queryKey: ["budgets"],
    queryFn: () => getData("budgets"),
  });

  if (error) throw new Error("Could not get budgets");

  return { budgets, isLoading };
}

export default useBudgets;
