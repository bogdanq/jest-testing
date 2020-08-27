import React from "react";
import { Title } from "./index";
import { shallow } from "enzyme";

/**
 * для тестирования пропсов достаточно протетсировать два кейса, с пропсами и без них
 */

describe("Title component", () => {
  it("render Title with props", () => {
    const component = shallow(<Title title="title" size="h2" />);

    expect(component).toMatchSnapshot();
  });

  it("render Title without props", () => {
    const component = shallow(<Title />);

    expect(component).toMatchSnapshot();
  });
});
