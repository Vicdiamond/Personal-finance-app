import { PotTypes } from "../../types/types";
import { getColor } from "../../utils/helpers";
import { motion, useInView } from "motion/react";

import Button from "../../ui/Button";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ProgressBar from "../../ui/ProgressBar";
import AdjustPotBalance from "./AdjustPotBalance";
import CreatePot from "./CreatePot";
import DeletePot from "./DeletePot";
import useDeletePot from "./useDeletePot";
import { useRef } from "react";

function Pot({ pot }: { pot: PotTypes }) {
  const { id, name, target, total, theme } = pot;
  const { deletePot, isDeleting } = useDeletePot();

  const percentage = (total / target) * 100;
  const color = getColor(theme);

  const motionRef = useRef(null);
  const isInView = useInView(motionRef, { margin: "-20px" });

  return (
    <motion.div
      className="bg-white p-6 rounded-lg xl:max-w-[518px]"
      ref={motionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      exit={{ opacity: 0, y: 50 }}
    >
      <div className="flex justify-between items-center relative">
        <div className="flex items-center gap-4">
          <div
            className="w-5 h-5 rounded-full "
            style={{ backgroundColor: theme }}
          ></div>
          <p className="text-primaryGrey-900 text-textPreset2 font-bold">
            {name}
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

                <Menus.Window id={id} type="Pot" total={total} />
              </>
            </Menus>

            <Modal.Window name="Edit-Pot" title="Edit Pot">
              <CreatePot editingPot={pot} />
            </Modal.Window>

            <Modal.Window name="Delete-Pot" title={`Delete '${name}'`}>
              <DeletePot
                onConfirm={() => deletePot(id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </>
        </Modal>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center">
          <p className="text-primaryGrey-500 text-textPreset4">Total Saved</p>
          <p className="text-primaryGrey-900 text-textPreset1 font-bold">
            ${total}
          </p>
        </div>
        <ProgressBar value={total} type="pot" max={target} color={color} />

        <div className="flex justify-between items-center text-primaryGrey-500 mt-[13px]">
          <p className="font-[700]">{percentage.toFixed(2)}%</p>
          <p className="font-[400]">Target of ${target}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8 gap-4">
        <Modal>
          <>
            <Modal.Open opens="add-money">
              <Button type="primary">+Add Money</Button>
            </Modal.Open>
            <Modal.Window name="add-money" title={`Add to '${name}'`}>
              <AdjustPotBalance
                type="add"
                total={total}
                target={target}
                id={id}
              />
            </Modal.Window>

            <Modal.Open opens="withdraw-money">
              <Button type="primary">Withdraw</Button>
            </Modal.Open>
            <Modal.Window
              name="withdraw-money"
              title={`Withdraw from  '${name}'`}
            >
              <AdjustPotBalance
                type="subtract"
                total={total}
                target={target}
                id={id}
              />
            </Modal.Window>
          </>
        </Modal>
      </div>
    </motion.div>
  );
}

export default Pot;
