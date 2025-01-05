import { useQuery } from "@tanstack/react-query";
import { getData } from "../../utils/helpers";

function useBalance() {
  const {
    data: balance,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getData("balance"),
    queryKey: ["balance"],
  });

  if (error) throw new Error("Could not get balance");

  return { balance, isLoading };
}

export default useBalance;
