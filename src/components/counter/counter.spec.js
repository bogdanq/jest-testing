import React from "react";
import { Counter } from "./index";

/**
 * для начала нужно проверить рендер
 *
 * далее проверка методов компонента
 * методы можно проверять через инстанс, а так же через снимок, симулируя нажатие
 *  @param  simulate - метод у найденного елемента для симуляции действий
 *  @param  instance - инстанс текущего компонента, имеет все его методы
 *  @param  component - имеет доступ к состоянию (класс)
 */

const getCounter = (props) => shallow(<Counter {...props} />);

describe("Counter component", () => {
  let component;
  let instance;

  beforeEach(() => {
    component = getCounter();
    instance = component.instance();
  });

  it("should render Counter", () => {
    expect(component).toMatchSnapshot();
  });

  describe("Counter handlers", () => {
    it("should change handleClick", () => {
      instance.handleClick();
      expect(component.state().count).toBe(1);
    });

    it("should change handleClick with simulate", () => {
      const btn = component.find(".increment");
      btn.simulate("click");
      expect(component.state().count).toBe(1);
    });

    it("should change handleReset", () => {
      instance.handleReset(10);
      expect(component.state().count).toBe(10);
    });

    it("should change handleReset with simulate", () => {
      const btn = component.find(".reset");
      btn.simulate("click");
      expect(component.state().count).toBe(10);
    });
  });
});
