import React, { FunctionComponent } from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" {...props}>
      <path
        d="M1 7.5H7.5M14 7.5H7.5M7.5 7.5V1M7.5 7.5V14"
        stroke="#2A9B9F"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default Icon;
