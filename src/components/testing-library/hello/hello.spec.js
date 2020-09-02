import React from "react";
import { render } from "@testing-library/react";

import { Hello } from "./index";

describe("Hello component", () => {
  it('should render without "name" props', () => {
    const { getByText } = render(<Hello />);

    expect(getByText("Hey, stranger")).toBeDefined();
  });

  it('should render with "name" props', () => {
    const { getByText } = render(<Hello name="Bogdan" />);

    expect(getByText("Hello, Bogdan!")).toBeDefined();
  });
});
