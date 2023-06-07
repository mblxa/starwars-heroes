import React from "react";
import { useQuery } from "react-query";
import { fetchPeople, GetPeopleResult } from "./api/fetch-people";
import debounce from "lodash/debounce";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Layout } from "./components/layout";
import { PeopleCard } from "./components/PeopleCard";
import { Pagination } from "./components/Pagination";

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
    <Layout>
      <Container>
        <Row>
          <Col>
            <Form.Label>Search for character</Form.Label>
            <Form.Control
              type="text"
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
            <hr />
            <Row>
              <Col>
                <Pagination
                  nextPage={data?.next}
                  previousPage={data?.previous}
                  onChangePage={setPage}
                  currentPage={page}
                />
              </Col>
            </Row>
            <hr />
            {isLoading ? (
              <Container>
                <Row className={"justify-content-md-center"}>
                  <Col md={"auto"}>
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </Col>
                </Row>
              </Container>
            ) : (
              <Container>
                <Row>
                  {data?.results.map((people) => (
                    <Col
                      md={"auto"}
                      key={people.name}
                      className={"justify-content-md-center"}
                    >
                      <PeopleCard people={people} />
                    </Col>
                  ))}
                </Row>
              </Container>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
