import React from "react";
import { createStyled } from "./stitches.macro";

const { styled } = createStyled({});

const Button = styled.button({
  backgroundColor: "gainsboro",
  borderRadius: "9999px",
  fontSize: "13px",
  lineHeight: "1",
  fontWeight: "500",
  paddingTop: "10px",
  paddingBottom: "10px",
  paddingLeft: "16px",
  paddingRight: "16px",
  border: "0",

  // Pseudo-class selector
  ":hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 25px rgba(0, 0, 0, .3)"
  }
});

export default function App() {
  return <Button>Button</Button>;
}
