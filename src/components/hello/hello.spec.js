import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { Hello } from "./index";

describe("Hello component", () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should render without "name" props', () => {
    act(() => {
      render(<Hello />, container);
    });

    expect(container.textContent).toBe("Hey, stranger");
  });

  it('should render with "name" props', () => {
    act(() => {
      render(<Hello name="Bogdan" />, container);
    });

    expect(container.textContent).toBe("Hello, Bogdan!");
  });
});
