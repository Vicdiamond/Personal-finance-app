import { useRef } from "react";
import { TransactionTypes } from "../../types/types";
import { formatDateTime } from "../../utils/helpers";
import { motion, useInView } from "motion/react";

interface TransactionProps {
  transaction: TransactionTypes;
}

const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
  const { name, amount, category, date, avatar } = transaction;

  const isdebit = amount < 0;
  const { formattedDate } = formatDateTime(date);

  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20px" });

  return (
    <motion.div
      className="flex w-full items-center justify-center gap-[5.5px]"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <img src={avatar} className="h-8 w-8 rounded-full" alt="" />
      <div className="grid grid-cols-2 gap-1  md:grid-cols-4 flex-grow py-6">
        <p className="text-textPreset4 font-bold text-primaryGrey-900  col-span-1">
          {name}
        </p>

        <p className=" col-span-1 font-bold text-primaryGrey-900 text-textPreset4 text-end">
          {isdebit ? `-$${Math.abs(amount)}` : `$${amount}`}
        </p>

        <p className="text-textPreset5 text-primaryGrey-500 font-normal  col-span-1 md:col-start-2 md:row-start-1 md:text-center">
          {category}
        </p>

        <p className="text-textPreset5 text-primaryGrey-500 font-normal col-span-1 md:col-start-3 md:row-start-1 text-end md:text-center">
          {formattedDate}
        </p>
      </div>
    </motion.div>
  );
};

export default Transaction;
