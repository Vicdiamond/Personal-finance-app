import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BalanceTypes, PotTypes } from "../../types/types";
import { editPotBalance } from "../../services/apiPots";
import usePots from "./usePots";
import toast from "react-hot-toast";

function useAdjustPotBalance(
  isAdding: boolean,
  balance: BalanceTypes,
  adjustingValue: number,
  id: string
) {
  const queryClient = useQueryClient();
  const { pots } = usePots();
  const pot = pots.find((pot: PotTypes) => pot.id === id);

  const { mutate: adjustPotBalance, isPending: isAdjusting } = useMutation({
    mutationFn: () =>
      editPotBalance(id, adjustingValue, isAdding, balance, pot),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      toast.success("Pot balance adjusted successfully");
    },
    onError: (error) => toast.error(error.message),
  });

  return { adjustPotBalance, isAdjusting };
}

export default useAdjustPotBalance;
