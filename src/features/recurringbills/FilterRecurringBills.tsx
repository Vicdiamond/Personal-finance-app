import { useSearchParams } from "react-router-dom";
import { sortOptions } from "../../data/data";
import CustomDropdown from "../../ui/CustomDropdown";
import SearchInput from "../../ui/SearchInput";

interface FilterRecurringBillsProps {
  recurringInput: {
    recurringSearchValue: string;
    setRecurringSearchValue: (value: string) => void;
    setRecurringSortValue: (value: string) => void;
  };
}

function FilterRecurringBills({ recurringInput }: FilterRecurringBillsProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    recurringSearchValue,
    setRecurringSearchValue,
    setRecurringSortValue,
  } = recurringInput;
  return (
    <div className="flex items-center justify-between  mb-6 gap-5">
      <SearchInput
        value={recurringSearchValue}
        onChange={(e) => setRecurringSearchValue(e.target.value)}
      />

      <div>
        <CustomDropdown
          options={sortOptions}
          label="Sort by"
          onChange={(value) => {
            setRecurringSortValue(value);
            searchParams.set("sort", value);
            setSearchParams(searchParams);
          }}
        />
      </div>
    </div>
  );
}

export default FilterRecurringBills;
