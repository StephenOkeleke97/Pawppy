import React, { useEffect, useState } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { getTrait } from "../filters/categories";
import FilterListItem from "../components/FilterListItem";
import FilterOptions from "../components/FilterOptions";
import {
  getAge,
  getCoat,
  getColors,
  getGender,
  getSize,
  getStatus,
  transformBreeds,
  transformOrganizations,
  transformType,
} from "../filters/constants";
import {
  getAnimals,
  getBreed,
  getOrganizations,
  getTypes,
} from "../api/PetFinderService";
import Button from "../components/Button";
import { getActiveFilter, getTraitActive } from "../filters/activeFilters";
import Animals from "../components/Animals";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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
  const [animals, setAnimals] = useState(null);
  const [typeLoaded, setTypeLoaded] = useState(false);
  const [pageShowing, setPageShowing] = useState(1);

  const [filterList, setFilterList] = useState([]);
  const storage = window.localStorage;
  const navigation = useNavigate();

  // useEffect(() => {
  //   if (filterList) setFilterChanged(true);
  // }, [filterList]);
  /**
   */
  useEffect(() => {
    const keys = Array.from(searchParams.keys());
    if (keys.length > 0) {
      loadFilters(keys);
    } else {
    }

    if (typeLoaded) handleSearchFilter(true);
  }, [typeOptions]);

  const loadFilters = (keys) => {
    const keyMap = {};
    keys.forEach((key) => {
      keyMap[key] = searchParams.get(key);
    });
    const filter = [];
    if (keyMap.type) loadType(keyMap.type, filter);
    if (keyMap.size) loadOption(keyMap.size, sizeOptions, filter);
    if (keyMap.gender) loadOption(keyMap.gender, genderOptions, filter);
    if (keyMap.age) loadOption(keyMap.age, ageOptions, filter);
    if (keyMap.coat) loadOption(keyMap.coat, coatOptions, filter);
    if (keyMap.status) loadOption(keyMap.status, statusOptions, filter);
    if (keyMap.organization)
      loadOption(keyMap.organization, organizationOptions, filter);
    if (keyMap["good_with_children"]) loadTrait("good_with_children", filter);
    if (keyMap["good_with_cats"]) loadTrait("good_with_cats", filter);
    if (keyMap["good_with_dogs"]) loadTrait("good_with_dogs", filter);
    if (keyMap["declawed"]) loadTrait("declawed", filter);
    if (keyMap["special_needs"]) loadTrait("special_needs", filter);
    if (keyMap["house_trained"]) loadTrait("house_trained", filter);

    setFilterList(filter);
  };

  const loadType = (type, filterList) => {
    setType(type);
    typeOptions.forEach((typeOption) => {
      if (typeOption.code.toLowerCase() === type.toLowerCase()) {
        typeOption.active = true;
        filterList.push(typeOption);
      }
    });
  };

  const loadTrait = (trait, filterList) => {
    traitOptions.forEach((traitOption) => {
      if (traitOption.code === trait) {
        traitOption.active = true;
        filterList.push(traitOption);
      }
    });
  };

  const loadOption = (option, options, filterList) => {
    const optionList = option.split(",");
    options.forEach((o) => {
      if (optionList.some((item) => item === o.code)) {
        o.active = true;
        filterList.push(o);
      }
    });
  };

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
          setTypeOptions(result.data.types);
          setTypeLoaded(true);
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
      setTypeLoaded(true);

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
          const colors = getColors(type, typeOptions);
          setColorOptions(colors);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [type]);

  /**
   * Remove item from filter list. Only called when
   * item is directly removed from filter list by clicking
   * the close icon.
   *
   * @param {Object} optionItem item to be removed
   */
  const removeFromFilterList = (optionItem) => {
    let temp;
    if (optionItem.isColor) setColor("");
    if (optionItem.isType)
      temp = handleRemoveTypeFromFilterList(optionItem, true);
    else temp = filterList.filter((item) => item.name !== optionItem.name);
    optionItem.active = false;
    setFilterList(temp);
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

  const handleSearchFilter = (isMount = false, page = 1) => {
    const urlSearch = new URLSearchParams();
    const params = {
      type: type,
      breed: getActiveFilter(breedOptions),
      size: getActiveFilter(sizeOptions),
      gender: getActiveFilter(genderOptions),
      age: getActiveFilter(ageOptions),
      color: color,
      coat: getActiveFilter(coatOptions),
      status: getActiveFilter(statusOptions),
      organization: getActiveFilter(organizationOptions),
      good_with_children: getTraitActive("Good With Children", traitOptions),
      good_with_cats: getTraitActive("Good With Cats", traitOptions),
      good_with_dogs: getTraitActive("Good With Dogs", traitOptions),
      house_trained: getTraitActive("House Trained", traitOptions),
      declawed: getTraitActive("Declawed", traitOptions),
      special_needs: getTraitActive("Special Needs", traitOptions),
      page: page,
      limit: 40,
    };
    if (params.type) urlSearch.append("type", params.type);
    if (params.size) urlSearch.append("size", params.size);
    if (params.gender) urlSearch.append("gender", params.gender);
    if (params.age) urlSearch.append("age", params.age);
    if (params.coat) urlSearch.append("coat", params.coat);
    if (params.status) urlSearch.append("status", params.status);
    if (params.organization)
      urlSearch.append("organization", params.organization);
    if (params["good_with_children"])
      urlSearch.append("good_with_children", params["good_with_children"]);
    if (params["good_with_cats"])
      urlSearch.append("good_with_cats", params["good_with_cats"]);
    if (params["good_with_dogs"])
      urlSearch.append("good_with_dogs", params["good_with_dogs"]);
    if (params["house_trained"])
      urlSearch.append("house_trained", params["house_trained"]);
    if (params.declawed) urlSearch.append("declawed", params.declawed);
    if (params["special_needs"])
      urlSearch.append("special_needs", params["special_needs"]);

    console.log(page);
    getAnimals(params)
      .then((result) => {
        console.log(result.data);
        // setFilterChanged(false);
        setAnimals(result.data.data);
        if (!isMount) {
          navigation({
            pathname: "/search",
            search: urlSearch.toString(),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setPage = (page) => {
    console.log(page);
    // setFilterChanged(true);
    handleSearchFilter(false, page);
  };

  const clearFilter = () => {
    filterList.forEach(option => {
      option.active = false;
    });
    setFilterList([]);
    setType("");
    setColor("");
  }

  return (
    <div className="search-container container">
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
          <div className="filter-header">
          <h1>Filters</h1>
          <button onClick={clearFilter}>Clear</button>
          </div>
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
            onClick={() => {
              handleSearchFilter(false);
            }}
          />
        </div>
      </div>
      <Animals animalsObject={animals} changePage={setPage} />
    </div>
  );
};

export default Search;
