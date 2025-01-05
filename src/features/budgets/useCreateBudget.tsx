import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBudget as createBudgetApi } from "../../services/apiBudgets";
import { BudgetTypes } from "../../types/types";
import toast from "react-hot-toast";

function useCreateBudget() {
  const queryClient = useQueryClient();
  const { mutate: createBudget, isPending: isCreating } = useMutation({
    mutationFn: (newData: BudgetTypes) => createBudgetApi(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["budgets"],
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return { createBudget, isCreating };
}

export default useCreateBudget;
