import React, { FunctionComponent } from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg width="18" height="13" viewBox="0 0 18 13" {...props}>
      <path
        fill="none"
        stroke="#303D45"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M17 1 6 12 1 7"
      ></path>
    </Svg>
  );
};

export default Icon;
