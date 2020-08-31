import React from "react";
import { Resize } from "./index";
import { shallow } from "enzyme";

const getResize = () => shallow(<Resize />);

const componentDidMountSpy = jest.spyOn(Resize.prototype, "componentDidMount");
const componentDidUpdateSpy = jest.spyOn(
  Resize.prototype,
  "componentDidUpdate"
);
const componentWillUnmountSpy = jest.spyOn(
  Resize.prototype,
  "componentWillUnmount"
);

describe("Resize component", () => {
  let component;

  beforeEach(() => {
    jest.spyOn(window, "addEventListener");
    jest.spyOn(window, "removeEventListener");
    component = getResize();
  });

  afterEach(() => {
    window.addEventListener.mockRestore();
    window.removeEventListener.mockRestore();
  });

  it("should render Resize component", () => {
    expect(component).toMatchSnapshot();
  });

  describe("Lyfecycle methods", () => {
    it("should call didMount once", () => {
      expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
    });

    it("should not call unmount once", () => {
      expect(componentWillUnmountSpy).toHaveBeenCalledTimes(0);
    });

    it("should call didUpdate", () => {
      component.setProps();
      expect(componentDidUpdateSpy).toHaveBeenCalledTimes(1);
    });

    it("should call unmount", () => {
      component.unmount();

      expect(componentWillUnmountSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("Component handlers", () => {
    it("should call addEventLitener when component mounted", () => {
      expect(window.addEventListener).toHaveBeenCalledTimes(1);
    });

    it("should call handleChangeTitle in mount", () => {
      const instance = component.instance();
      instance.handleChangeTitle = jest.fn();
      instance.componentDidUpdate();
      expect(instance.handleChangeTitle).toHaveBeenCalledTimes(1);
    });

    it("should call removeEventLitener when component unmounted", () => {
      component.unmount();
      expect(window.removeEventListener).toHaveBeenCalledTimes(1);
    });

    it("should call handleWidth", () => {
      expect(component.state().width).toBe(0);
      global.dispatchEvent(new Event("resize"));
      expect(component.state().width).toBe(window.innerWidth);
    });
  });
});
