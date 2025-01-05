import { TransactionTypes } from "../../types/types";
import Bill from "./Bill";
import BillHeader from "./BillHeader";
import FilterRecurringBills from "./FilterRecurringBills";

interface BillsProps {
  recurringBills: TransactionTypes[];
  recurringInput: {
    recurringSearchValue: string;
    setRecurringSearchValue: (value: string) => void;
    setRecurringSortValue: (value: string) => void;
  };
}

function Bills({ recurringBills, recurringInput }: BillsProps) {
  return (
    <div className="xl:flex-1 bg-white p-5 rounded-lg">
      <FilterRecurringBills recurringInput={recurringInput} />

      {recurringBills.length > 0 ? (
        <>
          <BillHeader />

          <div className={`xl:overflow-hidden   xl:w-full xl:h-[52vh] `}>
            <div className="xl:overflow-auto xl:h-full ">
              <div className="divide-y-2 divide-primaryGrey-200">
                {recurringBills.map((transaction: TransactionTypes) => (
                  <Bill key={transaction.id} transaction={transaction} />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center font-bold text-textPreset2 text-primaryGrey-900">
          No Bills Matched 😥
        </p>
      )}
    </div>
  );
}

export default Bills;
