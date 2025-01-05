import { useState, FC, useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { AnimatePresence, motion } from "motion/react";

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  label: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
}

const CustomDropdown: FC<CustomDropdownProps> = ({
  options,
  label,
  onChange,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(
    defaultValue || null
  );

  const handleOptionClick = (value: string, label: string) => {
    setSelectedLabel(label);
    setIsOpen(false);
    onChange?.(value);
  };
  const parentRef = useRef(null);
  const ref = useOutsideClick(label, label, () => setIsOpen(false), parentRef);

  return (
    <div className="relative md:w-full ">
      <div className="relative md:flex md:items-center md:text-nowrap">
        <p className="md:block hidden mr-2">{label}</p>
        <button
          type="button"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
          className=" md:border md:border-gray-300 rounded-lg md:shadow-sm md:px-4 md:py-2 md:flex items-center justify-between text-gray-700 cursor-pointer focus:outline-none md:max-w-none md:flex-grow "
          ref={parentRef}
        >
          <p className="hidden md:block">{selectedLabel || options[0].label}</p>

          <svg
            className={`w-5 h-5 transform transition-transform hidden md:block ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>

          {label.includes("Sort") ? (
            <img
              src="assets/images/icon-sort-mobile.svg"
              alt="sort"
              className="md:hidden  pointer-events-none "
            />
          ) : (
            <img
              src="assets/images/icon-filter-mobile.svg"
              alt="sort"
              className="md:hidden  pointer-events-none "
            />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="absolute  mt-2 bg-white border border-gray-300 rounded-lg shadow-lg right-0 divide-y-[1px] divide-gray-300 px-2 z-10 h-[200px] overflow-y-auto scrollbar-thin"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: -10 }}
            ref={ref}
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.value, option.label)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-nowrap"
              >
                {option.label}
              </div>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDropdown;
