import React from 'react';
import './index.scss';

function Input(props) {
  const {
    input: { value, onChange },
  } = props;

  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        className="form-control"
        type={props.type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
