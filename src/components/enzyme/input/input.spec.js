import React from "react";
import { Input } from "./index";
import { shallow } from "enzyme";

/**
 * В компоненте нет логики поэтому достаточно протестировать его рендер и деволтные пропсы
 *
 * обработчики компонента не влияют на его состояние, но это можно протестировать
 * с помощью mock функцию у jest
 * */

describe("Input component", () => {
  it("should rener Input component", () => {
    const component = shallow(<Input />);
    expect(component).toMatchSnapshot();
  });

  it("should call onChange", () => {
    const mockCallBack = jest.fn();
    expect(mockCallBack.mock.calls.length).toBe(0);

    const component = shallow(<Input onChange={mockCallBack} />);
    component.find(".input").simulate("change");

    expect(mockCallBack.mock.calls.length).toBe(1);
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
