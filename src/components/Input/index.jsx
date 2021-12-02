import React from "react";

const Input = (props) => {
  const {label, value, onChange, ...rest} = props;

  return (
    <div>
      {label}&nbsp;
      <input {...rest} value={value} onChange={onChange}></input>
    </div>
  );
};

export default Input;
