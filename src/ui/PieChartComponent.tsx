import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { BudgetTypes, TransactionTypes } from "../types/types";
import { capitalizeWords } from "../utils/helpers";

interface PieChartComponentTypes {
  budgetTransactions: Record<string, TransactionTypes[]>;
  budgets: BudgetTypes[];
}

function PieChartComponent({
  budgets,
  budgetTransactions,
}: PieChartComponentTypes) {
  const data = Object.keys(budgetTransactions).reduce(
    (
      acc: { category: string; totalSpent: number; theme: string }[],
      category: string
    ) => {
      const totalSpent = budgetTransactions[category].reduce(
        (acc, transaction) => acc + Math.abs(transaction.amount),
        0
      );
      const theme =
        budgets.find((budget) => budget.category.toLowerCase() === category)
          ?.theme || "";

      acc.push({ category: capitalizeWords(category), totalSpent, theme });

      return acc;
    },
    []
  );

  const totalSpent = data.reduce((acc, entry) => acc + entry.totalSpent, 0);
  const totalMaximum = budgets.reduce((acc, budget) => acc + budget.maximum, 0);

  return (
    <div className="relative flex-1 p-0">
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="category"
            dataKey="totalSpent"
            innerRadius={70}
            outerRadius={120}
            paddingAngle={0}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.theme}
                stroke={entry.theme}
              />
            ))}
          </Pie>

          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className=" font-bold text-textPreset1 text-primaryGrey-900 text-wrap"
          >
            ${totalSpent.toFixed(0)}
          </text>
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            dominantBaseline="middle"
            className=" text-textPreset5 text-primaryGrey-500 font-normal "
          >
            of ${totalMaximum} limit
          </text>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="bg-white opacity-20 absolute w-40 h-40 flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full "></div>
    </div>
  );
}

export default PieChartComponent;
