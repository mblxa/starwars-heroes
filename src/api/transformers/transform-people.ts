import { ApiPeople } from "../types/api-people";
import { People } from "../../modules/heroes/people.types";

export const transformApiPeople = (apiPeople: ApiPeople): People => ({
  name: apiPeople.name,
  height: apiPeople.height,
  mass: apiPeople.mass,
  hairColor: apiPeople.hair_color,
  skinColor: apiPeople.skin_color,
  eyeColor: apiPeople.eye_color,
  gender: apiPeople.gender,
  filmUrls: apiPeople.films,
});
