import { useQuery } from "@tanstack/react-query";
import { getData } from "../../utils/helpers";

function usePots() {
  const {
    data: pots,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pots"],
    queryFn: () => getData("pots"),
  });

  if (error) throw new Error("Could not get pots");
  return { pots, isLoading };
}

export default usePots;
