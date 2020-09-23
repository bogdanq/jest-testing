import React from "react";
import { UserCabinet } from "./index";
import { render } from "@testing-library/react";
import { useUser } from "../../hooks-with-query/useUser";

jest.mock("../../hooks-with-query/useUser");

// TOTO вынести в readmi
// https://github.com/rkotze/starwars-react-app-tests/blob/master/src/list-characters.spec.js

describe("userCabinet test", () => {
  it("should render component with load data", () => {
    useUser.mockReturnValue({
      pending: true,
      user: null,
    });

    const { getByText } = render(<UserCabinet />);

    expect(getByText("pending")).toHaveTextContent("pending");
  });

  it("should render component withot user", () => {
    useUser.mockReturnValue({
      pending: false,
      user: null,
    });

    const { getByText } = render(<UserCabinet />);

    expect(getByText("user is not defined")).toHaveTextContent(
      "user is not defined"
    );
  });

  it("should render component with user", () => {
    useUser.mockReturnValue({
      pending: false,
      user: { login: "Bogdan" },
    });

    const { getByText } = render(<UserCabinet />);

    expect(getByText("Bogdan")).toHaveTextContent("Bogdan");
  });
});
