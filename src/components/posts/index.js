import React from "react";
import { Post } from "../post";

const POSTS = [
  { url: "12", text: "12", date: "12-12-2020" },
  { url: "12", text: "12", date: "12-22-2020" },
];

export function Posts({ posts = POSTS }) {
  return posts.map((item) => <Post {...item} key={item.date} />);
  // return (posts || []).map((item) => <Post {...item} />);
}
