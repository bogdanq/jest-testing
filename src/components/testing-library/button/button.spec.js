import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { Button } from "./index";

const getButton = (props) => render(<Button {...props} />);

describe("Button component", () => {
  it("should render button with default props", () => {
    const { container } = getButton();

    expect(container.querySelector(".button_small")).toBeDefined();
  });

  it("should render button with pending status", () => {
    const { container } = getButton({ loading: true });

    expect(container.querySelector(".button_animated")).toBeDefined();

    expect(
      container.querySelector(".button_small").getAttribute("disabled")
    ).toBe("");
  });

  it("should render button with title", () => {
    const { getByText } = getButton({ title: "click" });

    expect(getByText("click")).toBeDefined();
  });

  describe("button handlers", () => {
    it("should press button", () => {
      const mockCallBack = jest.fn();

      const { container } = getButton({ onClick: mockCallBack });

      fireEvent.click(container.querySelector(".button_small"));

      expect(mockCallBack.mock.calls.length).toBe(1);
    });
  });
});
