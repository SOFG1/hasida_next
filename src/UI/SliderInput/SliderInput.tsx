import React, { useMemo } from "react";
import styled from "styled-components";

const StyledWrapper = styled.div``;

const ValueWrapper = styled.div`
  position: relative;
  margin-inline-end: 15px;
`;

const StyledValue = styled.span<{ marginStart: number }>`
  font-size: 14px;
  margin-inline-start: ${({ marginStart }) => `${marginStart}%`};
  color: #303D45;
`;

const StyledRangeInput = styled.input<{ value: string }>`
  appearance: none;
  background: rgba(42, 155, 159, 0.11);
  border-radius: 45px;
  width: 100%;
  height: 6px;
  margin: 0;
  &::-webkit-slider-thumb {
    appearance: none;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background-color: #2A9B9F;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    appearance: none;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background-color: #2A9B9F;
    cursor: pointer;
  }
  &::-ms-thumb {
    appearance: none;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background-color: #2A9B9F;
    cursor: pointer;
  }
`;

interface IProps {
  value: number;
  valueLabel?: string; //Showed above input
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

const SliderInput = React.memo(
  ({ value, valueLabel, onChange, min, max, className }: IProps) => {
    const valuePosition = useMemo(() => {
      const minVal = min ? min : 0;
      const maxVal = max ? max : 100;
      const range = maxVal - minVal;
      const valFromMin = value - minVal;
      const percent = valFromMin / (range / 100);
      return percent;
    }, [value, min, max]);

    return (
      <StyledWrapper className={className}>
        <ValueWrapper>
          <StyledValue marginStart={valuePosition}>{valueLabel}</StyledValue>
        </ValueWrapper>
        <StyledRangeInput
          value={String(value)} 
          min={min}
          max={max}
          type="range"
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </StyledWrapper>
    );
  }
);

export default SliderInput;
