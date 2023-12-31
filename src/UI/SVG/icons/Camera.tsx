import React, { FunctionComponent } from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg width="124" height="124" viewBox="0 0 124 124" fill="none" {...props}>
      <path
        d="M106.562 50.375V83.3125C106.562 91.8588 99.6088 98.8125 91.0625 98.8125H32.9375C24.3912 98.8125 17.4375 91.8588 17.4375 83.3125V50.375C17.4375 41.8287 24.3912 34.875 32.9375 34.875H39.773C41.2494 34.875 42.5766 34.0535 43.2372 32.7341L44.7659 29.6767C46.7499 25.7126 50.7334 23.25 55.1645 23.25H68.8374C73.2685 23.25 77.252 25.7126 79.2341 29.6747L80.7627 32.7321C81.4215 34.0535 82.7506 34.875 84.227 34.875H91.0625C99.6088 34.875 106.562 41.8287 106.562 50.375ZM83.3125 65.875C83.3125 54.1241 73.7509 44.5625 62 44.5625C50.2491 44.5625 40.6875 54.1241 40.6875 65.875C40.6875 77.6259 50.2491 87.1875 62 87.1875C73.7509 87.1875 83.3125 77.6259 83.3125 65.875ZM75.5625 65.875C75.5625 73.3537 69.4768 79.4375 62 79.4375C54.5232 79.4375 48.4375 73.3537 48.4375 65.875C48.4375 58.3963 54.5232 52.3125 62 52.3125C69.4768 52.3125 75.5625 58.3963 75.5625 65.875Z"
        fill="#303D45"
      />
      <rect
        x="87.2998"
        y="81.1"
        width="26.9"
        height="26.9"
        rx="13.45"
        fill="#FCFBF7"
      />
      <path
        d="M93 94.8571H100.5M108 94.8571H100.5M100.5 94.8571V87M100.5 94.8571V102"
        stroke="#303D45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="87.2998"
        y="81.1"
        width="26.9"
        height="26.9"
        rx="13.45"
        stroke="#303D45"
      />
    </Svg>
  );
};

export default Icon;
