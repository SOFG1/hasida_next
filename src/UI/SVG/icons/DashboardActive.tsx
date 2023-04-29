import React, { FunctionComponent } from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg width="68" height="68" viewBox="0 0 68 68" fill="none" {...props}>
     <path d="M54.5173 19.5015H59.0767C59.8518 19.5015 60.4445 18.8583 60.4445 18.1231C60.4445 18.0312 60.4445 17.9853 60.4445 17.9393C60.399 15.1366 59.3047 12.5177 57.2986 10.542C55.566 8.84204 53.2863 7.87718 50.9154 7.6015L49.958 7.55556H18.0423C14.7595 7.55556 12.1151 10.2204 12.1151 13.5285V16.6529C12.1151 17.388 12.6622 18.0772 13.3917 18.1231C14.1668 18.1691 14.8507 17.5258 14.8507 16.7447V13.5285C14.8507 11.7366 16.2641 10.3123 18.0423 10.3123H48.5901V13.5285C48.5901 16.8366 51.2346 19.5015 54.5173 19.5015ZM51.3258 10.4501C52.876 10.7258 54.2894 11.461 55.4292 12.6096C56.5691 13.7583 57.2986 15.1826 57.5721 16.7447H54.5173C52.7392 16.7447 51.3258 15.3204 51.3258 13.5285V10.4501ZM58.8032 24.142C58.1649 24.2799 57.7089 24.8772 57.7089 25.5664V53.961C57.7089 55.0177 56.797 55.8907 55.7028 55.7988C54.7453 55.7069 54.0614 54.8339 54.0614 53.8691V30.988C54.0614 28.9664 52.42 27.3123 50.4139 27.3123H35.4591C33.4986 27.3123 31.6292 26.3474 30.4894 24.7853C28.848 22.5339 26.158 21.3393 23.3767 21.3393H11.2032C9.19704 21.3393 7.55566 22.9934 7.55566 25.015V54.8799C7.55566 56.9015 9.19704 58.5556 11.2032 58.5556H56.0219C56.0675 58.5556 56.1587 58.5556 56.2043 58.5556C58.5752 58.3718 60.4445 56.3961 60.4445 53.961V25.4745C60.4445 24.6015 59.6695 23.9583 58.8032 24.142Z" fill="white"/>
    </Svg>
  );
};

export default Icon;