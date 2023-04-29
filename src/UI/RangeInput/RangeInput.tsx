import React, { useMemo } from "react";
//@ts-ignore
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import styled from "styled-components";

const StyledWrapper = styled.div`
  .range-slider {
    height: 6px;
    background: rgba(42, 155, 159, 0.11);
  }

  .range-slider__range {
    background: rgba(42, 155, 159, 0.17);
  }

  .range-slider__thumb {
    height: 18px;
    width: 18px;
    background-color: #2a9b9f;
    z-index: 1;
  }
  .range-slider__thumb:focus-visible {
    outline: 3px solid rgba(243, 98, 115, 0.4);
    box-shadow: none;
  }
`;

const ValueWrapper = styled.div`
  position: relative;
  margin-inline-end: 15px;
  height: 20px;
`;

const StyledValue = styled.span<{ marginStart: number }>`
  position: absolute;
  font-size: 10px;
  top: 0;
  inset-inline-start: ${({ marginStart }) => `${marginStart}%`};
  color: rgba(48, 61, 69, 0.35);
`;

interface IProps {
  value: [number, number];
  valueLabels?: [string, string];
  onChange: (v: any) => void;
  min: number;
  max: number;
  disabled?: boolean;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

const DoubleRangeInput = React.memo(
  ({
    value,
    valueLabels,
    onChange,
    min,
    max,
    disabled,
    className,
    orientation,
  }: IProps) => {
    const valuePositions = useMemo(() => {
      const minVal = min ? min : 0;
      const maxVal = max ? max : 100;
      const range = maxVal - minVal;
      const firstValFromMin = value[0] - minVal;
      const firstPercent = firstValFromMin / (range / 100);
      const secondValFromMin = value[1] - minVal;
      const secondPercent = secondValFromMin / (range / 100);
      return [firstPercent, secondPercent];
    }, [value, min, max]);

    const label1 = useMemo(() => {
      if(valueLabels && valueLabels[0]) return valueLabels[0]
      if(value && value[0]) return value[0]
    }, [value, valueLabels])

    const label2 = useMemo(() => {
      if(valueLabels && valueLabels[1]) return valueLabels[1]
      if(value && value[1]) return value[1]
    }, [value, valueLabels])

    return (
      <StyledWrapper className={className}>
        <ValueWrapper dir="ltr">
          <StyledValue marginStart={valuePositions[0]}>
            {label1}
          </StyledValue>
          <StyledValue marginStart={valuePositions[1]}>
            {label2}
          </StyledValue>
        </ValueWrapper>
        <RangeSlider
          onInput={onChange}
          value={value}
          min={min}
          max={max}
          disabled={disabled}
          orientation={orientation}
        />
      </StyledWrapper>
    );
  }
);

export default DoubleRangeInput;
