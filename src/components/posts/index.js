import React from "react";
import { Post } from "../post";
import { Title } from "../title";
import { Input } from "../input";
import { Select } from "../select";

export const POSTS = [
  { url: "12", text: "12", date: "12-12-2020" },
  { url: "12", text: "12", date: "12-22-2020" },
];

export const HITS = [
  {
    value: 10,
    label: 10,
  },
  {
    value: 20,
    label: 20,
  },
  {
    value: 40,
    label: 40,
  },
  {
    value: 50,
    label: 50,
  },
];

export const BASE_PATH = "https://hn.algolia.com/api/v1";
export const SEARCH_PATH = "/search";
export const SEARCH_PARAM = "query=";
export const PAGE_HITS = "hitsPerPage=";
export const PAGE_PARAM = "page=";

export class Posts extends React.Component {
  state = {
    searchQuery: "",
    result: {},
    hitsPerPage: 20,
    page: 0,
  };

  componentDidMount() {
    const { searchQuery, hitsPerPage, page } = this.state;
    this.fetchData(searchQuery, hitsPerPage, page);
  }

  fetchData = (searchQuery, hitsPerPage, page) => {
    fetch(
      `${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${searchQuery}&${PAGE_HITS}${hitsPerPage}&${PAGE_PARAM}${page}`
    )
      .then((res) => res.json())
      .then((result) => this.setNews(result));
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      searchQuery: value,
    });
  };

  handleHitsChange = ({ target: { value } }) => {
    const { searchQuery } = this.state;

    this.setState(
      {
        hitsPerPage: +value,
        page: 0,
      },
      () => {
        this.fetchData(searchQuery, this.state.hitsPerPage, 0);
      }
    );
  };

  getSearch = ({ key }) => {
    if (key === "Enter") {
      const { searchQuery, hitsPerPage } = this.state;
      this.setState({
        page: 0,
      });
      this.fetchData(searchQuery, hitsPerPage, 0);
    }
  };

  setNews = (result) => {
    this.setState({ result });
  };

  render() {
    const { searchQuery, hitsPerPage } = this.state;

    return (
      <div className="wrapper">
        <Title title="posts" />
        <Select
          options={HITS}
          handleChange={this.handleHitsChange}
          value={hitsPerPage}
        />
        <Input
          onKeyPress={this.getSearch}
          onChange={this.handleInputChange}
          value={searchQuery}
        />
        {this.props.posts.map((item) => (
          <Post {...item} key={item.date} />
        ))}
      </div>
    );
  }
}

Posts.defaultProps = {
  posts: POSTS,
};
