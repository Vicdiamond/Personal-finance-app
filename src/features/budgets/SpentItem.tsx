import { TransactionTypes } from "../../types/types";
import { formatDateTime } from "../../utils/helpers";

function SpentItem({ transaction }: { transaction: TransactionTypes }) {
  const { amount, date, avatar, name } = transaction;

  const { formattedDate, formattedTime } = formatDateTime(date);
  // console.log(formattedDate);
  return (
    <li className="flex justify-between items-center py-3 ">
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          className="hidden md:block w-8 h-8 rounded-full"
          alt="avatar"
        />
        <p className="text-textPreset5 font-[700] text-primaryGrey-900">
          {name}
        </p>
      </div>

      <div className="flex flex-col items-end">
        <p className="text-textPreset5 font-[700] text-primaryGrey-900 mb-1">
          -${Math.abs(amount)}
        </p>
        <p className="text-textPreset5 font-[400] text-primaryBeige-500">
          {formattedDate}, {formattedTime}
        </p>
      </div>
    </li>
  );
}

export default SpentItem;
