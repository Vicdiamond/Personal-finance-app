import { useState } from "react";

interface SelectInputProps {
  defaultValue?: string;
  onGetValue?: (selected: string) => void;
  options: { value: string; label: string }[];
}

function SelectInput({ defaultValue, onGetValue, options }: SelectInputProps) {
  const [selected, setSelected] = useState(defaultValue || options[0].value);
  // console.log(options);

  onGetValue?.(selected);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelected(e.target.value);
  }
  return (
    <div className="relative mt-1">
      <select
        id="sort"
        value={selected}
        onChange={handleChange}
        className=" border border-primaryGrey-500 rounded-lg py-3 focus:ring-2 focus:ring-offset-primaryGrey-500 w-full  px-5 outline-none !text-black"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <img
        src="assets/images/icon-arrow-down.png"
        alt="sort"
        className=" absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none"
      />
    </div>
  );
}

export default SelectInput;
