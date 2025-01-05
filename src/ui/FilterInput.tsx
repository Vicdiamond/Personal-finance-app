import React from "react";

interface FilterInputProps {
  label: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({
  label,
  options,
  defaultValue = "",
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="relative flex items-center gap-3 ml-4">
      <p className="text-textPreset4 text-primaryGrey-500 font-normal text-nowrap hidden md:block">
        {label}
      </p>
      <select
        id="sort"
        defaultValue={defaultValue}
        onChange={handleChange}
        className=" md:border md:border-primaryGrey-500 outline-none md:rounded-lg md:py-3 md:pr-8 md:pl-4 p-0 text-sm md:focus:outline-none md:focus:ring-2 focus:ring-blue-500  "
      >
        <option value="option" disabled selected></option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <img
        src="/images/icon-arrow-down.png"
        alt="sort"
        className=" absolute right-2 top-1/2 -translate-y-1/2 hidden md:block pointer-events-none"
      />

      {label.includes("Sort") ? (
        <img
          src="/images/icon-sort-mobile.svg"
          alt="sort"
          className="  absolute right-4 top-1/2 -translate-y-1/2 md:hidden -z-0 pointer-events-none flex-1"
        />
      ) : (
        <img
          src="/images/icon-filter-mobile.svg"
          alt="sort"
          className="h-[15px] w-[15px]  absolute right-4 top-1/2 -translate-y-1/2 md:hidden pointer-events-none"
        />
      )}
    </div>
  );
};

export default FilterInput;
