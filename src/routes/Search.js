import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTrait } from "../filters/categories";
import FilterListItem from "../components/FilterListItem";
import FilterOptions from "../components/FilterOptions";
import {
  AGE,
  COAT,
  GENDER,
  getAge,
  getCoat,
  getColors,
  getGender,
  getSize,
  getStatus,
  // SIZE,
  STATUS,
  transformBreeds,
  transformOrganizations,
  transformType,
} from "../filters/constants";
import { getBreed, getOrganizations, getTypes } from "../api/PetFinderService";
import Button from "../components/Button";
import { getActiveFilter, getTraitActive } from "../filters/activeFilters";

const Search = () => {
  const { state } = useLocation();

  /**
   * Filters
   */
  const [distance, setDistance] = useState("");
  const [location, setLocation] = useState("");

  const [type, setType] = useState("");
  const [typeOptions, setTypeOptions] = useState([]);
  const [breedOptions, setBreedOptions] = useState([]);
  const [color, setColor] = useState("");
  const [colorOptions, setColorOptions] = useState([]);
  const [sizeOptions] = useState(getSize());
  const [genderOptions] = useState(getGender());
  const [ageOptions] = useState(getAge());
  const [coatOptions] = useState(getCoat());
  const [statusOptions] = useState(getStatus());
  const [traitOptions] = useState(getTrait());
  const [organizationOptions, setOrganizationOptions] = useState([]);

  const [filterList, setFilterList] = useState([]);
  const storage = window.localStorage;
  const sessionStorage = window.sessionStorage;

  /**
   * Set type to type or species from
   * navigation source when page mounts only
   * if the filter list in session storage is empty.
   * If navigation source did not specify type,
   * do nothing.
   */
  useEffect(() => {
    if (state.species) {
      typeOptions.forEach((type) => {
        if (type.code.toLowerCase() === state.species.toLowerCase()) {
          const filter = sessionStorage.getItem("filter");
          if (!filter) {
            setType(state.species);
            type.active = true;
            setFilterList([...[type]]);
          }
        }
      });
      // console.log(state.species);
      // setType(state.species);
      // setFilterList([
      //   ...[
      //     {
      //       name: state.species,
      //       active: true,
      //       code: state.species,
      //     },
      //   ],
      // ]);
    }
  }, [typeOptions]);

  /**
   * Get animal types on component mount
   * and store it in local storage with an
   * expiry time 3 days into the future.
   * If types already exist in local storage
   * and have not expired, simply retrieve type from
   * local storage.
   */
  useEffect(() => {
    const petTypes = JSON.parse(storage.getItem("pet-types"));
    if (!petTypes || Date.now() > Number(petTypes.expires)) {
      getTypes()
        .then((result) => {
          const types = result.data.types;
          const typeStore = {
            expires: Date.now() + 259200 * 1000, //Expires in 3 days,
            types: types,
          };
          storage.setItem("pet-types", JSON.stringify(typeStore));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const types = transformType(petTypes.types);
      setTypeOptions(types);
    }
  }, []);

  /**
   * Get shelter organizations on component mount
   * and store it in local storage with an
   * expiry time 3 days into the future.
   * If organizations already exist in local storage
   * and have not expired, simply retrieve it from
   * local storage.
   */
  useEffect(() => {
    const organizationsStore = JSON.parse(storage.getItem("organizations"));
    if (
      !organizationsStore ||
      Date.now() > Number(organizationsStore.expires)
    ) {
      getOrganizations()
        .then((result) => {
          console.log(result);
          const organizations = result.data.organizations;
          const organizationsStore = {
            expires: Date.now() + 259200 * 1000, //Expires in 3 days,
            organizations: organizations,
          };
          storage.setItem("organizations", JSON.stringify(organizationsStore));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const organizations = transformOrganizations(
        organizationsStore.organizations
      );
      setOrganizationOptions(organizations);
    }
  }, []);

  /**
   * Get the breed and color of an animal type everytime
   * type changes because these attributes are dependent
   * on the type.
   */
  useEffect(() => {
    if (type) {
      getBreed(type)
        .then((result) => {
          const breeds = transformBreeds(result.data.breeds);
          setBreedOptions(breeds);
        })
        .catch((error) => {
          console.log(error);
        });

      const colors = getColors(type, typeOptions);
      setColorOptions(colors);
    }
  }, [type]);

  useEffect(() => {
    let filterFromStorage = sessionStorage.getItem("filter");
    if (filterFromStorage) {
      const filter = JSON.parse(filterFromStorage);
      loadType(filter);
      loadSize(filter);
      loadGender(filter);
      loadAge(filter);
      loadCoat(filter);
      loadStatus(filter);
      setFilterList(filter);
    }
  }, [typeOptions]);

  const loadType = (filter) => {
    let activeType = filter.filter((option) => option.isType);
    console.log(activeType);
    if (activeType.length > 0) {
      for (let i = 0; i < typeOptions.length; i++) {
        if (typeOptions[i] && typeOptions[i].name === activeType[0].name) {
          typeOptions[i] = activeType[0];
          setType(typeOptions[i].code);
        }
      }
    }
  };

  const loadSize = (filter) => {
    let activeSizes = filter.filter((option) => option.isSize);
    for (let i = 0; i < sizeOptions.length; i++) {
      const activeSize = activeSizes.filter(
        (size) => size.code === sizeOptions[i].code
      )[0];
      if (activeSize) {
        sizeOptions[i] = activeSize;
      }
    }
  };

  const loadGender = (filter) => {
    let activeGenders = filter.filter((option) => option.isGender);
    for (let i = 0; i < genderOptions.length; i++) {
      const activeGender = activeGenders.filter(
        (gender) => gender.code === genderOptions[i].code
      )[0];
      if (activeGender) {
        genderOptions[i] = activeGender;
      }
    }
  };

  const loadAge = (filter) => {
    let activeAges = filter.filter((option) => option.isAge);
    for (let i = 0; i < ageOptions.length; i++) {
      const activeAge = activeAges.filter(
        (age) => age.code === ageOptions[i].code
      )[0];
      if (activeAge) {
        ageOptions[i] = activeAge;
      }
    }
  }

  const loadCoat = (filter) => {
    let activeCoats = filter.filter((option) => option.isCoat);
    console.log(activeCoats)
    for (let i = 0; i < coatOptions.length; i++) {
      const activeCoat = activeCoats.filter(
        (coat) => coat.code === coatOptions[i].code
      )[0];
      if (activeCoat) {
        coatOptions[i] = activeCoat;
      }
    }
  }

  const loadStatus = (filter) => {
    let activeStatus = filter.filter((option) => option.isStatus);
    for (let i = 0; i < statusOptions.length; i++) {
      const status = activeStatus.filter(
        (stat) => stat.code === statusOptions[i].code
      )[0];
      if (status) {
        statusOptions[i] = status;
      }
    }
  }

  /**
   * Remove item from filter list. Only called when
   * item is directly removed from filter list by clicking
   * the close icon.
   *
   * @param {Object} optionItem item to be removed
   */
  const removeFromFilterList = (optionItem) => {
    let temp;
    if (optionItem.isType)
      temp = handleRemoveTypeFromFilterList(optionItem, true);
    else temp = filterList.filter((item) => item.name !== optionItem.name);
    optionItem.active = false;
    setFilterList(temp);
    sessionStorage.setItem("filter", JSON.stringify(temp));
  };

  /**
   * When a category can be selected only once, the previously
   * selected category must be removed. This is called when
   * a category that can be selected only once is selected.
   *
   * @param {Object} add new category to add
   * @param {Object} remove previously selected category to renove
   */
  const updateFilterList = (add, remove) => {
    let temp = filterList;
    if (remove) {
      if (remove.isType) temp = handleRemoveTypeFromFilterList(remove, false);
      else temp = filterList.filter((item) => item.name !== remove.name);
      remove.active = false;
    }
    add.active = true;
    setFilterList([...temp, add]);
    sessionStorage.setItem("filter", JSON.stringify([...temp, add]));
  };

  /**
   * Attributes like breed, color etc. are dependent on
   * type. Hence, when a type is removed from the filter,
   * those dependent attributes must be removed as well.
   * A type can also be removed by selecting another type.
   * In that instance, we do not need to erase the type variable
   * hence the isRemove parameter should be false.
   *
   * @param {Object} type type object to be removed
   * @param {Boolean} isRemove true if category was directly removed
   * from filter list and false if category was removed by choosing
   * another category
   * @returns filtered list
   */
  const handleRemoveTypeFromFilterList = (type, isRemove) => {
    if (isRemove) setType("");
    const temp = filterList.filter(
      (item) => item.name !== type.name && !item.dependsOnType
    );
    return temp;
  };

  const handleSearchFilter = () => {
    const typeParams = type;
    const colorParams = color;
    const breedParams = getActiveFilter(breedOptions);
    const sizeParams = getActiveFilter(sizeOptions);
    const ageParams = getActiveFilter(ageOptions);
    const genderParams = getActiveFilter(genderOptions);
    const coatParams = getActiveFilter(coatOptions);
    const statusParams = getActiveFilter(statusOptions);
    const organizationParams = getActiveFilter(organizationOptions);
    const goodWithChildren = getTraitActive("Good With Children", traitOptions);
    const goodWithCats = getTraitActive("Good With Cats", traitOptions);
    const goodWithDogs = getTraitActive("Good With Dogs", traitOptions);
    const houseTrained = getTraitActive("House Trained", traitOptions);
    const declawed = getTraitActive("Declawed", traitOptions);
    const specialNeeds = getTraitActive("Special Needs", traitOptions);

    console.log(typeParams);
    console.log(colorParams);
    console.log(breedParams);
    console.log(sizeParams);
    console.log(ageParams);
    console.log(genderParams);
    console.log(coatParams);
    console.log(statusParams);
    console.log(organizationParams);
    console.log(goodWithChildren);
    console.log(goodWithCats);
    console.log(goodWithDogs);
    console.log(houseTrained);
    console.log(declawed);
    console.log(specialNeeds);
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
              name="Types"
              options={typeOptions}
              multipleValues={false}
              addToFilter={updateFilterList}
              removeFromFilter={removeFromFilterList}
              setSingleFilter={setType}
            />
            <FilterOptions
              name="Size"
              options={sizeOptions}
              multipleValues={true}
              addToFilter={updateFilterList}
              removeFromFilter={removeFromFilterList}
            />
            <FilterOptions
              name="Gender"
              options={genderOptions}
              multipleValues={true}
              addToFilter={updateFilterList}
              removeFromFilter={removeFromFilterList}
            />
            <FilterOptions
              name="Age"
              options={ageOptions}
              multipleValues={true}
              addToFilter={updateFilterList}
              removeFromFilter={removeFromFilterList}
            />
            <FilterOptions
              name="Coat"
              options={coatOptions}
              multipleValues={true}
              addToFilter={updateFilterList}
              removeFromFilter={removeFromFilterList}
            />
            <FilterOptions
              name="Status"
              options={statusOptions}
              multipleValues={true}
              addToFilter={updateFilterList}
              removeFromFilter={removeFromFilterList}
            />
            <FilterOptions
              name="Trait"
              options={traitOptions}
              multipleValues={true}
              addToFilter={updateFilterList}
              removeFromFilter={removeFromFilterList}
            />
            <FilterOptions
              name="Breed"
              options={type ? breedOptions : []}
              multipleValues={true}
              addToFilter={updateFilterList}
              removeFromFilter={removeFromFilterList}
              dependsOnType={true}
              type={type}
            />
            <FilterOptions
              name="Color"
              options={type ? colorOptions : []}
              multipleValues={false}
              addToFilter={updateFilterList}
              removeFromFilter={removeFromFilterList}
              dependsOnType={true}
              type={type}
              setSingleFilter={setColor}
            />

            <FilterOptions
              name="Organizations"
              options={organizationOptions}
              multipleValues={true}
              addToFilter={updateFilterList}
              removeFromFilter={removeFromFilterList}
            />
          </div>
          <Button
            text={"Search"}
            className="filter-button"
            onClick={handleSearchFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
