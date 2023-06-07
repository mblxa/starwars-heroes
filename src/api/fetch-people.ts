import { apiClient } from "./api-client";
import { ApiPeople } from "./types/api-people";
import { People } from "../modules/heroes/people.types";
import { transformApiPeople } from "./transformers/transform-people";
import { resolveAfterTimeout } from "./resolve-after-timeout";

interface GetPeopleResponse {
  count: number;
  next: string;
  previous: string;
  results: ApiPeople[];
}

export interface GetPeopleResult {
  count: number;
  next: string;
  previous: string;
  results: People[];
}

export const fetchPeople = async (
  page: number,
  searchQuery: string,
): Promise<GetPeopleResult> => {
  const result = await Promise.all([
    apiClient
      .get<GetPeopleResponse>(`/people?page=${page}&search=${searchQuery}`)
      .then((res) => {
        return {
          count: res.data.count,
          next: res.data.next,
          previous: res.data.previous,
          results: res.data.results.map(transformApiPeople),
        };
      }),
    resolveAfterTimeout(800),
  ]);

  return result[0];
};
