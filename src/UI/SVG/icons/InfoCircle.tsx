import React, { FunctionComponent } from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg width="41" height="41" viewBox="0 0 41 41" fill="none" {...props}>
      <path
        d="M22.2083 31.25H22.7083V30.75V18.7917V18.2917H22.2083H18.7917H18.2917V18.7917V30.75V31.25H18.7917H22.2083ZM0.5 20.5C0.5 9.45502 9.45502 0.5 20.5 0.5C31.545 0.5 40.5 9.45502 40.5 20.5C40.5 31.545 31.545 40.5 20.5 40.5C9.45502 40.5 0.5 31.545 0.5 20.5ZM17.4375 11.9583C17.4375 13.649 18.8094 15.0208 20.5 15.0208C22.1906 15.0208 23.5625 13.649 23.5625 11.9583C23.5625 10.2677 22.1906 8.89583 20.5 8.89583C18.8094 8.89583 17.4375 10.2677 17.4375 11.9583Z"
        stroke="#303D45"
      />
    </Svg>
  );
};

export default Icon;
