import { useInView } from "motion/react";
import { TransactionTypes } from "../../types/types";
import { formatDateTime } from "../../utils/helpers";
import { useRef } from "react";
import { motion } from "motion/react";

function Bill({ transaction }: { transaction: TransactionTypes }) {
  const { name, avatar, amount, date } = transaction;

  const { formattedDate, formattedTime } = formatDateTime(date);
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20px" });

  return (
    <motion.div
      className="py-4 md:flex justify-between items-center"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center gap-4 mb-2 md:flex-1 md:mb-0">
        <img src={avatar} className="w-8 h-8 rounded-full" alt="icon" />
        <p className="text-textPreset4 font-bold text-primaryGrey-900">
          {name}
        </p>
      </div>

      <div className="flex justify-between md:flex-1 items-center">
        <p className="text-secondary-green flex items-center gap-1 text-textPreset5 font-normal">
          {formattedDate}, {formattedTime}
          <span>
            <img src="assets/images/icon-bill-paid.svg" alt="paid" />
          </span>
        </p>
        <p className="text-textPreset4 font-bold">${Math.abs(amount)}</p>
      </div>
    </motion.div>
  );
}

export default Bill;
