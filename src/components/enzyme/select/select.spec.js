import React from "react";
import { Select } from "./index";
import { shallow } from "enzyme";

/**
 * Можно так же проверить снимком
 */

const props = {
  options: [
    { value: "first", label: "Test 1" },
    { value: "second", label: "Test 2" },
  ],
  value: 0,
  onChange: () => null,
};

const getSelect = (props) => shallow(<Select {...props} />);

describe("Select component", () => {
  describe("Select with props", () => {
    const component = getSelect(props);

    it("should render select", () => {
      const select = component.find("select");

      expect(select).toHaveLength(1);
    });

    it("should render options", () => {
      const select = component.find("option");

      expect(select).toHaveLength(2);
    });
  });

  describe("Select witout props", () => {
    const component = getSelect();
    it("should render select not data", () => {
      const select = component.find(".empty-select");

      expect(select).toHaveLength(1);
    });
  });

  describe("select with default props", () => {
    /**
     * В целом, данный вариант не обязателен, так как параметр обязательный
     */
    it("should render select not data", () => {
      const result = Select.defaultProps.onChange();

      expect(result).toBe(undefined);
    });
  });
});
