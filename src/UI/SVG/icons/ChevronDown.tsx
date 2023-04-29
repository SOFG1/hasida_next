import React, { FunctionComponent } from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg width="9" height="5" viewBox="0 0 9 5" fill="none" {...props}>
     <path d="M1 1L3.28835 3.61526C3.71111 4.09842 3.92249 4.33999 4.17381 4.42671C4.38516 4.49964 4.61484 4.49964 4.82619 4.42671C5.07751 4.33999 5.28889 4.09841 5.71165 3.61526L8 1" stroke="#303D45" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
};

export default Icon;
