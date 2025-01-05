import { useRef } from "react";
import { BudgetTypes, TransactionTypes } from "../../types/types";
import { useInView, motion } from "motion/react";

function SpentCategory({
  budgetCategory,
  budget,
}: {
  budgetCategory: TransactionTypes[];
  budget: BudgetTypes;
}) {
  const { theme, maximum } = budget;
  const totalSpent = budgetCategory.reduce(
    (acc, budget) => acc + Math.abs(budget.amount),
    0
  );

  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20px" });

  return (
    <motion.div
      className="flex justify-between items-center py-[14px]"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <p
        className="text-textPreset4 text-primaryGrey-500 font-[400] border-l-4 pl-4"
        style={{
          borderColor: theme,
        }}
      >
        {budgetCategory[0].category}
      </p>
      <p className="font-[400] text-textPreset5 text-primaryGrey-500">
        <span className="text-textPreset3 font-[700] text-primaryGrey-900">
          ${totalSpent}
        </span>{" "}
        of <span>${maximum}</span>
      </p>
    </motion.div>
  );
}

export default SpentCategory;
