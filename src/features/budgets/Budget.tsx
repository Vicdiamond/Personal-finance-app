import { useRef } from "react";
import { colors } from "../../data/data";
import { BudgetTypes, TransactionTypes } from "../../types/types";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ProgressBar from "../../ui/ProgressBar";
import CreateBudget from "./CreateBudget";
import DeleteBudget from "./DeleteBudget";
import LatestSpending from "./LatestSpending";
import useDeleteBudget from "./useDeleteBudget";
import { motion, useInView } from "motion/react";

interface BudgetProps {
  budget: BudgetTypes;
  transactions: TransactionTypes[];
  onCloseModal?: () => void;
}

function Budget({ budget, transactions, onCloseModal }: BudgetProps) {
  const { deleteBudget, isDeleting } = useDeleteBudget();
  const { category, maximum, theme, id } = budget;

  const color = colors.filter((color) => {
    if (color.value === theme.toLowerCase()) {
      return color.value;
    }
  })[0].name;

  const totalSpent = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalRemaining = maximum - Math.abs(totalSpent);
  const latestSpentList = transactions.slice(0, 3);

  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20px" });

  return (
    <motion.div
      className="bg-white  p-6 rounded-lg xl:max-w-[518px] mb-6"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      exit={{ opacity: 0, y: 50 }}
    >
      <div className="flex justify-between items-center mb-5 relative">
        <div className="flex items-center gap-4 ">
          <div
            className="w-5 h-5 rounded-full  "
            style={{ backgroundColor: theme }}
          ></div>
          <p className="text-primaryGrey-900 text-textPreset2 font-bold ">
            {category}
          </p>
        </div>

        <Modal>
          <>
            <Menus>
              <>
                <Menus.Open id={id}>
                  <button className="p-3">
                    <img src="assets/images/icon-ellipsis.svg" alt="ellipsis" />
                  </button>
                </Menus.Open>

                <Menus.Window id={id} type="Budget" />
              </>
            </Menus>

            <Modal.Window name="Edit-Budget" title="Edit Budget">
              <CreateBudget editingBudget={budget} />
            </Modal.Window>

            <Modal.Window name="Delete-Budget" title={`Delete '${category}'`}>
              <DeleteBudget
                onCloseModal={() => onCloseModal}
                onConfirm={() => deleteBudget(id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </>
        </Modal>
      </div>

      <p className="font-[400] text-textPreset4 text-primaryGrey-500">
        Maximum of ${maximum}
      </p>

      <ProgressBar
        value={Math.abs(totalSpent)}
        type="budget"
        color={color}
        max={maximum}
      />

      <div className="flex justify-start mt-4 items-start">
        <div
          className="flex-1 border-l-4 pl-4 border-secondary-green space-y-2"
          style={{ borderColor: theme }}
        >
          <p className="text-textPreset5 font-[400] text-primaryGrey-500">
            Spent
          </p>
          <p className="text-textPreset4 font-[700] text-primaryGrey-900">
            ${Math.abs(totalSpent).toFixed(2)}
          </p>
        </div>
        <div className="flex-1 border-l-4 pl-4 border-primaryBeige-100 space-y-2">
          <p className="text-textPreset5 font-[400] text-primaryGrey-500">
            {totalRemaining < 0 ? "Overspent" : "Free"}
          </p>
          <p className="text-textPreset4 font-[700] text-primaryGrey-900">
            ${Math.abs(totalRemaining).toFixed(2)}
          </p>
        </div>
      </div>

      <LatestSpending latestSpentList={latestSpentList} />
    </motion.div>
  );
}

export default Budget;
