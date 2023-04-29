import React, { FunctionComponent } from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg width="7" height="7" viewBox="0 0 7 7" fill="none" {...props}>
      <path
        d="M1 1L3.5 3.5M6 6L3.5 3.5M3.5 3.5L6 1M3.5 3.5L1 6"
        stroke="#303D45"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default Icon;
