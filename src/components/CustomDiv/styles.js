import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    position: ({ position }) => position,
    left: ({ left }) => left,
    right: ({ right }) => right,
    bottom: ({ bottom }) => bottom,
    top: ({ top }) => top,
    zIndex: ({ zIndex }) => zIndex,

    margin: ({ margin = 0 }) => margin,
    marginTop: ({ marginTop }) => marginTop,
    marginBottom: ({ marginBottom }) => marginBottom,
    marginLeft: ({ marginLeft }) => marginLeft,
    marginRight: ({ marginRight }) => marginRight,

    padding: ({ padding = 0 }) => padding,
    paddingTop: ({ paddingTop }) => paddingTop,
    paddingBottom: ({ paddingBottom }) => paddingBottom,
    paddingLeft: ({ paddingLeft }) => paddingLeft,
    paddingRight: ({ paddingRight }) => paddingRight,

    fontWeight: ({ fontWeight }) => fontWeight,
    fontSize: ({ fontSize = 16 }) => fontSize,

    display: ({ display }) => display,
    flexDirection: ({ flexDirection }) => flexDirection,
    justifyContent: ({ justifyContent }) => justifyContent,
    alignItems: ({ alignItems }) => alignItems,
    flexBasis: ({ flexBasis }) => flexBasis,
    flex: ({ flex }) => flex,
    flexWrap: ({ flexWrap }) => flexWrap,
    gap: ({ gap }) => gap,

    overflow: ({ overflow }) => overflow,
    overflowY: ({ overflowY }) => overflowY,
    overflowX: ({ overflowX }) => overflowX,

    border: ({ border }) => border,
    borderRadius: ({ borderRadius }) => borderRadius,

    width: ({ width }) => width,
    minWidth: ({ minWidth }) => minWidth,
    maxWidth: ({ maxWidth }) => maxWidth,
    height: ({ height }) => height,
    minHeight: ({ minHeight }) => minHeight,
    maxHeight: ({ maxHeight }) => maxHeight,
  },
});

export default useStyles;
