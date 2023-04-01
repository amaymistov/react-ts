import React from "react";
import { Link } from "react-router-dom";

const CustomButton = (props: any): JSX.Element => (
  <Link to="/">
    <button className="button button--outline button--add">
      <span>Назад</span>
    </button>
  </Link>
);

export default CustomButton;
