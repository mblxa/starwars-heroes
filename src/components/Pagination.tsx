import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

export const Pagination: React.FC<{
  nextPage?: string;
  previousPage?: string;
  onChangePage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}> = (props) => {
  return (
    <>
      <div>Current Page: {props.currentPage}</div>
      <ButtonGroup>
        <Button
          onClick={() => props.onChangePage((prevState) => prevState - 1)}
          disabled={!props.previousPage}
        >
          Prev Page
        </Button>
        <Button
          onClick={() => props.onChangePage((prevState) => prevState + 1)}
          disabled={!props.nextPage}
        >
          Next Page
        </Button>
      </ButtonGroup>
    </>
  );
};
