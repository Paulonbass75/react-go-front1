import React from "react";

export default function CheckBox(props) {
  return (
    <div className="form-check">
      <input
        id={props.name}
        className="form-check-input"
        type="checkbox"
        value={props.value}
        name={props.name}
        checked={props.checked}
        onChange={props.onChange}
      />
      <label htmlFor={props.name} className="form-check-label">
        {props.title}
      </label>
    </div>
  );
}
