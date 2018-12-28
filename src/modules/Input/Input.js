import React from "react";

import "./Input.css";

const Input = React.forwardRef(({ className, ...rest }, ref) => {
  return <input ref={ref} className={`input ${className}`} {...rest} />;
});

export default Input;
