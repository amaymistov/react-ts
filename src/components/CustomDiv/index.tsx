import React, { MouseEventHandler } from "react";
import cn from "classnames";
import useStyles from "./styles";

type OuterProps = {
  onClick?: MouseEventHandler<HTMLDivElement>;
  color?: string;
  children?: any;

  hide?: boolean;

  fontWeight?: number | string;
  fontSize?: number | string;

  margin?: number | string;
  marginTop?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;

  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  maxHeight?: string;
  minHeight?: string;

  padding?: number | string;
  paddingTop?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  paddingRight?: number | string;

  position?: string;
  left?: string;
  right?: string;
  bottom?: string;
  top?: string;
  zIndex?: number;

  className?: string;

  overflow?: string;
  overflowX?: string;
  overflowY?: string;

  display?: string;
  flexDirection?: string;
  flexWrap?: string;
  flexBasis?: string;
  flex?: number | string;
  gap?: string;
  justifyContent?: string;
  alignItems?: string;

  background?: number | string;
  backgroundColor?: string;

  border?: number | string;
  borderRadius?: number | string;
};

function CustomDiv({
  children,
  onClick,
  hide,
  className,
  ...props
}: OuterProps): JSX.Element | null {
  const classes = useStyles(props);
  if (hide) return null;

  return (
    <div onClick={onClick} className={cn(classes.container, className)}>
      {children}
    </div>
  );
}

export default CustomDiv;
