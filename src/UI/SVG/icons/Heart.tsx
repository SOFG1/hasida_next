import React, { FunctionComponent } from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg width="44" height="38" viewBox="0 0 44 38" fill="none" {...props}>
       <path d="M21.9998 37.24L21.4105 36.7548C20.2928 35.8277 18.7798 34.8214 17.0261 33.657C10.1944 29.1181 0.839844 22.9045 0.839844 12.3102C0.839844 5.76594 6.20531 0.440002 12.7998 0.440002C16.3828 0.440002 19.7394 2.02485 21.9998 4.73094C24.2603 2.02485 27.6169 0.440002 31.1998 0.440002C37.7944 0.440002 43.1598 5.76594 43.1598 12.3102C43.1598 22.9045 33.8053 29.1181 26.9736 33.657C25.2198 34.8214 23.7069 35.8277 22.5892 36.7548L21.9998 37.24Z" fill="white"/>
    </Svg>
  );
};

export default Icon;
