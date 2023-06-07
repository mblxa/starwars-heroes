import React from "react";
import { useQuery } from "react-query";
import { fetchPeople, GetPeopleResult } from "./api/fetch-people";
import debounce from "lodash/debounce";

const INITIAL_PAGE_NUMBER = 1;
const DEBOUNCE_TIMEOUT = 350;

export const App = () => {
  const [page, setPage] = React.useState<number>(INITIAL_PAGE_NUMBER);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchQueryDebounced, setSearchQueryDebounced] = React.useState("");

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery<GetPeopleResult>(
      ["heroes", page, searchQueryDebounced],
      () => fetchPeople(page, searchQueryDebounced),
      { keepPreviousData: false },
    );

  const debounced = React.useCallback(
    debounce(setSearchQueryDebounced, DEBOUNCE_TIMEOUT),
    [],
  );

  const handleSearchQueryChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPage(INITIAL_PAGE_NUMBER);
      setSearchQuery(e.target.value);
      debounced(e.target.value);
    },
    [],
  );

  return (
    <div className="App">
      <input
        type={"text"}
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <>
          {data?.results.map((person) => (
            <div key={person.name}>{person.name}</div>
          ))}
          {data?.next && (
            <button onClick={() => setPage((old) => old + 1)}>Next Page</button>
          )}
          {data?.previous && (
            <button onClick={() => setPage((old) => old - 1)}>Prev Page</button>
          )}
          <div>Current Page: {page}</div>
        </>
      )}
    </div>
  );
};
