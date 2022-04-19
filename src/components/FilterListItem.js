import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const FilterListItem = ({ optionItem, removeFromFilterList }) => {
  return (
    <div className="filter-list-item-container">
      <div>
        <p>{optionItem.name}</p>
      </div>
      <AiOutlineClose
        className="filter-list-close"
        onClick={() => {
          removeFromFilterList(optionItem);
        }}
      />
    </div>
  );
};

export default FilterListItem;
