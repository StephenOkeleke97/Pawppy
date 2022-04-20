import React, { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import ReactTooltip from "react-tooltip";

/**
 * Select options for a filter.
 *
 * @param {array} options options for this filter
 * @param {boolean} multipleValues true if this options allows
 * multiple values to be selected
 * @param {function} remove filter variable to clear
 * @param {boolean} isBool true if filter variable is a boolean
 * or false if it is a string
 * @param {function} setSingleFilter required only when multiple value is false.
 * @param {boolean} dependsOnType true if an option's value if based
 * on the type of animal
 * @param {string} type animal type
 * @returns FilterOptions
 */
const FilterOptions = ({
  name,
  options,
  multipleValues,
  addToFilter,
  setSingleFilter,
  dependsOnType,
  type,
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
    let add = optionItem;
    if (!multipleValues) setSingleFilter(optionItem.code);
    if (!optionItem.active) {
      options.forEach((option) => {
        if (!multipleValues && option.active) {
          remove = option;
        }
      });
      addToFilter(add, remove);
    }
  };

  return (
    <>
      <div
        className="select-container"
        onClick={openOptions}
        ref={optionsBox}
        data-tip={dependsOnType && !type ? "Type is Required" : ""}
      >
        <p>{name}</p>
        <BsChevronDown size={11} />
        <div
          className={`options-list ${
            optionsVisible && !(dependsOnType && !type) && "options-list-open"
          }`}
        >
          {options && options.length <= 0 ? (
            <div className="option-list-items">
              <p>Loading...</p>
            </div>
          ) : (
            options.map((option, index) => {
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
            })
          )}
        </div>
      </div>
      <ReactTooltip effect="solid" />
    </>
  );
};

export default FilterOptions;
