import React from "react";

import "./Input.css";

const Input = ({ className, ...rest }) => {
  return <input className={`input ${className}`} {...rest} />;
};

export default Input;
