import React from "react";

export function Title({ title, size = "h1" }) {
  return title ? <h1 className={size}>{title}</h1> : null;
}
