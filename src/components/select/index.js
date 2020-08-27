import React from "react";

export function Select({ onChange, options, value }) {
  return (
    <div className="select-wrapper">
      {options && options.length ? (
        <select defaultValue={value} onChange={onChange}>
          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="empty-select">No items</div>
      )}
    </div>
  );
}

Select.defaultProps = {
  onChange: () => {},
};
