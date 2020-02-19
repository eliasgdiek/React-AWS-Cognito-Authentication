import React from "react";
import { Button } from "@material-ui/core"; //"react-bootstrap";

export default ({
  isLoading,
  text,
  loadingText,
  className = "",
  disabled = false,
  ...props
}) => (
  <Button
    className={`LoaderButton ${className} ${isLoading ? "loader" : ""}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {!isLoading ? text : loadingText}
  </Button>
);
