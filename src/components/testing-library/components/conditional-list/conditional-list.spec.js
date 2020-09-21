import React from "react";
import { render } from "@testing-library/react";

import { ConditionalList } from "./index";

describe("ConditionalList component", () => {
  it("sholud render ConditionalList with default props", () => {
    const { getByText } = render(<ConditionalList />);

    expect(getByText("Данных нет")).toHaveTextContent("Данных нет");
  });

  it("sholud render ConditionalList with error", () => {
    const error = "При получении данных произошла ошибка";
    const { getByText } = render(<ConditionalList error={true} data={[]} />);

    expect(getByText(error)).toHaveTextContent(error);
  });

  it("sholud render ConditionalList with data", () => {
    const mockCallBack = jest.fn();

    render(
      <ConditionalList
        data={[1, 2]}
        renderExist={() => {
          mockCallBack();
          return null;
        }}
      />
    );

    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it("sholud render ConditionalList without data", () => {
    const mockCallBack = jest.fn();

    render(
      <ConditionalList
        data={[]}
        renderEmpty={() => {
          mockCallBack();
          return null;
        }}
      />
    );

    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it("sholud render ConditionalList with loading", () => {
    const { container } = render(<ConditionalList data={[]} loading={true} />);

    expect(container.querySelector(".spiner")).toHaveClass("spiner");
  });
});
