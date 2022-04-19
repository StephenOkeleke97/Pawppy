import axios from "axios";

const timeout = "60000";
const host = "http://localhost:5100/";
const petTypes = host + "petfinder/types";
const petBreed = host + "petfinder/breed";
const organizations = host + "petfinder/organizations";
const animals = host + "petfinder/animals";

export async function getAnimals(params) {
  const result = await axios.get(animals, {
    params: params,
    timeout: timeout
  });

  return result;
}

export async function getAnimal(id) {
  const result = await axios.get(animals + `/${id}`, {
    timeout: timeout
  });

  return result;
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
