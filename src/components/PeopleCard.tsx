import React from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { People } from "../modules/heroes/people.types";
import "./PeopleCard.css";

export const PeopleCard: React.FC<{
  people: People;
}> = (props) => {
  return (
    <Card className={"PeopleCard"}>
      <Card.Body>
        <Card.Title>{props.people.name}</Card.Title>
        <Card.Text>
          Gender: {props.people.gender}
          <br />
          Height: {props.people.height}
          <br />
          Weight: {props.people.mass}
          <br />
          Hair Color: {props.people.hairColor}
          <br />
          Movies: <Badge bg="secondary">{props.people.filmUrls.length}</Badge>
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};
