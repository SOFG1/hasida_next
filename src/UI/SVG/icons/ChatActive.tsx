import React, { FunctionComponent } from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg width="68" height="68" viewBox="0 0 68 68" fill="none" {...props}>
      <path
        d="M34.0001 9.71429C19.5494 9.71429 7.77148 19.5157 7.77148 31.7836C7.77148 38.9072 11.7984 45.108 17.9903 49.157C17.9814 49.3942 17.9992 49.7823 17.674 50.9379C17.2776 52.3738 16.4668 54.3919 14.8275 56.6687L13.6604 58.2857H15.6962C22.7567 58.2857 26.8415 53.8313 27.4741 53.1155C29.5767 53.5942 31.7416 53.8572 34.0001 53.8572C48.4507 53.8572 60.2286 44.0558 60.2286 31.7836C60.2286 19.5157 48.4507 9.71429 34.0001 9.71429Z"
        fill="white"
      />
    </Svg>
  );
};

export default Icon;
