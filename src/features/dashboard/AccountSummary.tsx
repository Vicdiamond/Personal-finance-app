import { formatNumber } from "../../utils/helpers";
import useBalance from "./useBalance";
import { motion } from "motion/react";

function AccountSummary() {
  const { balance, isLoading } = useBalance();

  if (isLoading) return null;

  const { current, income, expenses } = balance;

  const accountAnimate = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
  };

  return (
    <div className="flex flex-col md:flex-row gap-3  items-center justify-between">
      <motion.div
        className="bg-primaryGrey-900 text-white rounded-lg p-4 space-y-3 w-full"
        {...accountAnimate}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="text-textPreset4 font-normal">Current balance</p>
        <p className="text-textPreset1 font-bold">${formatNumber(current)}</p>
      </motion.div>

      <motion.div
        className="bg-white text-white rounded-lg p-4 space-y-3 w-full"
        {...accountAnimate}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        <p className="text-textPreset4 font-normal text-primaryGrey-500">
          Income
        </p>
        <p className="text-textPreset1 font-bold text-primaryGrey-900">
          ${formatNumber(income)}
        </p>
      </motion.div>

      <motion.div
        className="bg-white text-white rounded-lg p-4 space-y-3 w-full"
        {...accountAnimate}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
      >
        <p className="text-textPreset4 font-normal text-primaryGrey-500">
          Expenses
        </p>
        <p className="text-textPreset1 font-bold text-primaryGrey-900">
          ${formatNumber(expenses)}
        </p>
      </motion.div>
    </div>
  );
}

export default AccountSummary;
