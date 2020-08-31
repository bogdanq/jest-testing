import React from "react";
import {
  Posts,
  POSTS,
  BASE_PATH,
  SEARCH_PATH,
  SEARCH_PARAM,
  PAGE_HITS,
  PAGE_PARAM,
} from "./index";
import { shallow } from "enzyme";

const mockJsonPromise = Promise.resolve({ hits: POSTS, page: 1, nbPages: 10 });
const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

const getPosts = (props) => shallow(<Posts {...props} />);

describe("Posts component", () => {
  const DEFAULT_PAGE = 20;
  let component;
  let instance;

  beforeEach(() => {
    component = getPosts();
    instance = component.instance();
  });

  it("should shallow Posts component", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render Posts component", () => {
    expect(component).toMatchSnapshot();
  });

  it("should first call fetch", () => {
    expect(global.fetch).toHaveBeenCalledWith(
      `${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${""}&${PAGE_HITS}${20}&${PAGE_PARAM}${0}`
    );
  });

  describe("Posts handlers", () => {
    it("should handle search input value", () => {
      expect(component.state().searchQuery).toBe("");
      instance.handleInputChange({ target: { value: "text" } });
      expect(component.state().searchQuery).toBe("text");
    });

    it("should handle hits per page", () => {
      expect(component.state().hitsPerPage).toBe(DEFAULT_PAGE);
      instance.handleHitsChange({ target: { value: String(DEFAULT_PAGE) } });
      expect(component.state().hitsPerPage).toBe(DEFAULT_PAGE);
    });

    it("should handle change page if 'Enter' clicked", () => {
      instance.setState({ page: DEFAULT_PAGE });
      instance.getSearch({ key: "Enter" });

      expect(component.state().page).toBe(0);
    });

    it("should handle change page if 'a' button clicked", () => {
      instance.setState({ page: DEFAULT_PAGE });
      instance.getSearch({ key: "a" });

      expect(component.state().page).toBe(DEFAULT_PAGE);
    });
  });
});
