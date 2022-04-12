import axios from "axios";

const timeout = "60000";

const petTypes = "http://localhost:5100/petfinder/types";

export async function getTypes() {
  const result = await axios.get(petTypes, {
    timeout: timeout,
  });
  return result;
}
