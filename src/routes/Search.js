import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CATEGORY } from "../filters/categories";
import FilterListItem from "../components/FilterListItem";
import FilterOptions from "../components/FilterOptions";
import { AGE, COAT, GENDER, SIZE, STATUS } from "../filters/constants";
import { getTypes } from "../api/PetFinderService";

const Search = () => {
  const { state } = useLocation();

  /**
   * Filters
   */
  const [distance, setDistance] = useState("");
  const [location, setLocation] = useState("");

  const [type, setType] = useState("");
  const [typeOptions, setTypeOptions] = useState([]);
  const [breed, setBreed] = useState([]);
  const [breedOptions, setBreedOptions] = useState([]);
  const [gender, setGender] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState("");
  const [colotOptions, setColorOptions] = useState([]);
  const [coat, setCoat] = useState([]);
  const [coatOptions, setCoatOptions] = useState([]);
  const [status, setStatus] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [organizationOptions, setOrganizationOptions] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortOptions, setSortOptions] = useState([]);

  /**
   * Category Options (boolean)
   */
  const [goodWithDogs, setGoodWithDogs] = useState(false);
  const [goodWithCats, setGoodWithCats] = useState(false);
  const [houseTrained, setHouseTrained] = useState(false);
  const [declawed, setDeclawed] = useState(false);
  const [specialNeeds, setSpecialNeeds] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState(CATEGORY);

  const [filterList, setFilterList] = useState([]);
  const storage = window.localStorage;

  useEffect(() => {
    if (state.species) {
      console.log(state.species);
      setType(state.species);
      setFilterList([
        ...[
          {
            name: state.species,
            active: true,
            code: "dog",
          },
        ],
      ]);
    }
  }, []);

  useEffect(() => {
    console.log(storage.getItem("pet-types"));
    const petTypes = JSON.parse(storage.getItem("pet-types"));
    if (!petTypes || Date.now() > Number(petTypes.expires)) {
      getTypes()
        .then((result) => {
          const types = result.data.data.types;
          const typeStore = {
            expires: Date.now() + 259200, //Expires in 3 days,
            types: types,
          };
          storage.setItem("pet-types", JSON.stringify(typeStore));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log(petTypes);
    }
  }, []);

  const removeFromFilterList = (optionItem) => {
    const temp = filterList.filter((item) => item.name !== optionItem.name);
    optionItem.active = false;
    setFilterList(temp);
  };

  const addToFilter = (optionItem) => {
    console.log(filterList);
    setFilterList((array) => [...array, optionItem]);
  };

  const updateFilterList = (add, remove) => {
    let temp = filterList;
    if (remove) {
      temp = filterList.filter((item) => item.name !== remove.name);
      remove.active = false;
    }
    setFilterList([...temp, add]);
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <div className="filter-summary">
          <p>View All Adoptable {type ? type : "Pet"}s</p>
          <div className="location-specification">
            {location ? (
              <p>Within 100 miles of None</p>
            ) : (
              <p>No location set</p>
            )}
            <p className="location-edit-link">Edit</p>
          </div>
        </div>

        <div className="filter-container">
          <h1>Filters</h1>
          <div className="filter-list">
            {filterList.length <= 0 ? (
              <p>No filters selected</p>
            ) : (
              filterList.map((filter, index) => {
                return (
                  <FilterListItem
                    key={index}
                    optionItem={filter}
                    removeFromFilterList={removeFromFilterList}
                  />
                );
              })
            )}
          </div>

          <div className="filter-options">
            <FilterOptions
              name="Size"
              options={SIZE}
              multipleValues={true}
              addToFilter={updateFilterList}
              removeFromFilter={removeFromFilterList}
            />
            <FilterOptions
              name="Gender"
              options={GENDER}
              multipleValues={true}
              addToFilter={updateFilterList}
              removeFromFilter={removeFromFilterList}
            />
            <FilterOptions
              name="Age"
              options={AGE}
              multipleValues={true}
              addToFilter={updateFilterList}
              removeFromFilter={removeFromFilterList}
            />
            <FilterOptions
              name="Coat"
              options={COAT}
              multipleValues={true}
              addToFilter={updateFilterList}
              removeFromFilter={removeFromFilterList}
            />
            <FilterOptions
              name="Status"
              options={STATUS}
              multipleValues={true}
              addToFilter={updateFilterList}
              removeFromFilter={removeFromFilterList}
            />
            <FilterOptions
              name="Trait"
              options={CATEGORY}
              multipleValues={true}
              addToFilter={updateFilterList}
              removeFromFilter={removeFromFilterList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
