import React from "react";
import cn from "classnames";
import useStyles from "./styles";

function CustomDiv({ children, onClick, hide, className, ...props }) {
  const classes = useStyles(props);
  if (hide) return null;

  return (
    <div onClick={onClick} className={cn(classes.container, className)}>
      {children}
    </div>
  );
}

export default CustomDiv;
