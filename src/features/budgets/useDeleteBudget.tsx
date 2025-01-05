import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBudget as deleteBudgetApi } from "../../services/apiBudgets";

function useDeleteBudget() {
  const queryClient = useQueryClient();

  const { mutate: deleteBudget, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteBudgetApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["budgets"],
      });
    },
  });

  return { deleteBudget, isDeleting };
}

export default useDeleteBudget;
