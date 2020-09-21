import React from "react";
import "./index.css";

export function Button({
  loading = false,
  disabled = false,
  title = "",
  size = "small",
  onClick,
}) {
  const animatedClassName = loading ? "button_animated" : "";
  const className = `button_${size} ${animatedClassName}`;

  return (
    <button
      onClick={onClick}
      className={className}
      disabled={loading || disabled}
    >
      {loading && <span className="loading">loading</span>}
      {title}
    </button>
  );
}
