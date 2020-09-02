import React from "react";

export function Hello(props) {
  if (props.name) {
    return <h1 data-testid="h1">Hello, {props.name}!</h1>;
  } else {
    return <span data-testid="spanId">Hey, stranger</span>;
  }
}
