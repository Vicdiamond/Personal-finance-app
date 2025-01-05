import { TransactionTypes } from "../../types/types";
import { motion } from "motion/react";

function RecurringBillsHeaderSummary({
  recurringBills,
}: {
  recurringBills: TransactionTypes[];
}) {
  const totalAmount = recurringBills.reduce(
    (total: number, transaction: TransactionTypes) =>
      total + Math.abs(transaction.amount),
    0
  );
  return (
    <motion.div className="flex flex-col gap-3 md:flex-row md:gap-6 xl:flex-col xl:flex-1 mb-6 xl:max-w-[337px] xl:mb-0">
      <motion.div
        className="bg-primaryGrey-900 text-white pl-5 py-6 flex items-center gap-5 rounded-lg  md:flex-1 md:flex-col md:items-start md:justify-between xl:max-h-[190px]"
        initial={{ x: 50 }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="mt-4 xl:mb-7">
          <img src="assets/images/icon-recurring-bills.svg" alt="logo" />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-textPreset4 font-normal">Total Bills</p>
          <p className="text-textPreset1 font-bold">
            ${totalAmount.toFixed(2)}
          </p>
        </div>
      </motion.div>

      <motion.div
        className="bg-white p-5 rounded-lg md:flex-1 xl:max-h-[204px]"
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h3 className="text-textPreset3 font-bold text-primaryGrey-900">
          Summary
        </h3>
        <div className="mt-5">
          <ul className="divide-y-2 divide-primaryGrey-100">
            <li className="pb-4 flex justify-between  items-center">
              <p className="text-textPreset5 font-normal text-primaryGrey-500">
                Paid Bills
              </p>
              <p className="font-bold text-textPreset5">2 {`($320.00)`}</p>
            </li>
            <li className="py-4 flex justify-between  items-center">
              <p className="text-textPreset5 font-normal text-primaryGrey-500">
                Total Upcoming
              </p>
              <p className="font-bold text-textPreset5">2 {`($320.00)`}</p>
            </li>
            <li className="pt-4 flex justify-between  items-center text-secondary-red">
              <p className="text-textPreset5 font-normal ">Due Soon</p>
              <p className="font-bold text-textPreset5">2 {`($320.00)`}</p>
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default RecurringBillsHeaderSummary;
