import { useSearchParams } from "react-router-dom";
import { categoryOptions, sortOptions } from "../../data/data";
import CustomDropdown from "../../ui/CustomDropdown";
import SearchInput from "../../ui/SearchInput";

interface FilterTransactionsProps {
  filteredInputs: {
    searchedValue: string;
    setSerchedValue: (value: string) => void;
    handleSortInput: (value: string) => void;
    handleCategoryInput: (value: string) => void;
  };
}

function FilterTransactions({ filteredInputs }: FilterTransactionsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    searchedValue,
    setSerchedValue,
    handleSortInput,
    handleCategoryInput,
  } = filteredInputs;

  const defaultSortValue = sortOptions.filter(
    (option) => option.value === searchParams.get("sort")
  );
  const defaultCategoryValue = categoryOptions.filter(
    (option) => option.value === searchParams.get("category")
  );

  return (
    <div className="flex justify-between items-center">
      <div className="flex-1">
        <SearchInput
          value={searchedValue}
          onChange={(e: any) => {
            setSerchedValue(e.target.value);
            searchParams.set("page", "1");
            setSearchParams(searchParams);
          }}
        />
      </div>

      <div className="flex items-center justify-between ml-4 gap-5">
        <CustomDropdown
          options={sortOptions}
          label="Sort by"
          onChange={handleSortInput}
          defaultValue={defaultSortValue[0]?.label || sortOptions[0].label}
        />
        <CustomDropdown
          options={categoryOptions}
          label="Category"
          onChange={handleCategoryInput}
          defaultValue={
            defaultCategoryValue[0]?.label || categoryOptions[0].label
          }
        />
      </div>
    </div>
  );
}

export default FilterTransactions;
