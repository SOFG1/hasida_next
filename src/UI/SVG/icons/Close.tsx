import React, { FunctionComponent } from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" {...props}>
      <path
        d="M1 14L7.5 7.5M14 1L7.5 7.5M7.5 7.5L1 1M7.5 7.5L14 14"
        stroke="#303D45"
      />
    </Svg>
  );
};

export default Icon;
