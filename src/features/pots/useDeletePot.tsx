import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePot as deletePotApi } from "../../services/apiPots";
import toast from "react-hot-toast";

function useDeletePot() {
  const queryClient = useQueryClient();

  const { mutate: deletePot, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deletePotApi(id),
    onSuccess: () => {
      toast.success("Pot deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { deletePot, isDeleting };
}

export default useDeletePot;
