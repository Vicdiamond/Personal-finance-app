interface AdjustPotBalanceProgBarProps {
  savedValue: number;
  adjustingValue: number;
  target: number;
  isAdding: boolean;
}

const AdjustPotBalanceProgBar = ({
  savedValue,
  adjustingValue,
  target,
  isAdding,
}: AdjustPotBalanceProgBarProps) => {
  const total = isAdding
    ? savedValue + adjustingValue
    : savedValue - adjustingValue;

  const percentage1 = isAdding
    ? (savedValue / target) * 100
    : (total / target) * 100;

  const percentage2 = isAdding
    ? (total / target) * 100 - percentage1
    : ((savedValue - total) / target) * 100;

  // console.log(percentage1, percentage2);
  return (
    <>
      <div className="flex items-center justify-between mt-5 mb-4">
        <p className="text-primaryGrey-500 text-textPreset4 font-normal">
          New Amount
        </p>
        <p className="font-bold text-textPreset1 text-primaryGrey-900">
          ${total < 0 ? 0 : total}
        </p>
      </div>

      <div className="flex h-2 w-full bg-gray-200 rounded-lg overflow-hidden">
        {/* First Segment */}
        <div
          className={`${percentage1 < 0 ? "bg-secondary-red" : "bg-black"}`}
          style={{ width: `${percentage1}%` }}
        ></div>
        {/* Second Segment */}
        <div
          className={`${
            isAdding ? "bg-secondary-green" : "bg-secondary-red"
          }  ml-[2px] rounded-r-lg`}
          style={{ width: `${percentage1 < 0 ? 0 : percentage2}%` }}
        ></div>
      </div>

      <div className="flex items-center justify-between mt-[13px]">
        <p
          className={`${
            isAdding ? "text-secondary-green" : "text-secondary-red"
          } text-secondary-green font-bold text-textPreset5`}
        >
          {isAdding
            ? (percentage1 + percentage2).toFixed(2)
            : percentage1.toFixed(2)}
          %
        </p>
        <p className="text-textPreset5 text-primaryGrey-500 font-normal">
          Target of ${target}
        </p>
      </div>
    </>
  );
};

export default AdjustPotBalanceProgBar;
