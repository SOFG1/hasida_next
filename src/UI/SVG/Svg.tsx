import React, { FunctionComponent } from 'react';
import {SvgProps} from "./types";

interface OwnProps extends SvgProps{}

type Props = OwnProps;

const defaultProps: Props = {
    height: "31px",
    xmlns: "http://www.w3.org/2000/svg",
}

const Svg: FunctionComponent<Props> = React.memo((props) => {
    return (
        <svg width={props.width} height={props.height} xmlns={props.xmlns} viewBox={props.viewBox} fill={props.fill} >
            {props.children}
        </svg>
    );
  })

Svg.defaultProps = defaultProps;

export default Svg;