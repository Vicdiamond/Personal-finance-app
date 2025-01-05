import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PotTypes } from "../../types/types";
import toast from "react-hot-toast";
import { editPots } from "../../services/apiPots";

function useEditPot() {
  const queryClient = useQueryClient();
  const { mutate: editPot, isPending: isEditing } = useMutation({
    mutationFn: (newData: PotTypes) => editPots(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
      toast.success("Pot updated successfully");
    },
    onError: (error) => toast.error(error.message),
  });

  return { editPot, isEditing };
}

export default useEditPot;
