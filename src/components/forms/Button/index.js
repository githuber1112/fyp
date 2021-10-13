import React from "react";
import "./styles.scss";
import { Button as Button1 } from "antd";

const Button = ({ children, ...otherProps }) => {
  return (
    <Button1 className="btn" {...otherProps}>
      {children}
    </Button1>
  );
};

export default Button;
