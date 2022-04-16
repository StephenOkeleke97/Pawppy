import axios from "axios";

const timeout = "60000";
const host = "http://localhost:5100/";
const petTypes = host + "petfinder/types";
const petBreed = host + "petfinder/breed";
const organizations = host + "petfinder/organizations";

export async function getAnimals(
  type,
  breed,
  size,
  gender,
  age,
  color,
  coat,
  status,
  name,
  organization,
  goodWithChildren,
  goodWithDogs,
  goodWithCats,
  houseTrained,
  declawed,
  specialNeeds,
  location,
  distance
) {
  const params = {
    type: type,
    breed: breed,
    size: size,
    gender: gender,
    age: age,
    color: color,
    coat: coat,
    status: status,
    name: name,
    organization: organization,
    good_with_children: goodWithChildren,
    good_with_dogs: goodWithDogs,
    good_with_cats: goodWithCats,
    house_trained: houseTrained,
    declawed: declawed,
    special_needs: specialNeeds,
    location: location,
    distance: distance
  };
}

export async function getTypes() {
  const result = await axios.get(petTypes, {
    timeout: timeout,
  });
  return result;
}

export async function getBreed(type) {
  const result = await axios.get(petBreed, {
    timeout: timeout,
    params: {
      type: type,
    },
  });
  return result;
}

export async function getOrganizations() {
  const result = await axios.get(organizations, {
    timeout: timeout,
  });
  return result;
}
