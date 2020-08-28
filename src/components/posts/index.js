import React from "react";
import { Post } from "../post";
import { Title } from "../title";
import { Input } from "../input";
import { Select } from "../select";

const POSTS = [
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

export class Posts extends React.Component {
  state = {
    searchQuery: "",
    hitsPerPage: 20,
    page: 0,
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      searchQuery: value,
    });
  };

  handleHitsChange = ({ target: { value } }) => {
    this.setState({
      hitsPerPage: +value,
      page: 0,
    });
  };

  getSearch = ({ key }) => {
    if (key === "Enter") {
      this.setState({
        page: 0,
      });
    }
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
