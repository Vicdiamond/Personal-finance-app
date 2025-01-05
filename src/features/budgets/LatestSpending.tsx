import { useNavigate } from "react-router-dom";
import { TransactionTypes } from "../../types/types";
import SpentItem from "./SpentItem";

function LatestSpending({
  latestSpentList,
}: {
  latestSpentList: TransactionTypes[];
}) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(
      `/transactions?category=${latestSpentList[0].category.toLowerCase()}`
    );
  }

  return (
    <div className="mt-4 bg-primaryBeige-100 rounded-lg p-4">
      <div className="flex justify-between items-center mb-5">
        <p className="text-textPreset3 font-[700] text-primaryGrey-900">
          Latest Spending
        </p>
        <button
          className="flex items-center gap-3 text-textPreset4 font-[400] text-primaryGrey-500"
          onClick={handleClick}
        >
          See all
          <img src="assets/images/icon-caret-right.svg" alt="" />
        </button>
      </div>

      <ul className="divide-y-[1px] divide-primaryGrey-500">
        {latestSpentList.map((transaction) => (
          <SpentItem key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </div>
  );
}

export default LatestSpending;
