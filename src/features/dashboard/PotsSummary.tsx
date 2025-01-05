import { PotTypes } from "../../types/types";
import SummariesContainer from "../../ui/SummariesContainer";
import SummariesHeader from "../../ui/SummariesHeader";
import SummaryHighlight from "../../ui/SummaryHighlight";

function PotsSummary({ pots }: { pots: PotTypes[] }) {
  const totalSaved = pots.reduce(
    (acc: number, pot: PotTypes) => acc + pot.total,
    0
  );

  const potsBrief = pots.slice(0, 5);
  return (
    <SummariesContainer
      className="row-start-1 row-end-4"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <SummariesHeader title="Pots" buttonText="See details" to="/pots" />

      <div className="mt-5 md:flex items-center justify-between md:gap-4 xl:justify-start">
        <div className="flex items-center gap-4 bg-primaryBeige-100 rounded-lg px-4 py-5 md:flex-1 xl:max-w-[247px] ">
          <img src="assets/images/icon-pot.svg" alt="" />
          <div className="space-y-3">
            <p className="font-normal text-textPreset4 text-primaryGrey-500">
              Total Saved
            </p>
            <p className="text-textPreset1 font-bold text-primaryGrey-900">
              ${totalSaved}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 md:flex-1 items-center md:mt-0 xl:flex-none">
          {potsBrief.map((pot: PotTypes) => (
            <SummaryHighlight
              key={pot.id}
              header={pot.name}
              price={`${pot.total}`}
              color={pot.theme}
            />
          ))}
        </div>
      </div>
    </SummariesContainer>
  );
}

export default PotsSummary;
