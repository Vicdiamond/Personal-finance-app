import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPot as createPotApi } from "../../services/apiPots";
import { PotTypes } from "../../types/types";
import toast from "react-hot-toast";

function useCreatePot() {
  const queryClient = useQueryClient();

  const { mutate: createPot, isPending: isCreating } = useMutation({
    mutationFn: (newData: PotTypes) => createPotApi(newData),
    onSuccess: () => {
      toast.success("Pot created successfully");
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
    onError: (error) => toast.error(error.message),
  });
  return { createPot, isCreating };
}

export default useCreatePot;
