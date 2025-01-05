import { TransactionTypes } from "../../types/types";
import { formatDateTime } from "../../utils/helpers";

function TransactionHighlight({
  transaction,
}: {
  transaction: TransactionTypes;
}) {
  const { name, amount, date, avatar } = transaction;

  const { formattedDate } = formatDateTime(date);
  const isdebit = amount < 0;
  return (
    <li className="flex items-center justify-between py-5">
      <div className="flex items-center justify-center gap-4">
        <img src={avatar} alt="icon" className="w-8 h-8 rounded-full" />
        <p>{name}</p>
      </div>

      <div className="space-y-2">
        <p
          className={`text-end text-textPreset4 font-bold ${
            isdebit ? "text-primaryGrey-900" : "text-secondary-green"
          }`}
        >
          {amount < 0 ? `-$${Math.abs(amount)}` : `+$${amount}`}
        </p>
        <p className="text-textPreset5 text-primaryGrey-500 font-normal text-end">
          {formattedDate}
        </p>
      </div>
    </li>
  );
}

export default TransactionHighlight;
