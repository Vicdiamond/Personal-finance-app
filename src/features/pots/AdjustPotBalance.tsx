import { useState } from "react";
import AdjustPotBalanceProgBar from "./AdjustPotBalanceProgBar";
import Button from "../../ui/Button";
import useBalance from "../dashboard/useBalance";
import toast from "react-hot-toast";
import useAdjustPotBalance from "./useAdjustPotBalance";
import SpinnerMini from "../../ui/SpinnerMini";

interface AdjustPotBalanceProps {
  type: string;
  total: number;
  target: number;
  id: string;
  onCloseModal?: () => void;
}

function AdjustPotBalance({
  type,
  total,
  target,
  id,
  onCloseModal,
}: AdjustPotBalanceProps) {
  const [adjustingValue, setAdjustingValue] = useState(0);
  const { balance } = useBalance();

  const isAdding = type === "add";

  const { adjustPotBalance, isAdjusting } = useAdjustPotBalance(
    isAdding,
    balance,
    adjustingValue,
    id
  );

  function adjustBalance() {
    if (!adjustingValue) return;

    if (isAdding && balance.current < adjustingValue) {
      return toast.error("Insufficient balance");
    }

    if (!isAdding && total < adjustingValue) {
      return toast.error("Insufficient pot balance");
    }

    adjustPotBalance(undefined, {
      onSuccess: () => {
        onCloseModal?.();
      },
    });
  }

  const description = isAdding
    ? "Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current. "
    : "Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot.";

  return (
    <div className="mt-5">
      <p className="text-primaryGrey-500 text-textPreset4 font-normal">
        {description}
      </p>
      <AdjustPotBalanceProgBar
        savedValue={total}
        adjustingValue={adjustingValue}
        target={target}
        isAdding={isAdding}
      />

      <div className="mt-5">
        <label htmlFor="">Amount to {isAdding ? "Add" : "Withdraw"}</label>
        <input
          type="number"
          className="border border-primaryGrey-300 rounded-lg m py-3 px-5 mt-1 w-full"
          placeholder="$"
          value={adjustingValue}
          onChange={(e) => setAdjustingValue(Number(e.target.value))}
        />
      </div>

      <Button
        type="secondary"
        className="mt-5 w-full"
        onClick={adjustBalance}
        disabled={isAdjusting}
      >
        {isAdjusting ? (
          <SpinnerMini />
        ) : (
          `Confirm ${isAdding ? "Addition" : "Withdrawal"}`
        )}
      </Button>
    </div>
  );
}
export default AdjustPotBalance;
