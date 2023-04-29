import React, { FunctionComponent } from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg width="17" height="29" viewBox="0 0 17 29" fill="none" {...props}>
     <path d="M16 1L2.32967 13.3033C1.86433 13.7221 1.63166 13.9315 1.54778 14.179C1.4772 14.3872 1.4772 14.6128 1.54778 14.821C1.63166 15.0685 1.86433 15.2779 2.32967 15.6967L16 28" stroke="#303D45" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
};

export default Icon;
