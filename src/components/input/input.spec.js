import React from "react";
import { Input } from "./index";
import { shallow } from "enzyme";

/**
 * В компоненте нет логики поэтому достаточно протестировать его рендер и деволтные пропсы
 * */

describe("Input component", () => {
  it("should rener Input component", () => {
    const component = shallow(<Input />);
    expect(component).toMatchSnapshot();
  });

  describe("defaultProps", () => {
    it("should use default onChange", () => {
      const result = Input.defaultProps.onChange();
      expect(result).toBe(undefined);
    });

    it("should use default onKeyPress", () => {
      const result = Input.defaultProps.onKeyPress();
      expect(result).toBe(undefined);
    });
  });
});
