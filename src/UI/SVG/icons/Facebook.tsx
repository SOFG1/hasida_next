import React, { FunctionComponent } from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg width="61" height="60" viewBox="0 0 61 60" fill="none" {...props}>
      <path
        d="M30.5 5C16.6925 5 5.5 16.1925 5.5 30C5.5 43.8075 16.6925 55 30.5 55C44.3075 55 55.5 43.8075 55.5 30C55.5 16.1925 44.3075 5 30.5 5Z"
        fill="url(#paint0_linear_146_301)"
      />
      <path
        d="M33.8839 36.6263H40.3539L41.3702 30.0538H33.8839V26.4613C33.8839 23.7313 34.7764 21.31 37.3302 21.31H41.4339V15.575C40.7127 15.4775 39.1877 15.265 36.3064 15.265C30.2889 15.265 26.7614 18.4425 26.7614 25.6825V30.055H20.5752V36.6275H26.7602V54.6925C27.9852 54.875 29.2264 55 30.5002 55C31.6514 55 32.7752 54.895 33.8839 54.745V36.6263Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_146_301"
          x1="12.9912"
          y1="12.4912"
          x2="51.2687"
          y2="50.7687"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2AA4F4" />
          <stop offset="1" stopColor="#007AD9" />
        </linearGradient>
      </defs>
    </Svg>
  );
};

export default Icon;
