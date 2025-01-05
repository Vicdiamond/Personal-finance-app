import { useState } from "react";
import { colorOptions } from "../data/data";

function ColorDropdown({
  usedColors,
  defaultColor,
  getColor,
}: {
  usedColors: string[];
  defaultColor?: string;
  getColor?: (color: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const currentColor = colorOptions.find(
    (color) => color.value === defaultColor?.toLowerCase()
  );
  const availableColors = colorOptions.filter(
    (color) => !usedColors.includes(color.value.toLowerCase())
  );

  const [selectedColor, setSelectedColor] = useState(
    currentColor?.label || availableColors[0].label
  );
  const [selectedColorValue, setSelectedColorValue] = useState(
    currentColor?.value || availableColors[0].value
  );

  // console.log(availableColors);

  getColor?.(selectedColorValue);

  function handleClick(value: string, label: string) {
    setSelectedColor(label);
    setSelectedColorValue(value);
    setIsOpen(false);
  }

  return (
    <div className="relative w-full ">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="border border-primaryGrey-500 rounded-lg  px-5 py-3 flex items-center justify-between text-gray-700 cursor-pointer focus:outline-none w-full"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-4 h-4 rounded-full `}
            style={{
              backgroundColor: selectedColorValue,
            }}
          ></div>
          <p className="">{selectedColor}</p>
        </div>
        <svg
          className={`w-5 h-5 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          } `}
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
      </button>

      {isOpen && (
        <div className="absolute mt-2 bg-white border border-gray-300 rounded-lg shadow-lg right-0 divide-y-[1px] divide-gray-100 px-2 w-full max-h-[160px] overflow-y-auto">
          {colorOptions.map((option) => (
            <button
              className={`flex gap-2 hover:bg-gray-100  px-4 py-3 items-center justify-between w-full ${
                usedColors.includes(option.value)
                  ? "hover:cursor-not-allowed"
                  : ""
              } `}
              disabled={usedColors.includes(option.value)}
              key={option.value}
              onClick={() => handleClick(option.value, option.label)}
            >
              <div className="flex items-center gap-3 ">
                <div
                  className="w-4 h-4 rounded-full  "
                  style={{ backgroundColor: option.value }}
                ></div>
                <p
                  className={`text-textPreset4 font-normal ${
                    usedColors.includes(option.value)
                      ? "text-primaryBeige-500"
                      : "text-primaryGrey-900 "
                  } `}
                >
                  {option.label}
                </p>
              </div>

              {usedColors.includes(option.value) && (
                <p className="text-textPreset5 font-normal text-primaryBeige-500">
                  Already Used
                </p>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ColorDropdown;
