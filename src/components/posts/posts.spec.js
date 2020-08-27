import React from "react";
import { Posts } from "./index";

describe("Posts component", () => {
  it("should shallow Posts component", () => {
    const component = shallow(<Posts />);
    expect(component).toMatchSnapshot();
  });

  it("should render Posts component", () => {
    const component = render(<Posts />);
    expect(component).toMatchSnapshot();
  });
});
