import React, { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";

/**
 * Select options for a filter.
 *
 * @param {array} options options for this filter
 * @param {boolean} multipleValues true if this options allows
 * multiple values to be selected
 * @param {function} remove filter variable to clear
 * @param {boolean} isBool true if filter variable is a boolean
 * or false if it is a string
 * @returns FilterOptions
 */
const FilterOptions = ({
  name,
  options,
  multipleValues,
  addToFilter,
  removeFromFilter,
}) => {
  const optionsBox = useRef(null);
  const [optionsVisible, setOptionsVisible] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (optionsBox.current && !optionsBox.current.contains(event.target))
        setOptionsVisible(false);
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const openOptions = () => {
    setOptionsVisible(true);
  };

  const handleClickOption = (optionItem) => {
    let remove = undefined;
    let add = undefined;
    if (!optionItem.active) {
      options.forEach((option) => {
        if (!multipleValues && option.active) {
          remove = option;
        }

        if (option.name === optionItem.name) {
          option.active = true;
          add = option;
        }
      });
      addToFilter(add, remove);
    }
  };

  return (
    <div>
      <div className="select-container" onClick={openOptions} ref={optionsBox}>
        <p>{name}</p>
        <BsChevronDown size={11} />
        <div
          className={`options-list ${optionsVisible && "options-list-open"}`}
        >
          {options.map((option, index) => {
            return (
              <div
                key={index}
                className="option-list-items"
                onClick={() => {
                  handleClickOption(option);
                }}
              >
                <p>{option.name}</p>
                {option.active && (
                  <AiFillCheckCircle size={13} color="#5199FF" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
