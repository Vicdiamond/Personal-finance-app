import { AnimatePresence } from "motion/react";
import { PotTypes } from "../../types/types";
import Loader from "../../ui/Loader";
import Pot from "./Pot";
import usePots from "./usePots";

function PotsList() {
  const { pots, isLoading } = usePots();
  if (isLoading) return <Loader />;

  return (
    <div className="grid xl:grid-cols-2 min-[1495px]:grid-cols-3 gap-6 w-full">
      {pots.length === 0 && (
        <p className="text-primaryGrey-900 text-textPreset2 font-bold">
          No pots yet
        </p>
      )}

      <AnimatePresence>
        {pots.map((pot: PotTypes) => (
          <Pot key={pot.id} pot={pot} />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default PotsList;
