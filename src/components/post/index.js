import React from "react";

export function Post({ url = "12", text = "12", date }) {
  return (
    <div className="post">
      <p>{text}</p>
      <span className="date">
        {date ? new Date(date).toLocaleDateString() : "Opps.."}
      </span>
      <a href={url}>{url}</a>
    </div>
  );
}
