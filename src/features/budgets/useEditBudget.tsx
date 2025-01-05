import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BudgetTypes } from "../../types/types";
import { editBudget as editBudgetApi } from "../../services/apiBudgets";
import toast from "react-hot-toast";

function useEditBudget() {
  const queryClient = useQueryClient();
  const { mutate: editBudget, isPending: isEditing } = useMutation({
    mutationFn: (newData: BudgetTypes) => editBudgetApi(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["budgets"],
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return { editBudget, isEditing };
}

export default useEditBudget;
