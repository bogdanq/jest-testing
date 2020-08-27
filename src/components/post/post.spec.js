import React from "react";
import { Post } from "./index";

/**
 * shallow - рендер компоненте, поверхносных рендер
 * не трогает дочерние елементы
 */

const createPost = (props) => shallow(<Post {...props} />);

describe("should render Post component", () => {
  let component;

  beforeEach(() => {
    component = createPost();
  });

  it("should contain .post wrapper", () => {
    const wrapper = component.find(".post");

    expect(wrapper.length).toBe(1);
  });

  it("should contain link", () => {
    const wrapper = component.find("a");

    expect(wrapper.length).toBe(1);
  });

  it("should render created date", () => {
    const date = "01-03-2020";
    component = createPost({ date });

    const findedDate = component.find(".date");
    expect(findedDate.text()).toBe(new Date(date).toLocaleDateString());
  });
});
