import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  margin: 0 10px 20px;
`;

const StyledValue = styled.span<{ percent: number }>`
  position: relative;
  margin-bottom: 5px;
  inset-inline-start: ${({ percent }) => `${percent}%`};
  margin-inline-start: -12px;
`;

const StyledBar = styled.div<{ v: number }>`
  height: 5px;
  width: 100%;
  background-color: rgba(42, 155, 159, 0.14);
  margin-bottom: 5px;
  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${({ v }) => `${v > 100 ? 100 : v}%`};
    background: linear-gradient(
      90.09deg,
      #2a9b9f 0.05%,
      rgba(42, 155, 159, 0) 99.9%
    );
  }
`;

interface IProps {
  compleetness: number
}


const ProgressBar = React.memo(({compleetness}: IProps) => {
  return (
    <StyledWrapper>
      <StyledValue percent={compleetness}>{compleetness}%</StyledValue>
      <StyledBar v={compleetness + 10}></StyledBar>
    </StyledWrapper>
  );
});

export default ProgressBar;
