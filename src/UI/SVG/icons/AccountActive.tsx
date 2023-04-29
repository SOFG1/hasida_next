import React, { FunctionComponent } from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg width="68" height="68" viewBox="0 0 68 68" fill="none" {...props}>
     <path d="M33.9998 6.8C26.4881 6.8 20.3998 12.8883 20.3998 20.4V22.6667C20.3998 30.1784 26.4881 36.2667 33.9998 36.2667C41.5116 36.2667 47.5998 30.1784 47.5998 22.6667V20.4C47.5998 12.8883 41.5116 6.8 33.9998 6.8ZM33.9954 43.0667C24.9151 43.0667 13.2645 47.9782 9.91207 52.337C7.84034 55.032 9.81251 58.9333 13.2102 58.9333H54.785C58.1827 58.9333 60.1549 55.032 58.0832 52.337C54.7308 47.9804 43.0757 43.0667 33.9954 43.0667Z" fill="white"/>
    </Svg>
  );
};

export default Icon;
