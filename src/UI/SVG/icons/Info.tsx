import React, { FunctionComponent } from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg width="4" height="23" viewBox="0 0 4 23" fill="none" {...props}>
      <path d="M3.54883 0C3.82083 0 4 0.151878 4 0.380109V3.15835C4 3.3857 3.82183 3.53846 3.54883 3.53846V3.53673H0.455078C0.183078 3.53673 0 3.38486 0 3.15663V0.380109C0 0.152763 0.183078 0 0.455078 0H3.54883ZM3.52539 7.07692C3.80939 7.07692 4 7.21134 4 7.41038V22.6665C4 22.8656 3.81139 22.9983 3.52539 22.9983V23H0.476562C0.190563 23 0 22.8656 0 22.6665V7.41038C0 7.21134 0.189564 7.07692 0.476562 7.07692H3.52539Z" fill="white"/>
    </Svg>
  );
};

export default Icon;
